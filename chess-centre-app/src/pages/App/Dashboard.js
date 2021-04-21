import React from "react";
import Stats from "../../components/OverviewStats/Stats";
import ChartCard from "../../components/Chart/ChartCard";
import { Line, Bar } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import {
  lineLegends,
  GamesChart,
  RatingProgressChart,
  barLegends,
} from "../../api/mock.dashboard";

export default function Dashboard() {

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Dashboard
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Overview
          </h3>
          <p className="ml-2 mt-1 text-sm text-gray-500 truncate dark:text-gray-400">
            here is where we'll provide insights to your past events
          </p>
        </div>
      </div>
      <Stats />
      <div className="grid gap-6 mb-8 md:grid-cols-2 mt-6">
        <ChartCard title="Rating">
          <Line {...RatingProgressChart([],[])} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Games">
          <Bar {...GamesChart([],[])} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </>
  );
};
