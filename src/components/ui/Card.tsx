import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  floating?: boolean;
  hover?: boolean;
  asChild?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glow = false,
  floating = false,
  hover = true,
  asChild = false
}) => {
  const baseStyles = 'bg-cosmic-800/50 backdrop-blur-sm border border-cosmic-700/30 rounded-xl overflow-hidden';

  const variantStyles = [
    glow && 'shadow-glow hover:shadow-glow-strong',
    floating && 'animate-float',
    hover && 'hover:border-cosmic-600/50 hover:bg-cosmic-800/70 transition-all duration-300 hover:scale-[1.02]'
  ].filter(Boolean).join(' ');

  const classes = twMerge(
    baseStyles,
    variantStyles,
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: twMerge(classes, (children as React.ReactElement<any>).props.className)
    });
  }

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className
}) => {
  const classes = twMerge(
    'p-6 pb-4 border-b border-cosmic-700/20',
    className
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className
}) => {
  const classes = twMerge(
    'p-6',
    className
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className
}) => {
  const classes = twMerge(
    'p-6 pt-4 border-t border-cosmic-700/20',
    className
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
};