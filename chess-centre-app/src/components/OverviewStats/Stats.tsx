import React from "react";
import { Link } from "react-router-dom";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

export default function Stats(props) {
  const { ratingData, eventData, gameData } = props;

  return (
    <div>
      <div className="mt-5 grid grid-cols-3 gap-2 xl:gap-4">
        <div>
          <EventsSummaryDesktop title="Events" data={eventData} />
          <EventsSummaryMobile title="Events" data={eventData} />
        </div>
        <div>
          <GamesSummaryDesktop title="Games" data={gameData} />
          <GamesSummaryMobile title="Games" data={gameData} />
        </div>
        <div>
          <RatingSummaryDesktop title="Rating" data={ratingData} />
          <RatingSummaryMobile title="Rating" data={ratingData} />
        </div>
      </div>
    </div>
  );
}

function EventsSummaryDesktop({ title, data }) {
  const total = data.past + data.future;

  return (
    <div className="hidden lg:block relative bg-white p-6 shadow rounded-lg overflow-hidden">
      <div className="grid grid-cols-8">
        <div className="col-span-2">
          <span className="text-teal-500 text-4xl">
            <i className="fad fa-calendar-edit"></i>
          </span>
        </div>
        <div className="col-span-3 text-left">
          <div className="text-md font-medium text-gray-500">{title}</div>
          <div className="text-left text-2xl gap-2 mb-3 mt-2 font-semibold text-black">
            <div className="relative flex flex-none w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
              Next
              <span className="absolute text-teal-700 ml-2 right-2">
                {data.future}
              </span>
            </div>
          </div>
          <div className="text-left text-2xl gap-2 mb-1 mt-3 font-semibold text-black">
            <div className="relative flex flex-none w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
              Previous
              <span className="absolute text-orange-brand ml-2 right-2">
                {data.past}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="text-6xl font-bold text-gray-900 text-left mt-6">
            {total}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 xl:px-6 border-t border-gray-100"></div>
    </div>
  );
}

function EventsSummaryMobile({ title, data }) {
  const total = data.past + data.future;

  return (
    <div className="block lg:hidden relative text-center xl:text-left bg-white px-4 xl:pb-12 xl:pt-6 xl:px-6 shadow rounded-lg overflow-hidden">
      <div className="mb-2">
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
        <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 xl:px-6 border-t border-gray-100"></div>
      </div>
    </div>
  );
}

