import React from 'react'

export default function CardBoxComponentFooter({ className, children }) {
  return <footer className={`p-6 ${className}`}>{children}</footer>
}
