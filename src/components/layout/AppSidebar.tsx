
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { 
  BarChart3,
  Box,
  ClipboardList,
  Home,
  PackageOpen,
  Settings,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";

type MenuItem = {
  title: string;
  path: string;
  icon: React.ElementType;
};

const mainMenuItems: MenuItem[] = [
  { title: "Dashboard", path: "/", icon: Home },
  { title: "Inventory", path: "/inventory", icon: Box },
  { title: "Orders", path: "/orders", icon: ShoppingCart },
  { title: "Products", path: "/products", icon: PackageOpen },
  { title: "Customers", path: "/customers", icon: User },
  { title: "Employees", path: "/employees", icon: Users },
];

const adminMenuItems: MenuItem[] = [
  { title: "Reports", path: "/reports", icon: BarChart3 },
  { title: "Tasks", path: "/tasks", icon: ClipboardList },
  { title: "Settings", path: "/settings", icon: Settings },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2">
          <div className="bg-primary text-primary-foreground p-1 rounded">
            <BarChart3 size={24} />
          </div>
          <span className="font-bold text-xl">ERP System</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-3 py-2">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="bg-secondary p-1 rounded-full">
            <User size={20} className="text-secondary-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">Admin User</p>
            <p className="text-xs">admin@company.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
