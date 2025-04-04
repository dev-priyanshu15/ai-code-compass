
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { ShieldAlert, AlertTriangle, Shield, CheckCircle, Package, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock vulnerability data
const mockVulnerabilityData = [
  {
    id: 'CVE-2023-1234',
    name: 'SQL Injection Vulnerability',
    severity: 'critical',
    description: 'A vulnerability that allows an attacker to inject malicious SQL code.',
    affected: 'src/services/database.ts',
    fix: 'Update to the latest version or use prepared statements.',
  },
  {
    id: 'CVE-2023-5678',
    name: 'Cross-Site Scripting (XSS)',
    severity: 'high',
    description: 'A vulnerability that allows attackers to inject client-side scripts.',
    affected: 'src/components/CommentForm.jsx',
    fix: 'Sanitize user input before rendering.',
  },
  {
    id: 'CVE-2023-9012',
    name: 'Outdated Dependency',
    severity: 'medium',
    description: 'Using an outdated package with known security issues.',
    affected: 'package.json - react-markdown@4.2.0',
    fix: 'Update to the latest version.',
  },
  {
    id: 'CVE-2023-3456',
    name: 'Insecure Authentication',
    severity: 'medium',
    description: 'Authentication mechanism susceptible to token theft.',
    affected: 'src/auth/authService.ts',
    fix: 'Implement secure token handling and refresh mechanisms.',
  },
  {
    id: 'CVE-2023-7890',
    name: 'Information Disclosure',
    severity: 'low',
    description: 'Sensitive debugging information exposed in responses.',
    affected: 'src/middleware/errorHandler.js',
    fix: 'Disable debug information in production environments.',
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'low':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical':
      return <ShieldAlert className="h-5 w-5 text-red-600" />;
    case 'high':
      return <AlertTriangle className="h-5 w-5 text-orange-600" />;
    case 'medium':
      return <AlertTriangle className="h-5 w-5 text-amber-600" />;
    case 'low':
      return <Info className="h-5 w-5 text-blue-600" />;
    default:
      return <Info className="h-5 w-5 text-gray-600" />;
  }
};

const Vulnerabilities = () => {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState<typeof mockVulnerabilityData>([]);
  const [expandedVulnerability, setExpandedVulnerability] = useState<string | null>(null);

  const startScan = () => {
    setScanning(true);
    setProgress(0);
    setScanComplete(false);
    setVulnerabilities([]);

    // Simulate scan progress
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

    // Simulate scan completion
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
      setVulnerabilities(mockVulnerabilityData);
      toast({
        title: "Vulnerability Scan Complete",
        description: `Detected ${mockVulnerabilityData.length} potential vulnerabilities`,
      });
    }, 5000);
  };

  const toggleVulnerabilityDetails = (id: string) => {
    setExpandedVulnerability(expandedVulnerability === id ? null : id);
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Vulnerabilities</h1>
        <Button 
          onClick={startScan} 
          disabled={scanning}
          size="sm"
          className="w-full sm:w-auto"
        >
          {scanning ? 'Scanning...' : 'Scan for Vulnerabilities'}
          <Shield className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {scanning && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium mb-2">Vulnerability Scan in Progress</h3>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">
              Scanning code and dependencies for security vulnerabilities... {progress}%
            </p>
          </CardContent>
        </Card>
      )}

      {scanComplete && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Critical</p>
                    <h3 className="text-2xl font-bold">1</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <ShieldAlert className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">High</p>
                    <h3 className="text-2xl font-bold">1</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Medium</p>
                    <h3 className="text-2xl font-bold">2</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Low</p>
                    <h3 className="text-2xl font-bold">1</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detected Vulnerabilities</CardTitle>
              <CardDescription>Security issues found in your codebase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilities.map((vulnerability) => (
                  <div key={vulnerability.id} className="border rounded-md overflow-hidden">
                    <div 
                      className="p-4 cursor-pointer flex items-start justify-between"
                      onClick={() => toggleVulnerabilityDetails(vulnerability.id)}
                    >
                      <div className="flex items-start space-x-3">
                        {getSeverityIcon(vulnerability.severity)}
                        <div>
                          <h4 className="font-medium">{vulnerability.name}</h4>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge
                              className={`${getSeverityColor(vulnerability.severity)} border`}
                              variant="outline"
                            >
                              {vulnerability.severity}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{vulnerability.id}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Toggle details</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`h-4 w-4 transition-transform ${
                            expandedVulnerability === vulnerability.id ? "transform rotate-180" : ""
                          }`}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </Button>
                    </div>
                    {expandedVulnerability === vulnerability.id && (
                      <div className="p-4 border-t bg-muted/50">
                        <div className="space-y-3">
                          <div>
                            <h5 className="text-sm font-medium">Description</h5>
                            <p className="text-sm text-muted-foreground">{vulnerability.description}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium">Affected Component</h5>
                            <p className="text-sm text-muted-foreground">{vulnerability.affected}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium">Recommended Fix</h5>
                            <p className="text-sm text-muted-foreground">{vulnerability.fix}</p>
                          </div>
                          <div className="pt-2">
                            <Button size="sm" variant="outline" className="mr-2">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Mark as Fixed
                            </Button>
                            <Button size="sm" variant="outline">
                              <Package className="mr-1 h-4 w-4" />
                              View Dependencies
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">Export Findings</Button>
              <Button size="sm">Fix All Issues</Button>
            </CardFooter>
          </Card>
        </>
      )}

      {!scanning && !scanComplete && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Vulnerability Data</h3>
            <p className="text-center text-sm text-muted-foreground mb-6 max-w-md">
              Run a vulnerability scan to identify security issues in your code and dependencies.
            </p>
            <Button onClick={startScan}>Start Scan</Button>
          </CardContent>
        </Card>
      )}
    </Layout>
  );
};

export default Vulnerabilities;
