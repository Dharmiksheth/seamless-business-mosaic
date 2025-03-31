
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/lib/types";

interface RecentOrdersTableProps {
  orders: Order[];
  limit?: number;
}

export default function RecentOrdersTable({ orders, limit = 5 }: RecentOrdersTableProps) {
  const displayOrders = orders.slice(0, limit);
  
  const getStatusBadgeVariant = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "outline";
      case "processing":
        return "secondary";
      case "shipped":
        return "default";
      case "delivered":
        return "success";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.orderNumber}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                ${order.total.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
