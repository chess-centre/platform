import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ id, icon, color, name, description, defaultPrice, details, url }) {
  console.log("EVENT COLOR", color);
  return (
    <div className={`m-2 rounded-lg shadow-lg divide-y divide-gray-100 max-w-xs bg-white`}>
      <div className="p-6 px-10">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          <span className={`text-${color}-800 text-4xl`}>
            <i className={`fad ${icon}`}></i>{" "}
          </span>
          <span className="text-2xl -mt-2 text-center">{name}</span>
        </h2>
        <p className={`text-${color}-800 mt-4 text-sm text-center`}>
          { description }
        </p>
        <p className="mt-5 text-center">
          <span className="text-5xl font-extrabold text-gray-900 mr-1">£{defaultPrice}</span>
          <span className="text-base font-medium text-gray-500">entry fee</span>
        </p>
        <a
          href={`/register?eventId=${id}`}
          className="mt-6 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
        >
          <span>Register Now</span>
        </a>
      </div>
      <div className="pt-6 pb-8 px-6">
        <h3 className="text-xs font-medium text-teal-700 tracking-wide uppercase">
          Details
        </h3>
        <ul className="mt-4 space-y-2">
          {details.map(({ icon, information, show }, key) => {
            return show ? (
              <li key={key} className="flex items-start">
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
      <div className="text-center p-2">
          <Link className="text-xs text-center text-teal-500 hover:text-teal-700" to={`${url}/${id}`}>More Info</Link>
        </div>
    </div>
  );
}
