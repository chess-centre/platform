import Logo from "../assets/img/logo.png";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { bgColor700 } from "tailwind-dynamic-classes";
import { juniorSections, standardSections } from "../api/sections";
import { useEvent } from "../context/EventHook";
import { classNames } from "../utils/Classes";
import { prettyDate } from "../utils/DateFormating";
import queryString from "query-string";

const EventHeader = ({ name, description, showLogo, darkTheme }) => {
  return (
    <div className={classNames("pt-2 mb-2")}>
      {showLogo && (
        <div className="mx-auto">
          <img
            className="w-28 h-28 mx-auto"
            alt="Sheffield Chess Centre"
            src={Logo}
          />
        </div>
      )}
      <h2
        className={classNames(
          !showLogo && "mt-6",
          darkTheme ? "text-gray-200" : "text-gray-900",
          "text-lg leading-6 font-extrabold  text-center"
        )}
      >
        Sheffield Chess Centre
      </h2>
      <h2
        className={classNames(
          darkTheme ? "text-yellow-400" : "text-yellow-600",
          "mt-2 text-lg leading-6 font-medium  text-center"
        )}
      >
        {name}
      </h2>
      <p
        className={classNames(
          darkTheme ? "text-gray-200" : "text-gray-500",
          "mt-4 text-sm text-center"
        )}
      >
        {description}
      </p>
    </div>
  );
};

const EventPrice = ({ isLive, isFull, defaultPrice, complete, darkTheme }) => {
  return (
    <div className="text-center">
      {isLive && (
        <div
          className={classNames(
            " bg-gray-100 text-red-600 animate-pulse mx-4 rounded-lg text-5xl font-extrabold"
          )}
        >
          LIVE
        </div>
      )}
      {isFull && !isLive && (
        <span
          className={classNames(
            darkTheme ? "bg-gray-50 text-gray-300" : "bg-gray-50 text-gray-300",
            " px-16 rounded-lg text-5xl font-extrabold mr-1"
          )}
        >
          FULL
        </span>
      )}
      {complete && !isLive && (
        <span
          className={classNames(
            darkTheme ? "bg-gray-50 text-gray-300" : "bg-gray-50 text-gray-300",
            " px-4 rounded-lg text-5xl font-extrabold mr-1"
          )}
        >
          EXPIRED
        </span>
      )}
      {!complete && !isLive && !isFull && (
        <>
          <span
            className={classNames(
              darkTheme ? "text-gray-200" : "text-gray-900",
              "text-5xl font-extrabold mr-1"
            )}
          >
            £{defaultPrice}
          </span>
        </>
      )}
    </div>
  );
};

