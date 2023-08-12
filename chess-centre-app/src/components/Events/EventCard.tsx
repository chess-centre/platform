import React, { useState } from "react";
import { Link } from "react-router-dom";
import { bgColor700 } from "tailwind-dynamic-classes";
import { juniorSections, standardSections } from "../../api/sections";
import { classNames } from "../../utils/Classes";

const EventHeader = ({ type, icon, name, description }) => {
  const getColor = (type) => {
    switch (type) {
      case "junior-rapidplay":
        return "text-green-500";
      case "rapidplay":
        return "text-orange-500";
      case "congress":
        return "text-blue-500";
      case "festival":
        return "text-blue-brand";
      case "blitz":
        return "text-yellow-400";
      case "junior": 
        return "text-pink-500";
      default:
        return "text-yellow-400";
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

const RegisterButton = ({ id, isLive, isFull, showSections, sections, eventType }) => {

  const [section, setSection] = useState("open");
  let registerUrl = `/register?eventId=${id}${showSections ? "&section=" + section : ""}`;

  if(eventType.includes("festival")) {
    registerUrl = `/events/festival/${id}`;
  }

  return (
    <>
      {isLive && (
        <div>
          <Link
            to="/broadcast/live"
            className={`mt-6 
              w-full flex items-center justify-center 
              py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none focus:border-yellow-800 
              focus:shadow-outline-yellow transition duration-150 ease-in-out`}
          >
            <span className="flex relative h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
            </span>{" "}
            <span className="ml-2">Watch Here</span>
          </Link>
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
        <>
        <div>
        {
          showSections && eventType !== "festival" &&
            <div className="my-4">
              <label htmlFor="section" className="block text-xs text-gray-500 text-center">
                Select your section
              </label>
              <select
                onChange={e => setSection(e.target.value.toLowerCase())}
                id="section"
                name="section"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm rounded-md"
                defaultValue="Open"
              >
                { sections && sections.map(({ name, ratingBand }) => (
                  <option value={name}>
                      {name} {ratingBand}
                  </option>)
                )}
              </select>
            </div>
          }
        </div>
        <Link
          to={registerUrl}
          className="mt-6 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
        >
          <span>Register Now</span>
        </Link>
        </>
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
  multipleSections
}) {

  const isJunior = name.includes("Junior");
  const sections = isJunior ? juniorSections : standardSections

  return (
    <div
      className={`relative m-2 rounded-lg shadow-lg divide-y divide-gray-100 max-w-xs bg-white`}
    >
      <div
        className={classNames(
          color === "blue" ? "bg-blue-brand" : bgColor700[color],
          "absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
        )}
      ></div>
      <div className="p-6 px-8">
        <EventHeader
          icon={icon}
          name={name}
          description={description}
          type={type}
        />
        <EventPrice
          defaultPrice={defaultPrice}
          isFull={isFull}
          isLive={isLive}
        />
        <RegisterButton 
          id={id} 
          isFull={isFull} 
          isLive={isLive} 
          eventType={type} 
          showSections={multipleSections} 
          sections={sections} 
        />
      </div>
      <div className="py-4 px-6">
        <h3 className="text-xs font-medium text-yellow-600 tracking-wide uppercase">
          Details
        </h3>
        <ul className="mt-4 space-y-2">
          {details.map(({ icon, information, show, empty }, key) => {
            return (
              show && !empty && (
                <li key={key} className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-400 ml-2">
                      <i className={icon}></i>
                    </span>
                  </div>
                  <p className="ml-3 text-md text-gray-700">{information}</p>
                </li>
              )
            );
          })}
          {/* gnarly solution */}
          {details.filter(({ empty }) => empty).map(() => <li key="1000" className="h-6"></li>)}
        </ul>
      </div>
      <div className="text-center p-2">
        <Link
          className="text-xs text-center text-yellow-400 hover:text-yellow-600"
          to={`${url}/${id}`}
        >
          More Info
        </Link>
      </div>
    </div>
  );
}
