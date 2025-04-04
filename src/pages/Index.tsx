
import React from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitBranch, Code, AlertTriangle, Github, Gitlab, Download, ChevronsUpDown } from 'lucide-react';
import StatisticCard from '@/components/StatisticCard';
import IntegrationCard from '@/components/IntegrationCard';
import LanguageSupportIndicator from '@/components/LanguageSupportIndicator';
import WebhookSetup from '@/components/WebhookSetup';
import RepositoryConnection from '@/components/RepositoryConnection';
import VulnerabilityScanner from '@/components/VulnerabilityScanner';
import CodeIssueCard from '@/components/CodeIssueCard';
import ExportOptions from '@/components/ExportOptions';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();

  const handleIntegrationClick = (integrationName: string) => {
    toast({
      title: `${integrationName} Integration`,
      description: `Connecting to ${integrationName}...`,
    });
  };

  const handleIssueClick = (issueTitle: string) => {
    toast({
      title: 'Issue Details',
      description: `Viewing details for "${issueTitle}"`,
    });
  };

  const supportedLanguages = [
    { language: 'JavaScript', supported: true, coverage: 'full' as const },
    { language: 'TypeScript', supported: true, coverage: 'full' as const },
    { language: 'Python', supported: true, coverage: 'full' as const },
    { language: 'Go', supported: true, coverage: 'partial' as const },
    { language: 'Java', supported: true, coverage: 'partial' as const },
    { language: 'Ruby', supported: true, coverage: 'experimental' as const },
    { language: 'PHP', supported: true, coverage: 'experimental' as const },
    { language: 'C#', supported: false },
    { language: 'Swift', supported: false },
  ];

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Keploy AI-Powered-Code-Compass</h1>
        <Button size="sm" className="w-full sm:w-auto">
          New Repository
          <GitBranch className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <StatisticCard
          title="Repositories"
          value="4"
          description="Total connected repositories"
          icon={<GitBranch className="h-4 w-4" />}
        />
        <StatisticCard
          title="Code Issues"
          value="24"
          description="Issues found in last 30 days"
          icon={<Code className="h-4 w-4" />}
          trend={{ value: 14, isPositive: false }}
        />
        <StatisticCard
          title="Vulnerabilities"
          value="7"
          description="Dependency vulnerabilities"
          icon={<AlertTriangle className="h-4 w-4" />}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="w-full grid grid-cols-4 h-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">Overview</TabsTrigger>
          <TabsTrigger value="connections" className="text-xs sm:text-sm py-2">Connections</TabsTrigger>
          <TabsTrigger value="analysis" className="text-xs sm:text-sm py-2">Analysis</TabsTrigger>
          <TabsTrigger value="export" className="text-xs sm:text-sm py-2">Export</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Recent Issues</CardTitle>
                <CardDescription>Latest code issues detected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <CodeIssueCard
                    title="Potential security vulnerability in dependency"
                    severity="high"
                    filePath="package.json"
                    lineNumber={15}
                    codeSnippet={`"express": "4.16.1",\n"lodash": "4.17.11"\n`}
                    tool="OWASP Dependency-Check"
                    onClick={() => handleIssueClick("Potential security vulnerability in dependency")}
                  />
                  <CodeIssueCard
                    title="Missing error handling in async function"
                    severity="medium"
                    filePath="src/api/users.js"
                    lineNumber={42}
                    codeSnippet={`async function fetchUsers() {\n  const response = await fetch('/api/users');\n  const data = await response.json();\n  return data;\n}`}
                    tool="ESLint"
                    onClick={() => handleIssueClick("Missing error handling in async function")}
                  />
                  <CodeIssueCard
                    title="Unused variable"
                    severity="low"
                    filePath="src/components/UserList.jsx"
                    lineNumber={8}
                    codeSnippet={`const UserList = ({ users, loading, error }) => {\n  // loading and error are never used\n  return (\n    <div>{users.map(user => <User key={user.id} {...user} />)}</div>\n  );\n}`}
                    tool="ESLint"
                    onClick={() => handleIssueClick("Unused variable")}
                  />
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Supported Languages</CardTitle>
                  <CardDescription>Languages with analysis support</CardDescription>
                </CardHeader>
                <CardContent>
                  <LanguageSupportIndicator languages={supportedLanguages} />
                </CardContent>
              </Card>
              <VulnerabilityScanner />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="connections">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">CI/CD Integrations</CardTitle>
                  <CardDescription>Connect your CI/CD platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <IntegrationCard
                      title="GitHub Actions"
                      description="Integrate with GitHub Actions workflows"
                      icon={<Github className="h-6 w-6 text-primary" />}
                      status="connected"
                      onClick={() => handleIntegrationClick("GitHub Actions")}
                    />
                    <IntegrationCard
                      title="GitLab CI"
                      description="Integrate with GitLab CI/CD pipelines"
                      icon={<Gitlab className="h-6 w-6 text-primary" />}
                      status="not-connected"
                      onClick={() => handleIntegrationClick("GitLab CI")}
                    />
                    <IntegrationCard
                      title="Jenkins"
                      description="Integrate with Jenkins pipelines"
                      icon={<ChevronsUpDown className="h-6 w-6 text-primary" />}
                      status="not-connected"
                      onClick={() => handleIntegrationClick("Jenkins")}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <RepositoryConnection />
              <WebhookSetup />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Analysis Configuration</CardTitle>
                <CardDescription>Configure code analysis settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Configure which analyzers and rules to apply to your repositories
                </p>
                <Button variant="outline" className="w-full" size="sm">
                  Configure Analyzers
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Analysis Scheduling</CardTitle>
                <CardDescription>Schedule automated code analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Set up scheduled analysis to automatically review your code
                </p>
                <Button variant="outline" className="w-full" size="sm">
                  Configure Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="export">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <ExportOptions />
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Exports History</CardTitle>
                <CardDescription>Previous exported reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Download className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">No export history available</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Index;
