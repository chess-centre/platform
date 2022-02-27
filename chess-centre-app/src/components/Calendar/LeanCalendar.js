import React, { useState, useMemo } from "react";
import { bgColor700 } from "tailwind-dynamic-classes";
import FilterMenu from "./FilterMenu";
import TabMonths from "./TabMonths";
import { getDay, getMonth, getDayStr } from "../../utils/DateFormating";
import { classNames } from "../../utils/Classes";
import { useEventsLite } from "../../api/events";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function ListCard({ event }) {
  return (
    <li key={event.id} className="col-span-1 flex mb-3 z-0">
      <div
        className={
          event.endDate && event.startDate !== event.endDate
            ? `relative min-w-16 text-center sm:text-left bg-white px-1 sm:pb-3 sm:pt-2 sm:px-3 rounded-lg sm:overflow-hidden mr-2 sm:mr-4 border border-gray-200 border-b-0 shadow-lg`
            : `relative min-w-16 text-center sm:text-left bg-white px-4 sm:pb-3 sm:pt-2 sm:px-6 rounded-lg sm:overflow-hidden mr-2 sm:mr-4 border border-gray-200 border-b-0 shadow-lg`
        }
      >
        <div>
          <p className="text-xs font-base sm:text-lg text-gray-900 mt-2 sm:mt-0 text-center">
            {getMonth(event.startDate)}
          </p>
        </div>
        <div className="items-baseline pb-4 sm:pb-0 sm:text-center">
          {event.endDate && event.startDate !== event.endDate ? (
            <>
              <p className="font-semibold text-lg sm:text-lg text-gray-900 m-auto sm:m-0">
                {`${getDay(event.startDate)}-${getDay(event.endDate)}`}
              </p>
              <p className="font-thin text-xs sm:text-sm text-gray-900 m-auto mb-1">
                {`${getDayStr(event.startDate)} & ${getDayStr(event.endDate)}`}
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-2xl sm:text-3xl text-gray-900 m-auto sm:m-0">
                {getDay(event.startDate)}
              </p>
              <p className="font-thin text-xs sm:text-sm text-gray-900 m-auto mb-0">
                {getDayStr(event.startDate)}
              </p>
            </>
          )}

          <div
            className={classNames(
              bgColor700[event.color],
              "absolute bottom-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-b-lg"
            )}
          ></div>
        </div>
      </div>
      <div className="relative z-0 flex-1 flex items-center justify-between border-t border-b border-l border-gray-200 bg-white rounded-lg truncate shadow">
        <div className="px-4 sm:px-6 py-2 sm:py-0 text-sm ">
          <p className="sm:text-2xl sm:font-medium font-bold text-lg">
            {event.name}
          </p>
          <p className="mr-1 mb-2 text-gray-900 font-thin">
            {event.description}
          </p>
          <div className="text-gray-600 flex-grow">
            <div>
              {event.time && (
                <p className="inline text-sm text-teal-700 mr-2">
                  <i className="fad fa-clock mr-1"></i>
                  <span className="inline">{event.time}</span>{" "}
                </p>
              )}
              {event.rounds && (
                <p className="inline text-sm text-teal-700">
                  <i className="fad fa-flag mr-1"></i>
                  <span className="inline">{event.rounds} rounds</span>{" "}
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          className={classNames(
            bgColor700[event.color],
            "absolute right-0 inset-y-0 px-1 text-xs rounded-r-lg"
          )}
        ></div>
      </div>
    </li>
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
  setSelectedMonth
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
                  .map((event, key) => (
                    <ListCard {...{ key, event }} />
                  ))}

                {/* TODO: refactor. Here we drop in a placeholder to cover when no future events have been published. */}
                {data.filter(
                  (event) => new Date(event.startDate).getMonth() === selected
                ).length === 0 && (isEndMonth ? <ListComingSoonCard /> : <ListNoEventsRemaining month={selected} setSelectedMonth={setSelectedMonth} />) }
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
            <div className="relative block border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
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

  useMemo(() => {
    if (data) {
      const availableTypes = data.reduce((pre, { type: { eventType } }) => {
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
    <div className="mx-auto sm:max-w-none mt-6">
      <div className="mx-auto text-center">
        <div className="relative flex mb-5 mt-2">
          <div className="ml-1 z-0 top-6 inline-flex m-auto">
            <TabMonths
              {...{
                selectedMonth,
                months,
                setSelectedMonth,
              }}
            />
          </div>
          <div className="right-0 top-6 text-center sm:text-right">
            <span className="relative z-10 inline-flex">
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
      <ListCalendar
        filtersSelected={selectedMenuFilter}
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
    </div>
  );
}

/* PLACEHOLDERS */

function ListComingSoonCard() {
  return (
    <li className=" col-span-1 flex mb-3 px-1">
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
    <li onClick={() => setSelectedMonth(nextMonth)} className="col-span-1 flex mb-3 px-1 cursor-pointer">
      <div className="relative z-0 flex-1 flex items-center justify-between border-t border-b border-l border-gray-200 bg-white rounded-lg truncate shadow">
        <div className="px-4 sm:px-6 py-2 sm:py-6 text-sm truncate rounded-l-lg">
          <h3 className="font-red-hat-display text-xl mb-1 text-gray-500">Events Complete</h3>
          <p className="text-teal-500 text-sm mb-1">
            All events for {monthNames[month]} are now finished.
          </p>
          <p className="text-gray-700 text-sm mb-1"><span className="font-semibold">Try next months...{" "}</span></p>
        </div>
        <div className="bg-gray-300 absolute right-0 inset-y-0 px-1 text-xs rounded-r-lg"></div>
      </div>
    </li>
  );
}

/* SKELETON */

function ListSkeleton() {
  return (
    <li className=" animate-pulse col-span-1 flex mb-3 z-0">
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
