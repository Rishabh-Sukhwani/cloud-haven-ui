
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Activity,
  Cloud,
  Code,
  Database,
  Home,
  LayoutDashboard,
  Settings,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
  toggleCollapse: () => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  path: string;
}

export function Sidebar({
  className,
  collapsed = false,
  toggleCollapse,
  ...props
}: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-20 flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2">
          <Cloud className="h-8 w-8 text-primary" />
          {!collapsed && (
            <span className="text-xl font-bold text-sidebar-foreground">
              Nimbus
            </span>
          )}
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active
          path="/"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Code size={20} />}
          label="Projects"
          path="/projects"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Database size={20} />}
          label="Databases"
          path="/databases"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Activity size={20} />}
          label="Analytics"
          path="/analytics"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          label="Settings"
          path="/settings"
          collapsed={collapsed}
        />
      </div>
      <div className="border-t p-2">
        <button
          className="flex items-center justify-center w-full p-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
          onClick={toggleCollapse}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("transition-transform", collapsed ? "rotate-180" : "")}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  path,
  collapsed = false,
}: SidebarItemProps & { collapsed?: boolean }) {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
        active && "bg-primary text-primary-foreground hover:bg-primary/90"
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
