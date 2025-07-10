// app/api/google-sheets/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

// Google Sheets configuration
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY

function cleanPrivateKey(privateKey: string): string {
  // Remove any extra quotes and properly handle newlines
  let cleanedKey = privateKey.replace(/^"|"$/g, '');
  
  // Handle different newline formats
  cleanedKey = cleanedKey.replace(/\\n/g, '\n');
  
  // Ensure proper BEGIN/END format
  if (!cleanedKey.includes('-----BEGIN PRIVATE KEY-----')) {
    // If it's just the key content, wrap it
    cleanedKey = `-----BEGIN PRIVATE KEY-----\n${cleanedKey}\n-----END PRIVATE KEY-----`;
  }
  
  return cleanedKey;
}

export async function POST(request: NextRequest) {
  try {
    const { teamName, level, completionTime } = await request.json()

    // Validate required fields
    if (!teamName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if environment variables are set
    if (!GOOGLE_SHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Sheets environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Clean and process the private key
    const cleanedPrivateKey = cleanPrivateKey(GOOGLE_PRIVATE_KEY)

    // Create JWT auth with additional error handling
    let jwt: JWT
    try {
      jwt = new JWT({
        email: GOOGLE_CLIENT_EMAIL,
        key: cleanedPrivateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })
    } catch (keyError) {
      console.error('JWT creation error:', keyError)
      return NextResponse.json(
        { error: 'Authentication configuration error' },
        { status: 500 }
      )
    }

    // Initialize the Google Spreadsheet
    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt)
    
    try {
      await doc.loadInfo()
    } catch (loadError) {
      console.error('Google Sheets load error:', loadError)
      return NextResponse.json(
        { error: 'Failed to connect to Google Sheets' },
        { status: 500 }
      )
    }

    // Get the first sheet or create one if it doesn't exist
    let sheet = doc.sheetsByIndex[0]
    if (!sheet) {
      sheet = await doc.addSheet({
        title: 'Game Progress',
        headerValues: ['Team Name', 'Game Started', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Total Duration']
      })
    }

    // Load all rows to find or create the delegate's row
    const rows = await sheet.getRows()
    
    // Find existing row for this delegate (using email as unique identifier)
    let delegateRow = rows.find(row => row.get('Team Name') === teamName)
    
    if (!delegateRow) {
      // Create new row for this delegate
      delegateRow = await sheet.addRow({
        'Team Name': teamName,
        'Game Started': new Date().toLocaleString(),
        'Level 1': '',
        'Level 2': '',
        'Level 3': '',
        'Level 4': '',
        'Level 5': '',
        'Total Duration': ''
      })
    }

    // Update the specific level completion time
    if (level && completionTime) {
      const completionDate = new Date(completionTime)
      const formattedCompletionTime = completionDate.toLocaleString()
      
      delegateRow.set(`Level ${level}`, formattedCompletionTime)
      
      // Calculate total duration if Level 5 is completed
      if (level === 5) {
        const gameStarted = delegateRow.get('Game Started')
        if (gameStarted) {
          const startTime = new Date(gameStarted)
          const endTime = completionDate
          const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60))
          delegateRow.set('Total Duration', `${durationMinutes} minutes`)
        }
      }
      
      await delegateRow.save()
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating Google Sheets:', error)
    return NextResponse.json(
      { error: 'Failed to update Google Sheets' },
      { status: 500 }
    )
  }
}