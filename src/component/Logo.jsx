import React from 'react'

const Logo = ({width = "100px", className = ""}) => {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{width}}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full text-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 2L2 7L12 12L22 7L12 2Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path 
          d="M2 17L12 22L22 17" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M2 12L12 17L22 12" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default Logo
