import React from 'react';

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  >
    {children}
  </button>
));

Button.displayName = 'Button';

