import { DashboardMetrics, AIInsight, ReportStatistics, RecentActivity, ReportAnalytics } from '@/types/dashboard';

export const mockReportStatistics: ReportStatistics = {
  totalReports: 1247,
  reportsThisMonth: 89,
  reportsLastMonth: 76,
  activeReports: 23,
  completedReports: 1198,
  pendingReports: 15,
  failedReports: 11,
  averageGenerationTime: 2.3,
  averageExecutionTime: '2.3 min',
  successRate: 96.2,
  lastGenerated: '2024-01-15T10:30:00Z'
};

export const mockAIInsights: AIInsight[] = [
  {
    id: 'ai-001',
    reportId: 'rpt-001',
    reportName: 'Monthly Loan Performance Report',
    role: 'admin',
    analysisType: 'performance',
    severity: 'high',
    title: 'Data Completeness Issues Detected',
    description: 'The monthly loan performance report is missing critical borrower demographic data that could impact risk assessment accuracy.',
    whatsMissing: [
      'Borrower employment history (15% missing)',
      'Credit score updates (8% outdated)',
      'Income verification documents (12% missing)'
    ],
    whatsNeeded: [
      'Integration with HR systems for employment data',
      'Automated credit bureau API connections',
      'Document upload validation system'
    ],
    requiredActions: [
      'Implement data validation rules',
      'Set up automated data collection workflows',
      'Create data quality monitoring dashboard',
      'Train staff on new data entry procedures'
    ],
    recommendations: [
      'Prioritize employment history integration - highest impact on risk models',
      'Implement real-time credit score monitoring',
      'Add mandatory field validation before report generation'
    ],
    impact: 'Could improve risk assessment accuracy by 23% and reduce default rates',
    estimatedEffort: 'high',
    priority: 9,
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T09:15:00Z'
  },
  {
    id: 'ai-002',
    reportId: 'rpt-002',
    reportName: 'Delinquency Analysis Report',
    role: 'analyst',
    analysisType: 'data_quality',
    severity: 'medium',
    title: 'Inconsistent Date Formatting Affecting Trends',
    description: 'Multiple date formats detected in delinquency data causing inaccurate trend analysis and forecasting.',
    whatsMissing: [
      'Standardized date format across all data sources',
      'Timezone normalization for multi-region data',
      'Historical data cleanup for past 6 months'
    ],
    whatsNeeded: [
      'Data transformation pipeline',
      'Standardized date format policy',
      'Automated data cleaning scripts'
    ],
    requiredActions: [
      'Implement date standardization middleware',
      'Clean historical data inconsistencies',
      'Update data entry forms with date validation',
      'Create data quality monitoring alerts'
    ],
    recommendations: [
      'Use ISO 8601 format for all date fields',
      'Implement server-side date validation',
      'Add data quality checks before report generation'
    ],
    impact: 'Will improve trend analysis accuracy and enable better forecasting models',
    estimatedEffort: 'medium',
    priority: 7,
    createdAt: '2024-01-14T14:22:00Z',
    updatedAt: '2024-01-14T14:22:00Z'
  },
  {
    id: 'ai-003',
    reportId: 'rpt-003',
    reportName: 'Customer Segmentation Report',
    role: 'manager',
    analysisType: 'optimization',
    severity: 'medium',
    title: 'Underutilized Customer Segments Identified',
    description: 'Analysis reveals 3 high-value customer segments that are not being targeted effectively in current marketing strategies.',
    whatsMissing: [
      'Targeted marketing campaigns for identified segments',
      'Personalized product offerings',
      'Segment-specific communication strategies'
    ],
    whatsNeeded: [
      'Marketing automation platform integration',
      'Customer journey mapping tools',
      'A/B testing framework for campaigns'
    ],
    requiredActions: [
      'Develop targeted marketing campaigns',
      'Create personalized product recommendations',
      'Implement customer journey tracking',
      'Set up conversion rate monitoring'
    ],
    recommendations: [
      'Focus on high-income, low-risk segment first - 34% higher conversion potential',
      'Implement behavioral targeting for young professionals segment',
      'Create premium product tier for affluent customers'
    ],
    impact: 'Potential 15-20% increase in customer acquisition and 12% boost in revenue',
    estimatedEffort: 'medium',
    priority: 8,
    createdAt: '2024-01-13T11:45:00Z',
    updatedAt: '2024-01-13T11:45:00Z'
  },
  {
    id: 'ai-004',
    reportId: 'rpt-004',
    reportName: 'Compliance Audit Report',
    role: 'admin',
    analysisType: 'compliance',
    severity: 'critical',
    title: 'Regulatory Compliance Gaps Detected',
    description: 'Several critical compliance requirements are not being met, potentially exposing the organization to regulatory penalties.',
    whatsMissing: [
      'KYC documentation for 23% of new customers',
      'AML transaction monitoring alerts review',
      'Quarterly compliance training records'
    ],
    whatsNeeded: [
      'Automated KYC verification system',
      'Enhanced AML monitoring tools',
      'Compliance training management system'
    ],
    requiredActions: [
      'Immediate KYC documentation collection for flagged accounts',
      'Implement automated AML alert system',
      'Schedule mandatory compliance training for all staff',
      'Create compliance monitoring dashboard'
    ],
    recommendations: [
      'Prioritize KYC completion - regulatory deadline in 30 days',
      'Implement real-time transaction monitoring',
      'Establish monthly compliance review meetings'
    ],
    impact: 'Critical for avoiding regulatory penalties and maintaining operating license',
    estimatedEffort: 'high',
    priority: 10,
    createdAt: '2024-01-12T16:30:00Z',
    updatedAt: '2024-01-12T16:30:00Z'
  },
  {
    id: 'ai-005',
    reportId: 'rpt-005',
    reportName: 'Portfolio Risk Assessment',
    role: 'analyst',
    analysisType: 'performance',
    severity: 'low',
    title: 'Opportunity for Risk Model Enhancement',
    description: 'Current risk models could be enhanced with additional data points to improve prediction accuracy.',
    whatsMissing: [
      'Social media sentiment analysis',
      'Economic indicator correlations',
      'Seasonal trend adjustments'
    ],
    whatsNeeded: [
      'Alternative data sources integration',
      'Advanced analytics platform',
      'Machine learning model development'
    ],
    requiredActions: [
      'Evaluate alternative data providers',
      'Develop enhanced risk scoring models',
      'Implement model validation framework',
      'Create model performance monitoring'
    ],
    recommendations: [
      'Start with economic indicator integration - easiest to implement',
      'Consider partnership with fintech data providers',
      'Implement gradual model rollout with A/B testing'
    ],
    impact: 'Potential 5-8% improvement in risk prediction accuracy',
    estimatedEffort: 'low',
    priority: 5,
    createdAt: '2024-01-11T13:20:00Z',
    updatedAt: '2024-01-11T13:20:00Z'
  }
];

