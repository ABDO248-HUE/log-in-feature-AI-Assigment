import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightElement, className = '', ...props }, ref) => {
    const generatedId = useId();
    const inputId = props.id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        <label 
          htmlFor={inputId} 
          className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2"
        >
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : undefined}
            className={`
              w-full py-2.5 bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 
              focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm
              ${icon ? 'pl-11' : 'pl-4'} 
              ${rightElement ? 'pr-11' : 'pr-4'}
              ${error 
                ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' 
                : 'border-slate-200 focus:ring-indigo-500 focus:border-indigo-500'
              } 
              ${className}
            `}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-1.5 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p 
            id={errorId} 
            className="text-xs text-rose-500 mt-1.5 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';