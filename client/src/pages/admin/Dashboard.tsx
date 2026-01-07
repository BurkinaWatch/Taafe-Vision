import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { 
  LayoutDashboard, 
  Film, 
  FolderKanban, 
  Users, 
  Newspaper, 
  LogOut,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
}

function SidebarLink({ href, icon: Icon, label, active }: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer",
        active ? "bg-primary text-white" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
      )}>
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
}

export default function Dashboard({ children }: { children?: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth();
  const [location] = useLocation();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    window.location.href = "/admin/login";
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border fixed inset-y-0 left-0 z-50">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-display font-bold text-primary">Admin Panel</h2>
        </div>
        
        <nav className="p-4 space-y-2">
          <SidebarLink href="/admin/dashboard" icon={LayoutDashboard} label="Overview" active={location === "/admin/dashboard"} />
          <SidebarLink href="/admin/projects" icon={FolderKanban} label="Projects" active={location.includes("projects")} />
          <SidebarLink href="/admin/films" icon={Film} label="Films" active={location.includes("films")} />
          <SidebarLink href="/admin/articles" icon={Newspaper} label="Actualités & Événements" active={location.includes("articles")} />
          <SidebarLink href="/admin/partners" icon={Users} label="Partners" active={location.includes("partners")} />
          <SidebarLink href="/admin/contacts" icon={Mail} label="Messages" active={location.includes("contacts")} />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
             <span className="text-sm font-medium text-foreground">{user.username}</span>
          </div>
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => logout()}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children ? children : (
          <div className="max-w-4xl">
             <h1 className="text-3xl font-display font-bold text-primary mb-8">Dashboard Overview</h1>
             <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                  <h3 className="text-muted-foreground font-medium mb-2">Projects</h3>
                  <p className="text-4xl font-bold text-primary">--</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                  <h3 className="text-muted-foreground font-medium mb-2">Films</h3>
                  <p className="text-4xl font-bold text-primary">--</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                  <h3 className="text-muted-foreground font-medium mb-2">Messages</h3>
                  <p className="text-4xl font-bold text-primary">--</p>
                </div>
             </div>
             <p className="mt-8 text-muted-foreground">Select a category from the sidebar to manage content.</p>
          </div>
        )}
      </main>
    </div>
  );
}
