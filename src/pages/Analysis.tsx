
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { Code, RefreshCcw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Mock data for code quality metrics
const mockCodeQualityData = [
  { name: 'src/main', score: 92, issues: 3 },
  { name: 'src/utils', score: 87, issues: 8 },
  { name: 'src/components', score: 74, issues: 15 },
  { name: 'src/pages', score: 81, issues: 11 },
  { name: 'src/hooks', score: 95, issues: 2 },
];

// Mock data for code complexity
const mockComplexityData = [
  { name: 'Low', value: 65 },
  { name: 'Medium', value: 28 },
  { name: 'High', value: 7 },
];

const Analysis = () => {
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const startAnalysis = () => {
    setAnalyzing(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 15);
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 600);

    // Simulate analysis completion
    setTimeout(() => {
      setAnalyzing(false);
      setHasAnalyzed(true);
      toast({
        title: "Analysis Complete",
        description: "Code analysis has been completed successfully",
      });
    }, 5000);
  };

  const complexityColorMap = {
    Low: "#4CAF50",
    Medium: "#FF9800",
    High: "#F44336"
  };

  const chartConfig = {
    score: {
      label: "Code Quality Score",
      color: "#3b82f6",
    },
    issues: {
      label: "Issues Found",
      color: "#f97316",
    },
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Code Analysis</h1>
        <Button 
          onClick={startAnalysis} 
          disabled={analyzing}
          size="sm"
          className="w-full sm:w-auto"
        >
          {analyzing ? (
            <>Analyzing...<RefreshCcw className="ml-2 h-4 w-4 animate-spin" /></>
          ) : (
            <>Run Analysis<Code className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>

      {analyzing && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium mb-2">Analysis in Progress</h3>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">
              Analyzing code structure and quality... {progress}%
            </p>
          </CardContent>
        </Card>
      )}

      {hasAnalyzed && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Quality</p>
                    <h3 className="text-2xl font-bold">85/100</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Issues Found</p>
                    <h3 className="text-2xl font-bold">39</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Files Analyzed</p>
                    <h3 className="text-2xl font-bold">127</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Code className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="quality">
            <TabsList className="w-full max-w-md mb-6">
              <TabsTrigger value="quality" className="flex-1">Quality Metrics</TabsTrigger>
              <TabsTrigger value="complexity" className="flex-1">Code Complexity</TabsTrigger>
              <TabsTrigger value="issues" className="flex-1">Issues</TabsTrigger>
            </TabsList>
            
            <TabsContent value="quality">
              <Card>
                <CardHeader>
                  <CardTitle>Code Quality by Directory</CardTitle>
                  <CardDescription>Higher score indicates better code quality</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ChartContainer config={chartConfig}>
                      <RechartsBarChart data={mockCodeQualityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="score" fill="#3b82f6" name="score" />
                        <Bar dataKey="issues" fill="#f97316" name="issues" />
                      </RechartsBarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="complexity">
              <Card>
                <CardHeader>
                  <CardTitle>Code Complexity Distribution</CardTitle>
                  <CardDescription>Percentage of code by complexity level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mockComplexityData.map((item) => (
                      <div key={item.name} className="flex flex-col items-center">
                        <div 
                          className="w-24 h-24 rounded-full flex items-center justify-center mb-2"
                          style={{ backgroundColor: `${complexityColorMap[item.name as keyof typeof complexityColorMap]}20` }}
                        >
                          <span 
                            className="text-2xl font-bold"
                            style={{ color: complexityColorMap[item.name as keyof typeof complexityColorMap] }}
                          >
                            {item.value}%
                          </span>
                        </div>
                        <span className="text-sm font-medium">{item.name} Complexity</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="issues">
              <Card>
                <CardHeader>
                  <CardTitle>Detected Issues</CardTitle>
                  <CardDescription>Code quality and maintainability issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Unused Variables</h4>
                          <p className="text-sm text-muted-foreground">15 instances in 7 files</p>
                          <p className="text-xs mt-1">Recommended action: Remove unused variables to improve code cleanliness</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Complex Functions</h4>
                          <p className="text-sm text-muted-foreground">8 functions exceed complexity threshold</p>
                          <p className="text-xs mt-1">Recommended action: Refactor complex functions into smaller, more manageable pieces</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Inconsistent Naming</h4>
                          <p className="text-sm text-muted-foreground">11 instances of inconsistent naming conventions</p>
                          <p className="text-xs mt-1">Recommended action: Standardize naming conventions across the codebase</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">View All 39 Issues</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {!analyzing && !hasAnalyzed && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Code className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Analysis Data</h3>
            <p className="text-center text-sm text-muted-foreground mb-6 max-w-md">
              Run a code analysis to see quality metrics, complexity information, and detected issues.
            </p>
            <Button onClick={startAnalysis}>Start Analysis</Button>
          </CardContent>
        </Card>
      )}
    </Layout>
  );
};

export default Analysis;
