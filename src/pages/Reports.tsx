
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { getProducts, getOrders } from "@/lib/mockData";
import { FileDown, TrendingUp, DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

// Chart color constants
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function Reports() {
  const [reportTimeframe, setReportTimeframe] = useState("monthly");
  const { toast } = useToast();
  
  // Get mock data
  const orders = getOrders();
  const products = getProducts();
  
  // Calculate revenue by month (using mock data)
  const monthlyRevenue = [
    { name: 'Jan', revenue: 12500 },
    { name: 'Feb', revenue: 14800 },
    { name: 'Mar', revenue: 13200 },
    { name: 'Apr', revenue: 15400 },
    { name: 'May', revenue: 16800 },
    { name: 'Jun', revenue: 14900 },
    { name: 'Jul', revenue: 15700 },
    { name: 'Aug', revenue: 16900 },
    { name: 'Sep', revenue: 17800 },
    { name: 'Oct', revenue: 18500 },
    { name: 'Nov', revenue: 19200 },
    { name: 'Dec', revenue: 21000 },
  ];
  
  // Calculate revenue by category
  const revenueByCategory = [
    { name: 'Electronics', value: 42000 },
    { name: 'Furniture', value: 28000 },
    { name: 'Office Supplies', value: 18000 },
    { name: 'Other', value: 12000 },
  ];
  
  // Calculate orders by status
  const ordersByStatus = [
    { name: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { name: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { name: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { name: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { name: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length },
  ];
  
  // Top selling products
  const topSellingProducts = products
    .slice(0, 5)
    .map(product => ({
      name: product.name,
      sales: Math.floor(Math.random() * 200) + 50
    }));
  
  const handleExportReports = () => {
    toast({
      title: "Reports Exported",
      description: "Your reports have been exported to Excel successfully.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            View and generate business reports
          </p>
        </div>
        <Button onClick={handleExportReports}>
          <FileDown className="mr-2 h-4 w-4" /> Export Reports
        </Button>
      </div>
      
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">$198,500</h3>
            <p className="text-muted-foreground text-sm">Total Revenue</p>
            <p className="text-green-600 text-xs font-medium mt-1">↑ 12.5% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{orders.length}</h3>
            <p className="text-muted-foreground text-sm">Total Orders</p>
            <p className="text-green-600 text-xs font-medium mt-1">↑ 8.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{products.length}</h3>
            <p className="text-muted-foreground text-sm">Products</p>
            <p className="text-green-600 text-xs font-medium mt-1">↑ 5.3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">24</h3>
            <p className="text-muted-foreground text-sm">Active Customers</p>
            <p className="text-green-600 text-xs font-medium mt-1">↑ 3.7% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Revenue trend over months</CardDescription>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" onClick={() => setReportTimeframe("monthly")}>
                      Monthly
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyRevenue}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Revenue']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Revenue breakdown by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {revenueByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Products with the highest sales numbers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topSellingProducts}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders by Status</CardTitle>
              <CardDescription>Breakdown of orders by current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ordersByStatus}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
