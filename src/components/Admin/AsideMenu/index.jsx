import React from 'react'
import AsideMenuLayer from './Layer'
import OverlayLayer from '../OverlayLayer'

export default function AsideMenu({
  isAsideMobileExpanded = false,
  isAsideLgActive = false,
  ...props
}) {
  return (
    <>
      <AsideMenuLayer
        menu={props.menu}
        className={`${isAsideMobileExpanded ? 'left-0' : '-left-60 lg:left-0'} ${
          !isAsideLgActive ? 'lg:hidden xl:flex' : ''
        }`}
        onAsideLgCloseClick={props.onAsideLgClose}
      />
      {isAsideLgActive && <OverlayLayer zIndex="z-30" onClick={props.onAsideLgClose} />}
    </>
  )
}
