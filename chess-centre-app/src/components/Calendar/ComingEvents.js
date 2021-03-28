import React, { useState } from "react";
import getEventDetails from "./Calendar";
import { CalendarIcon, ClockIcon } from "../../icons";

function Card({ name, description, time, url, textDate, color }) {
  return (
    <article
      className={color + " p-6 shadow-2xl flex flex-col rounded-xl"}
    >
      <header>
        <h3 className="h4 font-red-hat-display mb-1">
          {name}
        </h3>
      </header>
      <div className="text-gray-600 flex-grow">
        <div>
        <p className="sm:inline mr-1 text-sm text-teal-700 font-bold"><CalendarIcon className="w-4 h-4 inline mr-1" /><span className="inline">{textDate}</span> </p>
        { time ? <p className="sm:inline text-sm text-teal-700"><ClockIcon className="w-4 h-4 inline mr-1" /><span className="inline">{time}</span> </p> : null }
        </div>

        <p className="mr-1">{description}</p>
      </div>
      {url ? (
        <a
          className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2"
          href={url}
        >
          <span>Find out more</span>
          <svg
            className="w-3 h-3 flex-shrink-0 mt-px ml-2"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-current"
              d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z"
            />
          </svg>
        </a>
      ) : null}
    </article>
  );
}

function Timeline() {
  const [month, setMonth] = useState("May");

  const months = ["May", "June", "July", "August"];

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-10 border-t border-gray-200">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-10">
            <h2 className="h2 font-red-hat-display mb-4">Our next Events</h2>
            <p className="text-xl text-gray-600">
              See what's coming up
            </p>
          </div>

          {/* Section content */}
          <div>
            <div className="flex items-start">
              {/* Timeline buttons */}
              <div className="relative mr-4 sm:mr-12 lg:mr-24">
                <div
                  className="absolute inset-0 my-6 ml-16 pointer-events-none -z-1"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 w-0.5 h-full bg-gray-300"></div>
                </div>
                { months.map((m, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <button key={i}
                      className="flex items-center justify-between font-medium text-gray-500 w-20 py-3 pr-2 text-left"
                      onClick={() => setMonth(m)}
                    >
                      <span className="block w-12 truncate">{m}</span>
                      <span
                        className={`block w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full ${
                          month === m && (isEven ? "bg-teal-brand " : "bg-orange-brand ") 
                        }`}
                      ></span>
                    </button>
                  );
                })}
              </div>

              {months.map((m, i) => {
                return (
                  <div key={i} className={`flex-grow ${month !== m && "hidden"}`}>
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                      {getEventDetails(m).map((d, index) => (
                        <Card key={index} {...d} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
