
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, GitBranch, Code, AlertTriangle, Settings, Download, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Create a function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen w-full bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 sm:p-6">
        <h1 className="text-lg sm:text-xl font-bold text-sidebar-foreground flex items-center">
          <Code className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          Keploy-CodeCompass
        </h1>
      </div>
      <nav className="flex-1 px-3 sm:px-4 space-y-1 overflow-y-auto">
        <button 
          onClick={() => handleNavigation('/')}
          className={cn(
            "nav-item w-full text-left py-2 px-3 rounded-md flex items-center transition-colors", 
            isActive('/') ? "bg-primary/10 text-primary" : "hover:bg-muted"
          )}
        >
          <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
          <span className="text-sm sm:text-base">Dashboard</span>
        </button>
        <button 
          onClick={() => handleNavigation('/repositories')}
          className={cn(
            "nav-item w-full text-left py-2 px-3 rounded-md flex items-center transition-colors", 
            isActive('/repositories') ? "bg-primary/10 text-primary" : "hover:bg-muted"
          )}
        >
          <GitBranch className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
          <span className="text-sm sm:text-base">Repositories</span>
        </button>
        <button 
          onClick={() => handleNavigation('/analysis')}
          className={cn(
            "nav-item w-full text-left py-2 px-3 rounded-md flex items-center transition-colors", 
            isActive('/analysis') ? "bg-primary/10 text-primary" : "hover:bg-muted"
          )}
        >
          <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
          <span className="text-sm sm:text-base">Code Analysis</span>
        </button>
        <button 
          onClick={() => handleNavigation('/vulnerabilities')}
          className={cn(
            "nav-item w-full text-left py-2 px-3 rounded-md flex items-center transition-colors", 
            isActive('/vulnerabilities') ? "bg-primary/10 text-primary" : "hover:bg-muted"
          )}
        >
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
          <span className="text-sm sm:text-base">Vulnerabilities</span>
        </button>
        <button 
          onClick={() => handleNavigation('/reports')}
          className={cn(
            "nav-item w-full text-left py-2 px-3 rounded-md flex items-center transition-colors", 
            isActive('/reports') ? "bg-primary/10 text-primary" : "hover:bg-muted"
          )}
        >
          <BarChart className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
          <span className="text-sm sm:text-base">Reports</span>
        </button>
        <button 
          onClick={() => handleNavigation('/export')}
          className={cn(
            "nav-item w-full text-left py-2 px-3 rounded-md flex items-center transition-colors", 
            isActive('/export') ? "bg-primary/10 text-primary" : "hover:bg-muted"
          )}
        >
          <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
          <span className="text-sm sm:text-base">Export</span>
        </button>
      </nav>
      <div className="p-3 sm:p-4 border-t border-sidebar-border">
        <button 
          onClick={() => handleNavigation('/settings')}
          className={cn(
            "nav-item w-full text-left py-2 px-3 rounded-md flex items-center transition-colors", 
            isActive('/settings') ? "bg-primary/10 text-primary" : "hover:bg-muted"
          )}
        >
          <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
          <span className="text-sm sm:text-base">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
