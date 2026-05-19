// components/connection/connection-toolbar
"use client";

import ConnectionToolBarProps from "@/types/components/connection/connection-toolbar";
import { List, LayoutGrid } from "lucide-react";
import { Button } from "../ui/button";

const ConnectionToolbar = ({ setViewMode, viewMode}: ConnectionToolBarProps) => (
  <div className="flex items-center">
    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6"> Connections </h2>
    <div className="flex justify-end ml-auto space-x-2">
      <Button
        variant={viewMode === "list" ? "default" : "secondary"}
        size="sm"
        onClick={() => setViewMode("list")}
      >
        <List className="mr-1 h-4 w-4" />
        List
      </Button>
      <Button
        variant={viewMode === "grid" ? "default" : "secondary"}
        size="sm"
        onClick={() => setViewMode("grid")}
      >
        <LayoutGrid className="mr-1 h-4 w-4" />
        Grid
      </Button>
    </div>
  </div>
);

export default ConnectionToolbar;
