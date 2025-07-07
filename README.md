# 🛡️ Henkel Guardian

A gamified Next.js app where users must outsmart an AI guardian to uncover a hidden Henkel-related secret. The challenge consists of 5 progressive levels, each requiring users to formulate smarter queries to reveal the answer. Successfully completing all 5 levels records user data in a connected Google Sheet.

## 🧩 Features

* Gemini API-powered AI Guardian that responds to user queries
* 5-level challenge system with increasing difficulty
* Google Sheets integration to store user data upon completion
* Data captured: `firstname`, `lastname`, `country`, `email`, `created_at`

## 🚀 Getting Started

### Prerequisites

* Node.js (>=16) and npm or yarn installed
* A Google Sheet created with columns:
  `firstname | lastname | country | email | created_at`
  and its **Sheet ID**

### 1. Clone this repo

```bash
git clone https://github.com/Dulithi/henkel-guardian.git
cd henkel-guardian
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Google Sheets Integration
GOOGLE_SHEET_ID=your_google_sheet_id_here
GOOGLE_CLIENT_EMAIL=your_service_account_email@project-name.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT_HERE\n-----END PRIVATE KEY-----"
```


- `GEMINI_API_KEY`: API key to communicate with Gemini AI
- `GOOGLE_SHEET_ID`: ID of the Google Sheet; must have columns: `First Name`, `Last Name`, `Email`, `Country`, `Game Started`, `Level 1`, `Level 2`, `Level 3`, `Level 4`, `Level 5`, `Total Duration`
- `GOOGLE_CLIENT_EMAIL`: Service account email for Google Sheets API access
- `GOOGLE_PRIVATE_KEY`: Private key for Google Sheets service account authentication

### 4. Run locally

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to start the challenge.

## 🧠 Game Flow

1. User answers a Henkel-related riddle or question by trying to trick the Guardian.
2. If the response meets the level criteria, they move to the next.
3. Each level is progressively harder and tests creativity and knowledge.
4. Upon completing Level 5, the user's info is submitted to a Google Sheet.

## 🚀 Deployment

Deploy to Vercel, Netlify, or any platform supporting Next.js. Ensure environment variables are properly set.
