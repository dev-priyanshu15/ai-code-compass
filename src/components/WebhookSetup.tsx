
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clipboard, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WebhookSetup = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // In a real app, this would be generated or fetched from the backend
  const webhookUrl = 'https://codecompass.example.com/webhook/gh_123456789';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl).then(() => {
      setCopied(true);
      toast({
        title: 'Copied to clipboard',
        description: 'Webhook URL has been copied to your clipboard.',
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Webhook Setup</CardTitle>
        <CardDescription>
          Configure this webhook in your repository settings to enable automatic code reviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Your Webhook URL</h3>
            <div className="flex">
              <Input 
                value={webhookUrl} 
                readOnly 
                className="font-mono text-sm bg-muted"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="ml-2" 
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Webhook Events</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Pull request events</li>
              <li>• Push events</li>
              <li>• Repository events</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="px-0">
          View documentation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WebhookSetup;
