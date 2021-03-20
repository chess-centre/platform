import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";
import { useAuthState } from "../../context/Auth";
import LogoWithName from "../../assets/img/logo-light-theme.png";

const LandingNav = (props) => {
  
  const { current } = props;
  const { user } = useAuthState();
  const [isExpanded, toggleExpansion] = React.useState(true);
  const activeMenu = "text-orange-brand";
  const selectableMenu = "text-gray-500 hover:text-orange-brand";
  const activeMenuMobile = "text-orange-brand";
  const selectableMenuMobile = "text-gray-700 hover:text-teal-900 hover:bg-orange-50"

  return (
   
    <div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <nav className="relative flex items-center justify-between sm:h-10 md:justify-center">
          <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to="/" aria-label="Home">
                <img
                  className="object-center h-10 md:w-auto"
                  src={Logo}
                  alt="Logo"
                />
              </Link>
              <div
                className={
                  (isExpanded ? "" : "hidden") +
                  "-mr-2 flex items-center md:hidden"
                }
              >
                <button
                  onClick={() => toggleExpansion(!isExpanded)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                  id="main-menu"
                  aria-label="Main menu"
                  aria-haspopup="true"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:space-x-10">
            <Link
              className={ (current === "events" ? 
              activeMenu : 
              selectableMenu) + " font-medium transition duration-150 ease-in-out" }
              to="/events"
            >
              Events
            </Link>
            <Link
              className={ (current === "membership" ? 
              activeMenu : 
              selectableMenu) + " font-medium transition duration-150 ease-in-out" }
              to="/membership"
            >
              Membership
            </Link>
            <Link
              className={ (current === "our-mission" ? 
              activeMenu : 
              selectableMenu) + " font-medium transition duration-150 ease-in-out" }
              to="/our-mission"
            >
              Our Mission
            </Link>
          </div>
          <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            <span className="inline-flex rounded-md shadow">
              {user ? (
                <Link
                  to="/app"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-orange-brand bg-white hover:text-orange-600 focus:outline-none focus:border-orange-300 focus:shadow-outline-orange active:bg-gray-50 active:text-orange-700 transition duration-150 ease-in-out"
                >
                  My Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-teal-600 bg-white hover:text-teal-500 focus:outline-none focus:border-teal-300 focus:shadow-outline-teal active:bg-gray-50 active:text-teal-700 transition duration-150 ease-in-out"
                >
                  Log in
                </Link>
              )}
            </span>
          </div>
        </nav>
      </div>

      <div
        className={
          (isExpanded ? "hidden " : "") +
          "absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        }
      >
        <div className="rounded-lg shadow-md">
          <div
            className="rounded-lg bg-white shadow-xs overflow-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="main-menu"
          >
            <div className="px-5 pt-4 flex items-center justify-between">
              <img
                className="object-centre h-8 w-auto"
                src={LogoWithName}
                alt="Logo"
              />
              <div className="-mr-2">
                <button
                  onClick={() => toggleExpansion(!isExpanded)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                  aria-label="Close menu"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3">
              <Link
                className={ (current === "events" ? 
                activeMenuMobile : 
                selectableMenuMobile) + " text-centre sm:text-left block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:text-teal-900 focus:bg-orange-50 transition duration-150 ease-in-out" }
                role="menuitem"
                to="/events"
              >
                Events
              </Link>
              <Link
                className={ (current === "membership" ? 
                activeMenuMobile : 
                selectableMenuMobile) + " text-centre sm:text-left mt-1 block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:text-teal-900 focus:bg-orange-50 transition duration-150 ease-in-out" }
                role="menuitem"
                to="/membership"
              >
                Membership
              </Link>
              <Link
                className={ (current === "our-mission" ? 
                activeMenu : 
                selectableMenu) + " text-centre sm:text-left mt-1 block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:text-teal-900 focus:bg-orange-50 transition duration-150 ease-in-out" }
                role="menuitem"
                to="/our-mission"
              >
                Our Mission
              </Link>
            </div>
            <div>
              {user ? (
                <Link
                  className="block w-full px-5 py-3 text-center font-medium text-teal-900 bg-gray-50 hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:bg-gray-100 focus:text-teal-700 transition duration-150 ease-in-out"
                  role="menuitem"
                  to="/app"
                >
                  My Dashboard
                </Link>
              ) : (
                <Link
                  className="block w-full px-5 py-3 text-center font-medium text-teal-900 bg-gray-50 hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:bg-gray-100 focus:text-teal-700 transition duration-150 ease-in-out"
                  role="menuitem"
                  to="/login"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingNav;
