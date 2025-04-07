
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, GitBranch, Link } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectStatus = "online" | "building" | "failed" | "stopped";

interface ProjectCardProps {
  name: string;
  description: string;
  deploymentCount: number;
  status: ProjectStatus;
  lastDeployed: string;
  gitRepo?: string;
  url: string;
  className?: string;
}

const statusConfig = {
  online: {
    label: "Online",
    class: "bg-green-500 text-white",
  },
  building: {
    label: "Building",
    class: "bg-yellow-500 text-white animate-pulse-gentle",
  },
  failed: {
    label: "Failed",
    class: "bg-destructive text-destructive-foreground",
  },
  stopped: {
    label: "Stopped",
    class: "bg-muted text-muted-foreground",
  },
};

export function ProjectCard({
  name,
  description,
  deploymentCount,
  status,
  lastDeployed,
  gitRepo,
  url,
  className,
}: ProjectCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Card className={cn("overflow-hidden h-full flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <Badge
            variant="outline"
            className={cn(statusInfo.class)}
          >
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground flex-1">{description}</p>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            Last deployed {lastDeployed}
          </div>
          {gitRepo && (
            <div className="flex items-center text-xs text-muted-foreground">
              <GitBranch className="mr-1 h-3 w-3" />
              {gitRepo}
            </div>
          )}
          <div className="flex items-center text-xs text-muted-foreground">
            <Link className="mr-1 h-3 w-3" />
            {url}
          </div>
        </div>
        <div className="flex justify-between mt-4 pt-4 border-t">
          <span className="text-sm">{deploymentCount} deployments</span>
          <Button variant="outline" size="sm" className="gap-1">
            <ExternalLink className="h-3 w-3" />
            Visit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
