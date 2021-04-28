import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
import {
  MenuIcon,
  OutlinePersonIcon,
  OutlineLogoutIcon,
} from "../../icons";
import { Dropdown, DropdownItem } from "@windmill/react-ui";
import { logout, useAuthDispatch } from "../../context/Auth";

function Header() {
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const { toggleSidebar, isSidebarOpen } = useContext(SidebarContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleProfileClick() {
    setIsProfileMenuOpen(true);
  }
  function signOut() {
    logout(dispatch);
    history.push("/");
  }
  return (
    <header className="z-40 py-4 bg-white border-b dark:bg-gray-800">
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
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-teal focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <span className="inline-block align-middle bg-gray-100 rounded-full border-teal-600 border overflow-hidden h-8 w-8">
                <svg
                  className="h-full w-full text-gray-300 "
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" href="/app/profile">
                <OutlinePersonIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                Profile
              </DropdownItem>

              <DropdownItem onClick={signOut}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                Log out
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
