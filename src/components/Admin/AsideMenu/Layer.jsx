import React from 'react'
import { mdiLogout, mdiClose } from '@mdi/js'
import Icon from '../Icon'
import AsideMenuItem from './Item'
import AsideMenuList from './List'
import { logout } from '@/redux/actions/User'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

export default function AsideMenuLayer({ menu, className = '', ...props }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutItem = {
    label: 'Logout',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
  }

  const handleAsideLgCloseClick = (e) => {
    e.preventDefault()
    props.onAsideLgCloseClick()
  }

  return (
    <aside
      className={`${className} lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div
        className={`aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden bg-slate-900`}
      >
        <div
          className={`aside-brand flex flex-row h-14 items-center justify-between bg-black`}
        >
          <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
            <b className="text-white">Apna Tender</b>
          </div>
          <button
            className="hidden lg:inline-block xl:hidden p-3"
            onClick={handleAsideLgCloseClick}
          >
            <Icon path={mdiClose} className='text-white' />
          </button>
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${
            'aside-scrollbars'
          }`}
        >
          <AsideMenuList menu={menu} />
        </div>
        <div className='hover:opacity-80' onClick={()=> {dispatch(logout()); router.push('/auth/signin') }}>
          <AsideMenuItem item={logoutItem} />
        </div>
      </div>
    </aside>
  )
}
