import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, GitBranch, Globe, Plus, Rocket, Server, Clock, CheckCircle, AlertCircle, RotateCw } from "lucide-react";

// ===== Type Definitions =====
interface Deployment {
  id: string;
  repoName: string;
  branch: string;
  status: "running" | "success" | "failed" | "queued";
  url?: string;
  deployedAt: string;
  environment: "production" | "staging" | "development";
}

interface Repo {
  id: number;
  name: string;
  language: string;
  default_branch: string;
  private: boolean;
}

// ===== Utility Functions =====
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

const getStatusBadge = (status: Deployment["status"]) => {
  switch (status) {
    case "running":
      return { 
        icon: <RotateCw className="h-3 w-3 mr-1 animate-spin" />, 
        color: "bg-blue-500 hover:bg-blue-600", 
        label: "In Progress" 
      };
    case "success":
      return { 
        icon: <CheckCircle className="h-3 w-3 mr-1" />, 
        color: "bg-green-500 hover:bg-green-600", 
        label: "Successful" 
      };
    case "failed":
      return { 
        icon: <AlertCircle className="h-3 w-3 mr-1" />, 
        color: "bg-red-500 hover:bg-red-600", 
        label: "Failed" 
      };
    case "queued":
      return { 
        icon: <Clock className="h-3 w-3 mr-1" />, 
        color: "bg-yellow-500 hover:bg-yellow-600", 
        label: "Queued" 
      };
    default:
      return { 
        icon: null, 
        color: "bg-gray-500 hover:bg-gray-600", 
        label: "Unknown" 
      };
  }
};

const getEnvironmentBadge = (environment: Deployment["environment"]) => {
  switch (environment) {
    case "production":
      return { color: "bg-purple-500 hover:bg-purple-600", label: "Production" };
    case "staging":
      return { color: "bg-orange-500 hover:bg-orange-600", label: "Staging" };
    case "development":
      return { color: "bg-teal-500 hover:bg-teal-600", label: "Development" };
    default:
      return { color: "bg-gray-500 hover:bg-gray-600", label: "Unknown" };
  }
};

// ===== Mock Data =====
const mockDeployments: Deployment[] = [
  {
    id: "deploy-1",
    repoName: "my-next-app",
    branch: "main",
    status: "success",
    url: "https://my-next-app.vercel.app",
    deployedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    environment: "production"
  },
  {
    id: "deploy-2",
    repoName: "portfolio-website",
    branch: "main",
    status: "running",
    deployedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    environment: "production"
  },
  {
    id: "deploy-3",
    repoName: "api-service",
    branch: "develop",
    status: "failed",
    deployedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    environment: "staging"
  },
  {
    id: "deploy-4",
    repoName: "dashboard-ui",
    branch: "feature/auth",
    status: "queued",
    deployedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    environment: "development"
  },
  {
    id: "deploy-5",
    repoName: "mobile-app-backend",
    branch: "main",
    status: "success",
    url: "https://api.myapp.com",
    deployedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    environment: "production"
  }
];

// ===== Component: Status Badge =====
interface StatusBadgeProps {
  status: Deployment["status"];
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { icon, color, label } = getStatusBadge(status);
  
  return (
    <Badge className={`${color} flex items-center`}>
      {icon}
      {label}
    </Badge>
  );
};

// ===== Component: Environment Badge =====
interface EnvironmentBadgeProps {
  environment: Deployment["environment"];
}

const EnvironmentBadge = ({ environment }: EnvironmentBadgeProps) => {
  const { color, label } = getEnvironmentBadge(environment);
  
  return (
    <Badge className={color}>
      {label}
    </Badge>
  );
};

// ===== Component: Deployment Row =====
interface DeploymentRowProps {
  deployment: Deployment;
}

