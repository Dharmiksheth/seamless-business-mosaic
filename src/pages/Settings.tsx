
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your system preferences
        </p>
      </div>

      <Tabs defaultValue="general">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-dashed p-10 text-center">
                <h2 className="text-xl font-medium">Settings Module Coming Soon</h2>
                <p className="text-muted-foreground mt-2">
                  This section will allow you to configure system preferences, manage user accounts,
                  and customize your ERP experience.
                </p>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="company" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Configure your company details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-dashed p-10 text-center">
                <h2 className="text-lg font-medium">Company Settings Coming Soon</h2>
                <p className="text-muted-foreground mt-2">
                  This section will allow you to update your company information,
                  logo, and business details.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-dashed p-10 text-center">
                <h2 className="text-lg font-medium">User Management Coming Soon</h2>
                <p className="text-muted-foreground mt-2">
                  This section will allow you to create, edit, and manage user accounts 
                  and their permissions within the system.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="advanced" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced system options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-dashed p-10 text-center">
                <h2 className="text-lg font-medium">Advanced Settings Coming Soon</h2>
                <p className="text-muted-foreground mt-2">
                  This section will provide access to advanced configuration options
                  including system integrations and custom fields.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
