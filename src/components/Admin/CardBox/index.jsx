import React from 'react'
import CardBoxComponentBody from './Component/Body'
import CardBoxComponentFooter from './Component/Footer'

export default function CardBox({
  rounded = 'rounded-2xl',
  flex = 'flex-col',
  className = '',
  hasComponentLayout = false,
  hasTable = false,
  isHoverable = false,
  isModal = false,
  children,
  footer,
  onClick,
}) {
  const componentClass = [
    'bg-white shadow-md flex',
    className,
    rounded,
    flex,
    isModal ? 'dark:bg-slate-900' : 'dark:bg-slate-900/70',
  ]

  if (isHoverable) {
    componentClass.push('hover:shadow-lg transition-shadow duration-500')
  }

  return React.createElement(
    'div',
    { className: componentClass.join(' '), onClick },
    hasComponentLayout ? (
      children
    ) : (
      <>
        <CardBoxComponentBody noPadding={hasTable}>{children}</CardBoxComponentBody>
        {footer && <CardBoxComponentFooter>{footer}</CardBoxComponentFooter>}
      </>
    )
  )
}
