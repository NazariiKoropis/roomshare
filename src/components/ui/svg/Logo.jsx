import React from 'react'

export const Logo = ({ width = 40, height = 40, className = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="15"
        y="15"
        width="45"
        height="45"
        rx="10"
        stroke="var(--text-primary)"
        strokeWidth="6"
      />

      <rect
        x="40"
        y="40"
        width="45"
        height="45"
        rx="10"
        stroke="var(--accent-primary)"
        strokeWidth="6"
      />

      <rect
        x="43"
        y="43"
        width="14"
        height="14"
        rx="4"
        fill="var(--accent-primary)"
      />
    </svg>
  )
}
