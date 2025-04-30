
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Users, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "deployment" | "project" | "team" | "milestone";
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  const getIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "deployment":
        return <Rocket className="h-5 w-5 text-brand-blue" />;
      case "team":
        return <Users className="h-5 w-5 text-brand-purple" />;
      case "milestone":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "project":
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  const getEventBadge = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "deployment":
        return <Badge variant="info" className="text-xs">Deployment</Badge>;
      case "team":
        return <Badge variant="secondary" className="text-xs">Team</Badge>;
      case "milestone":
        return <Badge variant="success" className="text-xs">Milestone</Badge>;
      case "project":
        return <Badge variant="warning" className="text-xs">Project</Badge>;
      default:
        return null;
    }
  };

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <Clock className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No milestone events yet</h3>
        <p className="text-muted-foreground">Complete projects and deployments to create a timeline.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="relative">
          {/* Line connecting timeline items */}
          {index < events.length - 1 && (
            <div className="absolute left-6 top-7 h-full w-0.5 -translate-x-1/2 bg-border" />
          )}

          <div className="flex gap-4">
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-background to-muted shadow-md ring-1 ring-border">
              {getIcon(event.type)}
            </div>
            <Card className={cn(
              "w-full transition-all hover:shadow-md bg-card/80 backdrop-blur-sm border-muted/40", 
              index === 0 ? "border-brand-purple" : ""
            )}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium">{event.title}</CardTitle>
                    {getEventBadge(event.type)}
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">{event.date}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription className="text-sm">{event.description}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
