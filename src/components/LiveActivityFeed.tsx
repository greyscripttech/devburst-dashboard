
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Activity {
  id: string;
  icon: string;
  description: string;
  timestamp: string;
  isNew?: boolean;
  category?: "deployment" | "team" | "project" | "security";
}

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "act1",
      icon: "🚀",
      description: "New deployment to Production",
      timestamp: "2 mins ago",
      category: "deployment"
    },
    {
      id: "act2",
      icon: "👥",
      description: "Team member Sarah joined the API project",
      timestamp: "5 mins ago",
      category: "team"
    },
    {
      id: "act3",
      icon: "🧪",
      description: "Test suite passed with 98% coverage",
      timestamp: "10 mins ago",
      category: "project"
    },
    {
      id: "act4",
      icon: "🔧",
      description: "Updated environment config for Staging",
      timestamp: "20 mins ago",
      category: "deployment"
    },
    {
      id: "act5",
      icon: "✅",
      description: "Web Dashboard progress saved",
      timestamp: "25 mins ago",
      category: "project"
    }
  ]);

  // Simulate a new activity coming in every 45 seconds
  useEffect(() => {
    const newActivities = [
      {
        id: "new1",
        icon: "📊",
        description: "Analytics dashboard viewed by admin",
        timestamp: "just now",
        category: "project"
      },
      {
        id: "new2",
        icon: "🔄",
        description: "Database backup completed successfully",
        timestamp: "just now",
        category: "security"
      },
      {
        id: "new3",
        icon: "🔒",
        description: "Security scan completed with no issues",
        timestamp: "just now",
        category: "security"
      }
    ];

    const interval = setInterval(() => {
      const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
      const newActivity = {
        ...randomActivity,
        id: `act${Date.now()}`,
        isNew: true
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      
      // Remove the "new" flag after animation completes
      setTimeout(() => {
        setActivities(prev => 
          prev.map(act => 
            act.id === newActivity.id ? { ...act, isNew: false } : act
          )
        );
      }, 1000);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const getCategoryBadge = (category?: string) => {
    switch(category) {
      case "deployment":
        return <Badge variant="info" className="text-xs">Deployment</Badge>;
      case "team":
        return <Badge variant="secondary" className="text-xs">Team</Badge>;
      case "project":
        return <Badge variant="success" className="text-xs">Project</Badge>;
      case "security":
        return <Badge variant="warning" className="text-xs">Security</Badge>;
      default:
        return null;
    }
  };

  return (
    <ScrollArea className="h-[320px] pr-4">
      <div className="space-y-3">
        <div className="text-xs text-muted-foreground mb-2">Today — April 30, 2025</div>
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className={`flex items-center justify-between p-3 rounded-lg border border-border/40 bg-card/60 hover:bg-accent/10 transition-all duration-200 ${
              activity.isNew ? 'animate-fade-in' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-xl">{activity.icon}</div>
              <div>
                <div className="text-sm">{activity.description}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                  {getCategoryBadge(activity.category)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default LiveActivityFeed;
