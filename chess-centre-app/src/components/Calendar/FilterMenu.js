import { useState } from "react";
import { Menu } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterMenu(props) {
  const { filters, setFilters, selected, setSelected } = props;
  const trueState = Object.keys(filters).reduce((pre, cur) => ({...pre, [cur]: true }), {});
  const falseState = Object.keys(filters).reduce((pre, cur) => ({...pre, [cur]: false }), {});

  const handleClick = (type) => {
    setFilters((state) => {
      return {
        ...state,
        [type]: !state[type],
      };
    });
  };
  const handleSelectAll = () => {
    if(selected) {
      setFilters(trueState);
    } else {
      setFilters(falseState);
    }
    setSelected(!selected);
  };

  return (
    <div className="mt-0.5 z-100">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`ml-2 relative inline-flex items-center px-2 py-2 shadow-md rounded-md border border-gray-300 bg-white text-sm ring-teal-500
                      hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
          >
            <span className="sr-only">Filter</span>
            <i className="fas fa-filter"></i>
          </Menu.Button>
        </div>

        <Menu.Items className="origin-top-right absolute right-0 z-100 mt-2 w-34 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item onClick={() => handleClick("rapidplay")}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    checked={filters.rapidplay}
                    className="mr-3 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                  />
                  Rapidplays
                </div>
              )}
            </Menu.Item>
            <Menu.Item onClick={() => handleClick("congress")}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    checked={filters.congress}
                    className="mr-3 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                  />
                  Congresses
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item onClick={() => handleClick("junior")}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    checked={filters.junior}
                    className="mr-3 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                  />
                  Juniors
                </div>
              )}
            </Menu.Item>
            <Menu.Item onClick={() => handleClick("club")}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    checked={filters.club}
                    className="mr-3 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                  />
                  Socials
                </div>
              )}
            </Menu.Item>
            <Menu.Item onClick={() => handleClick("match")}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    checked={filters.match}
                    className="mr-3 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                  />
                  Matches
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item onClick={handleSelectAll}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-xs cursor-pointer text-center"
                  )}
                >
                  { selected ? "Select All" : "Deselect All" }
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
