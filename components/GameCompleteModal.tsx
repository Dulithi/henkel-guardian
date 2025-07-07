"use client"

import { Button } from "@/components/ui/button"
import { Trophy, X } from "lucide-react"
import { useEffect } from "react"

interface GameCompletedModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GameCompletedModal({ open, onOpenChange}: GameCompletedModalProps) {
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

  const handleClose = () => {
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-600 text-white max-w-sm sm:max-w-md w-full rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-600">
            <div className="flex items-center gap-2 text-[#E1000F] text-lg sm:text-xl font-semibold">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#FBA700]" />
              Vault Unlocked! Achievement Unlocked!
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="py-6 px-4">
            <div className="text-center">
              <div className="text-4xl sm:text-6xl mb-4">🏆</div>
              <p className="text-slate-200 mb-4 font-medium text-sm sm:text-base">
                Congratulations! You&#39;ve mastered all 5 levels!
              </p>
              <div className="bg-gradient-to-r from-[#E1000F] to-[#FBA700] text-white p-3 sm:p-4 rounded-lg mb-6">
                <p className="font-bold text-sm sm:text-base">Master Prompt Engineer</p>
                <p className="text-xs sm:text-sm opacity-90">
                  You&#39;ve proven your skills in extracting guarded information!
                </p>
              </div>
              <p className="text-slate-300 text-sm mb-6">
                You&#39;ve successfully completed the challenge and demonstrated exceptional prompt engineering abilities. Well done!
              </p>
              
              <Button
                onClick={handleClose}
                className="bg-[#FBA700] hover:bg-[#FBA700]/80 text-slate-900 w-full font-medium text-sm sm:text-base"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}