
import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatsCard from "@/components/StatsCard";
import ProjectCard from "@/components/ProjectCard";
import DeploymentsTable from "@/components/DeploymentsTable";
import Celebration from "@/components/Celebration";
import LiveActivityFeed from "@/components/LiveActivityFeed"; 
import AppStatusBadges from "@/components/AppStatusBadges";
import QuoteOfTheDay from "@/components/QuoteOfTheDay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Rocket, Activity, Code, Users, Moon, Sun,
  Download, Filter, RefreshCw 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeploymentFilters } from "@/components/DeploymentFilters";
import Timeline, { TimelineEvent } from "@/components/Timeline";
import ProjectDetailDialog from "@/components/ProjectDetailDialog";
import TeamMemberTooltip from "@/components/TeamMemberTooltip";
import FeedbackButton from "@/components/FeedbackButton";
import { exportToCSV } from "@/utils/exportData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState<"confetti" | "balloons" | "fireworks">("confetti");
  const [darkMode, setDarkMode] = useState(false);
  const [celebrationEnabled, setCelebrationEnabled] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [filteredDeployments, setFilteredDeployments] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());
  const [activeEnvironment, setActiveEnvironment] = useState<"all" | "Production" | "Staging" | "Development">("all");
  const { toast: showToast } = useToast();

  const triggerCelebration = (type?: "confetti" | "balloons" | "fireworks") => {
    if (!celebrationEnabled) {
      showToast({
        title: "Celebration is disabled",
        description: "Enable celebrations in the settings to celebrate milestones!",
      });
      return;
    }
    
    const celebrationType = type || ["confetti", "balloons", "fireworks"][Math.floor(Math.random() * 3)] as "confetti" | "balloons" | "fireworks";
    setCelebrationType(celebrationType);
    setShowCelebration(true);
    
    showToast({
      title: "Congratulations!",
      description: "You've completed a major milestone!",
    });
    
    toast("🎉 Milestone celebrated! Keep up the momentum!", {
      description: "Your team is making great progress!",
    });
    
    setTimeout(() => {
      setShowCelebration(false);
    }, 5000);
  };

  // Sample project data with extended properties for the dialog
  const projects = [
    {
      name: "Mobile App",
      description: "A cross-platform mobile application with React Native",
      status: "active" as const,
      progress: 68,
      team: ["Alice", "Bob", "Charlie", "Dave"],
      notes: "This project needs to be ready for beta testing by next month. The team is focusing on the UI components and state management.",
      timeline: [
        {
          id: "t1",
          title: "Project Started",
          description: "Initial project setup and requirements gathering",
          date: "2025-03-15",
          type: "project" as const
        },
        {
          id: "t2",
          title: "UI Design Completed",
          description: "All screens and user flows designed",
          date: "2025-03-28",
          type: "milestone" as const
        },
        {
          id: "t3",
          title: "Backend Integration Started",
          description: "Connecting app to REST APIs",
          date: "2025-04-10",
          type: "milestone" as const
        }
      ]
    },
    {
      name: "API Gateway",
      description: "RESTful API gateway for microservices architecture",
      status: "completed" as const,
      progress: 100,
      team: ["Eve", "Frank"],
      notes: "Successfully implemented with all planned features. Documentation has been updated. Next phase will focus on performance optimization.",
      timeline: [
        {
          id: "t4",
          title: "Project Started",
          description: "Architecture design and planning",
          date: "2025-02-10",
          type: "project" as const
        },
        {
          id: "t5",
          title: "Core Functionality Complete",
          description: "Basic routing and authentication implemented",
          date: "2025-03-05",
          type: "milestone" as const
        },
        {
          id: "t6",
          title: "Project Completed",
          description: "All features implemented and tested",
          date: "2025-04-20",
          type: "milestone" as const
        }
      ]
    },
    {
      name: "Web Dashboard",
      description: "Admin dashboard for data visualization",
      status: "paused" as const,
      progress: 35,
      team: ["Grace", "Helen", "Ivan"],
      notes: "Project temporarily paused due to shifting priorities. Expected to resume next quarter.",
      timeline: [
        {
          id: "t7",
          title: "Project Started",
          description: "Initial setup and component library selection",
          date: "2025-03-01",
          type: "project" as const
        },
        {
          id: "t8",
          title: "Design System Created",
          description: "Component library and design tokens established",
          date: "2025-03-20",
          type: "milestone" as const
        },
        {
          id: "t9",
          title: "Project Paused",
          description: "Development temporarily halted",
          date: "2025-04-15",
          type: "milestone" as const
        }
      ]
    },
  ];

  // Sample deployment data with updated 2025 dates
  const deployments = [
    {
      id: "d8f2e1c3b4a5",
      environment: "Production",
      status: "success" as const,
      commit: "a1b2c3d",
      date: "2025-04-28 14:30",
      duration: "3m 42s",
    },
    {
      id: "c7e6d5b4a3f2",
      environment: "Staging",
      status: "in-progress" as const,
      commit: "b2c3d4e",
      date: "2025-04-28 14:15",
      duration: "5m 18s",
    },
    {
      id: "b6a5f4e3d2c1",
      environment: "Development",
      status: "failed" as const,
      commit: "c3d4e5f",
      date: "2025-04-28 13:45",
      duration: "2m 31s",
    },
    {
      id: "a5b4c3d2e1f0",
      environment: "Production",
      status: "success" as const,
      commit: "d4e5f6g",
      date: "2025-04-27 16:20",
      duration: "4m 12s",
    },
    {
      id: "f0e1d2c3b4a5",
      environment: "Staging",
      status: "success" as const,
      commit: "e5f6g7h",
      date: "2025-04-27 11:05",
      duration: "3m 55s",
    },
  ];

  // Combined timeline for all major events with updated 2025 dates
  const timelineEvents: TimelineEvent[] = [
    {
      id: "ev1",
      title: "API Gateway Completed",
      description: "Project reached 100% completion",
      date: "2025-04-20",
      type: "project",
    },
    {
      id: "ev2",
      title: "Production Deployment",
      description: "Successfully deployed to production",
      date: "2025-04-28",
      type: "deployment",
    },
    {
      id: "ev3",
      title: "New Team Member",
      description: "Dave joined the Mobile App team",
      date: "2025-04-15",
      type: "team",
    },
    {
      id: "ev4",
      title: "Major Milestone",
      description: "Mobile App reached 50% completion",
      date: "2025-04-10",
      type: "milestone",
    },
  ];

  useEffect(() => {
    // Initialize filtered deployments
    setFilteredDeployments(deployments);
  }, []);

  // Check if any project has reached 100% and celebrate if needed
  const checkMilestones = (project: any) => {
    if (project.progress === 100 && celebrationEnabled) {
      setCelebrationType("confetti");
      setShowCelebration(true);
      showToast({
        title: `${project.name} Completed!`,
        description: "Project has reached 100% completion. Great job!",
      });
      setTimeout(() => {
        setShowCelebration(false);
      }, 5000);
    }
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...deployments];
    
    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter(d => d.status === filters.status);
    }
    
    // Filter by environment
    if (filters.environment !== "all") {
      filtered = filtered.filter(d => d.environment === filters.environment);
    }
    
    // Filter by date range
    if (filters.dateRange[0] && filters.dateRange[1]) {
      const startDate = filters.dateRange[0];
      const endDate = filters.dateRange[1];
      filtered = filtered.filter(d => {
        const deployDate = new Date(d.date);
        return deployDate >= startDate && deployDate <= endDate;
      });
    }
    
    setFilteredDeployments(filtered);
  };

  const handleExportDeployments = () => {
    const data = {
      headers: ["ID", "Environment", "Status", "Commit", "Date", "Duration"],
      rows: filteredDeployments.map(d => [
        d.id, 
        d.environment, 
        d.status, 
        d.commit, 
        d.date, 
        d.duration
      ])
    };
    
    const success = exportToCSV(data, "deployments-export");
    if (success && celebrationEnabled) {
      triggerCelebration("balloons");
    }
  };

  const refreshData = () => {
    setLastUpdated(new Date().toLocaleTimeString());
    showToast({
      title: "Data refreshed",
      description: "Dashboard data has been updated."
    });
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <Celebration isActive={showCelebration} type={celebrationType} />
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-background">
        <header className="border-b border-border p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-foreground">Development Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setDarkMode(!darkMode)}
                  className="transition-all hover:bg-muted"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="GreyScript" />
                        <AvatarFallback className="bg-brand-purple text-white dark:bg-brand-purple-dark">GS</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">GreyScript</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          grey@script.dev
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Preferences
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button onClick={() => triggerCelebration()} className="bg-brand-purple hover:bg-brand-purple-dark">
                Celebrate Milestone
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Deployments"
              value="128"
              icon={<Rocket className="h-5 w-5" />}
              trend={{ value: 12, positive: true }}
            />
            <StatsCard
              title="Success Rate"
              value="94.2%"
              icon={<Activity className="h-5 w-5" />}
              trend={{ value: 3.8, positive: true }}
            />
            <StatsCard
              title="Active Projects"
              value="7"
              icon={<Code className="h-5 w-5" />}
              trend={{ value: 2, positive: false }}
            />
            <StatsCard
              title="Team Members"
              value="16"
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 4, positive: true }}
            />
          </div>
          
          {/* Enhanced App Status Badges */}
          <AppStatusBadges />
          
          {/* Recent Deployments */}
          <Card className="mb-8 bg-gradient-to-br from-card to-muted/40 backdrop-blur-sm border-muted/40 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Recent Deployments</CardTitle>
                  <CardDescription>Deployed applications across environments</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={refreshData}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportDeployments}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-4" onValueChange={(value) => setActiveEnvironment(value as any)}>
                <TabsList className="grid grid-cols-4 mb-2">
                  <TabsTrigger value="all">All Environments</TabsTrigger>
                  <TabsTrigger value="Production">Production</TabsTrigger>
                  <TabsTrigger value="Staging">Staging</TabsTrigger>
                  <TabsTrigger value="Development">Development</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <DeploymentFilters onFilterChange={handleFilterChange} />
              
              {filteredDeployments.length > 0 ? (
                <DeploymentsTable deployments={filteredDeployments} />
              ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center border border-dashed rounded-md dark:border-gray-700">
                  <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No deployments match your filters</h3>
                  <p className="text-muted-foreground">Try adjusting your filter criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Side-by-side layout for Live Activity Feed and Milestone Timeline with improved spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Live Activity Feed */}
            <Card className="bg-gradient-to-br from-card/90 to-muted/30 backdrop-blur-sm border-muted/40 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle>Live Activity Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <LiveActivityFeed />
              </CardContent>
            </Card>
            
            {/* Milestone Timeline */}
            <Card className="bg-gradient-to-br from-card/90 to-muted/30 backdrop-blur-sm border-muted/40 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Milestone Timeline</CardTitle>
                <CardDescription>Recent achievements and events</CardDescription>
              </CardHeader>
              <CardContent>
                <Timeline events={timelineEvents} />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                status={project.status}
                progress={project.progress}
                team={project.team}
                onClick={() => handleProjectClick(project)}
                className="hover-scale cursor-pointer transition-all shadow-md hover:shadow-xl bg-gradient-to-br from-card/90 to-muted/30 backdrop-blur-sm border-muted/40"
              />
            ))}
          </div>

          <QuoteOfTheDay />
        </main>
      </div>
      
      {/* Project Detail Dialog */}
      {selectedProject && (
        <ProjectDetailDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      
      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  );
};

export default Index;
