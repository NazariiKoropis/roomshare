import React from 'react'

export const UserIcon = ({ width = 28, height = 28, className = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="35" r="18" stroke="currentColor" strokeWidth="6" />

      <path
        d="M22 85 C22 65, 35 55, 50 55 C65 55, 78 65, 78 85"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}
