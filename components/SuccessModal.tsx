"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEffect } from "react"
import type { Level } from "../types/game"
import { DelegateInfo } from "@/types/delegate"

interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentLevelData: Level
  currentLevel: number
  onNextLevel: (delegateInfo: DelegateInfo) => Promise<void>
}

export function SuccessModal({ open, onOpenChange, currentLevelData, currentLevel, onNextLevel }: SuccessModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => onOpenChange(false)} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-henkel-dark-grey border border-slate-600 text-white max-w-sm sm:max-w-md w-full rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-600">
            <div className="flex justify-center items-center text-green-600 text-lg sm:text-xl font-bold">
              Success!
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="text-center py-6 px-4">
            <div className="text-4xl sm:text-6xl mb-4 animate-bounce">🎉</div>
            <p className="text-slate-200 mb-4 font-medium text-sm sm:text-base">
              You successfully extracted: <strong className="text-[#E1000F]">{currentLevelData.guardedAnswer}</strong>
            </p>
            <blockquote className="bg-slate-700/50 p-3 sm:p-4 rounded-lg text-slate-200 italic mb-4 border-l-4 border-[#E1000F] text-xs sm:text-sm">
              &quot;{currentLevelData.quote}&quot;
            </blockquote>
            <Button
              onClick={() => {
                // console.log(currentLevelData.delegateInfo)
                if (currentLevelData.delegateInfo) {
                  onNextLevel(currentLevelData.delegateInfo)
                } else {
                  // Optionally handle the error case here
                  console.error("DelegateInfo is undefined")
                }
              }}
              className="bg-henkel-red hover:bg-henkel-red/80 text-white w-1/3 font-medium text-sm sm:text-base rounded-4xl cursor-pointer" 
            >
              {currentLevel < 5 ? "NEXT LEVEL" : "COMPLETE GAME"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
