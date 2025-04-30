
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatsCard = ({ title, value, icon, trend, className }: StatsCardProps) => {
  return (
    <Card 
      className={cn(
        "h-full transition-all duration-300 hover:scale-[1.02] bg-card/80 backdrop-blur-sm border-muted/40 shadow-lg hover:shadow-xl",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-lg bg-muted/80 flex items-center justify-center text-foreground/80 transition-colors hover:text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {trend && (
          <p className={cn(
              "text-xs mt-2 flex items-center", 
              trend.positive ? "text-green-500" : "text-red-500"
            )}
          >
            {trend.positive ? "+" : "-"}{Math.abs(trend.value)}%
            <span className="text-muted-foreground ml-1">from last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
