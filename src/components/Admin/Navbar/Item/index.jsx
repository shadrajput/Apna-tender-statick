import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { mdiDotsVertical } from '@mdi/js'
import Divider from '../../Divider'
import Icon from '../../Icon'
import UserAvatarCurrentUser from '../../UserAvatar/CurrentUser'
import NavBarMenuList from '../MenuList'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/redux/actions/User'
import { useRouter } from 'next/router'

export default function NavBarItem({ item }) {
  const router = useRouter()
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.user.username)

  const [isDropdownActive, setIsDropdownActive] = useState(false)

  const componentClass = [
    'block lg:flex items-center relative cursor-pointer',
    isDropdownActive
      ? `navbar-item-label-active dark:text-slate-400`
      : `navbar-item-label dark:text-white dark:hover:text-slate-400`,
    item.menu ? 'lg:py-2 lg:px-3' : 'py-2 px-3',
    item.isDesktopNoLabel ? 'lg:w-16 lg:justify-center' : '',
  ].join(' ')

  const itemLabel = item.isCurrentUser ? username : item.label

  const handleMenuClick = () => {
    if(item.isLogout){
      dispatch(logout())
      router.push('/auth/signin')
      return;
    }

    if (item.menu) {
      setIsDropdownActive(!isDropdownActive)
    }

  }

  const NavBarItemComponentContents = (
    <>
      <div
        className={`flex items-center ${
          item.menu
            ? 'bg-gray-100 lg:bg-transparent p-3 lg:p-0'
            : ''
        }`}
        onClick={handleMenuClick}
      >
        {item.isCurrentUser && <UserAvatarCurrentUser className="w-6 h-6 mr-1 inline-flex" />}
        {item.icon && <Icon path={item.icon} className="transition-colors" />}
        <span
          className={`px-2 transition-colors ${
            item.isDesktopNoLabel && item.icon ? 'lg:hidden' : ''
          }`}
        >
          {itemLabel}
        </span>
        {item.menu && (
          <Icon
            path={mdiDotsVertical}
            className="hidden lg:inline-flex transition-colors"
          />
        )}
      </div>
      {item.menu && (
        <div
          className={`${
            !isDropdownActive ? 'lg:hidden' : ''
          } text-sm border-b border-gray-100 lg:border lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg `}
        >
          <NavBarMenuList menu={item.menu} />
        </div>
      )}
    </>
  )

  if (item.isDivider) {
    return <Divider navBar />
  }

  if (item.href) {
    return (
      <Link href={item.href} target={item.target} className={componentClass}>
        {NavBarItemComponentContents}
      </Link>
    )
  }

  return <div className={componentClass}>{NavBarItemComponentContents}</div>
}
