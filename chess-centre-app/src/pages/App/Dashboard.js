import React, { useEffect } from "react";
import queryString from "query-string";
import Stats from "../../components/OverviewStats/Stats";
import ChartCard from "../../components/Chart/ChartCard";
import { Line, Bar } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import { useAuthState } from "../../context/Auth";
import {
  lineOptions,
  barOptions,
  lineLegends,
  barLegends,
} from "../../api/mock.dashboard";
import Auth from "@aws-amplify/auth";

function Dashboard(props) {
  const {
    user: {
      attributes: { given_name },
    },
  } = useAuthState();

  useEffect(() => {
    const { search } = props.location;
    const parsed = queryString.parse(search);

    if (parsed && parsed.session_id) {
      // This happens after a member completes checkout through Stripe.
      // We want to ensure that the user claims are updated.
      Auth.currentAuthenticatedUser({ bypassCache: true });
    }
  }, [props.location]);

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
            We're tracking your performance {given_name}
          </p>
        </div>
      </div>
      <Stats />
      <div className="grid gap-6 mb-8 md:grid-cols-2 mt-6">
        <ChartCard title="Rating">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Games">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </>
  );
}

export default Dashboard;
