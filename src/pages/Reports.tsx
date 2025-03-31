
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            View and generate business reports
          </p>
        </div>
        <Button>
          <FileDown className="mr-2 h-4 w-4" /> Export Reports
        </Button>
      </div>

      <div className="rounded-md border border-dashed p-10 text-center">
        <h2 className="text-xl font-medium">Reporting Module Coming Soon</h2>
        <p className="text-muted-foreground mt-2">
          This section will provide detailed business reports including sales analysis,
          inventory status, and financial summaries.
        </p>
      </div>
    </div>
  );
}
