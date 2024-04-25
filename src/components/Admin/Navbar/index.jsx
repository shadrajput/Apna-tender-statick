import React, { useState } from 'react'
import { mdiClose, mdiBell, mdiDotsVertical } from '@mdi/js'
import Icon from '../Icon'
import NavBarItemPlain from './Item/Plain'
import NavBarMenuList from './MenuList'
import { useSelector } from 'react-redux'
import Link from 'next/link'

export default function NavBar({ menu, className = '', children }) {
  const {user} = useSelector((state)=> state.user)
  const [isMenuNavBarActive, setIsMenuNavBarActive] = useState(false)

  const handleMenuNavBarToggleClick = () => {
    setIsMenuNavBarActive(!isMenuNavBarActive)
  }

  return (
    <nav
      className={`${className} top-0 inset-x-0 fixed bg-gray-50 h-14 z-30 transition-position w-screen lg:w-auto`}
    >
      <div className={`flex lg:items-stretch xl:max-w-6xl xl:mx-auto bg-gray-100 rounded-xl mt-2`}>
        <div className="flex flex-1 items-stretch h-14">{children}</div>
        <div className='flex items-center mr-3 mt-1'>
          <Link href="/admin/notifications">
            <div className="relative hover:opacity-70">
              {
                user.admin_notification_count != 0
                ?
                  <span className="absolute -top-1 -right-1 text-xs flex justify-center items-center bg-blue-600 text-white text-center rounded-full size-4">
                    <p className="ml-[-1px]">{user.admin_notification_count}</p>
                  </span>
                :
                  null
              }
              <Icon path={mdiBell} size="24" />
            </div>
          </Link>
        </div>
        <div className="flex-none items-stretch flex h-14 lg:hidden">
          <NavBarItemPlain onClick={handleMenuNavBarToggleClick}>
            <Icon path={isMenuNavBarActive ? mdiClose : mdiDotsVertical} size="24" />
          </NavBarItemPlain>
        </div>
        <div
          className={`${
            isMenuNavBarActive ? 'block' : 'hidden'
          } max-h-screen-menu overflow-y-auto lg:overflow-visible absolute w-screen top-14 left-0  shadow-lg lg:w-auto lg:flex lg:static lg:shadow-none`}
        >
          <NavBarMenuList menu={menu} />
        </div>
      </div>
    </nav>
  )
}
