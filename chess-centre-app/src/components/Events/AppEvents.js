import API from "@aws-amplify/api";
import { Button } from "@windmill/react-ui";
import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useToasts } from "react-toast-notifications";
import { useAuthState } from "../../context/Auth";

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
          canRegister
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
        //const hasMembership = await isPaidMember(user);
        const {
          data: {
            listEvents: { items: events },
          },
        } = await API.graphql({ query: listEvents });

        const sorted = events
        // TODO: move to graphQL query:
        .filter(e => !!e.type.canRegister)
        .sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );

        const mapped = sorted.map((event) => ({
          ...event,
          allowedToRegister: !alreadyRegistered(event) && !isFull(event),
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
            allowedToRegister,
            maxEntries,
            entryCount,
            rounds,
          },
          index
        ) => {
          return (
            <section key={index} className="relative">
              <div className="m-2 bg-white dark:bg-gray-800 pt-4 shadow rounded-md overflow-hidden">
                <div className="px-4 sm:px-4 space-y-2 pb-4">
                  <div class="flex">
                    <div className="w-2/3">
                      <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        {name || type.name}{" "}
                      </h2>
                      <p className="text-sm text-gray-700 dark:text-gray-500">
                        Entries:{" "}
                        {`${entryCount || 0}  / ${
                          maxEntries || type.maxEntries
                        }`}
                      </p>

                    </div>
                    <div className="w-1/3">
                      <div className="text-right">
                        {allowedToRegister && (
                          <Button
                            className="text-right"
                            onClick={() => register(id)}
                          >
                            Register
                          </Button>
                        )}
                      </div>
                    </div>

                    
                  </div>
                  <div>
                    <div class="w-full">
                    <p className="text-sm text-gray-900 dark:text-white">
                        {description || type.description}
                      </p>
                      </div>
                    </div>
                  <div>
                    <p className="sm:inline text-xs text-teal-700 mr-2 mb-2">
                      <i className="fad fa-calendar-alt mr-1"></i>
                      <span>
                        {`${formatDate(startDate)}${
                          endDate ? ` - ${formatDate(endDate)}` : ""
                        }`}
                      </span>{" "}
                    </p>
                    {(time || type.time) && (
                      <p className="sm:inline text-xs text-teal-700 mr-2 mb-2">
                        <i className="fad fa-clock mr-1"></i>
                        <span className="inline">{time || type.time}</span>{" "}
                      </p>
                    )}
                    {rounds && (
                      <p className="sm:inline text-xs text-teal-700">
                        <i className="fad fa-flag mr-1"></i>
                        <span className="inline">{rounds} rounds</span>{" "}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full mb-4 mt-5 bg-white">
                  {entries?.items.length > 0 && (
                    <table className="table-auto m-auto border border-gray-100">
                      <thead className="bg-gray-100 dark:bg-gray-800 border-b-2">
                        <tr>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Seed
                          </th>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Name
                          </th>

                          <th
                            scope="col"
                            className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Rating
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
                                memberId === user.attributes.sub
                                  ? "bg-yellow-50"
                                  : isEven
                                  ? "bg-gray-50"
                                  : ""
                              }
                            >
                              <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300 text-center">
                                {i + 1}
                              </td>
                              <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                {member?.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                {member?.currentRating}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
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
