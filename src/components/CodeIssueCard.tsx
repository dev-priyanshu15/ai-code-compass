
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CodeIssueCardProps {
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  filePath: string;
  lineNumber: number;
  codeSnippet: string;
  tool: string;
  onClick: () => void;
}

const CodeIssueCard = ({
  title,
  severity,
  filePath,
  lineNumber,
  codeSnippet,
  tool,
  onClick
}: CodeIssueCardProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-700 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:border-primary/50 transition-colors"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className={getSeverityColor(severity)}>
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </Badge>
          <Badge variant="outline">{tool}</Badge>
        </div>
        <CardTitle className="text-base mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-xs text-muted-foreground mb-2">{filePath}:{lineNumber}</div>
        <pre className="code-block text-xs max-h-24 overflow-y-auto">
          <code>{codeSnippet}</code>
        </pre>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-1">
        Click to view details
      </CardFooter>
    </Card>
  );
};

export default CodeIssueCard;
