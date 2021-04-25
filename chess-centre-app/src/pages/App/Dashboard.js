import API from "@aws-amplify/api";
import { getMember } from "../../graphql/queries";
import React, { useEffect, useState } from "react";
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
import { useAuthState } from "../../context/Auth";

export default function Dashboard() {


  const { user } = useAuthState();
  const [member, setMember] = useState();

  useEffect(() => {
    async function fetchMember() {
      const { data: {
        getMember: 
          member
      }} = await API.graphql({ query: getMember, variables: { id: user.attributes.sub }});
      setMember(member);
    }
    fetchMember();

  }, [user]);


  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fad fa-chart-network text-teal-600"></i> Dashboard
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <p className="ml-2 mt-1 text-sm text-center sm:text-left text-gray-500 dark:text-gray-400">
            Here is where we'll provide insights from your previous games and results.
          </p>
        </div>
      </div>
      <Stats entries={member?.entries?.items?.length || 0} />
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
