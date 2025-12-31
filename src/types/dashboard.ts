export interface ReportStatistics {
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
  lastGenerated: string;
}

export interface AIInsight {
  id: string;
  reportId: string;
  reportName: string;
  role: 'admin' | 'analyst' | 'manager' | 'viewer';
  analysisType: 'performance' | 'data_quality' | 'optimization' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  whatsMissing: string[];
  whatsNeeded: string[];
  requiredActions: string[];
  recommendations: string[];
  impact: string;
  estimatedEffort: 'low' | 'medium' | 'high';
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardMetrics {
  reportStats: ReportStatistics;
  aiInsights: AIInsight[];
  recentActivity: RecentActivity[];
}

export interface RecentActivity {
  id: string;
  type: 'report_generated' | 'report_failed' | 'insight_created' | 'action_taken';
  title: string;
  description: string;
  timestamp: string;
  userId: string;
  userName: string;
}

export interface ReportAnalytics {
  reportsByType: { type: string; count: number; percentage: number }[];
  reportsByStatus: { status: string; count: number; color: string }[];
  executionTrends: { date: string; count: number; avgTime: number }[];
  topPerformingReports: { name: string; executions: number; avgTime: string }[];
  errorRates: { date: string; errorRate: number }[];
}

export interface AIInsightCard {
  insight: AIInsight;
  onViewDetails: (insightId: string) => void;
  onTakeAction: (insightId: string, action: string) => void;
}

export interface ReportCard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  color?: string;
  subtitle?: string;
}