import React from "react";
import { Link } from "react-router-dom";

const EventHeader = ({ type, icon, name, description }) => {
  console.log()
  // Because Tailwind doesn't accept concatenated strings, to achieve dynamic class names, we need to do this:
  if (type === "junior-rapidplay") {
    return (
      <>
        <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">
          <span className={`text-green-800 text-4xl`}>
            <i className={`fad ${icon}`}></i>{" "}
          </span>
          <span className="text-2xl -mt-2 text-center">{name}</span>
        </h2>
        <p className={`text-green-800 mt-4 text-sm text-center`}>
          {description}
        </p>
      </>
    );
  }
  if (type === "rapidplay") {
    return (
      <>
        <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">
          <span className={`text-orange-800 text-4xl`}>
            <i className={`fad ${icon}`}></i>{" "}
          </span>
          <span className="text-2xl -mt-2 text-center">{name}</span>
        </h2>
        <p className={`text-orange-800 mt-4 text-sm text-center`}>
          {description}
        </p>
      </>
    );
  }
  if (type === "congress") {
    return (
      <>
        <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">
          <span className={`text-blue-800 text-4xl`}>
            <i className={`fad ${icon}`}></i>{" "}
          </span>
          <span className="text-2xl -mt-2 text-center">{name}</span>
        </h2>
        <p className={`text-blue-800 mt-4 text-sm text-center`}>
          {description}
        </p>
      </>
    );
  }
  return (
    <>
      <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">
        <span className={`text-gray-900 text-4xl`}>
          <i className={`fad ${icon}`}></i>{" "}
        </span>
        <span className="text-2xl -mt-2 text-center">{name}</span>
      </h2>
      <p className={`text-gray-800 mt-4 text-sm text-center`}>{description}</p>
    </>
  );
};

export default function EventCard({
  id,
  icon,
  name,
  description,
  defaultPrice,
  details,
  type,
  url,
}) {
  return (
    <div
      className={`m-2 rounded-lg shadow-lg divide-y divide-gray-100 max-w-xs bg-white`}
    >
      <div className="p-6 px-10">
        <EventHeader icon={icon} name={name} description={description} type={type}  />
        <p className="mt-5 text-center">
          <span className="text-5xl font-extrabold text-gray-900 mr-1">
            £{defaultPrice}
          </span>
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
        <Link
          className="text-xs text-center text-teal-500 hover:text-teal-700"
          to={`${url}/${id}`}
        >
          More Info
        </Link>
      </div>
    </div>
  );
}
