
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DeploymentActivityProps {
  activities: {
    id: string;
    project: string;
    status: "success" | "failed" | "building";
    commit: string;
    branch: string;
    time: string;
  }[];
  className?: string;
}

export function DeploymentActivity({ activities, className }: DeploymentActivityProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>Deployment Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.project}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      activity.status === "success" && "bg-green-500 text-white",
                      activity.status === "failed" && "bg-destructive text-destructive-foreground",
                      activity.status === "building" && "bg-yellow-500 text-white animate-pulse-gentle"
                    )}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>{activity.commit.substring(0, 7)}</span>
                  <span>{activity.branch}</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
