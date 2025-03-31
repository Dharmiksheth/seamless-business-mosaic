
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon,
  iconColor = "text-primary",
  trend 
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && (
          <div className={cn("p-2 rounded-md bg-primary/10", iconColor)}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <p className="text-xs text-muted-foreground">
            {description}
            {trend && (
              <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
