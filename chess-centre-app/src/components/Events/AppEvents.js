import API from "@aws-amplify/api";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useStripe } from "@stripe/react-stripe-js";
import { useToasts } from "react-toast-notifications";
import { useAuthState } from "../../context/Auth";
import Register from "./Register";
import RoundTimesModal from "../Modal/RoundTimesModal";
import prettyDate from "../../utils/DateFormating";

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
          defaultPrice
          url
          color
          time
          eventType
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
              ecfRating
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

export default function UpComingEvents() {
  const { search } = useLocation();
  const { eventId } = queryString.parse(search);
  const stripe = useStripe();
  const { user } = useAuthState();
  const { addToast } = useToasts();
  const [events, setEvents] = useState([]);
  const [modalState, setModalState] = useState({});
  const [isLoadingEvents, setIsLoadingEvent] = useState(false);

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
        setIsLoadingEvent(true);
        const {
          data: {
            listEvents: { items: events },
          },
        } = await API.graphql({ query: listEvents });
        const sorted = events
          // TODO: move to graphQL query:
          .filter((e) => !!e.type.canRegister)
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        const mapped = sorted.map((event) => ({
          ...event,
          allowedToRegister: !alreadyRegistered(event) && !isFull(event),
        }));

        setEvents(mapped);
        setIsLoadingEvent(false);
      } catch (err) {
        setIsLoadingEvent(false);
        console.error(err);
      }
    }
    fetchEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const closeModal = () => {
    setModalState((s) => ({ ...s, open: false }));
  };

  const showModal = (eventId, eventType) => {
    setModalState({
      eventId,
      eventType: `weekend-${eventType}`,
      open: true,
    });
  };

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
      {!isLoadingEvents ? (
        events.map(
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
                <div
                  className={
                    "m-2 bg-white dark:bg-gray-800 pt-4 shadow rounded-md overflow-hidden"
                  }
                >
                  <div className="px-4 sm:px-4 space-y-2 pb-2">
                    <div className="grid grid-cols-3 ">
                      <div className="col-span-2">
                        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-1">
                          {name || type.name}{" "}
                          {eventId === id ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                              Selected
                            </span>
                          ) : null}
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-500">
                          Entries:{" "}
                          {`${entryCount || 0}  / ${
                            maxEntries || type.maxEntries
                          }`}
                        </p>
                        {type.defaultPrice && allowedToRegister && (
                          <p className="text-sm text-gray-700 mr-2">
                            <span className="inline">
                              Entry Fee: £{type.defaultPrice}
                            </span>{" "}
                          </p>
                        )}
                      </div>
                      <div className="flex-initial flex-nowrap">
                        <div className="text-right">
                          {allowedToRegister && (
                            <Register id={id} register={register} />
                          )}
                        </div>
                      </div>
                      <div className="col-span-3">
                        <p className="text-sm text-gray-700 mr-2">
                          <span className="inline">
                            {description || type.description}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="sm:inline text-xs text-teal-700 mr-2 mb-2">
                        <i className="fad fa-calendar-alt mr-1"></i>
                        <span>{prettyDate(startDate, endDate)}</span>{" "}
                      </p>
                      {rounds && (
                        <p className="sm:inline text-xs text-teal-700 mr-2 mb-2">
                          <i className="fad fa-flag mr-1"></i>
                          <span className="inline">{rounds} rounds</span>{" "}
                        </p>
                      )}
                      {(time || type.time) && (
                        <p
                          className="sm:inline text-xs text-teal-700 cursor-pointer mr-2 mb-2"
                          onClick={() => showModal(id, type.eventType)}
                        >
                          <i className="fad fa-clock mr-1"></i>
                          <span className="inline">
                            {time || type.time}
                          </span>{" "}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={"w-full bg-white"}>
                    {entries?.items.length > 0 && (
                      <table className="table-auto m-auto border border-gray-100 mb-4 mt-0 sm:mt-2">
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
                          {entries?.items
                            .sort(
                              (a, b) =>
                                Number(b.member.ecfRating) -
                                Number(a.member.ecfRating)
                            )
                            .map(({ member, memberId }, i) => {
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
                                  <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300 text-center">
                                    {member?.ecfRating}
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
        )
      ) : (
        <div className="">
          <div className="text-teal-500 mb-2">
            <i className="fal fa-spinner-third fa-spin fa-2x fa-fw"></i>
          </div>
          <div className="italic text-gray-500">fetching events...</div>
        </div>
      )}
      <RoundTimesModal {...modalState} closeModal={closeModal} />
    </>
  );
}
