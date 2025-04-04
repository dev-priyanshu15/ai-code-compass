
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { BarChart, Download, FileText, AlertTriangle, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type ReportType = 'code-quality' | 'vulnerability' | 'dependency';
type ReportStatus = 'idle' | 'generating' | 'completed';

interface GeneratedReport {
  id: string;
  title: string;
  type: ReportType;
  date: string;
  status: ReportStatus;
}

const Reports = () => {
  const { toast } = useToast();
  const [generatingReport, setGeneratingReport] = useState<ReportType | null>(null);
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [progress, setProgress] = useState(0);

  const generateReport = (type: ReportType) => {
    if (generatingReport !== null) {
      toast({
        title: "Already generating a report",
        description: "Please wait for the current report to complete",
        variant: "destructive",
      });
      return;
    }

    setGeneratingReport(type);
    setProgress(0);

    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 15);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 500);

    // Simulate report generation completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Create new report
      const newReport: GeneratedReport = {
        id: `report-${Date.now()}`,
        title: getReportTitle(type),
        type,
        date: new Date().toISOString(),
        status: 'completed'
      };
      
      setReports(prev => [newReport, ...prev]);
      setGeneratingReport(null);
      
      toast({
        title: "Report generated successfully",
        description: `Your ${getReportTitle(type)} is ready to view`,
      });
    }, 5000);
  };

  const getReportTitle = (type: ReportType): string => {
    switch (type) {
      case 'code-quality':
        return 'Code Quality Report';
      case 'vulnerability':
        return 'Vulnerability Summary';
      case 'dependency':
        return 'Dependency Audit';
      default:
        return 'Report';
    }
  };

  const getReportIcon = (type: ReportType) => {
    switch (type) {
      case 'code-quality':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'vulnerability':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'dependency':
        return <BarChart className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const downloadReport = (id: string) => {
    toast({
      title: "Download started",
      description: "Your report is being downloaded",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Reports</h1>
        <Button size="sm" className="w-full sm:w-auto">
          Generate New Report
          <BarChart className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Available Reports</CardTitle>
            <CardDescription>Generate and view reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-1">Code Quality Report</h3>
                <p className="text-sm text-muted-foreground mb-3">Overview of code quality metrics across repositories</p>
                {generatingReport === 'code-quality' ? (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" /> Generating report... {progress}%
                    </p>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => generateReport('code-quality')}
                    disabled={generatingReport !== null}
                  >
                    Generate
                  </Button>
                )}
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-1">Vulnerability Summary</h3>
                <p className="text-sm text-muted-foreground mb-3">Summary of detected vulnerabilities and risks</p>
                {generatingReport === 'vulnerability' ? (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" /> Generating report... {progress}%
                    </p>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateReport('vulnerability')}
                    disabled={generatingReport !== null}
                  >
                    Generate
                  </Button>
                )}
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-1">Dependency Audit</h3>
                <p className="text-sm text-muted-foreground mb-3">Analysis of dependencies and potential issues</p>
                {generatingReport === 'dependency' ? (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" /> Generating report... {progress}%
                    </p>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateReport('dependency')}
                    disabled={generatingReport !== null}
                  >
                    Generate
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Report History</CardTitle>
            <CardDescription>Previously generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Download className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No reports have been generated yet</p>
                <p className="text-xs mt-2">Generate a report to see it here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map(report => (
                  <div key={report.id} className="border rounded-md p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2">
                        {getReportIcon(report.type)}
                        <div>
                          <h4 className="font-medium text-sm">{report.title}</h4>
                          <p className="text-xs text-muted-foreground">{formatDate(report.date)}</p>
                          <Badge variant="outline" className="mt-1 h-5 text-xs px-1.5">
                            <Check className="mr-1 h-3 w-3 text-green-500" /> 
                            Ready
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => downloadReport(report.id)}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
