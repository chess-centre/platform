import { Link, useHistory } from "react-router-dom";
import { bgColor700 } from "tailwind-dynamic-classes";
import { getDay, getMonth, getDayStr } from "../../../utils/DateFormating";
import { classNames } from "../../../utils/Classes";

export function ListCard({ event }) {
  const history = useHistory();

  const handleClick = (url) => {
    if (url) {
      history.push(`${url}/${event.id}`);
    } else if (event.isLive) {
      // nice fallback
      history.push("/broadcast/live");
    } 
    // Well, we don't have a page so... do nothing, duh!
  };

  return (
    <li key={event.id} className="col-span-1 flex mb-3 sm:ml-28 z-0">
      <div
        className={
          event.endDate && event.startDate !== event.endDate
            ? `px-1 relative min-w-16 text-center sm:text-left bg-white sm:pb-3 sm:pt-2 sm:px-3 rounded-lg sm:overflow-hidden mr-2 sm:mr-4 border border-gray-200 border-b-0 shadow-lg`
            : `px-4 relative min-w-16 text-center sm:text-left bg-white sm:pb-3 sm:pt-2 sm:px-6 rounded-lg sm:overflow-hidden mr-2 sm:mr-4 border border-gray-200 border-b-0 shadow-lg`
        }
      >
        <div>
          <p className="text-xs font-base sm:text-lg text-gray-900 mt-2 sm:mt-0 text-center">
            {getMonth(event.startDate)}
          </p>
        </div>
        <div className="items-baseline pb-4 sm:pb-0 sm:text-center">
          {event.endDate && event.startDate !== event.endDate ? (
            <>
              <p className="font-semibold text-lg sm:text-lg text-gray-900 m-auto sm:m-0">
                {`${getDay(event.startDate)}-${getDay(event.endDate)}`}
              </p>
              <p className="font-thin text-xs sm:text-sm text-gray-900 m-auto mb-1">
                {`${getDayStr(event.startDate)} & ${getDayStr(event.endDate)}`}
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-2xl sm:text-3xl text-gray-900 m-auto sm:m-0">
                {getDay(event.startDate)}
              </p>
              <p className="font-thin text-xs sm:text-sm text-gray-900 m-auto mb-0">
                {getDayStr(event.startDate)}
              </p>
            </>
          )}

          <div
            className={classNames(
              bgColor700[event.color],
              "absolute bottom-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-b-lg"
            )}
          ></div>
        </div>
      </div>
      <div
        onClick={() => handleClick(event.url)}
        className={classNames(
          (event.url || event.isLive) && "hover:bg-gray-50",
          "relative cursor-pointer z-0 flex-1 flex items-center justify-between border-t border-b border-l border-gray-200 bg-white rounded-lg truncate shadow"
        )}
      >
        <div className="px-4 sm:px-6 py-2 sm:py-0 text-sm truncate">
          <p className="sm:text-2xl sm:font-medium font-bold text-lg">
            {event.name}
          </p>
          <p className="mr-1 mb-1 text-gray-900 font-thin truncate">
            {event.description}
          </p>
          <div className="text-gray-600 flex-grow">
            <div>
              {event.time && (
                <p className="inline text-sm text-teal-700 mr-2">
                  <i className="fad fa-clock mr-1"></i>
                  <span className="inline">{event.time}</span>{" "}
                </p>
              )}
              {event.rounds && (
                <p className="inline text-sm text-teal-700">
                  <i className="fad fa-flag mr-1"></i>
                  <span className="inline">{event.rounds} rounds</span>{" "}
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          className={classNames(
            bgColor700[event.color],
            "absolute right-0 inset-y-0 px-1 text-xs rounded-r-lg"
          )}
        ></div>

        {event.url && (
          <div className="flex-shrink-0 pr-2">
            <Link
              to={`${event.url}/${event.id}`}
              className={`w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 inline-flex items-center
            justify-center text-gray-400 rounded-lg hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mr-2 sm:mr-4`}
            >
              <span className="text-teal-500">
                <i className="fas fa-info"></i>
              </span>
            </Link>
          </div>
        )}

        {!event.url && event.isLive && (
          <div className="flex-shrink-0 pr-2">
            <Link
              to="/broadcast/live"
              className={`w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 inline-flex items-center
            justify-center text-gray-400 rounded-lg hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mr-2 sm:mr-4`}
            >
              <span className="text-red-700">
                <i className="fas fa-broadcast-tower"></i>
              </span>
            </Link>
          </div>
        )}
      </div>
    </li>
  );
}
