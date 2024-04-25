import React from 'react'
import { colorsBgLight, colorsText } from '../../../utils/colors'
import Icon from '.'

export default function IconRounded({
  icon,
  color,
  w = 'w-12',
  h = 'h-12',
  bg = false,
  className = '',
}) {
  const classAddon = bg ? colorsBgLight[color] : `${colorsText[color]} bg-gray-50 dark:bg-slate-800`

  return (
    <Icon path={icon} w={w} h={h} size="24" className={`rounded-full ${classAddon} ${className}`} />
  )
}
