
import React from 'react';
import { Bell, User, GitPullRequest } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLocation } from 'react-router-dom';

interface TopNavProps {
  children?: React.ReactNode;
}

const TopNav = ({ children }: TopNavProps) => {
  const location = useLocation();

  // Get the page title based on the current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/repositories':
        return 'Repositories';
      case '/analysis':
        return 'Code Analysis';
      case '/vulnerabilities':
        return 'Vulnerabilities';
      case '/reports':
        return 'Reports';
      case '/export':
        return 'Export';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        {children}
        <h2 className="font-semibold">{getPageTitle()}</h2>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="outline" size="icon" className="hidden md:flex">
          <GitPullRequest className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNav;
