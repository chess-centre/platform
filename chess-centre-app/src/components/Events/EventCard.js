import React from "react";

export default function EventCard({ icon, title, cost, clock, rounds }) {
  return (
    <div className="m-2 border-2 border-teal-500 rounded-lg shadow-sm divide-y divide-gray-200 max-w-xs bg-white">
      <div className="p-6 px-10">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          <span className="text-teal-500 text-4xl">
            <i className={`fad ${icon}`}></i>{" "}
          </span>
          <span className="text-2xl -mt-2">{title}</span>
        </h2>
        <p className="text-teal-500 mt-4 text-sm">
          Long play. All play all event.
        </p>
        <p className="mt-8">
          <span className="text-4xl font-extrabold text-gray-900">£{cost}</span>
          <span className="text-base font-medium text-gray-500">entry fee</span>
        </p>
        <a
          href="/"
          className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
        >
          <span>Register Now</span>
        </a>
      </div>
      <div className="pt-6 pb-8 px-6">
        <h3 className="text-xs font-medium text-teal-700 tracking-wide uppercase text-center">
          Details
        </h3>
        <p className="text-center">
          <span className="text-3xl">
            <i
              class="fad fa-chess-clock"
              style={{
                "--fa-secondary-color": "#f0802c",
                "--fa-secondary-opacity": 1.0,
              }}
            ></i>
          </span>
          <p className="text-xs">{clock} <span>each</span></p>
        </p>
        <p className="text-center">
          <p className="text-sm">{rounds} rounds</p>
        </p>
      </div>
    </div>
  );
}
