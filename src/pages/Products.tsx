
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Products() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="rounded-md border border-dashed p-10 text-center">
        <h2 className="text-xl font-medium">Products Module Coming Soon</h2>
        <p className="text-muted-foreground mt-2">
          This section will allow you to manage your product catalog, including creating,
          editing, and organizing products into categories.
        </p>
      </div>
    </div>
  );
}
