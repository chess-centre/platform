import React, { useEffect, useState } from "react";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import EventCard from "../../components/Events/EventCard";
import { API } from "aws-amplify";

function formatDate(startDate, endDate) {

  const d = date => new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });

  if(!endDate) {
    return `${d(startDate)}`;
  } else {
    return `${d(startDate)} - ${d(endDate)}`;
  }
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvent] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState("congress");

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoadingEvent(true);
        const events = await API.get("public", "/events");
        console.log(events);
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
                If you're registered you can sign up for anu event
              </p>
            </div>
          </div>
        </div>
        <div className="container m-auto">
          <div className="sm:flex sm:flex-col sm:align-center">
            <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8">
              <button
                type="button"
                className="relative w-1/2 bg-white border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
              >
                Congresses
              </button>
              <button
                type="button"
                className="ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
              >
                Rapidplays
              </button>
              <button
                type="button"
                className="ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
              >
                Junior Events
              </button>
            </div>
          </div>
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
            {!isLoadingEvents
              ? events.filter(({eventType}) => eventType === "congress" || eventType === "rapidplay" || eventType === "junior").map(({ name, description, cost, rounds, startDate, endDate, timeControl, eventType }) => {
                  return (
                    <EventCard
                      icon="fa-chess-queen-alt"
                      cost={cost}
                      type={eventType}
                      name={name}
                      description={description}
                      details={[
                        {
                          icon: "fad fa-calendar-alt",
                          ariaName: "Date / Time",
                          information: `${formatDate(startDate, endDate)}`
                        },
                        {
                          icon: "fad fa-flag",
                          ariaName: "Number of Rounds",
                          information: `${rounds} rounds`,
                          show: !!rounds
                        },
                        {
                          icon: "fad fa-chess-clock",
                          ariaName: "Time Control",
                          information: "90 min",
                          show: !!timeControl
                        }
                      ]}
                    />
                  );
                })
              : "Loading..."}
          </div>
        </div>
        <NewsLetter />
      </div>
      <FooterLanding />
    </div>
  );
}
