import React from 'react'
import NavBarItem from './Item'

export default function NavBarMenuList({ menu }) {
  return (
    <>
      {menu.map((item, index) => (
        <NavBarItem key={index} item={item} />
      ))}
    </>
  )
}
