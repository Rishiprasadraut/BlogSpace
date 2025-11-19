import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-indigo-600 hover:bg-indigo-700",
  textColor = "text-white",
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseClasses = "font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl focus:ring-indigo-500",
    secondary: "bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-800 shadow-lg hover:shadow-xl focus:ring-slate-500 border border-slate-200/50",
    success: "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl focus:ring-emerald-500",
    danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-700 hover:text-white bg-transparent shadow-lg hover:shadow-xl focus:ring-indigo-500"
  };
  
  const finalClasses = bgColor.includes('bg-') 
    ? `${baseClasses} ${sizeClasses[size]} ${bgColor} ${textColor} ${className}`
    : `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  return (
    <button
      type={type}
      {...props}
      className={finalClasses}
    >
      {children}
    </button>
  );
};

export default Button;
