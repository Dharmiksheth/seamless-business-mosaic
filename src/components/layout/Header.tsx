
import { useState } from "react";
import { Bell, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Order Received",
      description: "Order #ORD-2023-001 has been placed",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Low Inventory Alert",
      description: "Standing Desk Converter is running low on stock",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Task Completed",
      description: "Process refund requests task was completed",
      time: "3 hours ago",
      read: true,
    },
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      return;
    }
    
    setSearching(true);
    
    // Simulate search
    setTimeout(() => {
      setSearching(false);
      
      // Navigate based on search term (simplified)
      if (searchTerm.toLowerCase().includes("product")) {
        navigate("/products");
      } else if (searchTerm.toLowerCase().includes("order")) {
        navigate("/orders");
      } else if (searchTerm.toLowerCase().includes("customer")) {
        navigate("/customers");
      } else if (searchTerm.toLowerCase().includes("employee")) {
        navigate("/employees");
      } else if (searchTerm.toLowerCase().includes("task")) {
        navigate("/tasks");
      } else {
        toast({
          title: "Search Results",
          description: `No results found for "${searchTerm}"`,
        });
      }
    }, 800);
  };

  const handleReadNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="border-b border-border h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <SidebarTrigger />
        <div className="hidden md:block flex-1">
          <form className="flex-1" onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, orders, customers..."
                className="w-full max-w-sm bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={searching}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="absolute right-2.5 top-2.5"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-2 border-b">
                <h3 className="font-medium text-sm">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground text-sm">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-muted ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                      onClick={() => handleReadNotification(notification.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        {!notification.read && (
                          <Badge variant="primary" className="h-2 w-2 rounded-full p-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))
                )}
              </div>
              {notifications.length > 0 && (
                <div className="p-2 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                  >
                    Mark all as read
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                System Preferences
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                User Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                toast({
                  title: "Help & Support",
                  description: "Our support team is available 24/7"
                });
              }}>
                Help & Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
