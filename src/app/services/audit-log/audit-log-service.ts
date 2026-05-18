/**
 * Audit-log API service.
 *
 * Single Responsibility: encapsulates all HTTP calls to the /api/v1/audit-logs
 * endpoint. Provides typed interfaces for the response shape and filter parameters.
 *
 * @see useAuditLogs — the consumer hook that drives the audit-logs page
 */
import api from "../axios";
import { buildUrl } from "../../utils/urlBuilder";
import { AxiosResponse } from "axios";

/** Shape of a single audit-log entry as returned by the API. */
export interface AuditLogResponse {
  id: number;
  userId?: number;
  username?: string;
  action: string;
  entity: string;
  entityId?: number;
  details?: string;
  ipAddress?: string;
  createdAt: string;
}

/** Filters accepted by the GET /api/v1/audit-logs endpoint. */
export interface AuditLogFilter {
  entity?: string;
  action?: string;
  userId?: number;
  from?: string;
  to?: string;
  page: number;
  limit: number;
}

/** Paginated response wrapper. */
export interface PaginatedAuditLogs {
  data: AuditLogResponse[];
  total: number;
}

/**
 * Fetch audit logs with optional filters and pagination.
 * Maps the AuditLogFilter to query-string params for the API.
 */
export const fetchAuditLogsAsync = async (
  filter: AuditLogFilter,
): Promise<PaginatedAuditLogs> => {
  const params = new URLSearchParams();
  if (filter.entity) params.append("entity", filter.entity);
  if (filter.action) params.append("action", filter.action);
  if (filter.userId) params.append("userId", String(filter.userId));
  if (filter.from) params.append("from", filter.from);
  if (filter.to) params.append("to", filter.to);
  params.append("page", String(filter.page));
  params.append("limit", String(filter.limit));

  const apiResponse: AxiosResponse = await api.get(
    `${buildUrl(process.env.NEXT_PUBLIC_AUDIT_LOGS)}?${params.toString()}`,
  );
  return apiResponse.data;
};
