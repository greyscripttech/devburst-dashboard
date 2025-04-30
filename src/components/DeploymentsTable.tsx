
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Deployment {
  id: string;
  environment: string;
  status: "success" | "failed" | "in-progress";
  commit: string;
  date: string;
  duration?: string;
}

interface DeploymentsTableProps {
  deployments: Deployment[];
}

const DeploymentsTable = ({ deployments }: DeploymentsTableProps) => {
  const statusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">Success</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "in-progress":
        return <Badge variant="secondary" className="animate-pulse-soft">In Progress</Badge>;
      default:
        return null;
    }
  };

  if (deployments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No deployments to display.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Deployment ID</TableHead>
          <TableHead>Environment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Commit</TableHead>
          <TableHead>Date</TableHead>
          {deployments[0]?.duration && <TableHead>Duration</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {deployments.map((deployment) => (
          <TableRow key={deployment.id} className="hover:bg-muted/30">
            <TableCell className="font-mono text-xs">{deployment.id}</TableCell>
            <TableCell>{deployment.environment}</TableCell>
            <TableCell>{statusBadge(deployment.status)}</TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="font-mono text-xs cursor-help">{deployment.commit}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View commit details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>{deployment.date}</TableCell>
            {deployment.duration && <TableCell>{deployment.duration}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeploymentsTable;
