
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExportOptions from '@/components/ExportOptions';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Settings, HelpCircle } from 'lucide-react';

const Export = () => {
  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Export</h1>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <HelpCircle className="h-4 w-4 mr-2" />
                Export Help
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Export Documentation</SheetTitle>
                <SheetDescription>
                  Learn how to effectively export your data
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <h3 className="font-medium text-sm mb-1">Available Formats</h3>
                  <p className="text-sm text-muted-foreground">
                    CodeCompass supports exporting in JSON, Markdown, and PDF formats. 
                    Each format has specific benefits depending on your use case.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">What's Included</h3>
                  <p className="text-sm text-muted-foreground">
                    Exports include all analysis details, code quality metrics, 
                    vulnerability information, and dependency data from your selected repositories.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Custom Exports</h3>
                  <p className="text-sm text-muted-foreground">
                    For tailored exports with specific data points, use the settings
                    panel to customize what's included in your export file.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1">
            <TabsTrigger value="reports" className="text-xs sm:text-sm py-2">Export Reports</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm py-2">Export Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="reports" className="px-1 py-4 sm:p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExportOptions />
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-medium mb-2">Recently Exported</h3>
                      <div className="text-center py-6 text-muted-foreground border border-dashed rounded-md">
                        <p className="text-sm">No recent exports</p>
                        <p className="text-xs mt-1">Your export history will appear here</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium mb-2">Export Tips</h3>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          Export reports regularly to track progress over time
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          JSON format is best for programmatic processing
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          PDF format is ideal for sharing with stakeholders
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="px-1 py-4 sm:p-4">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <div className="flex items-start">
                  <Settings className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Export Settings</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Configure what data is included in your exports
                    </p>
                    <Button variant="outline" size="sm" disabled>Configure</Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Coming soon: Custom export templates and scheduled exports
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default Export;
