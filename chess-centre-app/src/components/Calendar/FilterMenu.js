import { useState } from "react";
import { Menu } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterMenu() {

  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState({
    rapidplays: true,
    congresses: true,
    juniors: true,
    socials: true,
    league: true
  });


  const handleClick = (e) => {
    if(e.target.classList.contains("filter-menu")) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }


  return (
    <Menu as="div" open={isOpen} className="relative inline-block text-left" >
      <div>
        <Menu.Button
          className={`ml-2 relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm ring-teal-500
                      hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
        >
          <span className="sr-only">Filter</span>
          <i className="fas fa-filter"></i>
        </Menu.Button>
      </div>

      <Menu.Items open={isOpen} className="origin-top-right absolute right-0 z-100 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
        <div className="py-1">
          <Menu.Item onClick={handleClick} >

              <div
                
                className={classNames(
                  "bg-gray-100 text-gray-900",
                  "group flex items-center px-4 py-2 text-sm filter-menu cursor-pointer"
                )}
              >
                <input
                  id={`person-blah`}
                  name={`person-blah`}
                  type="checkbox"
                  defaultChecked
                  checked={filters.rapidplays}
                  className="mr-3 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                />
                Rapidplays
              </div>
          </Menu.Item>
          <Menu.Item>
              <div
                className={classNames("bg-gray-100 text-gray-900",
                  "group flex items-center px-4 py-2 text-sm cursor-pointer"
                )}
              >
                <input
                  id={`person-blah`}
                  name={`person-blah`}
                  type="checkbox"
                  defaultChecked
                  checked={filters.congresses}
                  className="mr-3 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                />
                Congresses
              </div>
          </Menu.Item>
        </div>
        {/* <div className="py-1">
          <Menu.Item>
              <div
                className={classNames("bg-gray-100 text-gray-900", "group flex items-center px-4 py-2 text-sm cursor-pointer"
                )}
              >
                <input
                  id={`person-blah`}
                  name={`person-blah`}
                  type="checkbox"
                  defaultChecked
                  checked={filters.juniors}
                  className="mr-3 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                />
                Juniors
              </div>
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "group flex items-center px-4 py-2 text-sm cursor-pointer"
                )}
              >
                <input
                  id={`person-blah`}
                  name={`person-blah`}
                  type="checkbox"
                  defaultChecked
                  checked={filters.socials}
                  className="mr-3 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                />
                Socials
              </div>
            )}
          </Menu.Item>
        </div> */}
        {/* <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <div
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "group flex items-center px-4 py-2 text-sm cursor-pointer"
                )}
              >
                <input
                  id={`person-blah`}
                  name={`person-blah`}
                  type="checkbox"
                  defaultChecked
                  checked={filters.league}
                  className="mr-3 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                />
                League Matches
              </div>
            )}
          </Menu.Item>
        </div> */}
      </Menu.Items>
    </Menu>
  );
}
