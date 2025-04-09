import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Code, ExternalLink, GitBranch, Info, Star, Calendar, FileCode, Download } from "lucide-react";

// ===== Type Definitions =====
interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  default_branch: string;
  owner: { login: string };
  pushed_at: string;
  stargazers_count?: number;
  forks_count?: number;
  created_at: string;
}

interface CommitInfo {
  sha: string;
  commit: {
    author: { name: string; date: string };
    message: string;
  };
}

// ===== Utility Functions =====
function getTimeAgoBadge(pushedAt: string): { label: string; className: string } {
  const pushedDate = new Date(pushedAt);
  const now = new Date();
  const diffInMs = now.getTime() - pushedDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 1) {
    return { label: "Today", className: "bg-green-500 text-white" };
  } else if (diffInDays < 7) {
    return { label: `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`, className: "bg-green-500 text-white" };
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return { label: `${weeks} week${weeks > 1 ? "s" : ""} ago`, className: "bg-yellow-500 text-white" };
  } else {
    const years = Math.floor(diffInDays / 365);
    const months = Math.floor((diffInDays % 365) / 30);
    if (years > 0) {
      return { label: `${years} year${years > 1 ? "s" : ""} ago`, className: "bg-red-500 text-white" };
    }
    return { label: `${months} month${months > 1 ? "s" : ""} ago`, className: "bg-red-500 text-white" };
  }
}

const getLanguageDetails = (language: string | null) => {
  if (!language) return { icon: <FileCode className="h-4 w-4" />, color: "bg-gray-400" };
  
  const languageMap: Record<string, { icon: JSX.Element, color: string }> = {
    "JavaScript": { icon: <FileCode className="h-4 w-4" />, color: "bg-yellow-400" },
    "TypeScript": { icon: <FileCode className="h-4 w-4" />, color: "bg-blue-500" },
    "Python": { icon: <FileCode className="h-4 w-4" />, color: "bg-green-600" },
    "Java": { icon: <FileCode className="h-4 w-4" />, color: "bg-red-500" },
    "C#": { icon: <FileCode className="h-4 w-4" />, color: "bg-purple-600" },
    "PHP": { icon: <FileCode className="h-4 w-4" />, color: "bg-indigo-500" },
    "Ruby": { icon: <FileCode className="h-4 w-4" />, color: "bg-red-600" },
    "Go": { icon: <FileCode className="h-4 w-4" />, color: "bg-blue-400" },
    "Swift": { icon: <FileCode className="h-4 w-4" />, color: "bg-orange-500" },
    "Kotlin": { icon: <FileCode className="h-4 w-4" />, color: "bg-purple-500" },
    "Rust": { icon: <FileCode className="h-4 w-4" />, color: "bg-orange-600" },
    "HTML": { icon: <FileCode className="h-4 w-4" />, color: "bg-orange-500" },
    "CSS": { icon: <FileCode className="h-4 w-4" />, color: "bg-blue-400" },
  };
  
  return languageMap[language] || { icon: <FileCode className="h-4 w-4" />, color: "bg-gray-400" };
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

// ===== Component: Repository Description =====
interface RepoDescriptionProps {
  description: string;
}

const RepoDescription = ({ description }: RepoDescriptionProps) => (
  <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
    <p className="text-gray-700">{description || "No description provided"}</p>
  </div>
);

// ===== Component: Language Badge =====
interface LanguageBadgeProps {
  language: string | null;
}

const LanguageBadge = ({ language }: LanguageBadgeProps) => {
  const { color } = getLanguageDetails(language);
  
  return (
    <div className="flex items-center">
      <span className="font-medium text-gray-700 mr-2">Language:</span>
      {language ? (
        <div className="flex items-center">
          <span className={`${color} h-3 w-3 rounded-full mr-1`}></span>
          <span>{language}</span>
        </div>
      ) : (
        <span>Not specified</span>
      )}
    </div>
  );
};

// ===== Component: Repository Details Grid =====
interface RepoDetailsGridProps {
  repo: Repo;
}

const RepoDetailsGrid = ({ repo }: RepoDetailsGridProps) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="flex items-center">
      <GitBranch className="h-4 w-4 mr-2 text-gray-500" />
      <span className="text-sm">
        <span className="font-medium">Branch:</span> {repo.default_branch}
      </span>
    </div>
    
    <div className="flex items-center">
      <Clock className="h-4 w-4 mr-2 text-gray-500" />
      <span className="text-sm">
        <span className="font-medium">Last Update:</span> {formatDate(repo.pushed_at)}
      </span>
    </div>
    
    <div className="flex items-center">
      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
      <span className="text-sm">
        <span className="font-medium">Created:</span> {formatDate(repo.created_at)}
      </span>
    </div>
    
    <div className="flex items-center">
      <Star className="h-4 w-4 mr-2 text-gray-500" />
      <span className="text-sm">
        <span className="font-medium">Stars:</span> {repo.stargazers_count || 0}
      </span>
    </div>
  </div>
);

