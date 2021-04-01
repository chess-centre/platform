import React from "react";
import routes from "../../routes/sidebar";
import { NavLink, Route, Link } from "react-router-dom";
import * as Icons from "../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
import ImageLight from "../../assets/img/logo-light-theme-small.png";
import ImageDark from "../../assets/img/logo-dark-theme-small.png";
import ImageLightBeta from "../../assets/img/beta/logo-light-theme-beta-small.png";
import ImageDarkBeta from "../../assets/img/beta/logo-dark-theme-beta-small.png";
const version = process.env.CHESS_CENTRE_VERSION;

let isDev = true;
if (process.env.NODE_ENV.includes("prod")) {
    isDev = false
};


function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <NavLink
        to="/"
        className="text-lg font-bold text-gray-800 dark:text-gray-500 hover:text-gray-500"
      >
        <img
          aria-hidden="true"
          className="object-scale-down h-6 w-full inline-block  dark:hidden"
          src={ isDev ? ImageLightBeta : ImageLight }
          alt="Logo"
        />
        <img
          aria-hidden="true"
          className="object-scale-down h-6 w-full dark:inline-block hidden"
          src={ isDev ? ImageDarkBeta : ImageDark }
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
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className="absolute bottom-1 px-6 my-6 text-xs hover:underline">
          <Link to="/roadmap">{ `v${version}` }</Link>
      </div>
    </div>
  );
}

export default SidebarContent;
