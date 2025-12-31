import ReportCard from "@/components/ReportCard";
import AIInsightCard from "@/components/AIInsightCard";
import { mockReportStatistics, mockAIInsights, mockReportAnalytics } from "@/data/mockDashboard";

const Dashboard: React.FC = () => {
    return(
        <div className="p-3 sm:p-6 space-y-6 sm:space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
                {/* Header */}
                <div className="mb-6 sm:mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1 sm:space-y-2">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium">Welcome back! Here's what's happening with your reports today.</p>
                        </div>
                        <div className="flex sm:hidden items-center space-x-2 text-xs font-semibold text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm self-start">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
                            <span>Live Data</span>
                        </div>
                        <div className="hidden sm:flex items-center space-x-3 text-sm font-semibold text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-full border border-emerald-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
                            <span>Live Data</span>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="group bg-gradient-to-br from-white to-blue-50 p-4 sm:p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Reports</p>
                                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{mockReportStatistics.totalReports.toLocaleString()}</p>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1">+{mockReportStatistics.reportsThisMonth - mockReportStatistics.reportsLastMonth} Generated reports</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <span className="text-xl sm:text-2xl">📊</span>
                            </div>
                        </div>
                    </div>
                    <div className="group bg-gradient-to-br from-white to-emerald-50 p-4 sm:p-6 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">This Month</p>
                                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{mockReportStatistics.reportsThisMonth.toLocaleString()}</p>
                                <p className="text-xs sm:text-sm text-emerald-600 mt-1 font-medium">+{((mockReportStatistics.reportsThisMonth - mockReportStatistics.reportsLastMonth) / mockReportStatistics.reportsLastMonth * 100).toFixed(1)}% vs last month</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <span className="text-xl sm:text-2xl">📈</span>
                            </div>
                        </div>
                    </div>
                    <div className="group bg-gradient-to-br from-white to-amber-50 p-4 sm:p-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Performance</p>
                                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{mockReportStatistics.averageGenerationTime}s</p>
                                <p className="text-xs sm:text-sm text-amber-600 mt-1 font-medium">-12% Avg generation time</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <span className="text-xl sm:text-2xl">⚡</span>
                            </div>
                        </div>
                    </div>
                    <div className="group bg-gradient-to-br from-white to-purple-50 p-4 sm:p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Success Rate</p>
                                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{mockReportStatistics.successRate}%</p>
                                <p className="text-xs sm:text-sm text-purple-600 mt-1 font-medium">+2.1% Quality score</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <span className="text-xl sm:text-2xl">✅</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analytics Overview */}
                <div className="mb-6 sm:mb-10">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                                Analytics Overview
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 font-medium">Detailed insights into your report generation patterns and performance metrics.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {mockReportAnalytics.reportsByType.map((report, index) => {
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
                </div>

                {/* AI-Powered Insights */}
                <div className="mb-6 sm:mb-10">
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
                        {mockAIInsights.map((insight, index) => (
                            <div key={index} className="transform hover:scale-105 transition-all duration-300">
                                <AIInsightCard
                                    insight={insight}
                                    onViewDetails={() => console.log('View details for:', insight.title)}
                                    onTakeAction={() => console.log('Take action for:', insight.title)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;
