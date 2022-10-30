import React, { useState, useMemo } from "react";
import moment from "moment";
import { GridCard } from "./shared/GridCard";
import { ListCard } from "./shared/ListCard";
import FilterMenu from "./FilterMenu";
import ToggleView from "./ToggleView";
import TabMonths from "./TabMonths";
import { monthNames } from "../../utils/DateFormating";
import { classNames } from "../../utils/Classes";
import { useEventsLite } from "../../api/events";

function GridCalendar({
  isLoading,
  error,
  data,
  months,
  selected,
  setSelectedMonth,
  filters,
  allDeselected,
  isEndMonth,
}) {

  return (
    <div>
      {!error ? (
        <div className="flex items-start">
          {/* Timeline buttons */}
          {
            <div className="relative mr-4">
              <div
                className="absolute inset-0 my-6 ml-16 pointer-events-none -z-1"
                aria-hidden="true"
              >
                <div className="absolute inset-0 w-0.5 h-full bg-gray-300"></div>
              </div>
              {months.map((month, key) => {
                const isEven = key % 2 === 0;
                return (
                  <button
                    key={key}
                    className="flex items-center justify-between font-medium text-gray-500 w-20 py-3 pr-2 text-left focus:outline-none"
                    onClick={() => setSelectedMonth(month)}
                  >
                    <span className="block">
                      {new Date(2000, month, 1).toLocaleString("default", {
                        month: "short",
                      })}{" "}
                      ...
                    </span>
                    <span
                      className={`block w-3.5 h-3.5 border-2 border-white rounded-full z-10 ${
                        selected === month ?
                        (isEven ? "bg-teal-brand " : "bg-orange-brand ") : "bg-gray-400"
                      }`}
                    ></span>
                  </button>
                );
              })}
            </div>
          }

          {!isLoading && !allDeselected && (
            <>
              {months.map((month, i) => {
                return (
                  <div
                    key={i}
                    className={`flex-grow ${selected !== month && "hidden"}`}
                  >
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4">
                      {data
                        .filter(
                          (data) =>
                            new Date(data.startDate).getMonth() === month
                        )
                        .filter(({ type: { eventType } }) => {
                          const isJunior = eventType?.includes("junior");
                          return isJunior
                            ? filters["junior"]
                            : filters[eventType];
                        })
                        .map((data, key) => (
                          <GridCard key={key} event={data} />
                        ))}

                      {/* TODO: refactor. Here we drop in a placeholder to cover when no future events have been published. */}
                      {data.filter(
                        (data) => new Date(data.startDate).getMonth() === month
                      ).length === 0 &&
                        (isEndMonth ? (
                          <GridComingSoonCard />
                        ) : (
                          <GridNoEventsRemaining
                            month={selected}
                            setSelectedMonth={setSelectedMonth}
                          />
                        ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 w-full">
              {[1, 2, 3].map((dummy) => {
                return <GridSkeleton key={dummy} />;
              })}
            </div>
          )}

          {!isLoading && allDeselected && (
            <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              <i className="fad fa-grip-horizontal fa-4x text-teal-500"></i>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Select a filter <i className="far fa-filter"></i> to see events
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="m-auto text-center">
          <div className="italic text-red-800">Error fetching events.</div>
        </div>
      )}
    </div>
  );
}

function ListCalendar({
  isLoading,
  error,
  data,
  selected,
  filters,
  allDeselected,
  isEndMonth,
  setSelectedMonth,
}) {
  return (
    <>
      {!error ? (
        <>
          {!isLoading && !allDeselected && (
            <>
              <ul>
                {data
                  .filter(
                    (event) => new Date(event.startDate).getMonth() === selected
                  )
                  .filter(({ type: { eventType } }) => {
                    const isJunior = eventType?.includes("junior");
                    return isJunior ? filters["junior"] : filters[eventType];
                  })
                  .map((data, key) => (
                    <ListCard key={key} event={data} />
                  ))}

                {/* TODO: refactor. Here we drop in a placeholder to cover when no future events have been published. */}
                {data.filter(
                  (event) => new Date(event.startDate).getMonth() === selected
                ).length === 0 &&
                  (isEndMonth ? (
                    <ListComingSoonCard />
                  ) : (
                    <ListNoEventsRemaining
                      month={selected}
                      setSelectedMonth={setSelectedMonth}
                    />
                  ))}
              </ul>
            </>
          )}

          {isLoading && (
            <>
              <ul>
                {[1, 2, 3].map((dummy) => {
                  return <ListSkeleton key={dummy} />;
                })}
              </ul>
            </>
          )}

          {!isLoading && allDeselected && (
            <div className="relative sm:ml-28 block border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              <i className="fad fa-th-list fa-4x text-teal-500"></i>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Select a filter <i className="far fa-filter"></i> to see events
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="m-auto text-center">
          <div className="italic text-red-800">Error fetching events.</div>
        </div>
      )}
    </>
  );
}

export default function Calendar() {
  const { isLoading, error, data } = useEventsLite();
  const defaultView = window.innerWidth > 600 ? "grid" : "list";
  const [calendarView, setCalendarView] = useState(defaultView);
  const [selectedMenuFilter, setSelectedMenuFilter] = useState(false);
  const [allDeselected, setAllDeselected] = useState(false);
  const [filters, setFilters] = useState({});
  const today = new Date();
  const currentMonth = today.getMonth();
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextNextMonth = nextMonth + 1;
  const endMonth = nextNextMonth;
  const months = [currentMonth, nextMonth, nextNextMonth];
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleViewSwitch = (view) => {
    setCalendarView(view);
  };

  useMemo(() => {
    if (data) {
      const availableTypes = data
        .filter((d) => {
          const currentDate = moment(new Date(d.startDate));
          const cutOffDate = moment().add(2, "month").endOf("month");
          return currentDate < cutOffDate;
        })
        .reduce((pre, { type: { eventType } }) => {
          const type = eventType?.includes("junior") ? "junior" : eventType;
          return {
            ...pre,
            [type]: true,
          };
        }, {});
      setFilters(availableTypes);
    }
  }, [data]);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-8 pt-6 md:py-10">
          <div className="mx-auto text-center pb-4 md:pb-8">
            <h3>
              <span className="text-teal-700">
                <i className="fad fa-calendar-alt"></i>
              </span>{" "}
              Calendar
            </h3>
            <div className="relative grid grid-cols-4 gap-0 mb-10">
              <div></div>
              <div className="col-span-4 text-2xl sm:text-xl sm:mt-2 text-gray-600 text-center mb-10 sm:mb-0">
                Coming up next
              </div>
              {calendarView === "list" && (
                <div className="absolute sm:left-28 ml-1 z-0 top-16 sm:top-14 inline-flex m-auto">
                  <TabMonths
                    {...{
                      selectedMonth,
                      months,
                      setSelectedMonth,
                    }}
                  />
                </div>
              )}
              <div className="absolute right-0 top-16 sm:top-8 text-center sm:mt-6 sm:text-right">
                <span className="relative z-10 inline-flex">
                  <ToggleView
                    {...{
                      calendarView,
                      handleViewSwitch,
                    }}
                  />
                  <FilterMenu
                    selected={selectedMenuFilter}
                    setSelected={setSelectedMenuFilter}
                    {...{
                      filters,
                      setFilters,
                      setAllDeselected,
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
          {calendarView === "grid" ? (
            <GridCalendar
              selected={selectedMonth}
              isEndMonth={endMonth === selectedMonth}
              {...{
                filters,
                isLoading,
                error,
                data,
                months,
                setSelectedMonth,
                allDeselected,
              }}
            />
          ) : (
            <ListCalendar
              selected={selectedMonth}
              isEndMonth={endMonth === selectedMonth}
              {...{
                filters,
                isLoading,
                error,
                data,
                months,
                setSelectedMonth,
                allDeselected,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* PLACEHOLDERS */

function ListComingSoonCard() {
  return (
    <li className=" col-span-1 flex mb-3 sm:ml-28 px-1">
      <div className="relative z-0 flex-1 flex items-center justify-between border-t border-b border-l border-gray-200 bg-white rounded-lg truncate shadow">
        <div className="px-4 sm:px-6 py-2 sm:py-6 text-sm truncate rounded-l-lg">
          <h3 className="font-red-hat-display text-xl mb-1">Coming Soon</h3>
          <p className="text-gray-900 font-thin text-sm mb-1">
            Our next events will be published here soon.{" "}
          </p>
        </div>
        <div className="bg-teal-500 absolute right-0 inset-y-0 px-1 text-xs rounded-r-lg"></div>
      </div>
    </li>
  );
}

function ListNoEventsRemaining({ month, setSelectedMonth }) {
  const nextMonth = month >= 11 ? 0 : month + 1;

  return (
    <li
      onClick={() => setSelectedMonth(nextMonth)}
      className=" col-span-1 flex mb-3 sm:ml-28 px-1 cursor-pointer"
    >
      <div className="relative z-0 flex-1 flex items-center justify-between border-t border-b border-l border-gray-200 bg-white rounded-lg truncate shadow">
        <div className="px-4 sm:px-6 py-2 sm:py-6 text-sm truncate rounded-l-lg">
          <h3 className="font-red-hat-display text-xl mb-1 text-gray-500">
            Events Complete
          </h3>
          <p className="text-teal-500 text-sm mb-1">
            All events for {monthNames[month]} are now finished.
          </p>
          <p className="text-gray-700 text-sm mb-1">
            <span className="font-semibold">Try next months... </span>
          </p>
        </div>
        <div className="bg-gray-300 absolute right-0 inset-y-0 px-1 text-xs rounded-r-lg"></div>
      </div>
    </li>
  );
}

function GridComingSoonCard() {
  return (
    <li
      className={
        "relative z-0 pt-6 pl-6 pb-4 pr-4 shadow-2xl flex flex-col rounded-xl border-b border-l border-r border-light-blue-300"
      }
    >
      <div
        className={
          "bg-teal-500 absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
        }
      ></div>
      <header>
        <h3 className="h4 font-red-hat-display mb-1 text-center">
          Coming Soon...
        </h3>
      </header>
      <div className="text-gray-600 flex-grow mb-5">
        <div></div>
        <p className="text-gray-900 font-thin text-base text-center">
          Our latest events will be published here soon. Watch this space.
        </p>
      </div>
      <div
        className={
          "absolute bottom-0 bg-gray-100 inset-x-0 px-4 py-1 sm:px-6 border-b text-xs rounded-b-xl"
        }
      ></div>
    </li>
  );
}

function GridNoEventsRemaining({ month, setSelectedMonth }) {
  const nextMonth = month >= 11 ? 0 : month + 1;

  return (
    <li
      onClick={() => setSelectedMonth(nextMonth)}
      className={
        "relative z-0 pt-6 pl-6 pb-4 pr-4 shadow-2xl flex flex-col rounded-xl border-b border-l border-r border-light-blue-300 cursor-pointer"
      }
    >
      <div
        className={
          "bg-gray-300 absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
        }
      ></div>
      <header>
        <h3 className="h4 font-red-hat-display mb-1 text-center text-gray-500">
          Events Complete
        </h3>
      </header>
      <div className="text-gray-600 flex-grow mb-5">
        <div></div>
        <p className="text-teal-500 text-md text-center">
          All events for {monthNames[month]} are now finished.{" "}
          <span className="font-semibold text-gray-700">
            Try next months...{" "}
          </span>
        </p>
      </div>
      <div
        className={
          "absolute bottom-0 bg-gray-100 inset-x-0 px-4 py-1 sm:px-6 border-b text-xs rounded-b-xl"
        }
      ></div>
    </li>
  );
}

/* SKELETON */

function ListSkeleton() {
  return (
    <li className=" animate-pulse col-span-1 flex mb-3 sm:ml-28 z-0">
      <div
        className={`relative min-w-16 text-center sm:text-left bg-white px-1 sm:pb-3 sm:pt-2 sm:px-3 rounded-lg sm:overflow-hidden mr-2 sm:mr-4 border border-gray-200 border-b-0 shadow-lg`}
      >
        <div className="w-16">
          <p className="text-xs font-base sm:text-lg text-gray-900 mt-2 sm:mt-0 text-center  mx-4 h-5 bg-gray-200 rounded-md mb-2"></p>
        </div>
        <div className="items-baseline pb-4 sm:pb-0 sm:text-center">
          <p className="font-semibold text-2xl sm:text-3xl text-gray-900 m-auto cursor-pointer mx-3 h-8 bg-gray-200 rounded-lg mb-2"></p>
          <p className="font-thin text-xs sm:text-sm text-gray-900 m-auto cursor-pointer h-4 mx-2 bg-gray-200 rounded-md sm:mb-2"></p>
          <div
            className={classNames(
              "bg-gray-300",
              "absolute bottom-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-b-lg"
            )}
          ></div>
        </div>
      </div>
      <div className="relative z-0 flex-1 flex items-center justify-between border-t border-b border-l border-gray-200 bg-white rounded-lg truncate shadow">
        <div className="px-4 sm:px-6 py-0 text-sm truncate w-full">
          <p className="sm:text-2xl sm:font-medium font-bold text-lg h-7 bg-gray-300 rounded-md mb-2 w-2/3 sm:w-1/4"></p>
          <p className="mr-1 mb-1 text-gray-900 font-thin truncate h-4 bg-gray-300 rounded-md w-full sm:w-1/2"></p>
          <div className="text-gray-400 flex-grow">
            <div>
              <p className="inline text-sm text-gray-300 mr-2">
                <i className="fad fa-clock mr-1"></i>
                <span className="inline"></span>{" "}
              </p>
              <p className="inline text-sm text-gray-300">
                <i className="fad fa-flag mr-1"></i>
                <span className="inline"></span>{" "}
              </p>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            "bg-gray-300",
            "absolute right-0 inset-y-0 px-1 text-xs rounded-r-lg"
          )}
        ></div>
        <div className="flex-shrink-0 pr-2">
          <div
            className={`w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 inline-flex items-center
            justify-center text-gray-300 rounded-lg hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mr-2 sm:mr-4`}
          >
            <span className="text-gray-400">
              <i className="fas fa-info"></i>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

function GridSkeleton() {
  return (
    <li
      className={
        "animate-pulse relative z-0 pt-6 pl-6 pb-4 pr-4 shadow-2xl flex flex-col rounded-xl border-b border-l border-r border-light-blue-300"
      }
    >
      <div
        className={
          "bg-gray-400 absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
        }
      ></div>
      <header className="mb-2">
        <div className="h4 bg-gray-300 font-red-hat-display mb-1 text-center h-14 rounded-md"></div>
      </header>
      <div className="text-gray-600 flex-grow mb-3">
        <p className="text-gray-900 bg-gray-300 font-thin text-base text-center w-full h-4 mb-2 rounded-md"></p>
        <p className="text-gray-900 bg-gray-300 font-thin text-base text-center w-full h-4 mb-2 rounded-md"></p>
      </div>
      <div
        className={
          "absolute bottom-0 bg-gray-100 inset-x-0 px-4 py-1 sm:px-6 border-b text-xs rounded-b-xl"
        }
      ></div>
    </li>
  );
}
