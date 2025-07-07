import { Badge } from "@/components/ui/badge"
import type { GameState } from "../types/game"
import ShinyText from "./ShinyText"

interface LevelInfoProps {
  gameState: GameState
}

export function LevelInfo({ gameState }: LevelInfoProps) {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <ShinyText text={`Level ${gameState.currentLevel}`} disabled={false} speed={3} className='text-2xl sm:text-3xl font-bold text-henkel-yellow mb-2' />

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