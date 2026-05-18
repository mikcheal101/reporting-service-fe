/**
 * AuditLogsPage — SOX-compliant audit trail viewer.
 *
 * Displays all system mutations (CREATE / UPDATE / DELETE) in a paginated,
 * filterable table. Data is auto-captured by the backend AuditInterceptor.
 *
 * Filters: entity type, action type, date range.
 * States: loading (skeleton rows), empty (illustration + message), data (table).
 *
 * @see useAuditLogs — state management and data fetching
 * @see AuditInterceptor (backend) — auto-generates these logs
 */
"use client";

import React from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ScrollText,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import useAuditLogs from "@/app/hooks/audit-log/use-audit-logs";

const actionBadge: Record<string, string> = {
  POST: "bg-emerald-100 text-emerald-700 border-emerald-200",
  PUT: "bg-blue-100 text-blue-700 border-blue-200",
  PATCH: "bg-blue-100 text-blue-700 border-blue-200",
  DELETE: "bg-red-100 text-red-700 border-red-200",
};

const actionLabels: Record<string, string> = {
  POST: "CREATE",
  PUT: "UPDATE",
  PATCH: "UPDATE",
  DELETE: "DELETE",
};

const entityOptions = [
  { value: "", label: "All entities" },
  { value: "users", label: "Users" },
  { value: "connections", label: "Connections" },
  { value: "report-types", label: "Report Types" },
  { value: "reports", label: "Reports" },
  { value: "tasks", label: "Tasks" },
  { value: "roles", label: "Roles" },
  { value: "permissions", label: "Permissions" },
];

const actionOptions = [
  { value: "", label: "All actions" },
  { value: "POST", label: "Create" },
  { value: "PUT", label: "Update" },
  { value: "DELETE", label: "Delete" },
];

export default function Page() {
  const {
    logs,
    total,
    isLoading,
    page,
    totalPages,
    entityFilter,
    setEntityFilter,
    actionFilter,
    setActionFilter,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handlePreviousPage,
    handleNextPage,
    handleApplyFilters,
  } = useAuditLogs();

  return (
    <FadeIn delay={100} direction="up">
      <div className="p-4 lg:p-6">
        <div className="bg-card shadow-lg rounded-lg border border-border">
          {/* Header */}
          <div className="flex items-center gap-3 p-6 pb-4 border-b border-border">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Audit Logs
              </h2>
              <p className="text-sm text-muted-foreground">
                Track all mutations across the system
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex flex-wrap items-end gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Entity
                </label>
                <select
                  value={entityFilter}
                  onChange={(e) => setEntityFilter(e.target.value)}
                  className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {entityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Action
                </label>
                <select
                  value={actionFilter}
                  onChange={(e) => setActionFilter(e.target.value)}
                  className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {actionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  From
                </label>
                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="h-9 w-40"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  To
                </label>
                <Input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="h-9 w-40"
                />
              </div>
              <Button
                size="sm"
                onClick={handleApplyFilters}
                className="gap-1"
              >
                <Search className="w-3.5 h-3.5" />
                Filter
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <Th>Timestamp</Th>
                  <Th>User</Th>
                  <Th>Action</Th>
                  <Th>Entity</Th>
                  <Th>Entity ID</Th>
                  <Th>IP Address</Th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-border">
                      <Td>
                        <Skeleton className="h-4 w-32" />
                      </Td>
                      <Td>
                        <Skeleton className="h-4 w-24" />
                      </Td>
                      <Td>
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </Td>
                      <Td>
                        <Skeleton className="h-4 w-20" />
                      </Td>
                      <Td>
                        <Skeleton className="h-4 w-12" />
                      </Td>
                      <Td>
                        <Skeleton className="h-4 w-28" />
                      </Td>
                    </tr>
                  ))
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <AlertCircle className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm font-medium text-foreground">
                          No audit logs found
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Mutations to system entities will appear here
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <Td>
                        <span className="text-sm text-muted-foreground">
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </Td>
                      <Td>
                        <span className="text-sm font-medium text-foreground">
                          {log.username || `User #${log.userId}`}
                        </span>
                      </Td>
                      <Td>
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium ${
                            actionBadge[log.action] || ""
                          }`}
                        >
                          {actionLabels[log.action] || log.action}
                        </Badge>
                      </Td>
                      <Td>
                        <span className="text-sm capitalize text-foreground">
                          {log.entity.replace(/-/g, " ")}
                        </span>
                      </Td>
                      <Td>
                        <span className="text-sm text-muted-foreground font-mono">
                          {log.entityId ?? "-"}
                        </span>
                      </Td>
                      <Td>
                        <span className="text-sm text-muted-foreground font-mono">
                          {log.ipAddress || "-"}
                        </span>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {total} total log{total !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={page <= 1}
                className="gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground px-2">
                Page {page} of {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={page >= totalPages}
                className="gap-1"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted/30">
    {children}
  </th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="px-6 py-3.5 text-sm">{children}</td>
);
