import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  iconBgColor = 'bg-primary-green',
  trend,
  trendValue,
  className = '',
  ...props 
}) => {
  return (
    <div className={`bg-dark-bg border border-light-black overflow-hidden rounded-lg ${className}`} {...props}>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 ${iconBgColor} rounded-md flex items-center justify-center`}>
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-medium-gray truncate">{title}</dt>
              <dd className="text-lg font-medium text-off-white">{value}</dd>
              {trend && (
                <dd className={`text-sm ${trend === 'up' ? 'text-primary-green' : 'text-red-400'}`}>
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
