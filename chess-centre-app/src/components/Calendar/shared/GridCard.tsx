import React, { useHistory, Link } from "react-router-dom";
import moment from "moment";
import { bgColor700 } from "tailwind-dynamic-classes";
import {
  prettyDate,
} from "../../../utils/DateFormating";
import { classNames } from "../../../utils/Classes";


export function GridCard({ event }) {
  const history = useHistory();

  const handleClick = (url) => {
    if(url) {
      history.push(`${url}/${event.id}`);
    } else if(event.isLive) {
      // nice fallback
      history.push("/broadcast/live");
    }
  };

  return (
    <div
      onClick={() => handleClick(event.url)}
      className={classNames((event.url || event.isLive) && "hover:bg-gray-50",
        "relative z-0 pt-6 pl-6 pb-4 pr-4 shadow-2xl flex flex-col rounded-xl border-b border-l border-r border-gray-200 cursor-pointer"
      )}
    >
      <div
        className={classNames(
          bgColor700[event.color],
          "absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
        )}
      ></div>
      <header>
        <h3 className="text-xl font-bold mb-1 text-center">{event.name}</h3>
      </header>
      <div className="text-gray-600 flex-grow mb-5 text-center">
        <div>
          <p className="sm:inline mr-1 text-sm text-teal-700">
            <i className="fad fa-calendar-alt mr-1"></i>
            <span className="inline">
            { event.endDate && `${moment(event.startDate).format("ddd Do")} - ${moment(event.endDate).format("ddd Do, MMM")}`}
            { !event.endDate && `${moment(event.startDate).format("ddd Do, MMM")}`}
            </span>
          </p>
          {event.time && event.time !== "various" && (
            <p className="sm:inline text-sm text-teal-700">
              <i className="fad fa-clock mr-1"></i>
              <span className="inline">{event.time}</span>{" "}
            </p>
          )}
          {event.rounds && (
            <p className="sm:inline text-sm text-teal-700">
              <i className="fad fa-flag mr-1"></i>
              <span className="inline">{event.rounds} rounds</span>{" "}
            </p>
          )}
        </div>
        <p className="mt-2 mb-2 text-gray-900 font-thin text-sm">{event.description}</p>
      </div>
      <div
        className={
          "absolute bottom-0 bg-gray-100 inset-x-0 px-4 py-1 sm:px-6 border-b text-xs rounded-b-xl"
        }
      >
        {event.url && (
          <div className="text-center align-middle">
            <div className="text-sm text-teal-500 hover:underline cursor-pointer">
              <Link
                className="inline-flex items-center text-teal-500 "
                to={`${event.url}/${event.id}`}
              >
                More Info
              </Link>
            </div>
          </div>
        )}
        {/* Only show if there is not event url! Live is displayed on the landing pages (if there is one) */}
        {!event.url && event.isLive && (
          <div className="text-center align-middle">
            <div className="text-sm text-red-700 hover:underline cursor-pointer">
              <Link
                className="inline-flex items-center text-red-700"
                to="/broadcast/live"
              >
                Watch Live
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}