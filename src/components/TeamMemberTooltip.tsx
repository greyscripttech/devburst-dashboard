
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TeamMemberTooltipProps {
  name: string;
  role?: string;
  children: React.ReactNode;
}

const TeamMemberTooltip = ({ name, role = "Team Member", children }: TeamMemberTooltipProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-60">
        <div className="flex justify-between space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-brand-purple text-white">{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TeamMemberTooltip;
