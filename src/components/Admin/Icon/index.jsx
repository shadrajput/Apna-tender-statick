import React from 'react'

export default function Icon({
  path,
  w = 'w-6',
  h = 'h-6',
  size = null,
  className = '',
  children,
}) {
  const iconSize = size ?? 16

  return (
    <span className={`inline-flex justify-center items-center ${w} ${h} ${className}`}>
      <svg viewBox="0 0 24 24" width={iconSize} height={iconSize} className="inline-block">
        <path fill="currentColor" d={path} />
      </svg>
      {children}
    </span>
  )
}
