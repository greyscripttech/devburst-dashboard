
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import TeamMemberTooltip from "./TeamMemberTooltip";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  name: string;
  description: string;
  status: "active" | "completed" | "paused";
  progress: number;
  team: string[];
  onClick?: () => void;
  className?: string;
}

const ProjectCard = ({ name, description, status, progress, team, onClick, className }: ProjectCardProps) => {
  const statusColors = {
    active: "bg-green-500",
    completed: "bg-brand-blue",
    paused: "bg-amber-500",
  };

  return (
    <Card 
      className={cn("h-full transition-all hover:shadow-md", className)} 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <Badge variant="secondary" className="capitalize">
            <span className={`mr-1.5 inline-block w-2 h-2 rounded-full ${statusColors[status]}`}></span>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex -space-x-2">
          {team.slice(0, 3).map((member, i) => (
            <TeamMemberTooltip key={i} name={member}>
              <div 
                className="w-6 h-6 rounded-full bg-brand-purple text-white text-xs flex items-center justify-center border-2 border-white"
              >
                {member.charAt(0)}
              </div>
            </TeamMemberTooltip>
          ))}
          {team.length > 3 && (
            <TeamMemberTooltip name={`+${team.length - 3} more`} role={`${team.length - 3} additional team members`}>
              <div className="w-6 h-6 rounded-full bg-muted text-foreground text-xs flex items-center justify-center border-2 border-white">
                +{team.length - 3}
              </div>
            </TeamMemberTooltip>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
