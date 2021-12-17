import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PageButton({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-2 py-1 sm:py-2 border border-gray-300 bg-white text-xs text-gray-500 hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function SortIcon({ className }) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 320 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
    </svg>
  );
}

function SortUpIcon({ className }) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 320 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
    </svg>
  );
}

function SortDownIcon({ className }) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 320 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
    </svg>
  );
}

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  searchPlaceholder,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="relative bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-600 focus-within:border-teal-600">
      <label
        htmlFor="name"
        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
      >
        Search
      </label>
      <input
        type="text"
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} ${searchPlaceholder}`}
      />
    </div>
  );
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="hidden sm:block gap-x-2 items-baseline text-sm">
      <span className="text-sm text-black">{render("Header")}: </span>
      <select
        className="rounded-md text-sm border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Table({ columns, data, searchPlaceholder = "games..." }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["id"]
      }
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <div className="mr-2 sm:flex sm:gap-x-2">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          searchPlaceholder={searchPlaceholder}
        />
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
      </div>
      {/* table */}
      <div className="relative mt-4 sm:flex sm:flex-col">
        <div className="overflow-auto w-80 sm:w-full shadow border-b border-gray-200 rounded-lg">
          <table
            {...getTableProps()}
            className="w-full table-auto divide-y divide-gray-200"
          >
            <thead className="">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <th
                      scope="col"
                      className="group bg-teal-700 px-2 py-3 text-center text-xs font-medium text-gray-100 uppercase"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className=" flex items-center text-center justify-between">
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortDownIcon className="w-4 h-4 text-gray-200" />
                            ) : (
                              <SortUpIcon className="w-4 h-4 text-gray-200" />
                            )
                          ) : (
                            <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
            >
              {page.map((row, i) => {
                // new
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="py-4 px-2 whitespace-nowrap"
                          role="cell"
                        >
                          {cell.column.Cell.name === "defaultRenderer" ? (
                            <div className="text-sm text-gray-500">
                              {cell.render("Cell")}
                            </div>
                          ) : (
                            cell.render("Cell")
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex items-center justify-between">
          <div className="flex gap-x-2 items-baseline">
            <span className="text-xs text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="mt-1 block w-full text-xs rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option
                    className="hover:bg-teal-200"
                    key={pageSize}
                    value={pageSize}
                  >
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav
              className="relative mt-1 sm:mt-0 z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <PageButton
                className="rounded-l-md -mr-1 hidden sm:block"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className="rounded-l-md sm:rounded-none"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className="rounded-r-md sm:rounded-none"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className="rounded-r-md hidden sm:block"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
