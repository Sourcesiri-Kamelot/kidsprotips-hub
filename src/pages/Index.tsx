import { useState } from "react";
import { AgeSelector } from "@/components/AgeSelector";
import { SportsGrid } from "@/components/SportsGrid";
import { TrainingDashboard } from "@/components/TrainingDashboard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-sports.jpg";

interface Sport {
  id: string;
  name: string;
  icon: string;
  description: string;
  drillCount: number;
  difficulty: string;
}

type AppState = 'landing' | 'age-select' | 'sport-select' | 'training';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  const handleGetStarted = () => {
    setCurrentState('age-select');
  };

  const handleAgeSelect = (ageGroup: string) => {
    setSelectedAge(ageGroup);
    setCurrentState('sport-select');
  };

  const handleSportSelect = (sport: Sport) => {
    setSelectedSport(sport);
    setCurrentState('training');
  };

  const handleBack = () => {
    if (currentState === 'training') {
      setCurrentState('sport-select');
    } else if (currentState === 'sport-select') {
      setCurrentState('age-select');
    } else {
      setCurrentState('landing');
    }
  };

  if (currentState === 'landing') {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80" />
          </div>
          
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Lil Playbook
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              The Ultimate Sports Training App for Young Athletes
            </p>
            <p className="text-lg md:text-xl mb-8 opacity-80">
              Ages 4-17 • Interactive Drills • Share Your Highlights • Level Up Your Game!
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={handleGetStarted}
                size="xl"
                className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg font-bold"
              >
                🚀 Start Your Journey
              </Button>
              <div className="flex justify-center gap-8 text-sm opacity-80">
                <span>⚽ Soccer</span>
                <span>🏀 Basketball</span>
                <span>🏈 Football</span>
                <span>🎾 Tennis</span>
                <span>⚾ Baseball</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Young Athletes Love Lil Playbook
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Age-Perfect Training</h3>
                <p className="text-muted-foreground">Drills designed specifically for your age group and skill level</p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">📹</div>
                <h3 className="text-xl font-bold mb-2">Share Your Skills</h3>
                <p className="text-muted-foreground">Upload highlights and show the world your amazing progress</p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">Level Up & Earn</h3>
                <p className="text-muted-foreground">Complete drills, earn points, unlock achievements, and become a champion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentState === 'age-select') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AgeSelector onAgeSelect={handleAgeSelect} />
      </div>
    );
  }

  if (currentState === 'sport-select') {
    return (
      <div className="min-h-screen bg-background py-8">
        <SportsGrid ageGroup={selectedAge} onSportSelect={handleSportSelect} />
      </div>
    );
  }

  if (currentState === 'training' && selectedSport) {
    return (
      <div className="min-h-screen bg-background py-8">
        <TrainingDashboard 
          sport={selectedSport} 
          ageGroup={selectedAge} 
          onBack={handleBack}
        />
      </div>
    );
  }

  return null;
};

export default Index;