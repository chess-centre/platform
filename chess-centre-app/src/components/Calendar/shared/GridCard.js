import { useHistory } from "react-router-dom";
import {
  prettyDate,
} from "../../../utils/DateFormating";
import { classNames, bgColor700 } from "../../../utils/Classes";


export function GridCard({ event }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`${event.url}/${event.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={
        "relative z-0 pt-6 pl-6 pb-4 pr-4 shadow-2xl flex flex-col rounded-xl border-b border-l border-r border-gray-200 hover:bg-gray-50 cursor-pointer"
      }
    >
      <div
        className={classNames(
          bgColor700(event.color),
          "absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
        )}
      ></div>
      <header>
        <h3 className="h4 font-red-hat-display mb-1">{event.name}</h3>
      </header>
      <div className="text-gray-600 flex-grow mb-5">
        <div>
          <p className="sm:inline mr-1 text-sm text-teal-700">
            <i className="fad fa-calendar-alt mr-1"></i>
            <span className="inline">
              {prettyDate(event.startDate, event.endDate)}
            </span>{" "}
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
        <p className="text-gray-900 font-thin text-base">{event.description}</p>
      </div>
      <div
        className={
          "absolute bottom-0 bg-gray-100 inset-x-0 px-4 py-1 sm:px-6 border-b text-xs rounded-b-xl"
        }
      >
        {event.url && (
          <div className="text-center align-middle">
            <div className="text-x text-teal-500 hover:underline cursor-pointer">
              <a
                className="inline-flex items-center text-teal-500 "
                href={`${event.url}/${event.id}`}
              >
                More Info
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}