const EventDetails = ({ data, darkTheme }) => {
  return (
    <div className="py-4">
      <h3
        className={classNames(
          darkTheme ? "text-yellow-400" : "text-yellow-600",
          "text-xs font-medium  tracking-wide uppercase"
        )}
      >
        Details
      </h3>
      <ul className="mt-2 space-y-2">
        {[
          {
            icon: "fas fa-calendar-alt",
            ariaName: "Date / Time",
            information: prettyDate(data.startDate, data.endDate),
            show: !!data.startDate,
          },
          {
            icon: "fas fa-flag",
            ariaName: "Number of Rounds",
            information: `${data.rounds} rounds`,
            show: !!data.rounds,
          },
          {
            icon: "fas fa-chess-clock",
            ariaName: "Time Control",
            information: `${data.type.timeControl}`,
            show: !!data.type.timeControl,
          },
          {
            icon: "fas fa-user-friends",
            ariaName: "Entries",
            information: `${data.entryCount} ${
              data.entryCount === 1 ? "entry" : "entries"
            }`,
            show: !!data.entryCount,
          },
        ].map(({ icon, information, show }, key) => {
          return (
            show && (
              <li key={key} className="flex items-start">
                <div className="flex-shrink-0">
                  <span
                    className={classNames(
                      darkTheme ? "text-orange-600" : "text-yellow-400",
                      "ml-2"
                    )}
                  >
                    <i className={icon}></i>
                  </span>
                </div>
                <p
                  className={classNames(
                    darkTheme ? "text-gray-200" : "text-gray-700",
                    "ml-3 text-sm"
                  )}
                >
                  {information}
                </p>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

const RegisterButton = ({
  id,
  isLive,
  isFull,
  showSections,
  sections,
  eventType,
  complete,
  darkTheme,
}) => {
  const [section, setSection] = useState("open");
  let registerUrl = `/register?eventId=${id}${
    showSections ? "&section=" + section : ""
  }`;

  return (
    <>
      {isLive && !complete && (
        <div>
          <a
            href="/broadcast/live"
            target="_blank"
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
          </a>
        </div>
      )}

      {isFull && !isLive && !complete && (
        <button
          disabled
          className="  mt-6 block w-full bg-orange-600 border border-orange-600 rounded-md py-2 text-sm font-semibold text-white text-center cursor-not-allowed"
        >
          Closed
        </button>
      )}

      {complete && (
        <button
          disabled
          className="  mt-6 block w-full bg-orange-600 border border-orange-600 rounded-md py-2 text-sm font-semibold text-white text-center cursor-not-allowed"
        >
          Complete
        </button>
      )}

      {!isLive && !isFull && !complete && (
        <>
          <div>
            {showSections && eventType !== "festival" && (
              <div className="my-4">
                <label
                  htmlFor="section"
                  className="block text-xs text-gray-500 text-center"
                >
                  Select your section
                </label>
                <select
                  onChange={(e) => setSection(e.target.value.toLowerCase())}
                  id="section"
                  name="section"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm rounded-md"
                  defaultValue="Open"
                >
                  {sections &&
                    sections.map(({ name, ratingBand }) => (
                      <option value={name}>
                        {name} {ratingBand}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
          <a
            href={registerUrl}
            target="_blank"
            rel="noreferrer"
            className={classNames(
              darkTheme
                ? "bg-gray-50 hover:bg-gray-200 text-slate-900"
                : "bg-gray-800 border border-gray-800 hover:bg-gray-700 text-white",
              "mt-6 block w-full  rounded-md py-2 text-sm font-semibold  uppercase text-center"
            )}
          >
            Register Now
          </a>
        </>
      )}
    </>
  );
};

/**
 * WIDGET EVENT
 */
export default function Event() {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const { eventId } = useParams() as any;
  const { isLoading, data, error } = useEvent({ eventId });
  const [bgColor, setBgColor] = useState("bg-white");
  const [showLogo, setShowLogo] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  const sections = standardSections;

  const getBgColor = (color: string) => {
    switch (color) {
      case "White":
        return "bg-white";
      case "Black":
        return "bg-gray-900";
      case "Gray":
        return "bg-gray-50";
      case "Teal":
        return "bg-yellow-brand";
      default:
        return "bg-gray-50";
    }
  };

  useEffect(() => {
    if (typeof parsed.bgColor === "string") {
      const color = getBgColor(parsed.bgColor);
      setBgColor(color);
    }
    if (typeof parsed.logo === "string") {
      setShowLogo(parsed.logo === "false" ? false : true);
    }
    if (typeof parsed.darkTheme === "string") {
      setDarkTheme(parsed.darkTheme === "false" ? false : true);
    }
  }, [parsed.bgColor, parsed.logo, parsed.darkTheme]);

  return (
    <>
      {!isLoading && !error && (
        <div className={classNames(bgColor, "w-full sm:max-w-xs p-2")}>
          <div
            className={classNames(
              darkTheme ? "bg-slate-800" : "bg-white",
              "relative rounded-lg shadow-lg px-4"
            )}
          >
            <div
              className={classNames(
                data.type.color === "blue"
                  ? "bg-blue-brand"
                  : bgColor700[data.type.color],
                "absolute top-0 inset-x-0 px-4 py-1 sm:px-6 text-xs rounded-t-xl"
              )}
            ></div>

            <div className="text-center mx-auto">
              <EventHeader
                name={data.name}
                showLogo={showLogo}
                description={data.description || data.type.description}
                darkTheme={darkTheme}
              />
              <EventPrice
                defaultPrice={data.type.defaultPrice}
                isFull={data.entryCount >= data.maxEntries}
                isLive={data.isLive}
                darkTheme={darkTheme}
                complete={data.complete}
              />
              <RegisterButton
                id={data.id}
                isFull={data.entryCount >= data.maxEntries}
                isLive={data.isLive}
                eventType={data.type.eventType}
                showSections={data.multipleSections}
                sections={
                  data.name?.includes("Junior") ? juniorSections : sections
                }
                darkTheme={darkTheme}
                complete={data.complete}
              />
              <EventDetails data={data} darkTheme={darkTheme} />
            </div>
            <div
              className={classNames(
                darkTheme ? "border-slate-700" : "border-gray-200",
                "text-center border-t  py-2"
              )}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://chesscentre.online${data.type.url}/${data.id}`}
                className={classNames(
                  darkTheme
                    ? "text-yellow-400 hover:text-yellow-300"
                    : "text-yellow-400 hover:text-yellow-600",
                  "text-xs text-center"
                )}
              >
                More Info
              </a>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="p-2 mt-10 flex w-auto justify-center text-center text-sm text-yellow-400">
          <div className="mr-2">
            <i className="fas fa-spinner-third animate-spin ml-0"></i>
          </div>
          Loading Event ...
        </div>
      )}
      {error && (
        <div className="p-2 mt-10 flex w-auto justify-center text-center text-sm text-red-600">
            Oops, something went wrong!
        </div>
      )}
    </>
  );
}
