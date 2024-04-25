import React from 'react'


export default function CardBoxComponentBody({ noPadding = false, className, children }) {
  return <div className={`flex-1 ${noPadding ? '' : 'p-6'} ${className}`}>{children}</div>
}
