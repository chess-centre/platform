import React, { useEffect, useState } from "react";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import EventCard from "../../components/Events/EventCard";
import { API } from "aws-amplify";

function formatDate(startDate, endDate) {
  const d = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "long",
    });

  if (!endDate) {
    return `${d(startDate)}`;
  } else {
    return `${d(startDate)} - ${d(endDate)}`;
  }
}

function setIcon(type) {
   switch (type) {
     case "congress":
       return "fa-chess-king-alt";
    case "rapidplay":
      return "fa-chess-queen-alt";
    case "junior":
      return "fa-chess-rook-alt"
     default:
       return "fa-chess-bishop-alt"
   }
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvent] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState("all");

  const selectableEventTypes = ["all", "congress", "rapidplay", "junior"];

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoadingEvent(true);
        const events = await API.get("public", "/events");
        setEvents(events);
        setIsLoadingEvent(false);
      } catch (err) {
        console.log(err);
        console.log("error fetching events");
        setIsLoadingEvent(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-2 xl:pb-6">
          <LandingNav current="events" />
        </div>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">
                Events
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Join us
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Register your account to sign up for any of our events!
              </p>
            </div>
          </div>
        </div>
        <div className="container m-auto">
          <div className=" pr-4 pl-4 sm:flex sm:flex-col sm:align-center">
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
                    } relative w-1/2 rounded-md shadow-sm py-2 text-sm font-medium text-gray-700 
                    whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8`}
                  >
                    {`${type.charAt(0).toUpperCase()}${type.slice(1)}`}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="ml-5 mt-10 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4 mb-10">
            {!isLoadingEvents
              ? events
                  .filter((event) =>
                    selectedEventType === "all"
                      ? // we don't want all other event types, just these from the clickable buttons (above)
                        selectableEventTypes.some(
                          (e) => e === event.type.eventType
                        )
                      : // we return a specific type:
                        event.type.eventType === selectedEventType
                  )
                  .sort((a, b) =>new Date(a.startDate) - new Date(b.startDate))
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
                      },
                      key
                    ) => {
                      return (
                        <EventCard
                          key={key}
                          id={id}
                          icon={setIcon(type.eventType)}
                          defaultPrice={type.defaultPrice}
                          type={type.eventType}
                          name={name}
                          description={description}
                          details={[
                            {
                              icon: "fad fa-calendar-alt",
                              ariaName: "Date / Time",
                              information: `${formatDate(startDate, endDate)}`,
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
                              information: "90 min",
                              show: !!type.timeControl,
                            },
                          ]}
                        />
                      );
                    }
                  )
              : "Loading..."}
          </div>
        </div>
        <NewsLetter />
      </div>
      <FooterLanding />
    </div>
  );
}
