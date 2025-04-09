import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu, Search } from "lucide-react";
import UserButton from "./UserButton";
import NotificationsMenu from "./NotificationsMenu";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="w-full flex justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg pl-8 md:max-w-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Add NotificationsMenu here */}
          <NotificationsMenu />
          
          <UserButton />
        </div>
      </div>
    </header>
  );
}
