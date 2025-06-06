import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github } from "lucide-react";

// Firebase Auth imports
import { auth, githubProvider } from "@/firebase";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, githubProvider);

      // ✅ Extract GitHub access token
      const credential = GithubAuthProvider.credentialFromResult(result);
      //console.log(credential);
      
      const accessToken = credential?.accessToken;
      //console.log(accessToken);
      
      if (accessToken) {
        console.log("here");
        
        sessionStorage.setItem("github-token", accessToken);
      }

      // ✅ Redirect to projects page
      navigate("/projects");
    } catch (error) {
      console.error("GitHub login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Nimbus
            </h1>
            <p className="text-muted-foreground mt-2">
              Cloud Deployment Platform
            </p>
          </div>

          <Card className="border-border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <Button
                variant="outline"
                onClick={handleGitHubLogin}
                disabled={isLoading}
                className="w-full border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center gap-2"
              >
                <Github className="h-5 w-5" />
                {isLoading ? "Connecting..." : "Continue with GitHub"}
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col">
              <p className="text-xs text-muted-foreground text-center mt-2">
                By continuing, you agree to Nimbus's Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Nimbus. All rights reserved.
      </footer>
    </div>
  );
};

export default Auth;
