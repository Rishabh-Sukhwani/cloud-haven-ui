
import { Activity, ArrowUpRight, Cloud, Database, Package } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProjectCard } from "@/components/dashboard/project-card";
import { DeploymentActivity } from "@/components/dashboard/deployment-activity";
import { Button } from "@/components/ui/button";

const deploymentActivities = [
  {
    id: "1",
    project: "api-service",
    status: "success" as const,
    commit: "f8d3c24a7b5e",
    branch: "main",
    time: "10 minutes ago",
  },
  {
    id: "2",
    project: "web-client",
    status: "building" as const,
    commit: "3e7a12d9c0b2",
    branch: "feature/auth-revamp",
    time: "15 minutes ago",
  },
  {
    id: "3",
    project: "analytics-dashboard",
    status: "failed" as const,
    commit: "a1b2c3d4e5f6",
    branch: "develop",
    time: "25 minutes ago",
  },
  {
    id: "4",
    project: "marketing-site",
    status: "success" as const,
    commit: "7g8h9i0j1k2l",
    branch: "main",
    time: "1 hour ago",
  },
];

const projects = [
  {
    name: "API Service",
    description: "Core backend API service with Node.js and Express",
    deploymentCount: 42,
    status: "online" as const,
    lastDeployed: "10 minutes ago",
    gitRepo: "organization/api-service",
    url: "api.example.com",
  },
  {
    name: "Web Client",
    description: "React-based web client for the main application",
    deploymentCount: 38,
    status: "building" as const,
    lastDeployed: "15 minutes ago",
    gitRepo: "organization/web-client",
    url: "app.example.com",
  },
  {
    name: "Analytics Dashboard",
    description: "Data visualization platform for metrics and KPIs",
    deploymentCount: 23,
    status: "failed" as const,
    lastDeployed: "25 minutes ago",
    gitRepo: "organization/analytics-dashboard",
    url: "analytics.example.com",
  },
  {
    name: "Marketing Site",
    description: "Company's main marketing website and landing pages",
    deploymentCount: 19,
    status: "online" as const,
    lastDeployed: "1 hour ago",
    gitRepo: "organization/marketing-site",
    url: "example.com",
  },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your projects and deployments.
          </p>
        </div>
        <Button className="gap-2">
          <Cloud className="h-4 w-4" />
          New Deployment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value="12"
          icon={<Package />}
          trend={{ value: 8.2, positive: true }}
          description="Active projects in your account"
        />
        <StatCard
          title="Total Deployments"
          value="286"
          icon={<ArrowUpRight />}
          trend={{ value: 12.5, positive: true }}
          description="Across all projects"
        />
        <StatCard
          title="Databases"
          value="5"
          icon={<Database />}
          description="Connected database instances"
        />
        <StatCard
          title="Usage"
          value="68%"
          icon={<Activity />}
          trend={{ value: 3.7, positive: false }}
          description="Of your current plan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                deploymentCount={project.deploymentCount}
                status={project.status}
                lastDeployed={project.lastDeployed}
                gitRepo={project.gitRepo}
                url={project.url}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <DeploymentActivity activities={deploymentActivities} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
