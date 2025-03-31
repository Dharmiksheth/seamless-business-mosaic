
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Tasks() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track work tasks
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>

      <div className="rounded-md border border-dashed p-10 text-center">
        <h2 className="text-xl font-medium">Task Management Coming Soon</h2>
        <p className="text-muted-foreground mt-2">
          This section will allow you to create, assign and track work tasks for your team.
          You'll be able to set due dates, priorities, and monitor progress.
        </p>
      </div>
    </div>
  );
}
