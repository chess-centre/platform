import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
import {
  MenuIcon,
} from "../../icons";
import { logout, useAuthDispatch, useAuthState } from "../../context/Auth";
import ProfileDropDown from "./ProfileDropDown";

function Header() {
  const { user: {attributes: {
    given_name
  } } } = useAuthState();
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const { toggleSidebar, isSidebarOpen } = useContext(SidebarContext);

  const signOut = () => {
    logout(dispatch);
    history.push("/");
  };

  return (
    <header className="z-40 py-4 bg-white border-b border-gray-200 dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-teal-600 dark:text-teal-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-teal"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          { isSidebarOpen ? <span><i className="fas fa-times"></i></span> : <MenuIcon className="w-6 h-6" aria-hidden="true" /> }
        </button>
        {/* <!-- Search input --> */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0"></div>
        </div>
        
        <ul className="flex items-center flex-shrink-0 space-x-4">
          {/* <!-- Profile menu --> */}
          <li className="relative mb-1">
            { given_name && (<span className="text-xs sm:text-sm text-gray-900 pb-2">Welcome, {given_name}</span>) }
          </li>
          <li className="relative">
            <ProfileDropDown signOut={signOut} />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
