import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  iconBgColor = 'bg-blue-500',
  trend,
  trendValue,
  className = '',
  ...props 
}) => {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`} {...props}>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 ${iconBgColor} rounded-md flex items-center justify-center`}>
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">{value}</dd>
              {trend && (
                <dd className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {trend === 'up' ? '↗' : '↘'} {trendValue}
                </dd>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
