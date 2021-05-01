import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "aws-amplify";
import {
  prettyDate,
  getDay,
  getMonth,
  getDayStr,
} from "../../utils/DateFormating";

function useEvents() {
  return useQuery("eventData", async () => {
    const today = new Date();
    const now = today.toISOString();
    const future = today.setDate(today.getDate + 30);
    const events = await API.get(
      "public",
      `/events?startDate=${now}&endDate=${future}`
    );
    return events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  });
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function GridCard({ event }) {
  return (
    <article
      className={
        "relative pt-6 pl-6 pb-4 pr-4 shadow-2xl flex flex-col rounded-xl border border-light-blue-300"
      }
    >
      <div
        className={classNames(
          `bg-${event.color}-900`,
          "absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
        )}
      ></div>
      <header>
        <h3 className="h4 font-red-hat-display mb-1">{event.name}</h3>
      </header>
      <div className="text-gray-600 flex-grow">
        <div>
          <p className="sm:inline mr-1 text-sm text-teal-700">
            <i className="fad fa-calendar-alt mr-1"></i>
            <span className="inline">
              {prettyDate(event.startDate, event.endDate)}
            </span>{" "}
          </p>
          {event.time && event.time !== "various" && (
            <p className="sm:inline text-sm text-teal-700">
              <i className="fad fa-clock mr-1"></i>
              <span className="inline">{event.time}</span>{" "}
            </p>
          )}
          {event.rounds && (
            <p className="sm:inline text-sm text-teal-700">
              <i className="fad fa-flag mr-1"></i>
              <span className="inline">{event.rounds} rounds</span>{" "}
            </p>
          )}
        </div>
        <p className="mr-1 text-gray-900 font-thin">{event.description}</p>
      </div>
      {event.url && (
        <div className="text-right">
          <a
            className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2"
            href={`${event.url}/${event.id}`}
          >
            <div className="text-sm">
              <span>
                <i className="fas fa-info"></i>
              </span>{" "}
              More Info
            </div>
          </a>
        </div>
      )}
    </article>
  );
}

function GridCalendar({ isLoading, error, data }) {
  const today = new Date();
  const currentMonth = today.getUTCMonth() + 1;
  const nextMonth = currentMonth + 1;
  const months = [currentMonth, nextMonth];
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  return (
    <div>
      {!error ? (
        <div className="flex items-start">
          {/* Timeline buttons */}
          {!isLoading ? (
            <div className="relative mr-4 sm:mr-12 lg:mr-22">
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
                    className="flex items-center justify-between font-medium text-gray-500 w-20 py-3 pr-2 text-left"
                    onClick={() => setSelectedMonth(month)}
                  >
                    <span className="block w-12 truncate">
                      {new Date(2000, month, 1).toLocaleString("default", {
                        month: "long",
                      })}
                    </span>
                    <span
                      className={`block w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full ${
                        selectedMonth === month &&
                        (isEven ? "bg-teal-brand " : "bg-orange-brand ")
                      }`}
                    ></span>
                  </button>
                );
              })}
            </div>
          ) : (
            ""
          )}

          {!isLoading ? (
            <>
              {months.map((month, i) => {
                return (
                  <div
                    key={i}
                    className={`flex-grow ${
                      selectedMonth !== month && "hidden"
                    }`}
                  >
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4">
                      {data
                        .filter(
                          (data) =>
                            new Date(data.startDate).getMonth() === month
                        )
                        .map((data, key) => (
                          <GridCard key={key} event={data} />
                        ))}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="m-auto text-center">
              <div className="text-teal-500 mb-2">
                <i className="fal fa-spinner-third fa-spin fa-2x fa-fw"></i>
              </div>
              <div className="italic text-gray-500">fetching events...</div>
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

function ListCard({ event }) {
  return (
    <li key={event.id} className="col-span-1 flex mb-3 sm:ml-28">
      <div className="relative min-w-16 text-center sm:text-left bg-white px-4 sm:pb-3 sm:pt-2 sm:px-6 rounded-lg sm:overflow-hidden mr-2 sm:mr-4 border border-gray-200 border-b-0 shadow-lg">
        <div>
          <p className="text-xs font-base sm:text-lg text-gray-900 mt-2 sm:mt-0">
            {getMonth(event.startDate)}
          </p>
        </div>
        <div className="items-baseline pb-4 sm:pb-0 sm:text-center">
          <p className="font-semibold text-2xl sm:text-3xl text-gray-900 m-auto sm:m-0 cursor-pointer">
            {getDay(event.startDate)}
          </p>
          <p className="font-thin text-xs sm:text-sm text-gray-900 m-auto mb-0 cursor-pointer">
            {getDayStr(event.startDate)}
          </p>
          <div
            className={classNames(
              `bg-${event.color}-900`,
              "absolute bottom-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-b-lg"
            )}
          ></div>
        </div>
      </div>
      <div className="relative flex-1 flex items-center justify-between border-t border-b border-l border-gray-200 bg-white rounded-lg truncate shadow">
        <div className="px-4 sm:px-6 py-2 sm:py-0 text-sm truncate">
          <p className="sm:text-2xl sm:font-medium font-bold text-lg">
            {event.name}
          </p>
          <p className="mr-1 mb-1 text-gray-900 font-thin truncate">{event.description}</p>
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
            `bg-${event.color}-900`,
            "absolute right-0 inset-y-0 px-1 text-xs rounded-r-lg"
          )}
        ></div>
        {event.url ? (
          <div className="flex-shrink-0 pr-2">
            <Link
              to={`${event.url}/${event.id}`}
              className={`w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 inline-flex items-center 
            justify-center text-gray-400 rounded-lg hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mr-2 sm:mr-4`}
            >
              <span className="text-teal-500">
                <i className="fas fa-info"></i>
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </li>
  );
}

function ListCalendar({ isLoading, error, data }) {
  return (
    <>
      {!error ? (
        <>
          {!isLoading ? (
            <>
              <ul>
                {data.map((d, key) => {
                  return (
                    <>
                      <ListCard key={key} event={d} />
                    </>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className="m-auto text-center">
              <div className="text-teal-500 mb-2">
                <i className="fal fa-spinner-third fa-spin fa-2x fa-fw"></i>
              </div>
              <div className="italic text-gray-500">fetching events...</div>
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
  const [calenderView, setCalenderView] = useState("grid");
  const { isLoading, error, data } = useEvents();

  const handleViewSwitch = (view) => {
    setCalenderView(view);
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-10 border-t border-gray-200">
          {/* Section header */}
          <div className="mx-auto text-center pb-4 md:pb-8">
            <h2 className="h2 font-red-hat-display mb-4">Our Calendar</h2>
            <div className="grid grid-col-1 sm:grid-cols-4 gap-0">
              <div></div>
              <div className="sm:col-span-2 text-xl sm:mt-6 text-gray-600 text-center">
                <i className="fad fa-calendar-alt text-gray-900"></i> See what's
                coming up
              </div>
              <div className="text-center mt-10 sm:mt-6 sm:text-right">
                <span className="relative z-0 inline-flex shadow-sm rounded-md">
                  <button
                    onClick={() => handleViewSwitch("list")}
                    type="button"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <span className="sr-only">List</span>
                    <i className="fas fa-list"></i>
                  </button>
                  <button
                    onClick={() => handleViewSwitch("grid")}
                    type="button"
                    className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <span className="sr-only">Grid</span>
                    <i className="fas fa-th"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
          {calenderView === "grid" ? (
            <GridCalendar isLoading={isLoading} error={error} data={data} />
          ) : (
            <ListCalendar isLoading={isLoading} error={error} data={data} />
          )}
        </div>
      </div>
    </section>
  );
}
