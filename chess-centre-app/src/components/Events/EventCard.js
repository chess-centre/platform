import React from "react";

export default function EventCard({ id, icon, name, description, defaultPrice, details }) {
  return (
    <div className="m-2 border-2 border-teal-500 rounded-lg shadow-sm divide-y divide-gray-200 max-w-xs bg-white">
      <div className="p-6 px-10">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          <span className="text-teal-500 text-4xl">
            <i className={`fad ${icon}`}></i>{" "}
          </span>
          <span className="text-2xl -mt-2">{name}</span>
        </h2>
        <p className="text-teal-500 mt-4 text-sm">
          { description }
        </p>
        <p className="mt-5">
          <span className="text-4xl font-extrabold text-gray-900 mr-1">£{defaultPrice}</span>
          <span className="text-base font-medium text-gray-500">entry fee</span>
        </p>
        <a
          href={`/register?eventId=${id}`}
          className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
        >
          <span>Register Now</span>
        </a>
      </div>
      <div className="pt-6 pb-8 px-6">
        <h3 className="text-xs font-medium text-teal-700 tracking-wide uppercase">
          Details
        </h3>
        <ul className="mt-6 space-y-4">
          {details.map(({ icon, information, show }, index) => {
            return show ? (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-teal-500 ml-2">
                    <i className={icon}></i>
                  </span>
                </div>
                <p className="ml-3 text-md text-gray-700">{information}</p>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
}
