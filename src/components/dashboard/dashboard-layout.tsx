
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
      <Header collapsed={collapsed} />
      <main
        className={cn(
          "p-6 pt-24 transition-all duration-300",
          collapsed ? "ml-16" : "ml-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
