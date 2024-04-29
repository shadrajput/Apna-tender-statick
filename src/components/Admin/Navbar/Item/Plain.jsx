import React from 'react'

export default function NavBarItemPlain({
  display = 'flex',
  useMargin = false,
  onClick,
  children,
}) {
  const classBase = 'items-center cursor-pointer dark:text-white dark:hover:text-slate-400'
  const classAddon = `${display} navbar-item-label ${useMargin ? 'my-2 mx-3' : 'py-2 px-3'}`

  return (
    <div className={`${classBase} ${classAddon}`} onClick={onClick}>
      {children}
    </div>
  )
}
