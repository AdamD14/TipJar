'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', size = 'md', isLoading = false, disabled, ...props }) => {
  const baseStyle = 'font-heading font-semibold rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-tipjar-turquoise-dark focus:ring-tipjar-gold-dark disabled:opacity-50 disabled:cursor-not-allowed';

  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'bg-tipjar-gold text-tipjar-turquoise-dark hover:bg-tipjar-gold-dark';
      break;
    case 'secondary':
      variantStyle = 'bg-tipjar-turquoise text-tipjar-gold hover:bg-tipjar-turquoise-dark';
      break;
    case 'ghost':
      variantStyle = 'bg-transparent text-tipjar-gold hover:bg-tipjar-gold/10';
      break;
    case 'outline':
      variantStyle = 'bg-transparent text-tipjar-gold border-2 border-tipjar-gold hover:bg-tipjar-gold hover:text-tipjar-turquoise-dark';
      break;
  }

  let sizeStyle = '';
  switch (size) {
    case 'sm':
      sizeStyle = 'py-1 px-3 text-sm';
      break;
    case 'md':
      sizeStyle = 'py-2 px-5 text-base';
      break;
    case 'lg':
      sizeStyle = 'py-3 px-7 text-lg';
      break;
  }

  return (
    <motion.button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      disabled={disabled || isLoading}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Ładowanie...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};
export default Button;
