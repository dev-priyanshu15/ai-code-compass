
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'not-connected';
  onClick: () => void;
}

const IntegrationCard = ({
  title,
  description,
  icon,
  status,
  onClick
}: IntegrationCardProps) => {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-primary/10 rounded-md">{icon}</div>
          <Badge 
            className={cn(
              status === 'connected' ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground'
            )}
          >
            {status === 'connected' ? 'Connected' : 'Not Connected'}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <Button 
          onClick={onClick} 
          variant={status === 'connected' ? 'secondary' : 'default'}
          className="w-full"
        >
          {status === 'connected' ? 'Configure' : 'Connect'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IntegrationCard;
