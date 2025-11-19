import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", error, ...props },
  ref
) {
  const id = useId();
  
  const baseInputClasses = "w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 placeholder:text-slate-400 shadow-sm focus:shadow-md";
  
  const inputStateClasses = error 
    ? "border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/50 shadow-red-100" 
    : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm hover:border-slate-400 hover:bg-white";
  
  const fileInputClasses = type === 'file' 
    ? "file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-50 file:to-indigo-100 file:text-indigo-700 hover:file:from-indigo-100 hover:file:to-indigo-200 file:cursor-pointer cursor-pointer file:shadow-sm hover:file:shadow-md file:transition-all file:duration-300"
    : "";
  
  return (
    <div className="w-full space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`${baseInputClasses} ${inputStateClasses} ${fileInputClasses} ${className}`}
        {...props}
        ref={ref}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
});
export default Input;
