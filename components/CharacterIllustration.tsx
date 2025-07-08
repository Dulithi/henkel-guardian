import { Sparkles, Lock, Wand, Star, Zap } from "lucide-react"
import type { Level } from "../types/game"
import Image from "next/image"

interface CharacterIllustrationProps {
  currentLevelData: Level
}

export function CharacterIllustration({ currentLevelData }: CharacterIllustrationProps) {
  return (
    <div className="relative mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4 w-full overflow-hidden bg-henkel-white rounded-2xl">
      {/* Main character container with elegant backdrop */}
      <div className="relative flex flex-col items-center text-center px-3 sm:px-6 md:px-10 w-full max-w-md mx-auto">
        
        {/* Magical glow effect behind character - adjusted for mobile */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/15 via-purple-500/8 to-blue-500/15 rounded-full blur-2xl sm:blur-3xl scale-125 sm:scale-150 opacity-50 sm:opacity-60 animate-pulse"></div>
        
        {/* Character image with enhanced styling */}
        <div className="relative mb-4 sm:mb-6 group pt-8">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-purple-400/20 sm:from-amber-300/30 sm:to-purple-400/30 rounded-full blur-lg sm:blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-henkel-red from-slate-800/90 to-slate-900/90 rounded-full p-2 sm:p-3 md:p-4 border border-slate-600/40 sm:border-2 sm:border-amber-400/50 backdrop-blur-sm shadow-xl sm:shadow-2xl">
            <Image
              src="/henkel_pritt.png"
              alt="Glue"
              width={80}
              height={80}
              priority
              className="relative z-10 drop-shadow-lg rounded-full object-cover sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]"
            />
          </div>
        </div>

        {/* Enhanced info card - mobile optimized */}
        <div className="relative w-full max-w-xs sm:max-w-sm mx-auto pb-6 ">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-purple-500/15 to-blue-500/15 sm:from-amber-400/20 sm:via-purple-500/20 sm:to-blue-500/20 rounded-lg sm:rounded-xl blur-md sm:blur-lg"></div>
          
          {/* Main card */}
          <div className="relative bg-henkel-red backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-6 border border-slate-600/30 shadow-xl sm:shadow-2xl ">
            {/* Decorative top border */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
              <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-purple-400 rounded-full"></div>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-white font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent leading-tight ">
                {currentLevelData.topic}
              </h3>
            </div>
            
            {/* Subtle inner glow */}
            <div className="absolute inset-1 bg-gradient-to-br from-amber-400/5 to-purple-400/5 rounded-md sm:rounded-lg pointer-events-none"></div>
          </div>
        </div>
      </div>
      

      {/* Enhanced floating elements with better mobile positioning */}
      <div className="absolute top-2 sm:top-4 md:top-6 right-1 sm:right-2 md:right-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-sm sm:blur-md animate-pulse" style={{ backgroundColor: "#FBA70066" }}></div>
          <Sparkles className="relative w-3 h-3 sm:w-5 sm:h-5 md:w-7 md:h-7 drop-shadow-lg animate-pulse" style={{ color: "#FBA700" }} />
        </div>
      </div>

      <div className="absolute top-4 sm:top-8 md:top-12 left-1 sm:left-2 md:left-4">
        <div className="relative animate-float">
          <div className="absolute inset-0 rounded-full blur-sm sm:blur-md" style={{ backgroundColor: "#87196466" }}></div>
          <Wand className="relative w-3 h-3 sm:w-5 sm:h-5 md:w-7 md:h-7 drop-shadow-lg" style={{ color: "#871964" }} />
        </div>
      </div>

      <div className="absolute top-1 sm:top-2 md:top-4 left-1/2 transform -translate-x-1/2">
        <div className="relative animate-bounce">
          <div className="absolute inset-0 rounded-full blur-sm sm:blur-md" style={{ backgroundColor: "#005FBE66" }}></div>
          <Star className="relative w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-6 md:h-6 drop-shadow-lg" style={{ color: "#005FBE" }} />
        </div>
      </div>

      <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 right-1 sm:right-3 md:right-6">
        <div className="relative animate-pulse">
          <div className="absolute inset-0 rounded-full blur-sm sm:blur-md" style={{ backgroundColor: "#E8E20090" }}></div>
          <Zap className="relative w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-6 md:h-6 drop-shadow-lg" style={{ color: "#E8E200" }} />
        </div>
      </div>

      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1 sm:left-2 md:left-4">
        <div className="relative animate-bounce">
          <div className="absolute inset-0 rounded-full blur-sm sm:blur-md animate-pulse" style={{ backgroundColor: "#69008C66" }}></div>
          <Lock className="relative w-3 h-3 sm:w-5 sm:h-5 md:w-7 md:h-7 drop-shadow-lg" style={{ color: "#69008C" }} />
        </div>
      </div>

      {/* Updated Magical Particles */}
      <div className="absolute top-1/4 right-1/4 w-1 h-1 sm:w-2 sm:h-2 rounded-full animate-ping opacity-40 sm:opacity-60" style={{ backgroundColor: "#E8E200" }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full animate-ping opacity-30 sm:opacity-40 animation-delay-1000" style={{ backgroundColor: "#005FBE" }}></div>
      <div className="absolute top-1/3 left-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-ping opacity-40 sm:opacity-50 animation-delay-2000" style={{ backgroundColor: "#FBA700" }}></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}