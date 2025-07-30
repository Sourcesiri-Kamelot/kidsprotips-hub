import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AgeSelectorProps {
  onAgeSelect: (ageGroup: string) => void;
}

const ageGroups = [
  {
    range: "4-6",
    title: "Little Stars",
    description: "Fun basics & movement",
    emoji: "⭐",
    color: "bg-gradient-to-br from-yellow-400 to-orange-400"
  },
  {
    range: "7-10", 
    title: "Young Athletes",
    description: "Skills & teamwork",
    emoji: "🏃",
    color: "bg-gradient-to-br from-green-400 to-blue-400"
  },
  {
    range: "11-14",
    title: "Rising Stars", 
    description: "Strategy & competition",
    emoji: "🌟",
    color: "bg-gradient-to-br from-purple-400 to-pink-400"
  },
  {
    range: "15-17",
    title: "Future Pros",
    description: "Advanced training",
    emoji: "🏆",
    color: "bg-gradient-to-br from-blue-500 to-purple-600"
  }
];

export function AgeSelector({ onAgeSelect }: AgeSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Age Group</h2>
        <p className="text-muted-foreground">Let's find the perfect training for you!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ageGroups.map((group) => (
          <Card key={group.range} className="group cursor-pointer hover:scale-105 transition-all duration-300 border-2 hover:border-primary overflow-hidden">
            <CardContent className="p-0">
              <div className={`${group.color} p-6 text-center text-white`}>
                <div className="text-4xl mb-2">{group.emoji}</div>
                <h3 className="text-xl font-bold mb-1">Ages {group.range}</h3>
                <p className="text-lg font-semibold mb-2">{group.title}</p>
                <p className="text-sm opacity-90">{group.description}</p>
              </div>
              <div className="p-4">
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => onAgeSelect(group.range)}
                >
                  Start Training!
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}