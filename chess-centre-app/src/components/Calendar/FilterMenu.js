import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterMenu(props) {
  const { filters, setFilters, selected, setSelected, setAllDeselected } = props;
  const trueState = Object.keys(filters).reduce((pre, cur) => ({ ...pre, [cur]: true }), {});
  const falseState = Object.keys(filters).reduce((pre, cur) => ({ ...pre, [cur]: false }), {});
  const [someSelected, setSomeSelected] = useState(false);
  const handleClick = async (type) => {
    setFilters((state) => {
      return {
        ...state,
        [type]: !state[type],
      };
    });
  };
  const handleSelectAll = () => {
    selected ? setFilters(trueState) : setFilters(falseState);
    setSelected(!selected);
  };

  useEffect(() => {
    const allSelected = Object.values(filters).every(filter => filter);
    if (allSelected) {
      setSelected(false /* "Deselect All =" */);
    }
    setAllDeselected(Object.values(filters).every(filter => filter === false));

    // Note: "selected" is unchecked i.e false!
    setSomeSelected(Object.values(filters).some(filter => !filter));
  }, [filters, setSelected, setAllDeselected]);

  return (
    <div className="mt-0.5">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={classNames(someSelected ? 'text-teal-600 bg-gray-50' : 'text-gray-500 bg-white hover:bg-gray-50', `ml-2 relative inline-flex items-center px-2 py-2 shadow-md 
                      rounded-md border border-gray-300 text-sm ring-teal-500
                       focus:z-10 focus:outline-none 
                      focus:ring-1 focus:ring-teal-500 focus:border-teal-500`)}
          >
            <span className="sr-only">Filter</span>
            <i className="fas fa-filter"></i>
          </Menu.Button>
        </div>

        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-34 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

          {
            Object.keys(filters).map((filterName, key) => {
              return (
                <Menu.Item key={key} onClick={() => handleClick(filterName)}>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "group flex items-center px-4 py-2 text-sm cursor-pointer"
                      )}
                    >
                      <input
                        type="checkbox"
                        onChange={() => { }}
                        checked={filters[filterName]}
                        className="mr-3 focus:ring-teal-500 h-4 w-4 text-teal-600 rounded cursor-pointer"
                      />
                      {`${filterName[0].toUpperCase()}${filterName.slice(1)}`}
                    </div>
                  )}
                </Menu.Item>
              )
            })
          }
          <div className="py-1 border-t border-gray-100">
            <Menu.Item onClick={handleSelectAll}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-xs cursor-pointer text-center"
                  )}
                >
                  {selected ? "Select All" : "Deselect All"}
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
