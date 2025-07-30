import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, Play, Trophy, Star, Target } from "lucide-react";

interface Sport {
  id: string;
  name: string;
  icon: string;
  description: string;
  drillCount: number;
  difficulty: string;
}

interface TrainingDashboardProps {
  sport: Sport;
  ageGroup: string;
  onBack: () => void;
}

// Sample drills data
const drillsData = {
  soccer: [
    { id: 1, name: "Cone Dribbling", duration: "5 min", completed: true, points: 50 },
    { id: 2, name: "Passing Practice", duration: "8 min", completed: true, points: 75 },
    { id: 3, name: "Shooting Goals", duration: "10 min", completed: false, points: 100 },
    { id: 4, name: "Defensive Moves", duration: "7 min", completed: false, points: 80 }
  ],
  basketball: [
    { id: 1, name: "Ball Handling", duration: "6 min", completed: true, points: 60 },
    { id: 2, name: "Free Throws", duration: "8 min", completed: true, points: 70 },
    { id: 3, name: "Layup Practice", duration: "10 min", completed: false, points: 90 },
    { id: 4, name: "Defense Drills", duration: "7 min", completed: false, points: 85 }
  ],
  football: [
    { id: 1, name: "Passing Accuracy", duration: "8 min", completed: true, points: 80 },
    { id: 2, name: "Catching Practice", duration: "6 min", completed: false, points: 70 },
    { id: 3, name: "Running Routes", duration: "12 min", completed: false, points: 100 },
    { id: 4, name: "Blocking Drills", duration: "10 min", completed: false, points: 90 }
  ]
};

export function TrainingDashboard({ sport, ageGroup, onBack }: TrainingDashboardProps) {
  const { toast } = useToast();
  const [userPoints, setUserPoints] = useState(185);
  const [userLevel, setUserLevel] = useState(3);
  
  const drills = drillsData[sport.id as keyof typeof drillsData] || drillsData.soccer;
  const completedDrills = drills.filter(drill => drill.completed).length;
  const progress = (completedDrills / drills.length) * 100;

  const handleDrillComplete = (drill: any) => {
    toast({
      title: "Drill Completed! 🎉",
      description: `Great job! You earned ${drill.points} points!`
    });
    setUserPoints(prev => prev + drill.points);
  };

  const handleHighlightUpload = () => {
    toast({
      title: "Upload Your Highlight! 📹",
      description: "Show off your amazing skills to the world!"
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack}>← Back to Sports</Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <span className="text-4xl">{sport.icon}</span>
            {sport.name} Training
          </h1>
          <p className="text-muted-foreground">Ages {ageGroup}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-lg font-semibold text-primary">
            <Star className="w-5 h-5" />
            {userPoints} points
          </div>
          <Badge variant="outline">Level {userLevel}</Badge>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="mb-6 bg-gradient-hero text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Training Progress</h3>
              <p className="opacity-90">{completedDrills} of {drills.length} drills completed</p>
            </div>
            <Trophy className="w-12 h-12 opacity-80" />
          </div>
          <Progress value={progress} className="h-3 bg-white/20" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training Drills */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Training Drills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {drills.map((drill) => (
                <div key={drill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${drill.completed ? 'bg-success' : 'bg-muted-foreground'}`} />
                    <div>
                      <h4 className="font-semibold">{drill.name}</h4>
                      <p className="text-sm text-muted-foreground">{drill.duration} • {drill.points} points</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {drill.completed ? (
                      <Badge variant="outline" className="bg-success text-success-foreground">
                        ✓ Complete
                      </Badge>
                    ) : (
                      <Button 
                        variant="playful" 
                        size="sm"
                        onClick={() => handleDrillComplete(drill)}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Highlight Upload & Stats */}
        <div className="space-y-6">
          {/* Upload Highlight */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Share Your Skills!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl">📹</div>
              <p className="text-muted-foreground">Upload a highlight of your best moves!</p>
              <Button 
                variant="hero" 
                className="w-full"
                onClick={handleHighlightUpload}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Highlight
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                <div className="text-2xl">🏆</div>
                <div>
                  <p className="font-semibold">First Drill Complete!</p>
                  <p className="text-sm text-muted-foreground">Started your training journey</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                <div className="text-2xl">⭐</div>
                <div>
                  <p className="font-semibold">100 Points Earned</p>
                  <p className="text-sm text-muted-foreground">Keep up the great work!</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg opacity-50">
                <div className="text-2xl">🎯</div>
                <div>
                  <p className="font-semibold">Drill Master</p>
                  <p className="text-sm text-muted-foreground">Complete 10 drills</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}