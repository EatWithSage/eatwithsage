import React from 'react';

interface SageLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SageLogo({ className = '', size = 'md' }: SageLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-sage-500 rounded-lg flex items-center justify-center`}>
        {/* Sage leaf icon */}
        <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 text-white fill-current">
          <path d="M12 2c3 0 5.5 1.5 7 4-1.5-1-3.5-1.5-5.5-1.5S9.5 5 8 6c1.5-2.5 4-4 4-4zm0 20c-3 0-5.5-1.5-7-4 1.5 1 3.5 1.5 5.5 1.5s4-.5 5.5-1.5c-1.5 2.5-4 4-4 4z"/>
          <path d="M12 6c2 0 3.5.5 5 1.5-1 2-2.5 3.5-5 3.5s-4-1.5-5-3.5C8.5 6.5 10 6 12 6zm0 8c2 0 3.5-.5 5-1.5-1-2-2.5-3.5-5-3.5s-4 1.5-5 3.5c1.5 1 3 1.5 5 1.5z"/>
        </svg>
      </div>
      <span className={`${textSizes[size]} font-bold font-recoleta text-sage-600`}>Sage</span>
    </div>
  );
}