export const mockRecentActivity: RecentActivity[] = [
  {
    id: 'act-001',
    type: 'report_generated',
    title: 'Monthly Performance Report Generated',
    description: 'Successfully generated monthly loan performance report with 1,247 records',
    timestamp: '2024-01-15T10:30:00Z',
    userId: 'user-001',
    userName: 'Sarah Johnson'
  },
  {
    id: 'act-002',
    type: 'insight_created',
    title: 'New AI Insight: Data Quality Issue',
    description: 'AI detected data completeness issues in loan performance report',
    timestamp: '2024-01-15T09:15:00Z',
    userId: 'system',
    userName: 'AI Assistant'
  },
  {
    id: 'act-003',
    type: 'action_taken',
    title: 'Compliance Gap Addressed',
    description: 'KYC documentation collected for 15 flagged customer accounts',
    timestamp: '2024-01-14T16:45:00Z',
    userId: 'user-002',
    userName: 'Michael Chen'
  },
  {
    id: 'act-004',
    type: 'report_failed',
    title: 'Delinquency Report Failed',
    description: 'Report generation failed due to database connection timeout',
    timestamp: '2024-01-14T08:20:00Z',
    userId: 'system',
    userName: 'System'
  }
];

export const mockReportAnalytics: ReportAnalytics = {
  reportsByType: [
    { type: 'Performance Reports', count: 45, percentage: 36 },
    { type: 'Compliance Reports', count: 28, percentage: 22 },
    { type: 'Risk Analysis', count: 25, percentage: 20 },
    { type: 'Customer Analytics', count: 18, percentage: 14 },
    { type: 'Financial Reports', count: 10, percentage: 8 }
  ],
  reportsByStatus: [
    { status: 'Completed', count: 1198, color: '#10B981' },
    { status: 'Pending', count: 15, color: '#F59E0B' },
    { status: 'Failed', count: 11, color: '#EF4444' },
    { status: 'Running', count: 23, color: '#3B82F6' }
  ],
  executionTrends: [
    { date: '2024-01-08', count: 12, avgTime: 2.1 },
    { date: '2024-01-09', count: 15, avgTime: 2.3 },
    { date: '2024-01-10', count: 18, avgTime: 2.0 },
    { date: '2024-01-11', count: 14, avgTime: 2.5 },
    { date: '2024-01-12', count: 16, avgTime: 2.2 },
    { date: '2024-01-13', count: 20, avgTime: 1.9 },
    { date: '2024-01-14', count: 17, avgTime: 2.4 }
  ],
  topPerformingReports: [
    { name: 'Daily Loan Summary', executions: 156, avgTime: '1.2 min' },
    { name: 'Customer Risk Profile', executions: 89, avgTime: '3.1 min' },
    { name: 'Portfolio Overview', executions: 67, avgTime: '2.8 min' },
    { name: 'Compliance Check', executions: 45, avgTime: '4.2 min' }
  ],
  errorRates: [
    { date: '2024-01-08', errorRate: 2.1 },
    { date: '2024-01-09', errorRate: 1.8 },
    { date: '2024-01-10', errorRate: 3.2 },
    { date: '2024-01-11', errorRate: 2.5 },
    { date: '2024-01-12', errorRate: 1.9 },
    { date: '2024-01-13', errorRate: 2.8 },
    { date: '2024-01-14', errorRate: 3.1 }
  ]
};

export const mockDashboardMetrics: DashboardMetrics = {
  reportStats: mockReportStatistics,
  aiInsights: mockAIInsights,
  recentActivity: mockRecentActivity
};

// Helper functions for dashboard data
export const getInsightsBySeverity = (severity: 'low' | 'medium' | 'high' | 'critical') => {
  return mockAIInsights.filter(insight => insight.severity === severity);
};

export const getInsightsByRole = (role: 'admin' | 'analyst' | 'manager' | 'viewer') => {
  return mockAIInsights.filter(insight => insight.role === role);
};

export const getRecentInsights = (limit: number = 5) => {
  return mockAIInsights
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

export const getCriticalInsights = () => {
  return mockAIInsights.filter(insight => insight.severity === 'critical' || insight.priority >= 9);
};