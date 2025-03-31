
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { DashboardStats } from "@/lib/types";

interface TopProductsListProps {
  products: DashboardStats["topProducts"];
}

export default function TopProductsList({ products }: TopProductsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Your best selling products this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map(({ product, sold }) => (
            <div key={product.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  {product.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  SKU: {product.sku} | {product.category}
                </p>
              </div>
              <div className="font-medium">
                {sold} sold
                <p className="text-xs text-muted-foreground">${(product.price * sold).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
