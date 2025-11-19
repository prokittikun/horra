import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  className
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={twMerge('flex flex-col items-center justify-center', className)}>
      <div className={`animate-spin ${sizes[size]} border-2 border-cosmic-600 border-t-cosmic-400 rounded-full`} />
      {text && (
        <p className="mt-4 text-cosmic-300 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export const LoadingCard: React.FC<{ text?: string }> = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <Loading text={text} />
    </div>
  );
};

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div className="animate-shimmer bg-cosmic-700/30 rounded-lg h-4 w-3/4 mb-2"></div>
      <div className="animate-shimmer bg-cosmic-700/30 rounded-lg h-4 w-1/2"></div>
    </div>
  );
};