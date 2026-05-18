/**
 * useAuditLogs — hook for the audit-logs settings page.
 *
 * Single Responsibility: manages audit-log data fetching, filter state,
 * and pagination. Isolates all side-effect logic from the presentational
 * component so the page stays clean and testable.
 *
 * @see fetchAuditLogsAsync — the API call this hook delegates to
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchAuditLogsAsync,
  AuditLogResponse,
  AuditLogFilter,
} from "@/app/services/audit-log/audit-log-service";

const useAuditLogs = () => {
  const [logs, setLogs] = useState<AuditLogResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [entityFilter, setEntityFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /** Fetch logs from the API based on current filters and page. */
  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const filter: AuditLogFilter = {
        page,
        limit,
      };
      if (entityFilter) filter.entity = entityFilter;
      if (actionFilter) filter.action = actionFilter;
      if (fromDate) filter.from = fromDate;
      if (toDate) filter.to = toDate;

      const result = await fetchAuditLogsAsync(filter);
      setLogs(result.data);
      setTotal(result.total);
    } catch {
      setLogs([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, entityFilter, actionFilter, fromDate, toDate]);

  /** Re-fetch whenever dependencies change. */
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const totalPages = Math.ceil(total / limit);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  /** Apply current filters and reset to first page. */
  const handleApplyFilters = () => {
    setPage(1);
    fetchLogs();
  };

  return {
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
    fetchLogs,
  };
};

export default useAuditLogs;
