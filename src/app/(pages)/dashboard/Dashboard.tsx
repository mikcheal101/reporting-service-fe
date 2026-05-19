"use client";

import { useEffect, useState } from "react";
import AIInsightCard from "@/components/AIInsightCard";
import GuidedTour from "@/components/guided-tour";
import { FadeIn, StaggerFadeIn } from "@/components/ui/fade-in";
import { fetchDashboardMetricsAsync, fetchDashboardInsightsAsync, DashboardMetricsResponse } from "@/app/services/dashboard/dashboard-service";

const Dashboard: React.FC = () => {
    const [metrics, setMetrics] = useState<DashboardMetricsResponse | null>(null);
    const [insights, setInsights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const [metricsData, insightsData] = await Promise.all([
                    fetchDashboardMetricsAsync(),
                    fetchDashboardInsightsAsync(),
                ]);
                setMetrics(metricsData);
                setInsights(insightsData);
            } catch {
                setError("Failed to load dashboard metrics");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const stats = metrics?.reportStats;

    return (
        <div className="p-3 sm:p-6 space-y-6 sm:space-y-8 min-h-screen">
            <GuidedTour />
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
                {/* Header */}
                <div className="mb-6 sm:mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1 sm:space-y-2">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium">Welcome back! Here is what is happening with your reports today.</p>
                        </div>
                        {!loading && !error && (
                            <div className="flex sm:hidden items-center space-x-2 text-xs font-semibold text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm self-start">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
                                <span>Live Data</span>
                            </div>
                        )}
                        {!loading && !error && (
                            <div className="hidden sm:flex items-center space-x-3 text-sm font-semibold text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-full border border-emerald-200 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
                                <span>Live Data</span>
                            </div>
                        )}
                    </div>
                </div>

                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-20 text-red-500">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="mt-4 text-blue-600 underline">Retry</button>
                    </div>
                )}

                {stats && (
                    <>
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                          {[
                            { from: "from-white to-blue-50", border: "border-blue-100", bg: "from-blue-500 to-indigo-600", title: "Total Reports", value: stats.totalReports.toLocaleString(), sub: `${stats.reportsThisMonth} generated this month`, icon: "📊", text: "from-blue-600 to-indigo-600" },
                            { from: "from-white to-emerald-50", border: "border-emerald-100", bg: "from-emerald-500 to-green-600", title: "Completed", value: stats.completedReports.toLocaleString(), sub: `${stats.successRate}% success rate`, icon: "📈", text: "from-emerald-600 to-green-600", subClass: "text-emerald-600 font-medium" },
                            { from: "from-white to-amber-50", border: "border-amber-100", bg: "from-amber-500 to-orange-600", title: "Connections", value: metrics.connectionCount, sub: `${metrics.reportTypeCount} report types`, icon: "⚡", text: "from-amber-600 to-orange-600", subClass: "text-amber-600 font-medium" },
                            { from: "from-white to-purple-50", border: "border-purple-100", bg: "from-purple-500 to-pink-600", title: "Users", value: metrics.userCount, sub: "Active accounts", icon: "✅", text: "from-purple-600 to-pink-600", subClass: "text-purple-600 font-medium" },
                          ].map((card, i) => (
                            <FadeIn key={card.title} delay={i * 100} direction="up">
                              <div className={`group bg-gradient-to-br ${card.from} p-4 sm:p-6 rounded-2xl shadow-lg border ${card.border} hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">{card.title}</p>
                                    <p className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${card.text} bg-clip-text text-transparent`}>{card.value}</p>
                                    <p className={`text-xs sm:text-sm text-gray-500 mt-1 ${card.subClass || ""}`}>{card.sub}</p>
                                  </div>
                                  <div className={`p-3 sm:p-4 bg-gradient-to-br ${card.bg} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                    <span className="text-xl sm:text-2xl">{card.icon}</span>
                                  </div>
                                </div>
                              </div>
                            </FadeIn>
                          ))}
                        </div>

                        {/* Analytics Overview */}
                        {metrics.reportsByType.length > 0 && (
                            <FadeIn delay={200} direction="up" className="mb-6 sm:mb-10">
                                <div className="flex items-center justify-between mb-4 sm:mb-6">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                                            Analytics Overview
                                        </h2>
                                        <p className="text-sm sm:text-base text-gray-600 font-medium">Report distribution by type.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {metrics.reportsByType.map((report, index) => {
                                        const colors = [
                                            { bg: 'from-white to-cyan-50', border: 'border-cyan-100', text: 'from-cyan-600 to-blue-600', accent: 'text-cyan-600', icon: 'from-cyan-500 to-blue-600' },
                                            { bg: 'from-white to-rose-50', border: 'border-rose-100', text: 'from-rose-600 to-pink-600', accent: 'text-rose-600', icon: 'from-rose-500 to-pink-600' },
                                            { bg: 'from-white to-violet-50', border: 'border-violet-100', text: 'from-violet-600 to-purple-600', accent: 'text-violet-600', icon: 'from-violet-500 to-purple-600' }
                                        ];
                                        const colorScheme = colors[index % colors.length];
                                        return (
                                            <div key={index} className={`group bg-gradient-to-br ${colorScheme.bg} p-4 sm:p-6 rounded-2xl shadow-lg border ${colorScheme.border} hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">{report.type}</p>
                                                        <p className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${colorScheme.text} bg-clip-text text-transparent`}>{report.count.toLocaleString()}</p>
                                                        <p className={`text-xs sm:text-sm ${colorScheme.accent} mt-1 font-medium`}>{report.percentage}% share</p>
                                                    </div>
                                                    <div className={`p-3 sm:p-4 bg-gradient-to-br ${colorScheme.icon} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                                        <span className="text-xl sm:text-2xl">📄</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                 </div>
                             </FadeIn>
                         )}

                         {/* Execution Trends */}
                        {metrics.executionTrends && metrics.executionTrends.length > 0 && (
                          <FadeIn delay={300} direction="up" className="mb-6 sm:mb-10">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                              <div>
                                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                                  Execution Trends (Last 30 Days)
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 font-medium">Daily task executions and average duration.</p>
                              </div>
                            </div>
                            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                              <table className="w-full text-sm sm:text-base">
                                <thead>
                                  <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-2 font-semibold text-gray-600">Date</th>
                                    <th className="text-right py-3 px-2 font-semibold text-gray-600">Executions</th>
                                    <th className="text-right py-3 px-2 font-semibold text-gray-600">Avg Time (sec)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {metrics.executionTrends.map((trend, i) => (
                                    <tr key={i} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                                      <td className="py-3 px-2 text-gray-700">{trend.date}</td>
                                      <td className="py-3 px-2 text-right font-medium text-blue-600">{trend.count}</td>
                                      <td className="py-3 px-2 text-right text-gray-700">{trend.avgTime}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                             </div>
                           </FadeIn>
                         )}

                         {/* Top Performing Reports */}
                        {metrics.topPerformingReports && metrics.topPerformingReports.length > 0 && (
                          <FadeIn delay={400} direction="up" className="mb-6 sm:mb-10">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                              <div>
                                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-emerald-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                                  Top Performing Reports
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 font-medium">Reports with the most successful executions.</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                              {metrics.topPerformingReports.map((report, i) => (
                                <div key={i} className="bg-gradient-to-br from-white to-emerald-50 p-4 sm:p-6 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-semibold text-gray-700">{report.name}</p>
                                      <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{report.executions}</p>
                                      <p className="text-xs text-emerald-600 mt-1">{report.avgTime} avg</p>
                                    </div>
                                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                                      <span className="text-xl">📄</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                             </div>
                           </FadeIn>
                         )}

                         {/* Error Rates */}
                        {metrics.errorRates && metrics.errorRates.length > 0 && (
                          <FadeIn delay={500} direction="up" className="mb-6 sm:mb-10">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                              <div>
                                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-red-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                                  Error Rates (Last 30 Days)
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 font-medium">Daily failure rate as percentage of total executions.</p>
                              </div>
                            </div>
                            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                              <table className="w-full text-sm sm:text-base">
                                <thead>
                                  <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-2 font-semibold text-gray-600">Date</th>
                                    <th className="text-right py-3 px-2 font-semibold text-gray-600">Error Rate (%)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {metrics.errorRates.map((rate, i) => (
                                    <tr key={i} className="border-b border-gray-100 hover:bg-red-50 transition-colors">
                                      <td className="py-3 px-2 text-gray-700">{rate.date}</td>
                                      <td className={`py-3 px-2 text-right font-medium ${rate.errorRate > 10 ? 'text-red-600' : 'text-gray-700'}`}>
                                        {rate.errorRate}%
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                             </div>
                           </FadeIn>
                         )}

                         {/* AI-Powered Insights */}
                        <FadeIn delay={600} direction="up" className="mb-6 sm:mb-10">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-8">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-800 to-purple-800 bg-clip-text text-transparent">AI-Powered Insights</h2>
                                    <p className="text-sm sm:text-base text-gray-600 mt-1">Smart recommendations and analysis powered by artificial intelligence</p>
                                </div>
                                <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-700 bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1.5 rounded-full border border-indigo-200 self-start">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                                    <span>AI Active</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                                {insights.length > 0 ? insights.map((insight, index) => (
                                    <FadeIn key={index} delay={index * 100} direction="up">
                                    <div className="transform hover:scale-105 transition-all duration-300">
                                        <AIInsightCard
                                            insight={{
                                                id: insight.id,
                                                reportId: insight.reportId,
                                                reportName: insight.reportName,
                                                role: insight.role,
                                                analysisType: insight.analysisType,
                                                severity: insight.severity,
                                                title: insight.title,
                                                description: insight.description,
                                                whatsMissing: insight.whatsMissing || [],
                                                whatsNeeded: insight.whatsNeeded || [],
                                                requiredActions: insight.requiredActions || [],
                                                recommendations: insight.recommendations || [],
                                                impact: insight.impact,
                                                estimatedEffort: insight.estimatedEffort,
                                                priority: insight.priority,
                                                createdAt: insight.createdAt,
                                                updatedAt: insight.updatedAt,
                                            }}
                                            onViewDetails={() => console.log('View details for:', insight.title)}
                                            onTakeAction={() => console.log('Take action for:', insight.title)}
                                        />
                                    </div>
                                    </FadeIn>
                                )) : (
                                    <div className="col-span-full text-center py-12 text-muted-foreground">
                                        <p className="text-lg font-medium">No insights available yet</p>
                                        <p className="text-sm mt-1">Insights will appear here as your reports generate data.</p>
                                    </div>
                                )}
                             </div>
                         </FadeIn>
                     </>
                 )}
            </div>
        </div>
    );
};

export default Dashboard;
