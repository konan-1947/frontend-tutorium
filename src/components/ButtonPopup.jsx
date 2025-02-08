import React from 'react';

export const Button = ({ variant, children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold";
  const variants = {
    ghost: "bg-transparent hover:bg-gray-100",
    outline: "border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button className={`${baseStyles} ${variants[variant] || ''}`} {...props}>
      {children}
    </button>
  );
};
