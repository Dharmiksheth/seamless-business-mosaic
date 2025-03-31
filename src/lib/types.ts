
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  reorderLevel: number;
  description: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  hireDate: string;
  phone: string;
  address: string;
  imageUrl?: string;
  status: 'active' | 'on-leave' | 'terminated';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee?: Employee;
  dueDate: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface DashboardStats {
  totalSales: number;
  ordersCount: number;
  inventoryValue: number;
  lowStockItems: number;
  recentOrders: Order[];
  topProducts: {
    product: Product;
    sold: number;
  }[];
}
