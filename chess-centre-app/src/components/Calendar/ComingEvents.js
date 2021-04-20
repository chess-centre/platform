import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

function Card({ event }) {
  return (
    <article
      className={`bg-${event.color}-50 p-6 shadow-2xl flex flex-col rounded-xl border border-light-blue-300`}
    >
      <header>
        <h3 className="h4 font-red-hat-display mb-1">{event.name}</h3>
      </header>
      <div className="text-gray-600 flex-grow">
        <div>
          <p className="sm:inline mr-1 text-sm text-teal-700">
            <i className="fad fa-calendar-alt mr-1"></i>
            <span className="inline">{`${formatDate(event.startDate)}${
              event.endDate ? ` - ${formatDate(event.endDate)}` : ""
            }`}</span>{" "}
          </p>
          {event.time && (
            <p className="sm:inline text-sm text-teal-700">
              <i className="fad fa-clock mr-1"></i>
              <span className="inline">{event.time}</span>{" "}
            </p>
          )}
          {
            event.rounds && (
              <p className="sm:inline text-sm text-teal-700">
              <i className="fad fa-flag mr-1"></i>
              <span className="inline">{event.rounds}</span>{" "}
            </p>
            )
          }
        </div>

        <p className="mr-1">{event.description}</p>
      </div>
      {event.url && (
        <a
          className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2"
          href={`${event.url}/${event.id}`}
        >
          <span>More Info <i className="fad fa-arrow-right"></i></span>
        </a>
      )}
    </article>
  );
}

function Timeline() {
  const today = new Date();
  const currentMonth = today.getUTCMonth() + 1;
  const nextMonth = currentMonth + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvent] = useState(false);
  const months = [currentMonth, nextMonth];

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoadingEvent(true);
        // TODO: refine to only retreive next two months:
        const events = await API.get("public", "/events");
        setEvents(events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)));
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
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-10 border-t border-gray-200">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-10">
            <h2 className="h2 font-red-hat-display mb-4">Our next Events</h2>
            <p className="text-xl text-gray-600">See what's coming up</p>
          </div>

          {/* Section content */}
          <div>
            <div className="flex items-start">
              {/* Timeline buttons */}
              { !isLoadingEvents ? (<div className="relative mr-4 sm:mr-12 lg:mr-24">
                
                <div
                  className="absolute inset-0 my-6 ml-16 pointer-events-none -z-1"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 w-0.5 h-full bg-gray-300"></div>
                </div>
                { months.map((month, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <button
                      key={i}
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
              </div>) : "" }
              

              {!isLoadingEvents ? (
                <>
                  {months.map((month, i) => {
                    return (
                      <div
                        key={i}
                        className={`flex-grow ${
                          selectedMonth !== month && "hidden"
                        }`}
                      >
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                          {events
                            .filter(
                              (d) => new Date(d.startDate).getMonth() === month
                            )
                            .map((d, index) => (
                              <Card key={index} event={d} />
                            ))}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="grid m-auto">
                  <div className="text-9xl text-gray-900"><i className="fak fa-chess-centre animate-spin-slow"></i></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
