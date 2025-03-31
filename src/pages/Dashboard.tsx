
import { useEffect, useState } from "react";
import { Box, DollarSign, Package, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable";
import InventoryStatusChart from "@/components/dashboard/InventoryStatusChart";
import TopProductsList from "@/components/dashboard/TopProductsList";
import { 
  getDashboardStats, 
  getProducts, 
  mockDashboardStats 
} from "@/lib/mockData";
import { DashboardStats } from "@/lib/types";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        const data = getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  if (!stats) {
    return <div>Error loading dashboard data</div>;
  }

  const formattedSales = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(stats.totalSales);

  const formattedInventoryValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(stats.inventoryValue);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your business performance</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Sales" 
          value={formattedSales}
          description="This month"
          icon={DollarSign}
          iconColor="text-green-500"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Orders" 
          value={stats.ordersCount}
          description="New today: 1"
          icon={ShoppingCart}
        />
        <StatCard 
          title="Inventory Value" 
          value={formattedInventoryValue}
          icon={Package}
        />
        <StatCard 
          title="Low Stock Items" 
          value={stats.lowStockItems}
          description="Need reordering"
          icon={Box}
          iconColor="text-orange-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentOrdersTable orders={stats.recentOrders} />
          </CardContent>
        </Card>
        <div className="space-y-4">
          <TopProductsList products={stats.topProducts} />
          <InventoryStatusChart products={getProducts()} />
        </div>
      </div>
    </div>
  );
}