function GamesSummaryDesktop({ title, data }) {
  const getTotal = ({ wins, draws, losses }) => {
    return wins + draws + losses;
  };
  const total = data.stats ? getTotal(data.stats) : 0;
  const standard =
    data?.history?.reduce((pre, cur) => (pre += cur.standard || 0), 0) || 0;
  const rapid =
    data?.history?.reduce((pre, cur) => (pre += cur.rapid || 0), 0) || 0;

  return (
    <div className="hidden lg:block relative bg-white p-6 shadow rounded-lg overflow-hidden">
      <div className="grid grid-cols-8">
        <div className="col-span-2">
          <span className="text-teal-500 text-4xl">
            <i className="fad fa-chess"></i>
          </span>
        </div>
        <div className="col-span-3 text-left">
          <div className="text-md font-medium text-gray-500">{title}</div>
          <div className="text-left text-2xl gap-2 mb-3 mt-2 font-semibold text-black">
            <div className="relative flex flex-none w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-700">
              Standard
              <span className="absolute text-teal-500 ml-2 right-2">
                {standard}
              </span>
            </div>
          </div>
          <div className="text-left text-2xl gap-2 mb-1 mt-3 font-semibold text-black">
            <div className="relative flex flex-none w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-700">
              Rapid
              <span className="absolute text-orange-700 ml-2 right-2">
                {rapid}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="text-6xl font-bold text-gray-900 text-left mt-6">
            {total && (
              <Link className="" to="/app/games">
                {total}{" "}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 xl:px-6 border-t border-gray-100"></div>
    </div>
  );
}

function GamesSummaryMobile({ title, data }) {
  const getTotal = ({ wins, draws, losses }) => {
    return wins + draws + losses;
  };
  const total = data.stats ? getTotal(data.stats) : 0;
  const standard =
    data?.history?.reduce((pre, cur) => (pre += cur.standard || 0), 0) || 0;
  const rapid =
    data?.history?.reduce((pre, cur) => (pre += cur.rapid || 0), 0) || 0;

  return (
    <div className="block lg:hidden relative text-center xl:text-left bg-white px-4 xl:pb-12 xl:pt-6 xl:px-6 shadow rounded-lg overflow-hidden">
      <div className="mb-2">
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

function RatingSummaryDesktop({ title, data }) {
  const sorted = data?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentStandard = sorted.length > 0 ? sorted[0].standard : 0;
  const previousStandard = sorted.length > 0 ? sorted[1].standard : 0;
  const currentRapid = sorted.length > 0 ? sorted[0].rapid : 0;
  const previousRapid = sorted.length > 0 ? sorted[1].rapid : 0;

  // TEST:
  // const currentStandard = 2241;
  // const previousStandard = 2220;
  // const currentRapid = 2201;
  // const previousRapid = 2209;

  const Diff = ({ current, previous }) => {
    const change = Number((current - previous).toFixed(0));
    const diff = isNaN(change) ? "blank" : change;

    if (diff > 0) {
      return (
        <div className="flex flex-nowrap text-xxs text-green-600">
          <ArrowSmUpIcon
            className="self-center flex-shrink-0 h-5 w-5 text-green-500"
            aria-hidden="true"
          />
          {diff}
        </div>
      );
    }

    if (diff < 0) {
      return (
        <div className="flex text-xxs text-red-500">
          <ArrowSmDownIcon
            className="self-center flex-shrink-0 h-5 w-5 text-red-500"
            aria-hidden="true"
          />
          {diff}
        </div>
      );
    }

    if (diff === 0) {
      return (
        <div className="mt-2 xl:ml-0 flex text-xs items-baseline text-gray-400">
          -
        </div>
      );
    }

    return (
      <div className="mt-2 xl:ml-0 flex text-xs items-baseline text-gray-400">
        -
      </div>
    );
  };

  return (
    <div className="hidden lg:block relative bg-white p-6 shadow rounded-lg overflow-hidden">
      <div className="grid grid-cols-10">
        <div className="col-span-2">
          <span className="text-teal-500 text-4xl">
            <i className="fad fa-chart-line"></i>
          </span>
        </div>
        <div className="col-span-5 text-left">
          <div className="text-md font-medium text-gray-500">{title}</div>
          <div className="text-left text-2xl flex gap-2 font-semibold text-black m-auto">
            <div className="relative m-auto flex flex-none w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-700">
              Standard
            </div>
            <div>{currentStandard}</div>
            <Diff current={currentStandard} previous={previousStandard} />
          </div>
          <div className="text-left text-2xl flex gap-2 font-semibold text-black m-auto">
            <div className="relative m-auto flex flex-none w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-700">
              Rapid
            </div>
            <div>{currentRapid}</div>
            <Diff current={currentRapid} previous={previousRapid} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 xl:px-6 border-t border-gray-100"></div>
    </div>
  );
}

function RatingSummaryMobile({ title, data }) {
  const sorted = data?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentStandard = sorted.length > 0 ? sorted[0].standard : 0;
  const previousStandard = sorted.length > 0 ? sorted[1].standard : 0;

  const currentRapid = sorted.length > 0 ? sorted[0].rapid : 0;
  const previousRapid = sorted.length > 0 ? sorted[1].rapid : 0;

  // TEST:
  // const currentStandard = 2241;
  // const previousStandard = 2220;
  // const currentRapid = 2101;
  // const previousRapid = 2101;

  const Diff = ({ current, previous }) => {
    const change = Number((current - previous).toFixed(0));
    const diff = isNaN(change) ? "blank" : change;

    if (diff > 0) {
      return (
        <p className="flex text-xs items-baseline text-green-600">
          <ArrowSmUpIcon
            className="self-center flex-shrink-0 h-4 w-4 text-green-500 -mt-1"
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
            className="self-center flex-shrink-0 h-4 w-4 text-red-500"
            aria-hidden="true"
          />
          {diff}
        </p>
      );
    }

    if (diff === 0) {
      return (
        <p className="flex text-xs items-baseline text-gray-400">
          -
        </p>
      );
    }

    return (
      <p className="flex text-xs items-baseline text-gray-400">
        -
      </p>
    );
  };

  return (
    <div className="block lg:hidden relative text-center bg-white px-4 shadow rounded-lg overflow-hidden">
      <div className="mb-2">
        <div className="p-2">
          <span className="text-teal-500 text-3xl">
            <i className="fad fa-chart-line"></i>
          </span>
        </div>
        <p className="text-md font-medium text-gray-500 dark:text-gray-300 truncate">
          {title}
        </p>
      </div>
      <div className="items-baseline pb-6">

        <div className="text-lg font-semibold text-black m-auto">
          {currentStandard}
          <div className="flex items-center justify-center">
            <Diff current={currentStandard} previous={previousStandard} />
          </div>
        </div>
        <div className="relative m-auto w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-700">
          <span>Standard</span>
        </div>


        <div className="text-lg font-semibold text-black m-auto">
          {currentRapid}
          <div className="flex items-center justify-center">
            <Diff current={currentRapid} previous={previousRapid} />
          </div>
        </div>
        <div className="relative m-auto w-20 text-center items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-700">
          Rapid
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 border-t border-gray-100"></div>
      </div>
    </div>
  );
}
