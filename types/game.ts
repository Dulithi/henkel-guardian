import { DelegateInfo } from "./delegate"

export interface Level {
  id: number
  topic: string
  guardedAnswer: string
  systemPrompt: string
  quote: string
  detectAnswers: string[]
  icon: React.ReactNode
  description: string
  delegateInfo?: DelegateInfo
}

export interface Message {
  role: "user" | "assistant"
  content: string
}

export interface GameState {
  currentLevel: number
  messages: Message[]
  userInput: string
  usedPrompts: string[]
  showSuccess: boolean
  gameCompleted: boolean
  isLoading: boolean
  completedLevels: number[]
}
