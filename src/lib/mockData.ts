
import { 
  Customer, 
  DashboardStats, 
  Employee, 
  Order,
  Product,
  Task
} from "./types";

// Mock Products
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Laptop Computer",
    sku: "TECH-001",
    category: "Electronics",
    price: 1299.99,
    cost: 899.99,
    stock: 15,
    reorderLevel: 5,
    description: "High performance laptop with latest specifications"
  },
  {
    id: "2",
    name: "Office Desk",
    sku: "FURN-002",
    category: "Furniture",
    price: 349.99,
    cost: 199.99,
    stock: 8,
    reorderLevel: 3,
    description: "Ergonomic office desk with adjustable height"
  },
  {
    id: "3",
    name: "Wireless Headphones",
    sku: "TECH-003",
    category: "Electronics",
    price: 199.99,
    cost: 89.99,
    stock: 25,
    reorderLevel: 10,
    description: "Noise cancelling wireless headphones"
  },
  {
    id: "4",
    name: "Ergonomic Chair",
    sku: "FURN-004",
    category: "Furniture",
    price: 249.99,
    cost: 129.99,
    stock: 12,
    reorderLevel: 5,
    description: "Comfortable ergonomic office chair"
  },
  {
    id: "5",
    name: "Smart Monitor",
    sku: "TECH-005",
    category: "Electronics",
    price: 399.99,
    cost: 249.99,
    stock: 18,
    reorderLevel: 7,
    description: "4K Ultra HD Smart Monitor with HDR"
  },
  {
    id: "6",
    name: "Standing Desk Converter",
    sku: "FURN-006",
    category: "Furniture",
    price: 179.99,
    cost: 99.99,
    stock: 3,
    reorderLevel: 5,
    description: "Convert any desk to a standing desk"
  },
  {
    id: "7",
    name: "Wireless Mouse",
    sku: "TECH-007",
    category: "Electronics",
    price: 49.99,
    cost: 22.99,
    stock: 40,
    reorderLevel: 15,
    description: "Ergonomic wireless mouse with long battery life"
  },
  {
    id: "8",
    name: "Filing Cabinet",
    sku: "FURN-008",
    category: "Furniture",
    price: 129.99,
    cost: 79.99,
    stock: 6,
    reorderLevel: 3,
    description: "Metal filing cabinet with lock"
  }
];

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    company: "Tech Solutions Inc.",
    address: "123 Main St",
    city: "Austin",
    state: "TX",
    postalCode: "78701",
    country: "USA"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "555-987-6543",
    company: "Creative Designs LLC",
    address: "456 Oak Ave",
    city: "Portland",
    state: "OR",
    postalCode: "97201",
    country: "USA"
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "555-456-7890",
    company: "Brown Consulting",
    address: "789 Pine St",
    city: "Seattle",
    state: "WA",
    postalCode: "98101",
    country: "USA"
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2023-001",
    customer: mockCustomers[0],
    date: "2023-05-15",
    status: "delivered",
    total: 1499.98,
    items: [
      {
        id: "1",
        product: mockProducts[0],
        quantity: 1,
        unitPrice: 1299.99
      },
      {
        id: "2",
        product: mockProducts[6],
        quantity: 4,
        unitPrice: 49.99
      }
    ]
  },
  {
    id: "2",
    orderNumber: "ORD-2023-002",
    customer: mockCustomers[1],
    date: "2023-05-18",
    status: "shipped",
    total: 579.98,
    items: [
      {
        id: "1",
        product: mockProducts[3],
        quantity: 1,
        unitPrice: 249.99
      },
      {
        id: "2",
        product: mockProducts[5],
        quantity: 1,
        unitPrice: 179.99
      },
      {
        id: "3",
        product: mockProducts[6],
        quantity: 3,
        unitPrice: 49.99
      }
    ]
  },
  {
    id: "3",
    orderNumber: "ORD-2023-003",
    customer: mockCustomers[2],
    date: "2023-05-20",
    status: "processing",
    total: 729.98,
    items: [
      {
        id: "1",
        product: mockProducts[2],
        quantity: 2,
        unitPrice: 199.99
      },
      {
        id: "2",
        product: mockProducts[7],
        quantity: 2,
        unitPrice: 129.99
      },
      {
        id: "3",
        product: mockProducts[6],
        quantity: 1,
        unitPrice: 49.99
      }
    ]
  },
  {
    id: "4",
    orderNumber: "ORD-2023-004",
    customer: mockCustomers[0],
    date: "2023-05-22",
    status: "pending",
    total: 399.99,
    items: [
      {
        id: "1",
        product: mockProducts[4],
        quantity: 1,
        unitPrice: 399.99
      }
    ]
  }
];

