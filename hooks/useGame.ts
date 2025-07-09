"use client"

import { useState, useRef, useEffect } from "react"
import type { GameState, Level } from "../types/game"
import { getGeminiResponse } from "@/utils/getGeminiResponse"
import { DelegateInfo } from "@/types/delegate"
export function useGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    messages: [],
    userInput: "",
    usedPrompts: [],
    showSuccess: false,
    gameCompleted: false,
    isLoading: false,
    completedLevels: [],  
  })

  const [loading, setloading] = useState<Boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [gameState.messages])

  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      messages: [],
      usedPrompts: [],
      userInput: ""
    }))
  }, [gameState.currentLevel])

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }))
  }

  const handleSubmit = async (e: React.FormEvent, currentLevelData: Level) => {
    e.preventDefault()
    if (!gameState.userInput.trim() || gameState.isLoading) return

    const trimmedInput = gameState.userInput.trim()
    const lowerInput = trimmedInput.toLowerCase()

    if (gameState.usedPrompts.includes(lowerInput)) {
      alert("❌ You cannot repeat the same question. Try a different approach!")
      return
    }

    // Check if user directly answered correctly
    const isCorrectAnswer = currentLevelData.detectAnswers.some((answer) =>
      lowerInput.includes(answer.toLowerCase())
    )

    // Update state with user message
    updateGameState({
      isLoading: true,
      usedPrompts: [...gameState.usedPrompts, lowerInput],
      messages: [...gameState.messages, { role: "user", content: trimmedInput }],
      userInput: "",
    })

    // Delay for loading effect
    setTimeout(async () => {
      const aiResponse = await getGeminiResponse(trimmedInput, currentLevelData)
      const newMessages = [
        ...gameState.messages,
        { role: "user" as const, content: trimmedInput },
        { role: "assistant" as const, content: aiResponse },
      ]

      // Also check if AI gave away answer (fallback)
      const responseText = aiResponse.toLowerCase()
      const isAnswerInResponse = currentLevelData.detectAnswers.some((answer) =>
        responseText.includes(answer.toLowerCase())
      )

      const correct = isCorrectAnswer || isAnswerInResponse

      updateGameState({
        messages: newMessages,
        isLoading: false,
      })

      if (correct) {
        setTimeout(() => {
          updateGameState({
            showSuccess: true,
            completedLevels: [...gameState.completedLevels, gameState.currentLevel],
          })
        }, 1000)
      }
    }, 1500)
  }

  const submitToGoogleSheets = async (delegateInfo: DelegateInfo, level?: number, completionTime?: Date) => {
    try {
      const response = await fetch('/api/google-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: delegateInfo.firstName,
          lastName: delegateInfo.lastName,
          email: delegateInfo.email,
          country: delegateInfo.country,
          level,
          completionTime: completionTime?.toISOString(),
          action: 'update'
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit to Google Sheets')
      }
      
      console.log('Successfully submitted to Google Sheets')
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error)
    }
  }

  const handleNextLevel = async (delegateInfo: DelegateInfo) => {

    // Record completion time for current level
    setloading(true)
    const completionTime = new Date()
    await submitToGoogleSheets(delegateInfo, gameState.currentLevel, completionTime)
    updateGameState({ showSuccess: false })
    if (gameState.currentLevel < 5) {
      updateGameState({ currentLevel: gameState.currentLevel + 1 })
    } else {
      updateGameState({ gameCompleted: true })
    }
  }

  const resetGame = () => {
    setGameState({
      currentLevel: 1,
      messages: [],
      userInput: "",
      usedPrompts: [],
      showSuccess: false,
      gameCompleted: false,
      isLoading: false,
      completedLevels: []
    })
  }

  return {
    gameState,
    updateGameState,
    handleSubmit,
    handleNextLevel,
    resetGame,
    messagesEndRef,
    submitToGoogleSheets,
    loading,
    setloading
  }
}