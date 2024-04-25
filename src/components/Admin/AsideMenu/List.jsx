import React from 'react'
import AsideMenuItem from './Item'

export default function AsideMenuList({ menu, isDropdownList = false, className = '' }) {
  return (
    <ul className={className}>
      {menu.map((item, index) => (
        <AsideMenuItem key={index} item={item} isDropdownList={isDropdownList} />
      ))}
    </ul>
  )
}
