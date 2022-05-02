import { Link } from "react-router-dom";
import { bgColor700 } from "tailwind-dynamic-classes";
import Register from "../Register";
import { prettyDate } from "../../../utils/DateFormating";
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
  return (<div className="mt-6 sm:mt-2 mb-10 text-center sm:text-left">
    <span className="text-8xl sm:text-4xl">
      <i className="fad fa-frown text-teal-700"></i>
    </span>
    <h3 className="mt-2 text-2xl text-gray-600 font-extrabold">
      Oh, no events...
    </h3>
    <p className="mt-6 mx-6 sm:mx-0 text-md text-teal-500">
      Don't worry, we are busy planning our 2022 schedule.
    </p>
  </div>)
}

export function EventCard(props) {

  const {
    id,
    eventId,
    name,
    description,
    entries,
    type,
    startDate,
    endDate,
    time,
    allowedToRegister,
    full,
    isLive,
    multipleSections,
    registered,
    maxEntries,
    entryCount,
    rounds,
    register,
    showModal,
    setIsSlideOutOpen
  } = props;

  const showByes = type?.eventType?.includes("festival");

  return (
    <section
      key={eventId}
      className="relative sm:mr-3 mb-3 rounded-lg border shadow-2xl"
    >
      <div
        className={classNames(
          type.color === "blue" ? "bg-blue-brand" : bgColor700[type.color],
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
            <div className="col-span-2">
              <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-1">
                {name || type.name}{" "}
                {eventId === id && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                    Selected
                  </span>
                )}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-500">
                Entries:{" "}
                {`${entryCount || 0}  / ${maxEntries || type.maxEntries
                  }`}
              </p>
              {type.defaultPrice && !registered && !full ? (
                <p className="text-sm text-gray-700 mr-2">
                  <span className="inline">
                    Entry Fee: £{type.defaultPrice}
                  </span>{" "}
                </p>
              ) : (
                <p className="text-sm text-gray-700 mr-2">
                  <span className="inline">
                    Entry Fee:{" "}
                    <span className="text-teal-500 text-xs">
                      {registered ? "PAID" : full ? "Closed" : ""}
                    </span>
                  </span>{" "}
                </p>
              )}
            </div>
            <div className="flex-initial flex-nowrap">
              <div className="text-right">
                {allowedToRegister ? (
                  <Register id={id} register={register} multipleSections={multipleSections} showByes={showByes} />
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
                        className={`inline-flex items-center px-2 2xl:px-2.5 py-1.5 
                      border border-transparent text-sm font-medium rounded-md shadow-sm text-white
                       bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600`}
                      >
                        <span className="hidden 2xl:flex relative h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-65"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
                        </span>
                        <span className="2xl:ml-2">Now Live</span>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="col-span-3">
              <p className="text-sm text-gray-700 mr-2">
                <span className="inline">
                  {description || type.description}
                </span>{" "}
              </p>
            </div>
          </div>
          { /* icon information */}
          <div className="sm:flex sm:flex-wrap">
            <div className="sm:inline text-xs text-gray-900-700 mr-2 mb-2">
              <i className="fad fa-calendar-alt mr-1"></i>
              <span className="text-teal-700">
                {prettyDate(startDate, endDate)}
              </span>{" "}
            </div>
            {rounds && (
              <div
                className="sm:inline text-xs text-gray-900 cursor-pointer mr-2 mb-2"
                onClick={() => showModal(id, type.eventType)}
              >
                <i className="fad fa-flag mr-1"></i>
                <span className="inline text-teal-700">
                  {rounds} rounds
                </span>{" "}
              </div>
            )}
            <div
              className="sm:inline  text-xs text-gray-900 cursor-pointer mr-2 mb-2"
              onClick={() =>
                setIsSlideOutOpen({
                  open: true,
                  eventDetails: {
                    id,
                    name,
                    description,
                    entries,
                    type,
                    startDate,
                    endDate,
                    time,
                    allowedToRegister,
                    maxEntries,
                    entryCount,
                    rounds,
                    multipleSections
                  },
                })
              }
            >
              {entryCount > 0 ?
                <>
                  <i className="fad fa-user-friends mr-1"></i>
                  <span className="inline text-teal-700">
                    View entries
                  </span>{" "}
                </> : 
                <>
                  <i className="fas fa-info-square mr-1"></i>
                  <span className="inline text-teal-700">
                    More info
                  </span>{" "}
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}