// ===== Component: Commit Information =====
interface CommitInfoDisplayProps {
  commit: CommitInfo;
}

const CommitInfoDisplay = ({ commit }: CommitInfoDisplayProps) => (
  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
    <h3 className="text-sm font-medium mb-2 flex items-center">
      <Info className="h-4 w-4 mr-1" /> Latest Commit
    </h3>
    <div className="text-xs text-gray-600">
      <p className="mb-1">
        <span className="font-medium">SHA:</span> {commit.sha.slice(0, 7)}
      </p>
      <p className="mb-1">
        <span className="font-medium">Author:</span> {commit.commit.author.name}
      </p>
      <p className="mb-1">
        <span className="font-medium">Date:</span> {formatDate(commit.commit.author.date)}
      </p>
      <p className="mb-1">
        <span className="font-medium">Message:</span> {commit.commit.message}
      </p>
    </div>
  </div>
);

// ===== Component: Repository Modal Content =====
interface RepoModalContentProps {
  repo: Repo;
  commit?: CommitInfo;
}

const RepoModalContent = ({ repo, commit }: RepoModalContentProps) => (
  <div className="space-y-6">
    <RepoDescription description={repo.description} />
    <LanguageBadge language={repo.language} />
    <RepoDetailsGrid repo={repo} />
    
    {commit && <CommitInfoDisplay commit={commit} />}
    
    <div className="flex justify-between items-center">
      <a 
        href={repo.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
      >
        <ExternalLink className="h-4 w-4 mr-1" /> View on GitHub
      </a>
    </div>
  </div>
);

// ===== Component: Repository Row =====
interface RepoRowProps {
  repo: Repo;
  commit?: CommitInfo;
  onSelectRepo: (repo: Repo) => void;
}

const RepoRow = ({ repo, commit, onSelectRepo }: RepoRowProps) => {
  const badge = getTimeAgoBadge(repo.pushed_at);
  
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="text-blue-600 hover:underline p-0 h-auto"
              onClick={() => onSelectRepo(repo)}
            >
              {repo.name}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md md:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center text-xl">
                <Code className="mr-2 h-5 w-5" />
                {repo.name}
              </DialogTitle>
            </DialogHeader>
            
            <RepoModalContent repo={repo} commit={commit} />
            
            <DialogFooter className="mt-4">
              {repo.language === "JavaScript" || repo.language === "TypeScript" || repo.language === "CSS" ? (
                <Button className="bg-green-600 text-white hover:bg-green-700 flex items-center">
                  <Download className="h-4 w-4 mr-1" /> Deploy
                </Button>
              ) : (
                <Badge className="bg-gray-500 text-white">Not Deployable</Badge>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>{repo.default_branch}</TableCell>
      <TableCell>
        {commit ? (
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            {commit.sha.slice(0, 7)}
          </code>
        ) : (
          "N/A"
        )}
      </TableCell>
      <TableCell>
        <Badge className="bg-green-500 text-white hover:bg-green-600">
          Active
        </Badge>
      </TableCell>
      <TableCell>
        {commit?.commit?.author?.name || "N/A"}
      </TableCell>
      <TableCell className="text-right">
        <Badge
          className={badge.className}
          title={new Date(repo.pushed_at).toLocaleString()}
        >
          {badge.label}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

// ===== Main Component =====
const Projects = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [commitInfo, setCommitInfo] = useState<Record<number, CommitInfo>>({});
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("github-token");

    if (!token) {
      console.error("GitHub token not found in sessionStorage.");
      return;
    }

    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/user/repos", {
          headers: {
            Authorization: `token ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch repositories");
        }

        const data: Repo[] = await res.json();
        setRepos(data);

        const commitData: Record<number, CommitInfo> = {};
        await Promise.all(
          data.map(async (repo) => {
            try {
              const res = await fetch(
                `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits/${repo.default_branch}`,
                {
                  headers: {
                    Authorization: `token ${token}`,
                  },
                }
              );

              if (!res.ok) {
                console.warn(`Commit fetch failed for ${repo.name}`);
                return;
              }

              const commit = await res.json();
              commitData[repo.id] = commit;
            } catch (commitErr) {
              console.error(`Error fetching commit for ${repo.name}`, commitErr);
            }
          })
        );
        setCommitInfo(commitData);
      } catch (err) {
        console.error("Error fetching repositories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your GitHub Repositories</h1>

      {loading ? (
        <p className="text-center text-muted-foreground">Loading repositories...</p>
      ) : repos.length === 0 ? (
        <p className="text-center text-muted-foreground">No repositories found.</p>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Commit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Pushed At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repos.map((repo) => (
                <RepoRow
                  key={repo.id}
                  repo={repo}
                  commit={commitInfo[repo.id]}
                  onSelectRepo={setSelectedRepo}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Projects;