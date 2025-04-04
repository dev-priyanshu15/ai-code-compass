
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GitBranch, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const RepositoryConnection = () => {
  const { toast } = useToast();
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleConnect = () => {
    if (!repoUrl) {
      toast({
        title: 'Repository URL required',
        description: 'Please enter a valid repository URL',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Repository connected',
        description: 'Successfully connected to repository',
      });
      setLoading(false);
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GitBranch className="mr-2 h-5 w-5" />
          Connect Repository
        </CardTitle>
        <CardDescription>
          Add a repository to start analyzing code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repoUrl">Repository URL</Label>
            <Input
              id="repoUrl"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConnect} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Connecting...' : 'Connect'}
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RepositoryConnection;