const DeploymentRow = ({ deployment }: DeploymentRowProps) => {
  return (
    <TableRow>
      <TableCell>{deployment.repoName}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <GitBranch className="h-4 w-4 mr-1 text-gray-500" />
          {deployment.branch}
        </div>
      </TableCell>
      <TableCell>
        <StatusBadge status={deployment.status} />
      </TableCell>
      <TableCell>
        <EnvironmentBadge environment={deployment.environment} />
      </TableCell>
      <TableCell>{formatDate(deployment.deployedAt)}</TableCell>
      <TableCell>
        {deployment.url ? (
          <a 
            href={deployment.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
          >
            <Globe className="h-4 w-4 mr-1" />
            Visit
          </a>
        ) : (
          <span className="text-gray-400 text-sm">Not available</span>
        )}
      </TableCell>
      <TableCell>
        <Button size="sm" variant="outline" className="text-xs">
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};

// ===== Component: Deployment Quick Stats =====
interface DeploymentStatsProps {
  deployments: Deployment[];
}

const DeploymentStats = ({ deployments }: DeploymentStatsProps) => {
  const total = deployments.length;
  const successful = deployments.filter(d => d.status === "success").length;
  const inProgress = deployments.filter(d => d.status === "running" || d.status === "queued").length;
  const failed = deployments.filter(d => d.status === "failed").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Deployments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{total}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Successful</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          <p className="text-2xl font-bold">{successful}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <RotateCw className="h-5 w-5 mr-2 text-blue-500" />
          <p className="text-2xl font-bold">{inProgress}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Failed</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
          <p className="text-2xl font-bold">{failed}</p>
        </CardContent>
      </Card>
    </div>
  );
};

// ===== Component: GitHub Repository Selector =====
interface GithubRepoSelectorProps {
  onSelectRepo: (repo: Repo) => void;
  onClose: () => void;
}

const GithubRepoSelector = ({ onSelectRepo, onClose }: GithubRepoSelectorProps) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "private" | "public">("all");

  useEffect(() => {
    // Mock loading GitHub repos
    const loadRepos = setTimeout(() => {
      setRepos([
        { id: 1, name: "my-next-app", language: "TypeScript", default_branch: "main", private: false },
        { id: 2, name: "portfolio-website", language: "JavaScript", default_branch: "main", private: false },
        { id: 3, name: "api-service", language: "TypeScript", default_branch: "main", private: true },
        { id: 4, name: "dashboard-ui", language: "TypeScript", default_branch: "main", private: true },
        { id: 5, name: "mobile-app-backend", language: "JavaScript", default_branch: "main", private: true },
      ]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(loadRepos);
  }, []);

  const filteredRepos = repos.filter(repo => {
    if (filter === "all") return true;
    if (filter === "private") return repo.private;
    if (filter === "public") return !repo.private;
    return true;
  });

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="mb-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all" onClick={() => setFilter("all")}>All Repos</TabsTrigger>
          <TabsTrigger value="public" onClick={() => setFilter("public")}>Public</TabsTrigger>
          <TabsTrigger value="private" onClick={() => setFilter("private")}>Private</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <RotateCw className="h-6 w-6 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-500">Loading repositories...</span>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto p-1">
          {filteredRepos.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No repositories found
            </div>
          ) : (
            filteredRepos.map(repo => (
              <Card key={repo.id} className="hover:border-blue-400 transition-colors cursor-pointer">
                <CardContent className="p-4 flex justify-between items-center" onClick={() => onSelectRepo(repo)}>
                  <div>
                    <h3 className="font-medium">{repo.name}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <GitBranch className="h-3 w-3 mr-1" />
                      {repo.default_branch}
                      <span className="mx-2">•</span>
                      {repo.language}
                    </div>
                  </div>
                  <Badge variant="outline" className={repo.private ? "border-purple-300 text-purple-700" : "border-green-300 text-green-700"}>
                    {repo.private ? "Private" : "Public"}
                  </Badge>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// ===== Component: Deploy Confirmation =====
interface DeployConfirmationProps {
  repo: Repo | null;
  onBack: () => void;
  onDeploy: () => void;
}

const DeployConfirmation = ({ repo, onBack, onDeploy }: DeployConfirmationProps) => {
  if (!repo) return null;
  
  return (
    <div className="space-y-4">
      <Alert>
        <AlertTitle className="flex items-center">
          <Rocket className="h-4 w-4 mr-2" />
          Ready to deploy
        </AlertTitle>
        <AlertDescription>
          You're about to deploy <strong>{repo.name}</strong> from the <strong>{repo.default_branch}</strong> branch.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-2">
        <h3 className="font-medium">Deployment Settings</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="text-gray-500">Repository</div>
          <div>{repo.name}</div>
          
          <div className="text-gray-500">Branch</div>
          <div className="flex items-center">
            <GitBranch className="h-4 w-4 mr-1 text-gray-400" />
            {repo.default_branch}
          </div>
          
          <div className="text-gray-500">Environment</div>
          <div>Production</div>
          
          <div className="text-gray-500">Build Command</div>
          <div><code className="bg-gray-100 px-1 py-0.5 rounded text-xs">npm run build</code></div>
        </div>
      </div>
    </div>
  );
};

// ===== Main Component: Deployments Page =====
const DeploymentsPage = () => {
  const [deployments, setDeployments] = useState<Deployment[]>(mockDeployments);
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState<"select" | "confirm">("select");
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const navigate = useNavigate();

  const handleSelectRepo = (repo: Repo) => {
    setSelectedRepo(repo);
    setDeploymentStep("confirm");
  };

  const handleDeploy = () => {
    // Mock deployment logic
    if (selectedRepo) {
      const newDeployment: Deployment = {
        id: `deploy-${Date.now()}`,
        repoName: selectedRepo.name,
        branch: selectedRepo.default_branch,
        status: "queued",
        deployedAt: new Date().toISOString(),
        environment: "production"
      };
      
      setDeployments([newDeployment, ...deployments]);
      setDeployModalOpen(false);
      setDeploymentStep("select");
      setSelectedRepo(null);
    }
  };

  const handleModalClose = () => {
    setDeployModalOpen(false);
    // Reset modal state when closed
    setTimeout(() => {
      setDeploymentStep("select");
      setSelectedRepo(null);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Deployments</h1>
        <Dialog open={deployModalOpen} onOpenChange={setDeployModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
              <Plus className="h-4 w-4 mr-1" />
              New Deployment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md md:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center text-xl">
                {deploymentStep === "select" ? (
                  <>
                    <Github className="mr-2 h-5 w-5" />
                    Select Repository
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-5 w-5" />
                    Deploy Repository
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            
            {deploymentStep === "select" ? (
              <GithubRepoSelector 
                onSelectRepo={handleSelectRepo}
                onClose={() => setDeployModalOpen(false)}
              />
            ) : (
              <DeployConfirmation
                repo={selectedRepo}
                onBack={() => setDeploymentStep("select")}
                onDeploy={handleDeploy}
              />
            )}
            
            <DialogFooter className="mt-4">
              {deploymentStep === "select" ? (
                <Button variant="outline" onClick={() => setDeployModalOpen(false)}>
                  Cancel
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setDeploymentStep("select")}>
                    Back
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                    onClick={handleDeploy}
                  >
                    <Rocket className="h-4 w-4 mr-1" />
                    Deploy Now
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <DeploymentStats deployments={deployments} />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="h-5 w-5 mr-2" />
            Recent Deployments
          </CardTitle>
          <CardDescription>
            View and manage all your deployed applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repository</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Deployed At</TableHead>
                <TableHead>Live URL</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deployments.map(deployment => (
                <DeploymentRow key={deployment.id} deployment={deployment} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeploymentsPage;