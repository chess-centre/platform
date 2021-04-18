import API from "@aws-amplify/api";
import { Button } from "@windmill/react-ui";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, ClockIcon } from "../../icons";
import { useStripe } from "@stripe/react-stripe-js";
import { useToasts } from "react-toast-notifications";
import { isPaidMember, useAuthState } from "../../context/Auth";

const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        rounds
        time
        startDate
        endDate
        maxEntries
        entryCount
        type {
          id
          name
          description
          url
          color
          time
          maxEntries
        }
        entries {
          items {
            id
            eventId
            memberId
            member {
              id
              about
              fideId
              ecfId
              username
              name
            }
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

function UpComingEvents() {
  const stripe = useStripe();

  const { user } = useAuthState();

  const { addToast } = useToasts();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function alreadyRegistered(event) {
      return !!event.entries.items.find(
        (e) => e.memberId === user.attributes.sub
      );
    }

    function isFull(event) {
      return (
        event.entries.items.length >=
        (event.maxEntries || event.type.maxEntries)
      );
    }

    async function fetchEvents() {
      try {
        const hasMembership = await isPaidMember(user);
        const {
          data: {
            listEvents: { items: events },
          },
        } = await API.graphql({ query: listEvents });
        const sorted = events.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        const mapped = sorted.map((event) => ({
          ...event,
          canRegister:
            hasMembership && !alreadyRegistered(event) && !isFull(event),
        }));
        setEvents(mapped);
      } catch (err) {
        console.error(err);
      }
    }

    fetchEvents();
  }, [user]);

  const register = async (eventId) => {
    const redirectTo = `${window.location.origin}/app/events`;
    try {
      const { sessionId } = await API.post("public", "/event/register", {
        body: {
          eventId,
          successUrl: redirectTo,
          cancelUrl: redirectTo,
        },
      });

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      {events.map(
        (
          {
            id,
            name,
            description,
            entries,
            type,
            startDate,
            endDate,
            time,
            canRegister,
            maxEntries,
            entryCount,
          },
          index
        ) => {
          return (
            <section key={index} className="relative">
              <div className="m-2 bg-white dark:bg-gray-800 pt-6 shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 sm:px-6 space-y-2">
                  <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    {name || type.name}{" "}
                    <span className="text-sm text-gray-700 dark:text-gray-500">
                      {`(${entryCount || 0}/${maxEntries || type.maxEntries})`}
                    </span>
                  </h2>
                  <p className="text-gray-900 dark:text-white">
                    {description || type.description}
                  </p>
                  <div>
                    <p className="sm:inline mr-1 text-sm text-gray-900 dark:text-white font-bold">
                      <CalendarIcon className="w-4 h-4 inline mr-1" />
                      <span className="inline">{`${formatDate(startDate)}${
                        endDate ? ` - ${formatDate(endDate)}` : ""
                      }`}</span>{" "}
                    </p>
                    {(time || type.time) && (
                      <p className="sm:inline text-sm text-gray-900 dark:text-white">
                        <ClockIcon className="w-4 h-4 inline mr-1" />
                        <span className="inline">{time || type.time}</span>{" "}
                      </p>
                    )}
                  </div>
                  {canRegister && (
                    <Button onClick={() => register(id)}>Register</Button>
                  )}
                </div>
                <div className="m-auto width-auto mt-6 flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-x-auto border-t border-gray-200 dark:border-gray-700">
                        {entries?.items.length > 0 && (
                          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  Name
                                </th>
                                {/* <th
                                scope="col"
                                className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                              >
                                Rating
                              </th> */}

                                <th
                                  scope="col"
                                  className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  <span>Details</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                              {entries?.items.map(({ member, memberId }, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                  <tr
                                    key={i}
                                    className={
                                      isEven
                                        ? "bg-white dark:bg-gray-800"
                                        : "bg-gray-50 dark:bg-gray-800"
                                    }
                                  >
                                    <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                      {member?.name}
                                    </td>
                                    {/* <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                                    {member.gradingInfo.grade}
                                  </td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                      <Link
                                        to={`/app/non-members/${memberId}`}
                                        className="text-orange-600 hover:text-orange-900 dark:text-orange-brand dark:hover:text-orange-400"
                                      >
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }
      )}
    </>
  );
}

export default UpComingEvents;
