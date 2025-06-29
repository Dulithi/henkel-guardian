"use client"

import { Button } from "@/components/ui/button"
import { Trophy, X } from "lucide-react"
import { useEffect } from "react"

interface GameCompletedModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onReset: () => void
}

export function GameCompletedModal({ open, onOpenChange, onReset }: GameCompletedModalProps) {
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
        <div className="bg-slate-800 border border-slate-600 text-white max-w-sm sm:max-w-md w-full rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-600">
            <div className="flex items-center gap-2 text-[#E1000F] text-lg sm:text-xl font-semibold">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#FBA700]" />
              Vault Unlocked!
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
            <div className="text-4xl sm:text-6xl mb-4">🏆</div>
            <p className="text-slate-200 mb-4 font-medium text-sm sm:text-base">
              Congratulations! You&#39;ve mastered all 5 levels and unlocked the complete Henkel legacy.
            </p>
            <div className="bg-gradient-to-r from-[#E1000F] to-[#FBA700] text-white p-3 sm:p-4 rounded-lg mb-4">
              <p className="font-bold text-sm sm:text-base">Master Prompt Engineer</p>
              <p className="text-xs sm:text-sm opacity-90">
                You&#39;ve proven your skills in extracting guarded information!
              </p>
            </div>
            <Button
              onClick={onReset}
              className="bg-[#FBA700] hover:bg-[#FBA700]/80 text-slate-900 w-full font-medium text-sm sm:text-base"
            >
              Play Again
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
