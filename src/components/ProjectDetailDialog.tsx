
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Timeline, { TimelineEvent } from "./Timeline";

export interface ProjectDetailProps {
  project: {
    name: string;
    description: string;
    status: "active" | "completed" | "paused";
    progress: number;
    team: string[];
    timeline?: TimelineEvent[];
    notes?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailDialog = ({ project, isOpen, onClose }: ProjectDetailProps) => {
  const statusColors = {
    active: "bg-green-500",
    completed: "bg-brand-blue",
    paused: "bg-amber-500",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">{project.name}</DialogTitle>
            <Badge variant="secondary" className="capitalize">
              <span className={`mr-1.5 inline-block w-2 h-2 rounded-full ${statusColors[project.status]}`}></span>
              {project.status}
            </Badge>
          </div>
          <DialogDescription className="text-muted-foreground">{project.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Progress</h3>
            <div className="flex justify-between text-sm mb-1.5">
              <span>Current Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2 mb-4" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Team Members</h3>
            <div className="flex flex-wrap gap-3">
              {project.team.map((member, i) => (
                <div key={i} className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-brand-purple text-white">{member.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{member}</span>
                </div>
              ))}
            </div>
          </div>

          {project.notes && (
            <div>
              <h3 className="text-lg font-medium mb-2">Notes</h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm whitespace-pre-line">{project.notes}</p>
              </div>
            </div>
          )}

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Timeline</h3>
            <Timeline events={project.timeline || []} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailDialog;
