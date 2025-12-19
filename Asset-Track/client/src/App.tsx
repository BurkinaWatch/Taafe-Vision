import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Films from "./pages/Films";
import Trainings from "./pages/Trainings";
import News from "./pages/News";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import NotFound from "./pages/not-found";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import FilmsManager from "./pages/admin/FilmsManager";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/projects" component={Projects} />
      <Route path="/films" component={Films} />
      <Route path="/trainings" component={Trainings} />
      <Route path="/news" component={News} />
      <Route path="/partners" component={Partners} />
      <Route path="/contact" component={Contact} />

      {/* Admin Routes */}
      {/* @ts-ignore wouter Route type compatibility */}
      <Route path="/admin/login" component={AdminLogin} />
      {/* @ts-ignore wouter Route type compatibility */}
      <Route path="/admin/dashboard" component={Dashboard} />
      {/* @ts-ignore wouter Route type compatibility */}
      <Route path="/admin/films" component={FilmsManager} />
      {/* @ts-ignore wouter Route type compatibility */}
      <Route path="/admin/projects" component={Dashboard} />
      {/* @ts-ignore wouter Route type compatibility */}
      <Route path="/admin/articles" component={Dashboard} />
      {/* @ts-ignore wouter Route type compatibility */}
      <Route path="/admin/partners" component={Dashboard} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
