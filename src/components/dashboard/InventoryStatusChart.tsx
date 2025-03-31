
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface InventoryStatusChartProps {
  products: Product[];
}

export default function InventoryStatusChart({ products }: InventoryStatusChartProps) {
  // Categorize products by stock status
  const lowStock = products.filter(p => p.stock <= p.reorderLevel).length;
  const mediumStock = products.filter(p => p.stock > p.reorderLevel && p.stock <= p.reorderLevel * 3).length;
  const highStock = products.filter(p => p.stock > p.reorderLevel * 3).length;
  
  const data = [
    { name: 'Low Stock', value: lowStock, color: '#f87171' },
    { name: 'Medium Stock', value: mediumStock, color: '#fbbf24' },
    { name: 'High Stock', value: highStock, color: '#34d399' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} items`, 'Count']}
                labelFormatter={(name) => `${name}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {data.map((item) => (
            <div className="flex items-center gap-1" key={item.name}>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-xs">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
