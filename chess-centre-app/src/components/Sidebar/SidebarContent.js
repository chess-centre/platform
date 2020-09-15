import React from 'react'
import routes from '../../routes/sidebar'
import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button, Avatar } from '@windmill/react-ui'

import ImageLight from '../../assets/img/logo-light-theme.png';
import ImageDark from '../../assets/img/logo-dark-theme.png';

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <NavLink to="/" className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-500 hover:text-gray-500">
            <img
              aria-hidden="true"
              className="inline-block h-6 w-auto dark:hidden"
              src={ImageLight}
              alt="Logo"
            />
            <img
              aria-hidden="true"
              className="h-6 w-auto dark:inline-block hidden"
              src={ImageDark}
              alt="Logo"
            />
      </NavLink>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-teal-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className="px-6 my-6">
        <Button className="text-gray-700 hover:text-white dark:text-white dark:hover:text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <svg fill="currentColor" className="fill-current w-4 h-4 mr-2">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
          </svg>
          Shop
        </Button>
      </div>
    </div>
  )
}

export default SidebarContent
