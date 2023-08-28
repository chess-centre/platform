import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState, useAuthDispatch, logout } from "../../context/Auth";
import Logo from "../../assets/img/ssc-logo-black.svg";
import LogoWithName from "../../assets/img/ssc-logo-black.svg";

const headings = [
  { url: "our-vision", title: "Our Vision" },
  { url: "our-coaches", title: "Our Coaches" },
];

const LandingNav = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { current } = props;
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const { user } = useAuthState() as any;
  const [isExpanded, toggleExpansion] = React.useState(true);
  const activeMenu = "text-yellow-brand";
  const selectableMenu = "text-gray-500 hover:text-yellow-brand";
  const activeMenuMobile = "text-yellow-brand";
  const selectableMenuMobile =
    "text-gray-700 hover:text-yellow-900 hover:bg-yellow-50";

  const signOut = () => {
    logout(dispatch);
    history.push("/");
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        await Auth.currentAuthenticatedUser();
      } catch (error) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
      }
    };
    if (user && user?.userConfirmed) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
    }
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-">
        {/* DESKTOP */}
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
            {headings.map(({ url, title }, index) => {
              return (
                <Link
                  key={index}
                  className={
                    (current === url ? activeMenu : selectableMenu) +
                    " font-medium transition duration-150 ease-in-out"
                  }
                  to={`/${url}`}
                >
                  {title}
                </Link>
              );
            })}
          </div>
          {/* <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            <span className="inline-flex rounded-md">
              {isLoggedIn ? (
                <div className="grid grid-cols-2">
                  <div className="text-yellow-brand bg-white hover:text-yellow-600 ">
                    <Link
                      to="/app"
                      className={`inline-flex items-center px-4 py-2 border border-transparent 
                        text-base leading-4 font-medium rounded-md 
                        focus:outline-none  active:bg-gray-50 active:text-yellow-700 transition duration-300 ease-in-out shadow`}
                    >
                      <span>
                        <i className="fad fa-user"></i>{" "}
                        <span className="text-gray-600 hover:text-yellow-600 text-sm">
                          Dashboard
                        </span>
                      </span>
                    </Link>
                  </div>
                  <div className="ml-1 text-gray-700 hover:text-white transition duration-300 ease-in-out">
                    <button
                      aria-label="Sign Out"
                      onClick={signOut}
                      className={`inline-flex items-center px-4 py-2 border border-transparent 
                      text-base leading-4 font-medium rounded-md text-white bg-gray-400 hover:text-gray-900
                      focus:outline-none active:bg-gray-50 active:text-yellow-700 transition duration-300 ease-in-out shadow`}
                    >
                      <span>
                        <i className="fad fa-sign-out"></i>{" "}
                        <span className="text-sm">Logout</span>
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className={`inline-flex items-center px-3 py-2 border border-transparent shadow text-sm leading-4 
                    font-medium rounded-md text-yellow-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-yellow-400`}
                  >
                    <span className="text-sm">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className={`inline-flex items-center px-3 py-2 border border-transparent shadow text-sm leading-4 
                    font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-yellow-400`}
                  >
                    <span className="text-sm">Register</span>
                  </Link>
                </div>
              )}
            </span>
          </div> */}
        </nav>
      </div>

      {/* MOBILE */}
      <div
        className={
          (isExpanded ? "hidden " : "") +
          "absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10"
        }
      >
        <div className="rounded-lg shadow-lg slide">
          <div
            className="rounded-lg bg-white shadow-xs overflow-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="main-menu"
          >
            <div className="px-5 pt-4 flex items-center justify-between">
              <img
                className={"object-centre m-auto h-7 w-auto"}
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
            <div className="px-2 pt-2 pb-2">
              {headings.map(({ url, title }, index) => {
                return (
                  <Link
                    key={index}
                    className={
                      (current === url
                        ? activeMenuMobile
                        : selectableMenuMobile) +
                      ` block w-full px-5 py-4 text-center text-sm text-yellow-500 hover:text-yellow-600
                      focus:outline-none focus:bg-gray-100 focus:text-yellow-600`
                    }
                    role="menuitem"
                    to={`/${url}`}
                  >
                    {title}
                  </Link>
                );
              })}
            </div>
            {/* <div>
              {isLoggedIn ? (
                <>
                  <Link
                    className={`block w-full px-5 py-4 text-center text-sm text-yellow-400 bg-gray-50 hover:bg-gray-100 hover:text-yellow-600 border-gray-100
                  focus:outline-none focus:bg-gray-100 focus:text-yellow-600`}
                    role="menuitem"
                    to="/app"
                  >
                    <span>
                      <span className="text-yellow-400 hover:text-yellow-600 text-sm">
                        Dashboard
                      </span>
                    </span>
                  </Link>
                  <button
                    onClick={signOut}
                    className={`block w-full z-20 px-5 py-4 text-center text-sm text-gray-900 bg-white hover:bg-gray-100 border-gray-300 shadow-lg
                   hover:text-yellow-600 focus:outline-none focus:bg-gray-100 focus:text-yellow-600`}
                    role="menuitem"
                  >
                    <span>
                      <span className="text-sm">Logout</span>
                    </span>
                  </button>
                </>
              ) : (
                <Link
                  className={`block w-full px-5 py-3 text-center text-sm text-yellow-900 bg-gray-100 hover:bg-gray-100 hover:text-yellow-600 
                  focus:outline-none focus:bg-gray-100 focus:text-yellow-600 transition duration-150 ease-in-out`}
                  role="menuitem"
                  to="/login"
                >
                  <span className="text-gray-900 font-medium font-sans">
                    <span className="text-sm ml-1">LOGIN</span>
                  </span>
                </Link>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingNav;
