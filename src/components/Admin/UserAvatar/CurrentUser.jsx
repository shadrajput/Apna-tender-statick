import React from 'react'
import UserAvatar from '.'


export default function UserAvatarCurrentUser({ className = '', children }) {

  return (
    <UserAvatar username='admin@gmail.com' className={className}>
      {children}
    </UserAvatar>
  )
}
