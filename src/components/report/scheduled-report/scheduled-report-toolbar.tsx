"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock } from "lucide-react";

const ScheduledReportToolBar = () => (
  <TabsList className="inline-flex h-auto p-1 bg-muted/60 rounded-lg gap-1">
    <TabsTrigger
      value="tab1"
      className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground hover:text-foreground transition-all"
    >
      <CheckCircle2 className="h-4 w-4" />
      <span className="hidden sm:inline">Completed</span>
      <span className="sm:hidden">Done</span>
    </TabsTrigger>
    <TabsTrigger
      value="tab2"
      className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground hover:text-foreground transition-all"
    >
      <Clock className="h-4 w-4" />
      <span className="hidden sm:inline">Pending</span>
      <span className="sm:hidden">Pending</span>
    </TabsTrigger>
  </TabsList>
);

export default ScheduledReportToolBar;
