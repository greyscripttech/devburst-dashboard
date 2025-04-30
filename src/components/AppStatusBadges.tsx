
import { Activity, Package, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const AppStatusBadges = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Uptime Badge - Enhanced with animation and better styling */}
      <div className="flex items-center gap-3 bg-card/80 p-4 rounded-xl border border-border shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/20">
        <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 animate-pulse-soft">
          <Activity className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <div className="text-sm font-semibold">System Uptime</div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">99.98%</span>
            <Badge variant="success" className="text-xs">Stable</Badge>
          </div>
          <div className="text-xs text-muted-foreground">Last checked: April 30, 2025</div>
        </div>
      </div>

      {/* Storage Badge - With circular progress indicator */}
      <div className="flex items-center gap-3 bg-card/80 p-4 rounded-xl border border-border shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/20">
        <div className="relative flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
          <Package className="h-6 w-6" />
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              className="stroke-blue-600/20 dark:stroke-blue-400/20 fill-none"
              strokeWidth="4"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              className="stroke-blue-600 dark:stroke-blue-400 fill-none"
              strokeWidth="4"
              strokeDasharray={`${45 * 1.25}, ${100 * 1.25}`}
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-semibold">Storage Usage</div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">45%</span>
            <span className="text-xs text-muted-foreground">of 500GB</span>
          </div>
          <Progress value={45} className="h-1.5 w-full mt-1" />
        </div>
      </div>

      {/* Average Deployment Badge - With improved metrics */}
      <div className="flex items-center gap-3 bg-card/80 p-4 rounded-xl border border-border shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/20">
        <div className="flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400">
          <Clock className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <div className="text-sm font-semibold">Deployment Time</div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">4m 18s</span>
            <Badge variant="warning" className="text-xs">-12% from last week</Badge>
          </div>
          <div className="text-xs text-muted-foreground">Last deployment: April 29, 2025</div>
        </div>
      </div>
    </div>
  );
};

export default AppStatusBadges;
