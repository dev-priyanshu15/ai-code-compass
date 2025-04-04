
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { GitBranch, Search, Plus, Trash2, ExternalLink, RefreshCw, Code, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Repository {
  id: string;
  name: string;
  url: string;
  branch: string;
  language: string;
  lastScanned: string;
}

const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'react-dashboard',
    url: 'https://github.com/user/react-dashboard',
    branch: 'main',
    language: 'TypeScript',
    lastScanned: '2023-04-03T10:30:00Z',
  },
  {
    id: '2',
    name: 'api-service',
    url: 'https://github.com/user/api-service',
    branch: 'develop',
    language: 'JavaScript',
    lastScanned: '2023-04-01T14:15:00Z',
  },
  {
    id: '3',
    name: 'mobile-app',
    url: 'https://github.com/user/mobile-app',
    branch: 'feature/auth',
    language: 'TypeScript',
    lastScanned: '2023-03-28T09:45:00Z',
  },
];

const Repositories = () => {
  const { toast } = useToast();
  const [repositories, setRepositories] = useState<Repository[]>(mockRepositories);
  const [searchTerm, setSearchTerm] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [branchName, setBranchName] = useState('main');
  const [isAddingRepo, setIsAddingRepo] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
    }).format(date);
  };

  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRepository = () => {
    if (!repoUrl) {
      toast({
        title: "Error",
        description: "Please enter a repository URL",
        variant: "destructive",
      });
      return;
    }

    // Extract repo name from URL
    let repoName = 'unknown-repo';
    try {
      const urlParts = new URL(repoUrl).pathname.split('/');
      if (urlParts.length >= 2) {
        repoName = urlParts[urlParts.length - 1];
      }
    } catch (e) {
      // If URL parsing fails, use fallback name
    }

    const newRepo: Repository = {
      id: `repo-${Date.now()}`,
      name: repoName,
      url: repoUrl,
      branch: branchName,
      language: 'Not scanned',
      lastScanned: new Date().toISOString(),
    };

    setRepositories([...repositories, newRepo]);
    setRepoUrl('');
    setBranchName('main');
    setIsAddingRepo(false);

    toast({
      title: "Repository added",
      description: `${repoName} has been added successfully`,
    });
  };

  const removeRepository = (id: string) => {
    const repoToRemove = repositories.find(repo => repo.id === id);
    setRepositories(repositories.filter(repo => repo.id !== id));
    
    toast({
      title: "Repository removed",
      description: `${repoToRemove?.name || 'Repository'} has been removed`,
    });
  };

  const scanRepository = (id: string) => {
    const repoToScan = repositories.find(repo => repo.id === id);
    
    toast({
      title: "Scan initiated",
      description: `Scanning ${repoToScan?.name || 'repository'} for issues...`,
    });

    // In a real app, this would trigger an actual scan
    setTimeout(() => {
      toast({
        title: "Scan complete",
        description: `${repoToScan?.name || 'Repository'} has been scanned successfully`,
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Repositories</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search repositories..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Repository
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add Repository</SheetTitle>
                <SheetDescription>
                  Connect a GitHub repository to start analyzing code.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="repo-url" className="text-sm font-medium">
                    Repository URL
                  </label>
                  <Input
                    id="repo-url"
                    placeholder="https://github.com/username/repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="branch" className="text-sm font-medium">
                    Branch
                  </label>
                  <Input
                    id="branch"
                    placeholder="main"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                  />
                </div>
              </div>
              <SheetFooter>
                <Button onClick={handleAddRepository}>
                  <Check className="h-4 w-4 mr-2" />
                  Add Repository
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {filteredRepositories.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <GitBranch className="h-12 w-12 text-muted-foreground mb-4" />
            {searchTerm ? (
              <>
                <h3 className="text-lg font-medium mb-2">No matching repositories</h3>
                <p className="text-center text-sm text-muted-foreground mb-6">
                  No repositories match your search term "{searchTerm}".
                </p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>Clear Search</Button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium mb-2">No repositories connected</h3>
                <p className="text-center text-sm text-muted-foreground mb-6 max-w-md">
                  Connect a GitHub repository to start analyzing your code for quality issues and vulnerabilities.
                </p>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>Add Your First Repository</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Add Repository</SheetTitle>
                      <SheetDescription>
                        Connect a GitHub repository to start analyzing code.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="repo-url-first" className="text-sm font-medium">
                          Repository URL
                        </label>
                        <Input
                          id="repo-url-first"
                          placeholder="https://github.com/username/repo"
                          value={repoUrl}
                          onChange={(e) => setRepoUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="branch-first" className="text-sm font-medium">
                          Branch
                        </label>
                        <Input
                          id="branch-first"
                          placeholder="main"
                          value={branchName}
                          onChange={(e) => setBranchName(e.target.value)}
                        />
                      </div>
                    </div>
                    <SheetFooter>
                      <Button onClick={handleAddRepository}>
                        <Check className="h-4 w-4 mr-2" />
                        Add Repository
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRepositories.map((repo) => (
            <Card key={repo.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <GitBranch className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{repo.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <a 
                          href={repo.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground flex items-center hover:underline"
                        >
                          {repo.url}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          <GitBranch className="h-3 w-3 mr-1" />
                          {repo.branch}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Code className="h-3 w-3 mr-1" />
                          {repo.language}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Last scanned: {formatDate(repo.lastScanned)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0 space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8"
                      onClick={() => scanRepository(repo.id)}
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />
                      Scan
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeRepository(repo.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Repositories;
