import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  iconPosition = 'left',
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const baseStyles = 'w-full px-4 py-2 bg-cosmic-800/50 border border-cosmic-700/30 rounded-lg text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:ring-2 focus:ring-cosmic-500/50 focus:border-cosmic-500/50 transition-all duration-200';

  const iconPadding = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';

  const classes = twMerge(
    baseStyles,
    iconPadding,
    error && 'border-red-500/50 focus:ring-red-500/50',
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-cosmic-200"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={classes}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cosmic-400">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className,
  id,
  ...props
}) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const baseStyles = 'w-full px-4 py-2 bg-cosmic-800/50 border border-cosmic-700/30 rounded-lg text-cosmic-100 focus:outline-none focus:ring-2 focus:ring-cosmic-500/50 focus:border-cosmic-500/50 transition-all duration-200 cursor-pointer';

  const classes = twMerge(
    baseStyles,
    error && 'border-red-500/50 focus:ring-red-500/50',
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-cosmic-200"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={classes}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-cosmic-900 text-cosmic-100"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className,
  id,
  ...props
}) => {
  const textAreaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const baseStyles = 'w-full px-4 py-2 bg-cosmic-800/50 border border-cosmic-700/30 rounded-lg text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:ring-2 focus:ring-cosmic-500/50 focus:border-cosmic-500/50 transition-all duration-200 resize-none';

  const classes = twMerge(
    baseStyles,
    error && 'border-red-500/50 focus:ring-red-500/50',
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={textAreaId}
          className="block text-sm font-medium text-cosmic-200"
        >
          {label}
        </label>
      )}
      <textarea
        id={textAreaId}
        className={classes}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};