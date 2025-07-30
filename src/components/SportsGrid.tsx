import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Sport {
  id: string;
  name: string;
  icon: string;
  description: string;
  drillCount: number;
  difficulty: string;
}

interface SportsGridProps {
  ageGroup: string;
  onSportSelect: (sport: Sport) => void;
}

const sportsData: Record<string, Sport[]> = {
  "4-6": [
    { id: "soccer", name: "Soccer", icon: "⚽", description: "Kick, run, and have fun!", drillCount: 12, difficulty: "Easy" },
    { id: "basketball", name: "Basketball", icon: "🏀", description: "Dribble and shoot!", drillCount: 10, difficulty: "Easy" },
    { id: "tennis", name: "Tennis", icon: "🎾", description: "Hit the ball!", drillCount: 8, difficulty: "Easy" },
    { id: "running", name: "Running", icon: "🏃", description: "Run fast and strong!", drillCount: 15, difficulty: "Easy" }
  ],
  "7-10": [
    { id: "soccer", name: "Soccer", icon: "⚽", description: "Learn positions and teamwork", drillCount: 20, difficulty: "Medium" },
    { id: "basketball", name: "Basketball", icon: "🏀", description: "Master dribbling and passing", drillCount: 18, difficulty: "Medium" },
    { id: "football", name: "Football", icon: "🏈", description: "Throw, catch, and tackle", drillCount: 16, difficulty: "Medium" },
    { id: "tennis", name: "Tennis", icon: "🎾", description: "Improve your swing", drillCount: 14, difficulty: "Medium" },
    { id: "baseball", name: "Baseball", icon: "⚾", description: "Hit home runs!", drillCount: 12, difficulty: "Medium" },
    { id: "swimming", name: "Swimming", icon: "🏊", description: "Swim like a fish!", drillCount: 10, difficulty: "Medium" }
  ],
  "11-14": [
    { id: "soccer", name: "Soccer", icon: "⚽", description: "Advanced tactics and strategy", drillCount: 25, difficulty: "Hard" },
    { id: "basketball", name: "Basketball", icon: "🏀", description: "Game strategy and skills", drillCount: 22, difficulty: "Hard" },
    { id: "football", name: "Football", icon: "🏈", description: "Position-specific training", drillCount: 20, difficulty: "Hard" },
    { id: "tennis", name: "Tennis", icon: "🎾", description: "Competitive techniques", drillCount: 18, difficulty: "Hard" },
    { id: "baseball", name: "Baseball", icon: "⚾", description: "Advanced batting and fielding", drillCount: 16, difficulty: "Hard" },
    { id: "track", name: "Track & Field", icon: "🏃‍♀️", description: "Speed and endurance", drillCount: 24, difficulty: "Hard" }
  ],
  "15-17": [
    { id: "soccer", name: "Soccer", icon: "⚽", description: "Elite level training", drillCount: 30, difficulty: "Expert" },
    { id: "basketball", name: "Basketball", icon: "🏀", description: "College prep skills", drillCount: 28, difficulty: "Expert" },
    { id: "football", name: "Football", icon: "🏈", description: "Recruitment ready", drillCount: 26, difficulty: "Expert" },
    { id: "tennis", name: "Tennis", icon: "🎾", description: "Tournament preparation", drillCount: 22, difficulty: "Expert" },
    { id: "baseball", name: "Baseball", icon: "⚾", description: "Scholarship level skills", drillCount: 20, difficulty: "Expert" },
    { id: "track", name: "Track & Field", icon: "🏃‍♀️", description: "Olympic style training", drillCount: 32, difficulty: "Expert" }
  ]
};

const difficultyColors = {
  "Easy": "bg-success",
  "Medium": "bg-warning", 
  "Hard": "bg-primary",
  "Expert": "bg-accent"
};

export function SportsGrid({ ageGroup, onSportSelect }: SportsGridProps) {
  const sports = sportsData[ageGroup] || sportsData["7-10"];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Sport</h2>
        <p className="text-muted-foreground">Ages {ageGroup} • Pick your favorite sport to start training!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sports.map((sport) => (
          <Card key={sport.id} className="group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-primary border-2 hover:border-primary">
            <CardHeader className="text-center pb-2">
              <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {sport.icon}
              </div>
              <CardTitle className="text-xl font-bold">{sport.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-muted-foreground">{sport.description}</p>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant="outline">{sport.drillCount} drills</Badge>
                <Badge className={`text-white ${difficultyColors[sport.difficulty as keyof typeof difficultyColors]}`}>
                  {sport.difficulty}
                </Badge>
              </div>
              <Button 
                variant="sports" 
                className="w-full mt-4"
                onClick={() => onSportSelect(sport)}
              >
                Start {sport.name}!
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}