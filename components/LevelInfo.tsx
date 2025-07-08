import { Badge } from "@/components/ui/badge"
import type { GameState } from "../types/game"

interface LevelInfoProps {
  gameState: GameState
}

export function LevelInfo({ gameState }: LevelInfoProps) {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Level {gameState.currentLevel}
      </h2>
      <p className="text-white mb-4 text-sm sm:text-base px-2 ">
        Your goal is to make the Henkel Guard reveal the <strong>secret answer</strong> for each level. However, the Guard will upgrade
        the defenses after each successful extraction!
      </p>
      
      <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
        <span className="text-slate-400 text-xs sm:text-sm">Levels passed</span>
        <Badge className="bg-slate-700 text-white text-xs sm:text-sm">{gameState.completedLevels.length}/5</Badge>
      </div>
    </div>
  )
}