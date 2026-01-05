import React from 'react';
import { ReportCard as ReportCardType } from '@/types/dashboard';

type ReportColor = 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';

interface ReportCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  color?: ReportColor;
  subtitle?: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  color = 'blue',
  subtitle
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      );
    } else if (changeType === 'negative') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
        </svg>
      );
    }
    return null;
  };



  const getGradientColor = () => {
    const gradients: Record<ReportColor, string> = {
      blue: 'to-blue-50',
      green: 'to-emerald-50',
      yellow: 'to-amber-50',
      red: 'to-rose-50',
      purple: 'to-purple-50',
      indigo: 'to-indigo-50'
    };
    return gradients[color] || 'to-gray-50';
  };

  const getBorderColor = () => {
    const borders: Record<ReportColor, string> = {
      blue: 'border-blue-100',
      green: 'border-emerald-100',
      yellow: 'border-amber-100',
      red: 'border-rose-100',
      purple: 'border-purple-100',
      indigo: 'border-indigo-100'
    };
    return borders[color] || 'border-gray-100';
  };

  const getIconBgColor = () => {
    const backgrounds: Record<ReportColor, string> = {
      blue: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      green: 'bg-gradient-to-br from-emerald-500 to-green-600',
      yellow: 'bg-gradient-to-br from-amber-500 to-orange-600',
      red: 'bg-gradient-to-br from-rose-500 to-red-600',
      purple: 'bg-gradient-to-br from-purple-500 to-pink-600',
      indigo: 'bg-gradient-to-br from-indigo-500 to-purple-600'
    };
    return backgrounds[color] || 'bg-gradient-to-br from-gray-500 to-gray-600';
  };

  const getTextColor = () => {
    const textColors: Record<ReportColor, string> = {
      blue: 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent',
      green: 'bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent',
      yellow: 'bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent',
      red: 'bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent',
      purple: 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent',
      indigo: 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
    };
    return textColors[color] || 'text-gray-900';
  };

  const getChangeBadgeColor = () => {
    if (changeType === 'positive') {
      return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    } else if (changeType === 'negative') {
      return 'bg-rose-100 text-rose-700 border border-rose-200';
    }
    return 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  return (
    <div className={`group bg-gradient-to-br from-white ${getGradientColor()} rounded-2xl shadow-lg border ${getBorderColor()} p-4 sm:p-6 hover:shadow-xl hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            {icon && (
              <div className={`p-2 sm:p-3 ${getIconBgColor()} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <span className="text-white text-lg sm:text-xl">{icon}</span>
              </div>
            )}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">{title}</h3>
              {subtitle && (
                <p className="text-xs sm:text-sm text-gray-600 font-medium">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="mt-3">
            <p className={`text-2xl sm:text-3xl font-bold ${getTextColor()}`}>{value}</p>
            
            {change && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-3">
                <div className="flex items-center gap-2">
                  {getChangeIcon()}
                  <span className={`text-xs sm:text-sm font-semibold px-2 py-1 rounded-full ${getChangeBadgeColor()}`}>
                    {change}
                  </span>
                </div>
                <span className="text-xs text-gray-500">vs last period</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
