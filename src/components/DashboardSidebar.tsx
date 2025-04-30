
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Settings, 
  Code, 
  Rocket, 
  BarChart, 
  Users,
  FileText,
  Globe,
  HelpCircle,
  Bell,
  Heart,
  Activity,
  Star,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#" },
  { name: "Projects", icon: Code, href: "#" },
  { name: "Deployments", icon: Rocket, href: "#" },
  { name: "Analytics", icon: BarChart, href: "#" },
  { name: "Team", icon: Users, href: "#" },
  { name: "Settings", icon: Settings, href: "#", divider: true },
];

const quickLinks = [
  { name: "Changelog", icon: FileText, href: "#" },
  { name: "Help", icon: HelpCircle, href: "#" },
  { name: "Website", icon: Globe, href: "#" },
];

const systemHealth = [
  { name: "API", status: "healthy", value: 100 },
  { name: "Database", status: "healthy", value: 98 },
  { name: "Storage", status: "warning", value: 72 },
  { name: "CDN", status: "healthy", value: 99 },
];

const recentProjects = [
  { name: "Mobile App", updated: "1h ago" },
  { name: "API Gateway", updated: "3h ago" },
  { name: "Web Dashboard", updated: "Yesterday" },
];

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const currentDate = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  
  const currentYear = 2025;
  const formattedDate = `April 30, ${currentYear}`;

  return (
    <div
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="font-semibold text-lg text-foreground dark:text-white">DevBurst</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pt-5">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.divider && (
                <div className="h-px bg-border my-2 mx-3"></div>
              )}
              <a
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-all",
                  item.name === "Dashboard" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("flex-shrink-0 w-5 h-5 mr-3", collapsed ? "mx-auto" : "")} />
                {!collapsed && <span>{item.name}</span>}
              </a>
            </div>
          ))}
        </nav>

        {/* System Health - New Section */}
        {!collapsed && (
          <div className="mt-6 px-4">
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">SYSTEM HEALTH</h4>
            <div className="space-y-2">
              {systemHealth.map((service) => (
                <div key={service.name} className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    service.status === "healthy" ? "bg-green-500" : "bg-amber-500"
                  )}></div>
                  <span className="text-xs">{service.name}</span>
                  <Progress value={service.value} className="h-1 flex-1" />
                  <span className="text-xs font-medium">{service.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Projects - New Section */}
        {!collapsed && (
          <div className="mt-6 px-4">
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">RECENT PROJECTS</h4>
            <div className="space-y-1">
              {recentProjects.map((project, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="flex items-center justify-between py-1 px-2 text-xs rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                  <span>{project.name}</span>
                  <span className="text-muted-foreground text-[10px]">{project.updated}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Activity Indicators - New Section */}
        {!collapsed && (
          <div className="mt-6 px-4">
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">ACTIVITY</h4>
            <div className="flex justify-between">
              <div className="flex items-center gap-1 text-xs">
                <Bell className="h-3 w-3" />
                <span>8</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Heart className="h-3 w-3" />
                <span>24</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Activity className="h-3 w-3" />
                <span>95%</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3 w-3" />
                <span>12</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Updated version info and quick links section */}
      <div className="mt-auto p-4 pt-0">
        <Separator className="mb-4" />
        
        {!collapsed ? (
          <>
            <div className="text-xs text-muted-foreground mb-3">
              <div>v1.0.0</div>
              <div>Last updated {currentDate}</div>
              <div>{formattedDate}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {quickLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="flex flex-col items-center p-2 rounded hover:bg-accent transition-colors text-muted-foreground hover:text-accent-foreground"
                >
                  <link.icon className="h-4 w-4 mb-1" />
                  <span className="text-xs">{link.name}</span>
                </a>
              ))}
            </div>
          </>
        ) : (
          <TooltipProvider>
            <div className="flex flex-col items-center gap-3">
              {quickLinks.map((link) => (
                <Tooltip key={link.name}>
                  <TooltipTrigger asChild>
                    <a 
                      href={link.href}
                      className="flex items-center justify-center p-1.5 rounded hover:bg-accent transition-colors text-muted-foreground hover:text-accent-foreground"
                    >
                      <link.icon className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{link.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              <div className="text-[10px] text-muted-foreground opacity-60 mt-1">
                v1.0.0
              </div>
            </div>
          </TooltipProvider>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-white">
            G
          </div>
          {!collapsed && (
            <div className="ml-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground dark:text-white">GreyScript</p>
                <Badge variant="outline" className="text-[10px] py-0 h-4">Admin</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Last active: Today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
