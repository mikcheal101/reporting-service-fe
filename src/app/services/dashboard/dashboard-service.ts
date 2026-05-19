"use client";

import { buildUrl } from "@/app/utils/urlBuilder";
import api from "../axios";
import { AxiosResponse } from "axios";

export interface DashboardMetricsResponse {
  reportStats: {
    totalReports: number;
    reportsThisMonth: number;
    reportsLastMonth: number;
    activeReports: number;
    completedReports: number;
    pendingReports: number;
    failedReports: number;
    averageGenerationTime: number;
    averageExecutionTime: string;
    successRate: number;
    lastGenerated: string | null;
  };
  reportsByType: { type: string; count: number; percentage: number }[];
  reportsByStatus: { status: string; count: number; color: string }[];
  reportsByFrequency: { frequency: string; count: number }[];
  executionTrends: { date: string; count: number; avgTime: number }[];
  topPerformingReports: { name: string; executions: number; avgTime: string }[];
  errorRates: { date: string; errorRate: number }[];
  connectionTypes: { databaseType: string; count: number }[];
  recentExecutions: { id: number; reportName: string; status: string; duration: string | null; executedAt: string | null }[];
  connectionCount: number;
  userCount: number;
  reportTypeCount: number;
  totalTasks: number;
}

export const fetchDashboardMetricsAsync = async (): Promise<DashboardMetricsResponse> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl('/api/v1/dashboard/metrics')}`);
  return apiResponse.data;
};

export const fetchDashboardInsightsAsync = async (): Promise<any[]> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl('/api/v1/dashboard/insights')}`);
  return apiResponse.data;
};
