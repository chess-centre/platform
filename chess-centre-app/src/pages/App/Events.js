import React, { useState, useEffect } from "react";
import AppEvents from "../../components/Events/AppEvents";
import { Switch } from "@headlessui/react";
import { isPaidMember } from "../../context/Auth";

function MyEventsToggle(props) {
  const { enabled, setEnabled } = props;
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <Switch.Group as="div" className="hidden items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-teal-600" : "bg-gray-200",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        >
          <span
            className={classNames(
              enabled
                ? "opacity-0 ease-out duration-100"
                : "opacity-100 ease-in duration-200",
              "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <svg
              className="bg-white h-3 w-3 text-gray-400"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={classNames(
              enabled
                ? "opacity-100 ease-in duration-200"
                : "opacity-0 ease-out duration-100",
              "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <svg
              className="bg-white h-3 w-3 text-teal-600"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </span>
      </Switch>
      <Switch.Label as="span" className="ml-2">
        <span className="text-xs font-medium text-gray-700">My Events </span>
      </Switch.Label>
    </Switch.Group>
  );
}

function Events() {
  const [enabled, setEnabled] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    async function fetchMember() {
      const membershipStatus = await isPaidMember();
      setIsPaid(membershipStatus);
    }
    fetchMember();
  }, []);

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fad fa-calendar-edit text-teal-600"></i> Events
        {isPaid ? (
          <div className="inline-flex align-top top-2">
          <span className="ml-2 items-center px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800 top-2">
            Premium 
          </span>
          </div>
        ) : (
          ""
        )}
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-sm text-center sm:text-left text-gray-500 dark:text-gray-300">
            List of our forth coming events
          </p>
          <div className="flex space-x-6">
            <MyEventsToggle enabled={enabled} setEnabled={setEnabled} />
          </div>
        </div>
      </div>

      <main className="mt-5 grid grid-col-1 lg:grid-cols-2 xl:grid-cols-3">
        <AppEvents myEvents={enabled} setEnabled={setEnabled} />
      </main>
    </>
  );
}

export default Events;
