import React from "react";
import { Link, useHistory } from "react-router-dom";
import { bgColor700, bgColor600 } from "tailwind-dynamic-classes";
import Register from "../Register";
import {
  getDay,
  getMonth,
  getDayStr,
} from "../../../utils/DateFormating";
import { classNames } from "../../../utils/Classes";

export function SkelectonAppEventCard() {
  return (
    <section className="animate-pulse relative sm:mr-3 mb-3 rounded-lg border">
      <div
        className={classNames(
          "bg-gray-300",
          "absolute left-0 z-10 inset-y-0 py-1 px-1.5 text-xs rounded-l-lg"
        )}
      ></div>
      <div
        className={classNames(
          "bg-gray-200",
          "absolute left-3 z-10 inset-y-0 py-1 px-0.5 border-l text-xs"
        )}
      ></div>
      <div className="bg-white dark:bg-gray-800 pt-4 shadow rounded-lg overflow-hidden h-full">
        <div className="pl-9 pr-4 sm:pl-9 space-y-2 pb-2">
          <div className="grid grid-cols-3">
            <div className="col-span-3">
              <div className="text-lg w-1/2 leading-6 font-medium text-gray-900 dark:text-white h-8 rounded-md bg-gray-200 mb-2"></div>
              <p className="font-semibold text-2xl sm:text-3xl text-gray-900 m-auto cursor-pointer h-4 bg-gray-200 rounded-md mb-2"></p>
              <p className="font-semibold text-2xl sm:text-3xl text-gray-900 m-auto cursor-pointer h-4 bg-gray-200 rounded-md mb-2"></p>
            </div>
            <div className="flex-initial flex-nowrap">
              <div className="text-right"></div>
            </div>
            <div className="col-span-3">
              <p className="text-sm text-gray-700 mr-2">
                <span className="inline"></span>{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="sm:inline text-xs text-gray-900-700 mr-2 mb-2">
              <i className="fad fa-calendar-alt mr-1"></i>
            </div>
            <div className="sm:inline text-xs text-gray-900 cursor-pointer  mr-2 mb-2">
              <i className="fad fa-flag mr-1"></i>
            </div>
            <div className="sm:inline  text-xs text-gray-900 cursor-pointer mr-2 mb-2">
              <i className="fas fa-info mr-1"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NoEventListed() {
  return (
    <div className="mt-6 sm:mt-2 mb-10 text-center sm:text-left">
      <span className="text-8xl sm:text-4xl">
        <i className="fad fa-frown text-yellow-400"></i>
      </span>
      <h3 className="mt-2 text-2xl text-gray-600 font-extrabold">
        Oh, no events...
      </h3>
      <p className="mt-6 mx-6 sm:mx-0 text-md text-yellow-400">
        Don't worry, we are busy planning our next round of events!
      </p>
    </div>
  );
}

interface EventCardProps {
  id: string;
  eventId: string;
  name: string;
  description: string;
  entries: any;
  type: any;
  startDate: string;
  endDate: string;
  time: string;
  allowedToRegister: boolean;
  full: boolean;
  isLive: boolean;
  multipleSections: boolean;
  registered: boolean;
  maxEntries: number;
  entryCount: number;
  rounds: number;
  register: Function;
  showModal: Function;
  setIsSlideOutOpen: Function;
  memberEntry: boolean;
  isMember: boolean;
}

export function EventCard(props: EventCardProps) {
  const history = useHistory();
  const {
    id,
    eventId,
    name,
    type,
    startDate,
    endDate,
    allowedToRegister,
    full,
    isLive,
    multipleSections,
    registered,
    maxEntries,
    entryCount,
    register,
    isMember,
    memberEntry
  } = props;

  const showByes = type?.eventType?.includes("festival");
  const isJunior = name?.includes("Junior");

  const goToEventInfo = (id: string) => history.push(`/app/events/${id}`);

  return (
    <section
      key={eventId}
      className="relative sm:mr-3 mb-3 rounded-md border shadow-lg"
    >
      <div
        className={classNames(
          type.color === "blue" ? "bg-blue-brand" : bgColor600[type.color],
          "absolute left-0 z-10 inset-y-0 py-1 px-1.5 text-xs rounded-l-md"
        )}
      ></div>
      <div
        className={classNames(
          type.color === "blue" ? "bg-black" : bgColor700[type.color],
          "absolute left-3 z-10 inset-y-0 py-1 px-0.5 text-xs"
        )}
      ></div>
      <div className="bg-white dark:bg-gray-800 pt-4 shadow rounded-lg overflow-hidden h-full">
        <div className="pl-9 pr-4 sm:pl-9 space-y-2 pb-2">
          <div className="grid grid-cols-3 space-x-2 w-full">
            <DateBlock startDate={startDate} endDate={endDate} />
            <div className="col-span-2">
              <div className="space-y-1">
                <div>
                  <h2 className="text-xl leading-6 font-medium text-gray-900">
                    {name || type.name}{" "}
                  </h2>
                </div>
                <div className="flex items-center text-gray-700 space-x-2">
                  <div className="text-gray-900 text-md">
                    <span className="mr-1 text-sm">Entries</span>
                    <span className="text-yellow-500 text-md">{`${
                      entryCount || 0
                    }  / ${maxEntries || type.maxEntries}`}</span>
                  </div>
                </div>
                <EntryFee
                  isFull={full}
                  price={type.defaultPrice}
                  hasRegistered={registered}
                  isMember={isMember}
                  memberEntry={memberEntry}
                />
              </div>
            </div>
          </div>

          {/* icon information */}
          <div className="flex space-x-2">
            <button
              className="w-full text-center mx-auto rounded-md border bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              onClick={() => goToEventInfo(id)}
            >
              <span className="text-yellow-600">More Information</span>{" "}
            </button>

            <div>
              {allowedToRegister ? (
                <Register
                  id={id}
                  register={register}
                  multipleSections={multipleSections}
                  showByes={showByes}
                  isJunior={isJunior}
                  isMember={isMember}
                  memberEntry={memberEntry}
                />
              ) : (
                <>
                  <p className="text-sm text-gray-700">
                    {registered && !isLive && !full && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-md border border-yellow-300 text-sm font-medium bg-yellow-100 text-yellow-800">
                        Entered
                      </span>
                    )}
                    {full && !isLive && !registered && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-md border border-yellow-300 text-sm font-medium bg-yellow-100 text-yellow-800">
                        Full
                      </span>
                    )}
                  </p>
                  {isLive && (
                    <Link
                      to="/broadcast/live"
                      className={`inline-flex items-center px-2 py-1.5  text-sm font-medium rounded-md text-white
                       bg-pink-700 hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600`}
                    >
                      <span className="flex relative h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-65"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <span className="ml-2">Live</span>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
          {eventId === id && (
            <div className="flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-400">
              <i className="fas fa-spinner-third animate-spin text-xs"></i>
              <span className="ml-2">Redirecting to payment...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EntryFee({ price, hasRegistered, isFull, isMember, memberEntry }) {
  const isFree = isMember && memberEntry;

  if (isFull) {
    return (
      <div className="flex items-center text-md text-gray-900 space-x-2">
        <div className="text-gray-900">
          <span className="mr-1 text-sm">Entry Fee</span>
          <span className="text-yellow-500 text-md">CLOSED</span>
        </div>
      </div>
    );
  }

  if (hasRegistered) {
    return (
      <div className="flex items-center text-gray-900 space-x-2">
        <div className="text-gray-900 text-md">
          <span className="mr-1 text-sm">Entry Fee</span>
          <span className="text-yellow-500 text-md">
            {isFree ? "Free" : "Paid"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center text-md text-gray-700 space-x-2">
      <div className="text-gray-900">
        <span className="mr-1 text-sm">Entry Fee</span>
        <span className="text-yellow-500 text-md">
          {isFree ? "Free" : `£${price}`}
        </span>
      </div>
    </div>
  );
}

function DateBlock({ startDate, endDate }) {
  return (
    <div
      className={classNames(
        endDate && startDate !== endDate ? "px-1" : "px-4",
        "text-center sm:text-left bg-gray-100 text-yellow-800 sm:pb-3 sm:pt-2 sm:px-3 rounded-lg sm:overflow-hidden mr-2 sm:mr-4 shadow-inner"
      )}
    >
      <div>
        <p className="text-xs font-base sm:text-lg  mt-2 sm:mt-0 text-center">
          {getMonth(startDate)}
        </p>
      </div>
      <div className="items-baseline pb-4 sm:pb-0 sm:text-center">
        {endDate && startDate !== endDate ? (
          <>
            <p className="font-semibold text-lg sm:text-lg m-auto sm:m-0">
              {`${getDay(startDate)}-${getDay(endDate)}`}
            </p>
            <p className="font-thin text-xs sm:text-sm  m-auto mb-1">
              {`${getDayStr(startDate)} - ${getDayStr(endDate)}`}
            </p>
          </>
        ) : (
          <>
            <p className="font-semibold text-2xl sm:text-3xl  m-auto sm:m-0">
              {getDay(startDate)}
            </p>
            <p className="font-thin text-xs sm:text-sm  m-auto mb-0">
              {getDayStr(startDate)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
