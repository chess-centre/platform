import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { classNames } from "../../utils/Classes";

export default function ProfileDropDown(props) {
  const { signOut, avatarUrl, isAdminUser } = props;
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-lg border-2 border-yellow-400 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-yellow-400">
              {avatarUrl ? (
                <img
                  className="rounded-md h-8 w-8"
                  src={avatarUrl}
                  alt="Avatar"
                />
              ) : (
                <span className="inline-block relative h-8 w-8 rounded-lg">
                  <svg
                    className="h-full w-full text-gray-300 rounded-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              )}
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-32 sm:w-44 rounded-md shadow-lg bg-white border border-yellow-400 ring-black ring-opacity-100 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/app/profile"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-1 sm:py-2 text-xs sm:text-sm"
                      )}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
              </div>
              {isAdminUser && (
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/app/admin"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-1 sm:py-2 text-xs sm:text-sm"
                        )}
                      >
                        Admin
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              )}
              <div className="py-1 border-t">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={signOut}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700 ",
                        "block px-4 py-1 sm:py-2 text-xs sm:text-sm cursor-pointer"
                      )}
                    >
                      Logout
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
