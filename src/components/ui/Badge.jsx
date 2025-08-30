import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variants = {
    default: 'bg-light-black text-medium-gray',
    primary: 'bg-primary-green/20 text-primary-green',
    success: 'bg-primary-green/20 text-primary-green',
    warning: 'bg-yellow-600/20 text-yellow-400',
    danger: 'bg-red-600/20 text-red-400',
    info: 'bg-blue-600/20 text-blue-400'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;
