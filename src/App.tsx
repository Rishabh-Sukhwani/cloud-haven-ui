import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { AuthCheck } from "./components/auth/auth-check";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"; // Add this
import { DeploymentActivity } from "./components/dashboard/deployment-activity";
import DeploymentsPage from "./pages/Deployments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />

            <Route
              path="/"
              element={
                <AuthCheck>
                  <DashboardLayout>
                    <Index />
                  </DashboardLayout>
                </AuthCheck>
              }
            />

            <Route
              path="/projects"
              element={
                <AuthCheck>
                  <DashboardLayout>
                    <Projects />
                  </DashboardLayout>
                </AuthCheck>
              }
            />

            <Route
              path="/analytics"
              element={
                <AuthCheck>
                  <DashboardLayout>
                    <Analytics />
                  </DashboardLayout>
                </AuthCheck>
              }
            />

            <Route
              path="/deployments"
              element={
                <AuthCheck>
                  <DashboardLayout>
                    <DeploymentsPage />
                  </DashboardLayout>
                </AuthCheck>
              }
            />
            

            <Route
              path="/settings"
              element={
                <AuthCheck>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </AuthCheck>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
