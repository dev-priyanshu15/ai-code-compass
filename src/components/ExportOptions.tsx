
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileJson, FileText, File } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ExportOptions = () => {
  const { toast } = useToast();
  const [format, setFormat] = useState('json');
  const [loading, setLoading] = useState(false);
  
  const handleExport = () => {
    setLoading(true);
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: 'Export Complete',
        description: `Report has been exported as ${format.toUpperCase()}`,
      });
      setLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-base sm:text-lg">
          <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Export Report
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Export your code review results in various formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={format} 
          onValueChange={setFormat}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="json" id="json" />
            <Label 
              htmlFor="json" 
              className="flex items-center cursor-pointer text-sm"
            >
              <FileJson className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
              JSON Format
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="markdown" id="markdown" />
            <Label 
              htmlFor="markdown"
              className="flex items-center cursor-pointer text-sm"
            >
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-500" />
              Markdown Format
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pdf" id="pdf" />
            <Label 
              htmlFor="pdf"
              className="flex items-center cursor-pointer text-sm"
            >
              <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-500" />
              PDF Format
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleExport} 
          disabled={loading}
          className="w-full text-sm"
          size="sm"
        >
          {loading ? 'Exporting...' : 'Export Report'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExportOptions;
