import React from "react";
import { Link } from "react-router-dom";
import { classNames, bgColor900 } from "../../utils/Classes";

const EventHeader = ({ type, icon, name, description }) => {
  const getColor = (type) => {
    switch (type) {
      case "junior-rapidplay":
        return "text-green-900";
      case "rapidplay":
        return "text-orange-900";
      case "congress":
        return "text-blue-900";
      default:
        return "text-yellow-900";
    }
  };
  return (
    <div>
      <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">
        <span className={classNames(getColor(type), "text-4xl")}>
          <i className={`fad ${icon}`}></i>{" "}
        </span>
        <span className="text-2xl -mt-2 text-center">{name}</span>
      </h2>
      <p className={`text-gray-500 mt-4 text-sm text-center`}>{description}</p>
    </div>
  );
};

const EventPrice = ({ isLive, isFull, defaultPrice }) => {
  return (
    <div className="mt-5 text-center">
      {isLive && (
        <span className="animate-pulse bg-gray-100 px-16 rounded-lg text-5xl font-extrabold text-red-600 mr-1">
          LIVE
        </span>
      )}
      {isFull && !isLive && (
        <span className="bg-gray-50 px-16 rounded-lg text-5xl font-extrabold text-gray-300 mr-1">
          FULL
        </span>
      )}
      {!isLive && !isFull && (
        <>
          <span className="text-5xl font-extrabold text-gray-900 mr-1">
            £{defaultPrice}
          </span>
          <span className="text-base font-medium text-gray-500">entry fee</span>
        </>
      )}
    </div>
  );
};

const RegisterButton = ({ id, isLive, isFull }) => {
  return (
    <>
      {isLive && (
        <div>
          <a
            href="/broadcast/live"
            className={`mt-6 
              w-full flex items-center justify-center 
              py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:border-teal-800 
              focus:shadow-outline-teal transition duration-150 ease-in-out`}
          >
            <span className="flex relative h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
            </span>{" "}
            <span className="ml-2">Watch Here</span>
          </a>
        </div>
      )}

      {isFull && !isLive && (
        <button
          disabled
          className="  mt-6 block w-full bg-orange-600 border border-orange-600 rounded-md py-2 text-sm font-semibold text-white text-center cursor-not-allowed"
        >
          Closed
        </button>
      )}
      {!isLive && !isFull && (
        <a
          href={`/register?eventId=${id}`}
          className="mt-6 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
        >
          <span>Register Now</span>
        </a>
      )}
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
  color,
  url,
  isLive,
  isFull,
}) {
  return (
    <div
      className={`relative m-2 rounded-lg shadow-lg divide-y divide-gray-100 max-w-xs bg-white`}
    >
      <div
        className={classNames(
          bgColor900(color),
          "absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
        )}
      ></div>
      <div className="p-6 px-10">
        <EventHeader
          icon={icon}
          name={name}
          description={description}
          type={type}
        />
        <EventPrice defaultPrice={defaultPrice} isFull={isFull} isLive={isLive} />
        <RegisterButton id={id} isFull={isFull} isLive={isLive} />
      </div>
      <div className="pt-6 pb-8 px-6">
        <h3 className="text-xs font-medium text-teal-700 tracking-wide uppercase">
          Details
        </h3>
        <ul className="mt-4 space-y-2">
          {details.map(({ icon, information, show }, key) => {
            return show && (
              <li key={key} className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-teal-500 ml-2">
                    <i className={icon}></i>
                  </span>
                </div>
                <p className="ml-3 text-md text-gray-700">{information}</p>
              </li>
            );
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
