import React from 'react'

export default function OverlayLayer({
  zIndex = 'z-50',
  type = 'flex',
  children,
  className,
  ...props
}) {
  const handleClick = (e) => {
    e.preventDefault()

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <div
      className={`${type} ${zIndex} ${className} items-center flex-col justify-center overflow-hidden fixed inset-0`}
    >
      <div
        className={`overlay absolute inset-0 bg-black opacity-30`}
        onClick={handleClick}
      ></div>

      {children}
    </div>
  )
}
