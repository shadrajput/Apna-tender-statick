import React from 'react'

export default function Divider({ navBar = false }) {
  const classAddon = navBar
    ? 'hidden lg:block lg:my-0.5 border-slate-600'
    : 'my-6 -mx-6 border-slate-600'

  return <hr className={`${classAddon} border-t border-gray-100`} />
}
