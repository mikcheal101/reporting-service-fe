import React, { useState } from 'react';
import { AIInsight } from '@/types/dashboard';

interface AIInsightCardProps {
  insight: AIInsight;
  onViewDetails?: (insightId: string) => void;
  onTakeAction?: (insightId: string, action: string) => void;
}

const AIInsightCard: React.FC<AIInsightCardProps> = ({
  insight,
  onViewDetails,
  onTakeAction
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = () => {
    switch (insight.severity) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'high':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getSeverityIcon = () => {
    switch (insight.severity) {
      case 'critical':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'high':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'medium':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getRoleColor = () => {
    switch (insight.role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-green-100 text-green-800';
      case 'analyst':
        return 'bg-blue-100 text-blue-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAnalysisTypeIcon = () => {
    switch (insight.analysisType) {
      case 'performance':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'data_quality':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'optimization':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'compliance':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border-2 ${getSeverityColor()} hover:shadow-xl hover:scale-105 transition-all duration-300 group`}>
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`p-3 sm:p-4 rounded-xl ${getSeverityColor()} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
              {getSeverityIcon()}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-indigo-800 transition-colors duration-300">{insight.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">{insight.reportName}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getRoleColor()} shadow-sm self-start`}>
              {insight.role}
            </span>
            <div className="flex items-center gap-2 text-gray-500">
              {getAnalysisTypeIcon()}
              <span className="text-xs font-medium capitalize">{insight.analysisType.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{insight.description}</p>
        
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{insight.priority}</div>
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mt-1">Priority</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 shadow-sm">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{insight.impact}</div>
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mt-1">Impact</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
          {/* What's Missing */}
          <div className="bg-red-50 rounded-lg p-3">
            <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              What's Missing
            </h4>
            <ul className="text-xs sm:text-sm text-red-700 space-y-1">
              {insight.whatsMissing.slice(0, isExpanded ? undefined : 2).map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What's Needed */}
          <div className="bg-yellow-50 rounded-lg p-3">
            <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              What's Needed
            </h4>
            <ul className="text-xs sm:text-sm text-yellow-700 space-y-1">
              {insight.whatsNeeded.slice(0, isExpanded ? undefined : 2).map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Required Actions */}
          <div className="bg-blue-50 rounded-lg p-3">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Required Actions
            </h4>
            <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
              {insight.requiredActions.slice(0, isExpanded ? undefined : 2).map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendations (shown when expanded) */}
        {isExpanded && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-100 shadow-sm">
            <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              AI Recommendations
            </h4>
            <div className="space-y-3">
              {insight.recommendations.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-100 hover:border-green-200 transition-all duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                  <span className="text-sm text-green-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impact & Effort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 text-xs sm:text-sm text-gray-600 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Impact: {insight.impact}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Effort: {insight.estimatedEffort}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs">Priority:</span>
            <div className="flex">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1 ${
                    i < insight.priority ? 'bg-orange-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {onViewDetails && (
              <button
                onClick={() => onViewDetails(insight.id)}
                className="px-3 sm:px-4 py-2 text-sm font-medium bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg border border-gray-200 hover:from-gray-100 hover:to-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Details
              </button>
            )}
            {onTakeAction && (
              <button
                onClick={() => onTakeAction(insight.id, 'implement')}
                className="px-3 sm:px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Take Action
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightCard;
