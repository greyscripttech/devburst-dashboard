
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Filter, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface DeploymentFiltersProps {
  onFilterChange: (filters: {
    status: "all" | "success" | "failed" | "in-progress";
    environment: "all" | "Production" | "Staging" | "Development";
    dateRange: [Date | undefined, Date | undefined];
  }) => void;
}

export const DeploymentFilters = ({ onFilterChange }: DeploymentFiltersProps) => {
  const [status, setStatus] = useState<"all" | "success" | "failed" | "in-progress">("all");
  const [environment, setEnvironment] = useState<"all" | "Production" | "Staging" | "Development">("all");
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  const [date, setDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleStatusChange = (value: "all" | "success" | "failed" | "in-progress") => {
    setStatus(value);
    onFilterChange({ status: value, environment, dateRange });
  };

  const handleEnvironmentChange = (value: "all" | "Production" | "Staging" | "Development") => {
    setEnvironment(value);
    onFilterChange({ status, environment: value, dateRange });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const newRange: [Date | undefined, Date | undefined] = dateRange[0] 
        ? [dateRange[0], selectedDate] 
        : [selectedDate, undefined];
        
      if (newRange[0] && newRange[1] && newRange[0] > newRange[1]) {
        newRange[0] = newRange[1];
      }
      
      setDateRange(newRange);
      
      if (newRange[0] && newRange[1]) {
        onFilterChange({ status, environment, dateRange: newRange });
        setIsCalendarOpen(false);
      }
    }
  };

  const clearFilters = () => {
    setStatus("all");
    setEnvironment("all");
    setDateRange([undefined, undefined]);
    setDate(undefined);
    onFilterChange({
      status: "all",
      environment: "all",
      dateRange: [undefined, undefined]
    });
  };

  const formatDateRange = () => {
    if (!dateRange[0] && !dateRange[1]) return "Select dates";
    if (dateRange[0] && !dateRange[1]) return format(dateRange[0], "MMM d, yyyy");
    if (dateRange[0] && dateRange[1]) {
      return `${format(dateRange[0], "MMM d")} - ${format(dateRange[1], "MMM d, yyyy")}`;
    }
    return "Select dates";
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Status: {status === "all" ? "All" : status}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3">
          <RadioGroup value={status} onValueChange={(value: string) => handleStatusChange(value as any)}>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="all" id="status-all" />
              <Label htmlFor="status-all">All</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="success" id="status-success" />
              <Label htmlFor="status-success">Success</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="failed" id="status-failed" />
              <Label htmlFor="status-failed">Failed</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="in-progress" id="status-in-progress" />
              <Label htmlFor="status-in-progress">In Progress</Label>
            </div>
          </RadioGroup>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Environment: {environment === "all" ? "All" : environment}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3">
          <RadioGroup value={environment} onValueChange={(value: string) => handleEnvironmentChange(value as any)}>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="all" id="env-all" />
              <Label htmlFor="env-all">All</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="Production" id="env-production" />
              <Label htmlFor="env-production">Production</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="Staging" id="env-staging" />
              <Label htmlFor="env-staging">Staging</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="Development" id="env-development" />
              <Label htmlFor="env-development">Development</Label>
            </div>
          </RadioGroup>
        </PopoverContent>
      </Popover>

      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className={cn("h-8", dateRange[0] && "bg-accent text-accent-foreground")}>
            <CalendarIcon className="mr-2 h-3.5 w-3.5" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
          {dateRange[0] && (
            <div className="p-3 border-t">
              <div className="flex justify-between">
                <div>
                  {dateRange[0] && <span className="text-sm">From: {format(dateRange[0], "PPP")}</span>}
                  {dateRange[1] && <div className="text-sm">To: {format(dateRange[1], "PPP")}</div>}
                </div>
                {(dateRange[0] || dateRange[1]) && (
                  <Button size="sm" variant="ghost" onClick={() => {
                    setDateRange([undefined, undefined]);
                    setDate(undefined);
                  }}>
                    Clear
                  </Button>
                )}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      <Button size="sm" variant="ghost" onClick={clearFilters} className="h-8">
        Clear all
      </Button>
    </div>
  );
};
