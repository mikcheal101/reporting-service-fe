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
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 dark:from-gray-100 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg font-medium">Welcome back! Here is what is happening with your reports today.</p>
                        </div>
                        {!loading && !error && (
                            <div className="flex sm:hidden items-center space-x-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-gradient-to-r from-emerald-50 dark:from-emerald-950/50 to-green-50 dark:to-green-950/50 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 shadow-sm self-start">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
                                <span>Live Data</span>
                            </div>
                        )}
                        {!loading && !error && (
                            <div className="hidden sm:flex items-center space-x-3 text-sm font-semibold text-emerald-700 dark:text-emerald-400 bg-gradient-to-r from-emerald-50 dark:from-emerald-950/50 to-green-50 dark:to-green-950/50 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800 shadow-sm hover:shadow-md transition-all duration-300">
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
                            { from: "from-white dark:from-card to-blue-50 dark:to-card", border: "border-blue-100", bg: "from-blue-500 to-indigo-600", title: "Total Reports", value: stats.totalReports.toLocaleString(), sub: `${stats.reportsThisMonth} generated this month`, icon: "📊", text: "from-blue-600 to-indigo-600" },
                            { from: "from-white dark:from-card to-emerald-50 dark:to-card", border: "border-emerald-100", bg: "from-emerald-500 to-green-600", title: "Completed", value: stats.completedReports.toLocaleString(), sub: `${stats.successRate}% success rate`, icon: "📈", text: "from-emerald-600 to-green-600", subClass: "text-emerald-600 font-medium" },
                            { from: "from-white dark:from-card to-amber-50 dark:to-card", border: "border-amber-100", bg: "from-amber-500 to-orange-600", title: "Connections", value: metrics.connectionCount, sub: `${metrics.totalTasks} total tasks`, icon: "⚡", text: "from-amber-600 to-orange-600", subClass: "text-amber-600 font-medium" },
                            { from: "from-white dark:from-card to-purple-50 dark:to-card", border: "border-purple-100", bg: "from-purple-500 to-pink-600", title: "Users", value: metrics.userCount, sub: "Active accounts", icon: "✅", text: "from-purple-600 to-pink-600", subClass: "text-purple-600 font-medium" },
                          ].map((card, i) => (
                            <FadeIn key={card.title} delay={i * 100} direction="up">
                              <div className={`group bg-gradient-to-br ${card.from} p-4 sm:p-6 rounded-2xl shadow-lg border ${card.border} hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{card.title}</p>
                                    <p className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${card.text} bg-clip-text text-transparent`}>{card.value}</p>
                                    <p className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 ${card.subClass || ""}`}>{card.sub}</p>
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
                                        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 dark:from-gray-200 to-blue-700 dark:to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                                            Analytics Overview
                                        </h2>
                                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Report distribution by type.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {metrics.reportsByType.map((report, index) => {
                                        const colors = [
                                            { bg: 'from-white dark:from-card to-cyan-50 dark:to-card', border: 'border-cyan-100', text: 'from-cyan-600 to-blue-600', accent: 'text-cyan-600', icon: 'from-cyan-500 to-blue-600' },
                                            { bg: 'from-white dark:from-card to-rose-50 dark:to-card', border: 'border-rose-100', text: 'from-rose-600 to-pink-600', accent: 'text-rose-600', icon: 'from-rose-500 to-pink-600' },
                                            { bg: 'from-white dark:from-card to-violet-50 dark:to-card', border: 'border-violet-100', text: 'from-violet-600 to-purple-600', accent: 'text-violet-600', icon: 'from-violet-500 to-purple-600' }
                                        ];
                                        const colorScheme = colors[index % colors.length];
                                        return (
                                            <div key={index} className={`group bg-gradient-to-br ${colorScheme.bg} p-4 sm:p-6 rounded-2xl shadow-lg border ${colorScheme.border} hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{report.type}</p>
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
                                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 dark:from-gray-200 to-blue-700 dark:to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                                  Execution Trends (Last 30 Days)
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Daily task executions and average duration.</p>
                              </div>
                            </div>
                            <div className="overflow-x-auto bg-white dark:bg-card rounded-2xl shadow-lg border border-gray-100 dark:border-border p-4 sm:p-6">
                              <table className="w-full text-sm sm:text-base">
                                <thead>
                                  <tr className="border-b border-gray-200 dark:border-border">
                                    <th className="text-left py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">Date</th>
                                    <th className="text-right py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">Executions</th>
                                    <th className="text-right py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">Avg Time (sec)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {metrics.executionTrends.map((trend, i) => (
                                    <tr key={i} className="border-b border-gray-100 dark:border-border hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                                      <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{trend.date}</td>
                                      <td className="py-3 px-2 text-right font-medium text-blue-600">{trend.count}</td>
                                      <td className="py-3 px-2 text-right text-gray-700 dark:text-gray-300">{trend.avgTime}</td>
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
                                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 dark:from-gray-200 to-emerald-700 dark:to-emerald-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                                  Top Performing Reports
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Reports with the most successful executions.</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                              {metrics.topPerformingReports.map((report, i) => (
                                <div key={i} className="bg-gradient-to-br from-white dark:from-card to-emerald-50 dark:to-card p-4 sm:p-6 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{report.name}</p>
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

                          {/* Reports by Frequency */}
                        {metrics.reportsByFrequency && metrics.reportsByFrequency.length > 0 && (
                          <FadeIn delay={450} direction="up" className="mb-6 sm:mb-10">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                              <div>
                                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 dark:from-gray-200 to-teal-700 dark:to-teal-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                                  Reports by Frequency
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Distribution of report scheduling frequencies.</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
                              {metrics.reportsByFrequency.map((item, i) => {
                                const freqColors = [
                                  { bg: 'from-white dark:from-card to-teal-50 dark:to-card', border: 'border-teal-100', text: 'from-teal-600 to-emerald-600', accent: 'text-teal-600', icon: 'from-teal-500 to-emerald-600' },
                                  { bg: 'from-white dark:from-card to-cyan-50 dark:to-card', border: 'border-cyan-100', text: 'from-cyan-600 to-blue-600', accent: 'text-cyan-600', icon: 'from-cyan-500 to-blue-600' },
                                  { bg: 'from-white dark:from-card to-sky-50 dark:to-card', border: 'border-sky-100', text: 'from-sky-600 to-indigo-600', accent: 'text-sky-600', icon: 'from-sky-500 to-indigo-600' },
                                ];
                                const cs = freqColors[i % freqColors.length];
                                return (
                                  <div key={i} className={`group bg-gradient-to-br ${cs.bg} p-4 rounded-2xl shadow-lg border ${cs.border} hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">{item.frequency.replace(/_/g, ' ')}</p>
                                    <p className={`text-2xl font-bold bg-gradient-to-r ${cs.text} bg-clip-text text-transparent`}>{item.count}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </FadeIn>
                        )}

                          {/* Connection Types */}
                        {metrics.connectionTypes && metrics.connectionTypes.length > 0 && (
                          <FadeIn delay={475} direction="up" className="mb-6 sm:mb-10">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                              <div>
                                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 dark:from-gray-200 to-rose-700 dark:to-rose-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                                  Connection Types
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Database types used across your connections.</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                              {metrics.connectionTypes.map((item, i) => {
                                const dbColors = [
                                  { bg: 'from-white dark:from-card to-rose-50 dark:to-card', border: 'border-rose-100', text: 'from-rose-600 to-pink-600', accent: 'text-rose-600', icon: 'from-rose-500 to-pink-600' },
                                  { bg: 'from-white dark:from-card to-amber-50 dark:to-card', border: 'border-amber-100', text: 'from-amber-600 to-orange-600', accent: 'text-amber-600', icon: 'from-amber-500 to-orange-600' },
                                  { bg: 'from-white dark:from-card to-violet-50 dark:to-card', border: 'border-violet-100', text: 'from-violet-600 to-purple-600', accent: 'text-violet-600', icon: 'from-violet-500 to-purple-600' },
                                  { bg: 'from-white dark:from-card to-lime-50 dark:to-card', border: 'border-lime-100', text: 'from-lime-600 to-green-600', accent: 'text-lime-600', icon: 'from-lime-500 to-green-600' },
                                ];
                                const cs = dbColors[i % dbColors.length];
                                return (
                                  <div key={i} className={`group bg-gradient-to-br ${cs.bg} p-4 rounded-2xl shadow-lg border ${cs.border} hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">{item.databaseType}</p>
                                    <p className={`text-2xl font-bold bg-gradient-to-r ${cs.text} bg-clip-text text-transparent`}>{item.count}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </FadeIn>
                        )}

                          {/* Error Rates */}
                        {metrics.errorRates && metrics.errorRates.length > 0 && (
                          <FadeIn delay={500} direction="up" className="mb-6 sm:mb-10">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                              <div>
                                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 dark:from-gray-200 to-red-700 dark:to-red-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                                  Error Rates (Last 30 Days)
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Daily failure rate as percentage of total executions.</p>
                              </div>
                            </div>
                            <div className="overflow-x-auto bg-white dark:bg-card rounded-2xl shadow-lg border border-gray-100 dark:border-border p-4 sm:p-6">
                              <table className="w-full text-sm sm:text-base">
                                <thead>
                                  <tr className="border-b border-gray-200 dark:border-border">
                                    <th className="text-left py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">Date</th>
                                    <th className="text-right py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">Error Rate (%)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {metrics.errorRates.map((rate, i) => (
                                    <tr key={i} className="border-b border-gray-100 dark:border-border hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                                      <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{rate.date}</td>
                                      <td className={`py-3 px-2 text-right font-medium ${rate.errorRate > 10 ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {rate.errorRate}%
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                             </div>
                           </FadeIn>
                          )}

                          {/* Recent Executions */}
                        {metrics.recentExecutions && metrics.recentExecutions.length > 0 && (
                          <FadeIn delay={550} direction="up" className="mb-6 sm:mb-10">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                              <div>
                                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 dark:from-gray-200 to-sky-700 dark:to-sky-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                                  Recent Executions
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Latest task execution activity.</p>
                              </div>
                            </div>
                            <div className="overflow-x-auto bg-white dark:bg-card rounded-2xl shadow-lg border border-gray-100 dark:border-border p-4 sm:p-6">
                              <table className="w-full text-sm sm:text-base">
                                <thead>
                                  <tr className="border-b border-gray-200 dark:border-border">
                                    <th className="text-left py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">Report</th>
                                    <th className="text-left py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">Status</th>
                                    <th className="text-right py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">Duration</th>
                                    <th className="text-right py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">Executed At</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {metrics.recentExecutions.map((exec, i) => {
                                    const statusColors: Record<string, string> = {
                                      COMPLETED: 'text-emerald-600',
                                      FAILED: 'text-red-600',
                                      RUNNING: 'text-blue-600',
                                      QUEUED: 'text-amber-600',
                                      SCHEDULED: 'text-gray-500',
                                      RETRYING: 'text-orange-600',
                                      PAUSED: 'text-yellow-600',
                                      CANCELLED: 'text-gray-400',
                                      EXPIRED: 'text-red-400',
                                    };
                                    return (
                                      <tr key={i} className="border-b border-gray-100 dark:border-border hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors">
                                        <td className="py-3 px-2 text-gray-700 dark:text-gray-300 font-medium">{exec.reportName}</td>
                                        <td className={`py-3 px-2 font-semibold ${statusColors[exec.status] || 'text-gray-500'}`}>{exec.status}</td>
                                        <td className="py-3 px-2 text-right text-gray-700 dark:text-gray-300">{exec.duration || '-'}</td>
                                        <td className="py-3 px-2 text-right text-gray-500 text-xs">{exec.executedAt ? new Date(exec.executedAt).toLocaleString() : '-'}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                             </div>
                           </FadeIn>
                          )}

                         {/* AI-Powered Insights */}
                        <FadeIn delay={600} direction="up" className="mb-6 sm:mb-10">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-8">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-800 dark:from-indigo-400 to-purple-800 dark:to-purple-400 bg-clip-text text-transparent">AI-Powered Insights</h2>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">Smart recommendations and analysis powered by artificial intelligence</p>
                                </div>
                                <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-700 dark:text-indigo-400 bg-gradient-to-r from-indigo-50 dark:from-indigo-950/50 to-purple-50 dark:to-purple-950/50 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 self-start">
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
