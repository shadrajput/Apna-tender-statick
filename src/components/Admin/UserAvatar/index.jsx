/* eslint-disable @next/next/no-img-element */
// Why disabled:
// avatars.dicebear.com provides svg avatars
// next/image needs dangerouslyAllowSVG option for that

import React from 'react'
import Icon from '../Icon'
import { mdiAccountCircle } from '@mdi/js'

export default function UserAvatar({
  className = '',
  children,
}) {

  return (
    <div className={className}>
      <Icon
        size="24"
        path={mdiAccountCircle}
        className="hidden lg:inline-flex transition-colors"
        />
      {children}
    </div>
  )
}
