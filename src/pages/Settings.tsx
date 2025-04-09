
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Save, Upload, Check, Building, Users, Laptop, BellRing, FileCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNotifications, createSystemNotification } from "@/hooks/useNotifications";

export default function Settings() {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  
  // Company settings
  const [companyName, setCompanyName] = useState("Acme Corporation");
  const [companyEmail, setCompanyEmail] = useState("info@acmecorp.com");
  const [companyPhone, setCompanyPhone] = useState("(123) 456-7890");
  const [companyAddress, setCompanyAddress] = useState("123 Business Street, Suite 100");
  const [companyCity, setCompanyCity] = useState("San Francisco");
  const [companyState, setCompanyState] = useState("CA");
  const [companyZip, setCompanyZip] = useState("94107");
  const [companyCountry, setCompanyCountry] = useState("United States");
  const [companyLogo, setCompanyLogo] = useState("/placeholder.svg");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [orderStatusUpdates, setOrderStatusUpdates] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  
  // System settings
  const [darkMode, setDarkMode] = useState(false);
  const [autoLogout, setAutoLogout] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState([30]);
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [backupFrequency, setBackupFrequency] = useState("daily");
  
  const handleSaveCompanySettings = () => {
    toast({
      title: "Company Settings Saved",
      description: "Your company settings have been updated successfully.",
      variant: "default",
    });
    
    // Generate a notification
    const notification = createSystemNotification(
      "system",
      "updated",
      "Company Settings",
      "Company profile information has been updated."
    );
    addNotification(notification);
  };
  
  const handleSaveNotificationSettings = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated successfully.",
      variant: "default",
    });
    
    // Generate a notification
    const notification = createSystemNotification(
      "system",
      "updated",
      "Notification Settings",
      "Notification preferences have been updated."
    );
    addNotification(notification);
  };
  
  const handleSaveSystemSettings = () => {
    toast({
      title: "System Settings Saved",
      description: "Your system settings have been updated successfully.",
      variant: "default",
    });
    
    // Generate a notification
    const notification = createSystemNotification(
      "system",
      "updated",
      "System Settings",
      "System configuration has been updated."
    );
    addNotification(notification);
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload the file to a server here
      // For demo purposes, we'll just show a success message
      toast({
        title: "Logo Uploaded",
        description: "Your company logo has been uploaded successfully.",
        variant: "default",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your system preferences
        </p>
      </div>

      <Tabs defaultValue="company">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="backup">Backup & Recovery</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="company" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Manage your company details and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input 
                      id="companyEmail" 
                      type="email" 
                      value={companyEmail} 
                      onChange={(e) => setCompanyEmail(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Phone</Label>
                    <Input 
                      id="companyPhone" 
                      value={companyPhone} 
                      onChange={(e) => setCompanyPhone(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyAddress">Address</Label>
                    <Input 
                      id="companyAddress" 
                      value={companyAddress} 
                      onChange={(e) => setCompanyAddress(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyCity">City</Label>
                    <Input 
                      id="companyCity" 
                      value={companyCity} 
                      onChange={(e) => setCompanyCity(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyState">State</Label>
                    <Input 
                      id="companyState" 
                      value={companyState} 
                      onChange={(e) => setCompanyState(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyZip">Postal Code</Label>
                    <Input 
                      id="companyZip" 
                      value={companyZip} 
                      onChange={(e) => setCompanyZip(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyCountry">Country</Label>
                    <Input 
                      id="companyCountry" 
                      value={companyCountry} 
                      onChange={(e) => setCompanyCountry(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-md border overflow-hidden">
                      <img 
                        src={companyLogo} 
                        alt="Company Logo" 
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <Input 
                        id="logo" 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleLogoUpload}
                      />
                      <Label 
                        htmlFor="logo" 
                        className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">Recommended size: 512x512px</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveCompanySettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
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
              <div className="rounded-md border p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-medium">User Management Coming Soon</h2>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  This section will allow you to create, edit, and manage user accounts 
                  and their permissions within the system. Stay tuned for updates!
                </p>
                <Button className="mt-4" variant="outline">Get Notified When Available</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      id="emailNotifications" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="systemNotifications">System Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                    </div>
                    <Switch 
                      id="systemNotifications" 
                      checked={systemNotifications}
                      onCheckedChange={setSystemNotifications}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                      <p className="text-sm text-muted-foreground">Notify when inventory items are low</p>
                    </div>
                    <Switch 
                      id="lowStockAlerts" 
                      checked={lowStockAlerts}
                      onCheckedChange={setLowStockAlerts}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="orderStatusUpdates">Order Status Updates</Label>
                      <p className="text-sm text-muted-foreground">Notify when order status changes</p>
                    </div>
                    <Switch 
                      id="orderStatusUpdates" 
                      checked={orderStatusUpdates}
                      onCheckedChange={setOrderStatusUpdates}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="paymentReminders">Payment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Notify about upcoming or overdue payments</p>
                    </div>
                    <Switch 
                      id="paymentReminders" 
                      checked={paymentReminders}
                      onCheckedChange={setPaymentReminders}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveNotificationSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure system-wide preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Use dark theme throughout the application</p>
                    </div>
                    <Switch 
                      id="darkMode" 
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoLogout">Auto Logout</Label>
                      <p className="text-sm text-muted-foreground">Automatically log out after period of inactivity</p>
                    </div>
                    <Switch 
                      id="autoLogout" 
                      checked={autoLogout}
                      onCheckedChange={setAutoLogout}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <span className="text-sm text-muted-foreground">{sessionTimeout} min</span>
                    </div>
                    <Slider 
                      id="session-timeout"
                      disabled={!autoLogout}
                      min={5}
                      max={60}
                      step={5}
                      value={sessionTimeout}
                      onValueChange={setSessionTimeout}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultCurrency">Default Currency</Label>
                    <select 
                      id="defaultCurrency"
                      value={defaultCurrency}
                      onChange={(e) => setDefaultCurrency(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <select 
                      id="dateFormat"
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSystemSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="backup" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Data Recovery</CardTitle>
              <CardDescription>
                Configure automatic backups and data restoration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md bg-primary/10 p-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium text-primary">Auto-Backup Enabled</h3>
                    <p className="text-sm text-muted-foreground">Your data is automatically backed up daily</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <select 
                    id="backupFrequency"
                    value={backupFrequency}
                    onChange={(e) => setBackupFrequency(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="retention">Backup Retention Period</Label>
                  <select 
                    id="retention"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="7">7 days</option>
                    <option value="30" selected>30 days</option>
                    <option value="90">90 days</option>
                    <option value="365">1 year</option>
                  </select>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Manual Backup</h3>
                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="justify-start">
                    <FileCheck className="mr-2 h-4 w-4" />
                    Create Backup Now
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Recent Backups</h3>
                <div className="rounded-md border">
                  <div className="p-4 border-b flex justify-between items-center">
                    <div>
                      <p className="font-medium">Daily Backup</p>
                      <p className="text-sm text-muted-foreground">Today, 03:15 AM</p>
                    </div>
                    <Button variant="ghost" size="sm">Restore</Button>
                  </div>
                  <div className="p-4 border-b flex justify-between items-center">
                    <div>
                      <p className="font-medium">Daily Backup</p>
                      <p className="text-sm text-muted-foreground">Yesterday, 03:15 AM</p>
                    </div>
                    <Button variant="ghost" size="sm">Restore</Button>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Weekly Backup</p>
                      <p className="text-sm text-muted-foreground">Apr 2, 2025, 12:00 AM</p>
                    </div>
                    <Button variant="ghost" size="sm">Restore</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Backup Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
