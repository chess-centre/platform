import React from "react";
import { Link } from "react-router-dom";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

function Stats(props) {
  const { ratingData, eventData, gameData } = props;

  return (
    <div>
      <dl className="mt-5 grid grid-cols-3 gap-2 xl:gap-4">
        <EventsSummary title="Events" data={eventData} />
        <GamesSummary title="Games" data={gameData} />
        <RatingSummary title="Rating" data={ratingData} />
      </dl>
    </div>
  );
}

export default Stats;

function EventsSummary({ title, data }) {
  const total = data.past + data.future;

  return (
    <div className="relative text-center xl:text-left bg-white dark:bg-gray-800 px-4 xl:pb-12 xl:pt-6 xl:px-6 shadow rounded-lg xl:overflow-hidden">
      <div>
        <div className="xl:absolute p-2">
          <span className="text-teal-500 text-3xl">
            <i className="fad fa-calendar-edit"></i>
          </span>
        </div>
        <p className="xl:ml-16 text-md font-medium text-gray-500 dark:text-gray-300 truncate">
          {title}
        </p>
      </div>
      <div className="text-center xl:ml-16 xl:flex xl:items-baseline pb-7 xl:pb-0">
        <p className="text-5xl font-bold text-gray-900 dark:text-white m-auto xl:m-0">
          {total}
        </p>
        <p className="relative m-auto xl:m-0 flex flex-none w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 mb-3 xl:ml-2 mt-6 xl:mr-2">
          Previous
          <span className="absolute text-teal-500 ml-2 right-2">
            {data.past}
          </span>
        </p>
        <p className="relative m-auto xl:m-0 flex flex-none w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
          Next
          <span className="absolute text-orange-brand ml-2 text-right right-2">
            {data.future}
          </span>
        </p>
        <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 xl:px-6  border-t border-gray-100"></div>
      </div>
    </div>
  );
}

function GamesSummary({ title, data }) {
  const getTotal = ({ wins, draws, losses }) => {
    return wins + draws + losses;
  };
  const total = data.stats ? getTotal(data.stats) : 0;
  const standard =
    data?.history?.reduce((pre, cur) => (pre += cur.standard || 0), 0) || 0;
  const rapid =
    data?.history?.reduce((pre, cur) => (pre += cur.rapid || 0), 0) || 0;

  return (
    <div className="relative text-center xl:text-left bg-white dark:bg-gray-800 px-4 xl:pb-12 xl:pt-6 xl:px-6 shadow rounded-lg overflow-hidden">
      <div>
        <div className="xl:absolute p-2">
          <span className="text-teal-500 text-3xl">
            <i className="fad fa-chess"></i>
          </span>
        </div>
        <p className="xl:ml-16 text-md font-medium text-gray-500 dark:text-gray-300 truncate">
          {title}
        </p>
      </div>
      <div className="text-center xl:ml-16 xl:flex xl:items-baseline  pb-7 xl:pb-0">
        <div className="text-5xl font-bold text-gray-900 dark:text-white m-auto xl:m-0">
          {total && (
            <Link className="" to="/app/games">
              {total}{" "}
            </Link>
          )}
        </div>
        <div className="relative m-auto xl:m-0 flex flex-none w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-700 mb-3 xl:ml-2 mt-6 xl:mr-2">
          Standard
          <span className="absolute text-teal-500 ml-2 right-2">
            {standard}
          </span>
        </div>

        <div className="relative m-auto xl:m-0 flex flex-none w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-700">
          Rapid
          <span className="absolute text-orange-700 ml-2 text-right right-2">
            {rapid}
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 xl:px-6 border-t border-gray-100"></div>
    </div>
  );
}

function RatingSummary({ title, data }) {
  const sorted = data?.sort((a, b) => new Date(b.date) - new Date(a.date));

  const currentStandard = sorted.length > 0 ? sorted[0].standard : 0;
  const previousStandard = sorted.length > 0 ? sorted[1].standard : 0;

  const currentRapid = sorted.length > 0 ? sorted[0].rapid : 0;
  const previousRapid = sorted.length > 0 ? sorted[1].rapid : 0;

  const Diff = ({ current, previous }) => {
    const change = (current - previous).toFixed(0);

    const diff = isNaN(change) ? "blank" : change;

    if (diff > 0) {
      return (
        <p className="flex text-xs items-baseline text-green-600">
          <ArrowSmUpIcon
            className="self-center flex-shrink-0 h-4 w-4 text-green-500 -mt-1 xl:-mt-5"
            aria-hidden="true"
          />
          {diff}
        </p>
      );
    }

    if (diff < 0) {
      return (
        <p className="flex text-xs items-baseline text-red-500">
          <ArrowSmDownIcon
            className="self-center flex-shrink-0 h-4 w-4 text-red-500 -mt-1 xl:-mt-5"
            aria-hidden="true"
          />
          {diff}
        </p>
      );
    }

    if (diff === 0) {
      return (
        <p className="ml-4 xl:ml-0 flex text-xs items-baseline text-gray-700">
          {diff}
        </p>
      );
    }

    return (
      <p className="ml-2 xl:ml-0 flex text-xs items-baseline text-gray-700">
        {/* BLANK */}
      </p>
    );
  };

  return (
    <div className="relative text-center xl:text-left bg-white dark:bg-gray-800 px-4 xl:pb-12 xl:pt-6 xl:px-6 shadow rounded-lg overflow-hidden">
      <div>
        <div className="xl:absolute p-2">
          <span className="text-teal-500 text-3xl">
            <i className="fad fa-chart-line"></i>
          </span>
        </div>
        <p className="xl:ml-16 text-md font-medium text-gray-500 dark:text-gray-300 truncate">
          {title}
        </p>
      </div>
      <div className="xl:ml-16 xl:flex items-baseline pb-7 xl:pb-0 xl:gap-3">
        <p className="xl:hidden inline-flex text-center items-center px-2 py-0 rounded text-xs text-gray-500">
          Standard
        </p>
        <div className="text-1xl lg:text-4xl xl:flex font-semibold text-black dark:text-white m-auto xl:m-0">
          {currentStandard}{" "}
          <div className="flex items-center justify-center"><Diff current={currentStandard} previous={previousStandard} /></div>
        </div>
        <p className="xl:hidden inline-flex text-center items-center px-2 py-0 rounded text-xs text-gray-500">
          Rapid
        </p>
        <div className="text-1xl lg:text-4xl xl:flex font-semibold text-black dark:text-white m-auto xl:m-0">
          {currentRapid}{" "}
          <div className="flex items-center justify-center"><Diff current={currentRapid} previous={previousRapid} /></div>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 xl:px-10 border-t border-gray-100 dark:border-gray-700"></div>
      </div>
    </div>
  );
}