// Mock Employees
export const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "David Chen",
    email: "david.chen@company.com",
    department: "Engineering",
    position: "Senior Developer",
    hireDate: "2020-03-15",
    phone: "555-111-2222",
    address: "123 Tech Lane, San Francisco, CA",
    status: "active"
  },
  {
    id: "2",
    name: "Lisa Wong",
    email: "lisa.wong@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    hireDate: "2019-06-10",
    phone: "555-222-3333",
    address: "456 Market St, San Francisco, CA",
    status: "active"
  },
  {
    id: "3",
    name: "James Taylor",
    email: "james.taylor@company.com",
    department: "Sales",
    position: "Sales Representative",
    hireDate: "2021-01-05",
    phone: "555-333-4444",
    address: "789 Commerce Blvd, New York, NY",
    status: "active"
  },
  {
    id: "4",
    name: "Maria Rodriguez",
    email: "maria.r@company.com",
    department: "Human Resources",
    position: "HR Specialist",
    hireDate: "2018-09-22",
    phone: "555-444-5555",
    address: "101 People Ave, Chicago, IL",
    status: "on-leave"
  },
  {
    id: "5",
    name: "Robert Johnson",
    email: "robert.j@company.com",
    department: "Operations",
    position: "Operations Manager",
    hireDate: "2017-11-14",
    phone: "555-555-6666",
    address: "202 Supply Road, Austin, TX",
    status: "active"
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete inventory audit",
    description: "Perform a full audit of warehouse inventory",
    assignee: mockEmployees[4],
    dueDate: "2023-06-01",
    status: "in-progress",
    priority: "high"
  },
  {
    id: "2",
    title: "Update product catalog",
    description: "Add new product lines to the online catalog",
    assignee: mockEmployees[1],
    dueDate: "2023-05-25",
    status: "todo",
    priority: "medium"
  },
  {
    id: "3",
    title: "Process refund requests",
    description: "Review and process pending customer refunds",
    assignee: mockEmployees[2],
    dueDate: "2023-05-23",
    status: "completed",
    priority: "high"
  },
  {
    id: "4",
    title: "Schedule employee training",
    description: "Arrange training session for new inventory system",
    assignee: mockEmployees[3],
    dueDate: "2023-06-10",
    status: "todo",
    priority: "medium"
  },
  {
    id: "5",
    title: "Prepare monthly sales report",
    description: "Compile and analyze sales data for the month",
    assignee: mockEmployees[2],
    dueDate: "2023-05-30",
    status: "in-progress",
    priority: "high"
  }
];

// Dashboard data
export const mockDashboardStats: DashboardStats = {
  totalSales: 3209.93,
  ordersCount: 4,
  inventoryValue: 16498.76,
  lowStockItems: 1,
  recentOrders: mockOrders,
  topProducts: [
    { product: mockProducts[0], sold: 5 },
    { product: mockProducts[6], sold: 8 },
    { product: mockProducts[3], sold: 3 },
    { product: mockProducts[2], sold: 2 }
  ]
};

// Service functions
export const getProducts = () => mockProducts;
export const getProduct = (id: string) => mockProducts.find(p => p.id === id);

export const getOrders = () => mockOrders;
export const getOrder = (id: string) => mockOrders.find(o => o.id === id);

export const getCustomers = () => mockCustomers;
export const getCustomer = (id: string) => mockCustomers.find(c => c.id === id);

export const getEmployees = () => mockEmployees;
export const getEmployee = (id: string) => mockEmployees.find(e => e.id === id);

export const getTasks = () => mockTasks;
export const getTask = (id: string) => mockTasks.find(t => t.id === id);

export const getDashboardStats = () => mockDashboardStats;
