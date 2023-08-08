import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import EventCard from "../../components/Events/EventCard";
import { prettyDate } from "../../utils/DateFormating";
import { useEvents } from "../../api/events";

function setIcon(type) {
  switch (type) {
    case "congress":
      return "fa-chess-king-alt";
    case "rapidplay":
      return "fa-chess-knight-alt";
    case "junior":
      return "fa-chess-rook-alt";
    default:
      return "fa-chess-bishop-alt";
  }
}

export default function Events() {
  const location = useLocation();
  const { isLoading, error, data } = useEvents();
  const [selectableEventTypes, setSelectableEventTypes] = useState([]);
  const [, , eventType] = location.pathname.split("/");
  const [selectedEventType, setSelectedEventType] = useState("all");

  useMemo(() => {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

    if (data) {
      const availableTypes = data.reduce(
        (pre, { type: { eventType, canRegister } }) => {
          if (!canRegister) return pre;
          if (pre.includes(eventType)) return pre;
          return [...pre, eventType];
        },
        ["all"]
      );

      setSelectableEventTypes(availableTypes);
      const defaultSelectedEventType =
        eventType && availableTypes.includes(eventType) ? eventType : "all";
      setSelectedEventType(defaultSelectedEventType);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, eventType]);

  useEffect(() => {
    document.title = "The Chess Centre | Events"
  }, []);

  return (
    <div>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-2 xl:pb-6">
          <LandingNav current="events" />
        </div>
        <div className="bg-white">
          <div className="relative">
            <svg
              className="hidden xl:block absolute top-0 right-0 md:-mr-32 2xl:-mr-4"
              width="500"
              height="300"
              fill="none"
              viewBox="0 0 500 300"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-100"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="500"
                height="300"
                fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
              />
            </svg>

            <svg
              className="hidden md:block absolute top-32 left-0 md:-ml-32 2xl:-ml-4"
              width="500"
              height="300"
              fill="none"
              viewBox="0 0 500 270"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-100"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="500"
                height="280"
                fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
              />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-28 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">
                Events
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Join us
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Our official events now open for registration.
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Create your{" "}
                <Link
                  className="text-teal-500 hover:text-teal-700 no-underline"
                  to="/register"
                >
                  free account
                </Link>{" "}
                today to sign up!
              </p>
            </div>
          </div>
        </div>

        <div className="container m-auto">
          <EventTabs
            {...{
              selectedEventType,
              selectableEventTypes,
              setSelectedEventType,
            }}
          />
          <div className="flex">
            {" "}
            {!error ? (
              <div
                className={
                  isLoading
                    ? "m-auto"
                    : "m-auto mt-6 space-y-4 sm:mt-10 sm:space-y-0 sm:grid sm:gap-6 sm:grid-cols-2 md:grid-cols-3 mb-8"
                }
              >
                {!isLoading ? (
                  data
                    .filter((event) =>
                      selectedEventType === "all"
                        ? // we don't want all other event types, just these from the clickable buttons (above)
                          selectableEventTypes.some(
                            (e) => e === event.type.eventType
                          )
                        : // we return a specific type:
                          event.type.eventType === selectedEventType
                    )
                    .map(
                      (
                        {
                          id,
                          name,
                          description,
                          rounds,
                          startDate,
                          endDate,
                          type,
                          entryCount,
                          isLive,
                          isFull,
                          multipleSections
                        },
                        key
                      ) => {
                        return (
                          <div key={key}>
                            <EventCard
                              key={key}
                              id={id}
                              icon={setIcon(type.eventType)}
                              color={type.color}
                              defaultPrice={type.defaultPrice}
                              type={type.eventType}
                              name={name}
                              url={type.url}
                              description={description}
                              isLive={isLive}
                              isFull={isFull}
                              multipleSections={multipleSections}
                              details={[
                                {
                                  icon: "fad fa-calendar-alt",
                                  ariaName: "Date / Time",
                                  information: prettyDate(startDate, endDate),
                                  show: !!startDate,
                                },
                                {
                                  icon: "fad fa-flag",
                                  ariaName: "Number of Rounds",
                                  information: `${rounds} rounds`,
                                  show: !!rounds,
                                },
                                {
                                  icon: "fad fa-chess-clock",
                                  ariaName: "Time Control",
                                  information: `${type.timeControl}`,
                                  show: !!type.timeControl,
                                },
                                {
                                  icon: "fad fa-user-friends",
                                  ariaName: "Entries",
                                  information: `${entryCount} ${
                                    entryCount === 1 ? "entry" : "entries"
                                  }`,
                                  show: !!entryCount,
                                },
                                // blank placeholder for 0 entries:
                                {
                                  empty: !!!entryCount,
                                  show: !!!entryCount,
                                },
                              ]}
                            />
                          </div>
                        );
                      }
                    )
                ) : (
                  <div className="m-auto text-center mt-10 mb-10">
                    <div className="text-teal-500 mb-2">
                      <i className="fal fa-spinner-third fa-spin fa-2x fa-fw"></i>
                    </div>
                    <div className="italic text-gray-500">
                      fetching events...
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="m-auto text-center mt-10 mb-10">
                <div className="italic text-red-700">
                  Error fetching events.
                </div>
              </div>
            )}
          </div>
        </div>
        <NewsLetter />
      </div>
      <FooterLanding />
    </div>
  );
}

const EventTabs = ({
  selectedEventType,
  selectableEventTypes,
  setSelectedEventType,
}) => {
  if (selectableEventTypes.length === 1) {
    // No Events  (one === default "all")
    return (
      <div className="text-center mt-12 sm:mt-20 mb-10">
        <span className="text-7xl sm:text-9xl"><i className="fad fa-frown text-teal-700"></i></span>
        <h3 className="mt-2 text-2xl text-gray-600 font-extrabold">Oh, no events...</h3>
        <p className="mt-6 mx-10 text-md text-teal-500">
          Don't worry, we are busy planning our 2022 schedule.
        </p>
        <p className="mt-6 mx-10 text-md text-gray-500">
          Check back here soon!
        </p>
      </div>
    );
  }

  return (
    <div className="pr-4 pl-4 sm:flex sm:flex-col sm:align-center">
      <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8">
        {selectableEventTypes.map((type, key) => {
          return (
            <button
              key={key}
              onClick={() => setSelectedEventType(type)}
              type="button"
              className={`${
                type === selectedEventType
                  ? "bg-white border-gray-200 text-teal-500"
                  : ""
              } relative w-1/2 px-2 border sm:border-none rounded-md shadow-sm py-2 text-xs sm:text-sm sm:font-medium text-gray-700
            whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-teal-500 focus:z-10 sm:w-auto sm:px-6`}
            >
              {`${type.charAt(0).toUpperCase()}${type
                .slice(1)
                .replace("-rapidplay", "")}`}
            </button>
          );
        })}
      </div>
    </div>
  );
};
