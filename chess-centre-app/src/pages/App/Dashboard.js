import API from "@aws-amplify/api";
import React, { useEffect, useState } from "react";
import Stats from "../../components/OverviewStats/Stats";
import ChartCard from "../../components/Chart/ChartCard";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import {
  GamesChart,
  RatingProgressChart,
  getTotalGameCount,
  ResultsDoughnut
} from "../../api/data.dashboard";
import { prettyDate } from "../../utils/DateFormating";
import { useAuthState, isPaidMember } from "../../context/Auth";

export const getMember = /* GraphQL */ `
  query GetMember($id: ID!) {
    getMember(id: $id) {
      id
      about
      fideId
      ecfId
      username
      name
      email
      ecfRating
      ecfRapid
      ecfMembership
      estimatedRating
      club
      gender
      membershipType
      gameInfo
      ratingInfo
      liChessUsername
      liChessInfo
      chesscomUsername
      chesscomInfo
      entries {
        items {
          id
          eventId
          memberId
          createdAt
          updatedAt
          member {
            id
            ecfId
            username
            name
            ecfRating
            ecfRapid
          }
          event {
            id
            name
            description
            rounds
            time
            startDate
            endDate
            maxEntries
            entryCount
            complete
            cancelled
            isLive
            active
            type {
              id
              name
              description
              url
              color
              time
              maxEntries
              timeControl
              eventType
              canRegister
            }
          }
        }
      }
    }
  }
`;

export default function Dashboard() {
  const [isPaid, setIsPaid] = useState(false);
  const { user } = useAuthState();
  const [member, setMember] = useState();
  const [previousEvents, setPreviousEvents] = useState([]);
  const [upcomingEvents, setUpComingEvents] = useState([]);

  useEffect(() => {
    async function fetchMember() {
      const {
        data: { getMember: member },
      } = await API.graphql({
        query: getMember,
        variables: { id: user.attributes.sub },
      });
      const membershipStatus = await isPaidMember();
      setIsPaid(membershipStatus);
      setMember(member);
      if (member?.entries?.items) {
        setEventData(member.entries.items);
      }
    }
    fetchMember();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const setEventData = (data) => {
    const past = data.filter(
      ({ event }) => new Date(event.startDate) < new Date()
    );
    const upcoming = data.filter(
      ({ event }) => new Date(event.startDate) >= new Date()
    );
    setPreviousEvents(past);
    setUpComingEvents(upcoming);
  };

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fad fa-chart-network text-teal-600"></i> Dashboard
        {isPaid ? (
          <div className="inline-flex align-top top-2">
            <span className="ml-2 items-center px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800 top-2">
              Premium
            </span>
          </div>
        ) : (
          ""
        )}
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <p className="ml-2 mt-1 text-sm text-center sm:text-left text-gray-500 dark:text-gray-400">
            <span className="mr-2 items-center px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-teal-100 text-teal-700 top-2">
              Feature Coming Soon
            </span>
            Here is where we'll provide insights from your previous games and
            results.
          </p>
        </div>
      </div>
      <Stats
        entries={member?.entries?.items || 0}
        gameCount={
          getTotalGameCount("standard", member?.gameInfo) +
          getTotalGameCount("rapid", member?.gameInfo)
        }
        rating={member?.ecfRating || 0}
      />
      <div className="grid gap-6 mb-8 md:grid-cols-3 mt-6">
        <ChartCard title="Rating">
          <Line {...RatingProgressChart(member?.ratingInfo)} />
          <ChartLegend
            legends={[
              { title: "Standard", color: "bg-teal-brand" },
              { title: "Rapid", color: "bg-orange-brand" },
            ]}
          />
        </ChartCard>
        <ChartCard title="Results">
          <Doughnut {...ResultsDoughnut(member?.gameInfo)} />
          <ChartLegend
            legends={[
              { title: "Wins", color: "bg-teal-brand" },
              { title: "Draws", color: "bg-pink-500" },
              { title: "Losses", color: "bg-orange-brand" },
            ]}
          />
        </ChartCard>
        <ChartCard title="Games">
          <Bar {...GamesChart(member?.gameInfo)} />
          <ChartLegend
            legends={[
              { title: "Standard", color: "bg-teal-brand" },
              { title: "Rapid", color: "bg-orange-brand" },
            ]}
          />
        </ChartCard>
      </div>
      <div className="grid gap-6 mb-8 mt-4 relative min-w-0 p-4 bg-white shadow rounded-lg border-gray-100">
        <div className="overflow-x-auto">
          <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            Events
          </p>
          <div className="overflow-x-auto">
          { upcomingEvents.length > 0 ? (
            <div>
              <p className="ml-1 mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
                Your upcoming events
              </p>
              <table className="mt-2 divide-y divide-gray-200 mb-2">
                <thead className="bg-gray-50">
                <tr>
                    <th
                      scope="col"
                      className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Rounds
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Entries
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingEvents &&
                    upcomingEvents.map(({ event }, key) => (
                      <tr
                        key={key}
                        className={key % 2 === 0 ? "bg-white hover:bg-yellow-50" : "bg-gray-50 hover:bg-yellow-50"}
                      >
                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {event.name || event.type?.name}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-left">
                          {prettyDate(event.startDate)}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {event.rounds || event.type?.rounds}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {event.entryCount}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
          <div>

          
          { previousEvents.length > 0 ? (
            <div>
              <p className="ml-1 mt-3 text-sm text-left text-gray-500 dark:text-gray-400">
                Your previous events you have participated in.
              </p>
              <table className="mt-2 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Rounds
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Entries
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previousEvents.length > 0 &&
                    previousEvents.map(({ event }, key) => (
                      <tr
                        key={key}
                        className={key % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {event.name || event.type?.name}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.type.description}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {event.rounds || event.type?.rounds}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {event.entryCount}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-left">
                          {prettyDate(event.startDate)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              
            </div>
          ) : (
            ""
          )}
          </div>
          
          </div>
          <div className="absolute rounded-b-lg bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 sm:px-6 border-t border-gray-100"></div>
        </div>  
      </div>
    </>
  );
}
