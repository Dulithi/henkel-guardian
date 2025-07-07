"use client"

import { GameCompletedModal } from "@/components/GameCompleteModal";
import { GameContent } from "@/components/GameContent";
import { Header } from "@/components/Header";
import { SuccessModal } from "@/components/SuccessModal";
import { levels } from "@/data/levels";
import { useGame } from "@/hooks/useGame";
import { DelegateInfo } from "@/types/delegate";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { gameState, updateGameState, handleSubmit, handleNextLevel, messagesEndRef, submitToGoogleSheets } = useGame()
  const [delegateInfo, setDelegateInfo] = useState<DelegateInfo>({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    country: '' 
  })
  const [showDelegateForm, setShowDelegateForm] = useState(true)
  const [levelStartTimes, setLevelStartTimes] = useState<Record<number, Date>>({})

  const currentLevelData = levels.find((level) => level.id === gameState.currentLevel)!

  // Check if delegate info is already stored
  useEffect(() => {
    const storedInfo = localStorage.getItem('delegateInfo')
    if (storedInfo) {
      setDelegateInfo(JSON.parse(storedInfo))
      setShowDelegateForm(false)
      currentLevelData.delegateInfo = delegateInfo
    }
  }, [])

  // Track when levels start
  useEffect(() => {
    if (!showDelegateForm && !levelStartTimes[gameState.currentLevel]) {
      setLevelStartTimes(prev => ({
        ...prev,
        [gameState.currentLevel]: new Date()
      }))
    }
  }, [gameState.currentLevel, showDelegateForm, levelStartTimes])

  const handleDelegateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (delegateInfo.firstName && delegateInfo.lastName && delegateInfo.email && delegateInfo.country) {
      currentLevelData.delegateInfo = delegateInfo
      localStorage.setItem('delegateInfo', JSON.stringify(delegateInfo))
      
      // Create the initial row in Google Sheets
      await submitToGoogleSheets(delegateInfo)
      
      setShowDelegateForm(false)
      // Set start time for first level
      setLevelStartTimes({ 1: new Date() })
    }
  }

  const handleInputChange = (value: string) => {
    updateGameState({ userInput: value });
  }

  const handleGameNextLevel = async () => {
    await handleNextLevel(delegateInfo)
  }

  // Show delegate information form first
  if (showDelegateForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <Header />
        <div className="flex flex-col min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8 bg-henkel-red">
          <div className="max-w-md w-full">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-henkel-red">
                  Welcome to the <span className="text-[#E1000F]">HENKEL</span>{" "}
                  <span className="text-[#BDCDDA] font-semibold">GUARDIAN</span>
                </CardTitle>
                <CardDescription className="text-center">
                  Please provide your information to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDelegateSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={delegateInfo.firstName}
                      onChange={(e) => setDelegateInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Enter your first name"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={delegateInfo.lastName}
                      onChange={(e) => setDelegateInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Enter your last name"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={delegateInfo.email}
                      onChange={(e) => setDelegateInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email address"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium">
                      Country
                    </Label>
                    <Input
                      id="country"
                      type="text"
                      value={delegateInfo.country}
                      onChange={(e) => setDelegateInfo(prev => ({ ...prev, country: e.target.value }))}
                      placeholder="Enter your country"
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-henkel-yellow text-black hover:bg-amber-300 transition"
                    disabled={!delegateInfo.firstName || !delegateInfo.lastName || !delegateInfo.email || !delegateInfo.country}
                  >
                    Start Game
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
       <Header />
       <div className="flex-1 flex flex-col min-w-0">
        <GameContent
            gameState={gameState}
            currentLevelData={currentLevelData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onNextLevel={handleGameNextLevel}
            messagesEndRef={messagesEndRef}
            delegateInfo={delegateInfo}
          />
       </div>
       
       {/* Modals */}
      <SuccessModal
        open={gameState.showSuccess}
        onOpenChange={(open) => updateGameState({ showSuccess: open })}
        currentLevelData={currentLevelData}
        currentLevel={gameState.currentLevel}
        onNextLevel={handleGameNextLevel}
      />

      <GameCompletedModal
        open={gameState.gameCompleted}
        onOpenChange={(open) => updateGameState({ gameCompleted: open })}
      />
    </div>
  );
}