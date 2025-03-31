
import { Bell, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="border-b border-border h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <SidebarTrigger />
        <div className="hidden md:block flex-1">
          <form className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full max-w-sm bg-background pl-8"
              />
            </div>
          </form>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
