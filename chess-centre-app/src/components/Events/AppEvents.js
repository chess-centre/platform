import API from "@aws-amplify/api";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useQuery } from "react-query";
import { useStripe } from "@stripe/react-stripe-js";
import { useToasts } from "react-toast-notifications";
import { useAuthState } from "../../context/Auth";
import Register from "./Register";
import RoundTimesModal from "../Modal/RoundTimesModal";
import { prettyDate } from "../../utils/DateFormating";
import { classNames, bgColor900, bgColor700 } from "../../utils/Classes";
import PaymentCompleteModal from "../../components/Modal/PaymentCompleteModal";
import EventDetailsSlideOut from "../../components/SlideOut/EventDetailsSlideOut";

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

function useEvents() {
  const { user } = useAuthState();

  function alreadyRegistered(event) {
    return !!event.entries.items.find(
      (e) => e.memberId === user.attributes.sub
    );
  }
  function isFull(event) {
    return (
      event.entries.items.length >= (event.maxEntries || event.type.maxEntries)
    );
  }

  return useQuery("eventData", async () => {
    const {
      data: {
        listEvents: { items: events },
      },
    } = await API.graphql({ query: listEvents });

    const sorted = events
      // TODO: move to graphQL query:
      .filter((e) => !!e.type.canRegister)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return sorted.map((event) => ({
      ...event,
      allowedToRegister: !alreadyRegistered(event) && !isFull(event),
    }));
  });
}

export default function AppEvents() {
  const { user } = useAuthState();
  const { search } = useLocation();
  const { eventId, session_id, event_payment_success } = queryString.parse(
    search
  );
  const stripe = useStripe();
  const { addToast } = useToasts();
  const [isSlideOutOpen, setIsSlideOutOpen] = useState({
    open: false,
    eventDetails: {},
  });
  const [modalState, setModalState] = useState({});
  const [paymentSuccesseful, setPaymentSuccessful] = useState(false);

  const { isLoading, error, data } = useEvents();

  const closeModal = () => {
    setModalState((s) => ({ ...s, open: false }));
  };

  const showModal = (eventId, eventType) => {
    setModalState({
      eventId,
      eventType,
      open: true,
    });
  };

  const register = async (eventId) => {
    try {
      const redirectTo = `${window.location.origin}/app/events`;
      const { sessionId } = await API.post("public", "/event/register", {
        body: {
          eventId,
          successUrl: redirectTo,
          cancelUrl: redirectTo,
        },
      });

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log(error.message);
      addToast(
        "Oops. This event is either full or you have already registered.",
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
    }
  };

  useEffect(() => {
    if (eventId) {
      register(eventId);
    }
    if (event_payment_success && session_id) {
      setPaymentSuccessful(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return (
    <>
      {!error ? (
        <>
          {!isLoading ? (
            data.map(
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
                key
              ) => {
                return (
                  <section key={key} className="relative sm:mr-3 mb-3">
                    <div
                      className={classNames(
                        bgColor900(type.color),
                        "absolute left-0 z-10 inset-y-0 py-1 px-1.5 border-l text-xs rounded-l-lg"
                      )}
                    ></div>
                    <div
                      className={classNames(
                        "bg-gray-200",
                        "absolute left-3 z-10 inset-y-0 py-1 px-0.5 border-l text-xs"
                      )}
                    ></div>
                    <div className="bg-white dark:bg-gray-800 pt-4 shadow rounded-sm overflow-hidden h-full">
                      <div className="pl-9 pr-4 sm:pl-9 space-y-2 pb-2">
                        <div className="grid grid-cols-3 ">
                          <div className="col-span-2">
                            <h2
                              className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-1"
                            >
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
                            <p
                              className="sm:inline text-xs text-teal-700 cursor-pointer mr-2 mb-2"
                              onClick={() => showModal(id, type.eventType)}
                            >
                              <i className="fad fa-flag mr-1"></i>
                              <span className="inline">
                                {rounds} rounds
                              </span>{" "}
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
                            <p
                              className="sm:inline text-xs text-teal-700 cursor-pointer mr-2 mb-2"
                              onClick={() =>
                                setIsSlideOutOpen({ open: true, eventDetails: {
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
                                }})
                              }
                            >
                              <i className="fas fa-info mr-1"></i>
                              <span className="inline">
                                More info
                              </span>{" "}
                            </p>
                        </div>
                      </div>
                      <div className={"w-full bg-white"}>
                        {entries?.items.length > 0 && (
                          <table className="table-auto m-auto border border-gray-100 mb-4 mt-0 sm:mt-2 rounded">
                            <thead className="bg-gray-100 dark:bg-gray-800 border-b-2 rounded-lg">
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
                                .map(({ member, memberId }, key) => {
                                  const isEven = key % 2 === 0;
                                  return (
                                    <tr
                                      key={key}
                                      className={
                                        memberId === user.attributes.sub
                                          ? "bg-yellow-50"
                                          : isEven
                                          ? "bg-gray-50"
                                          : ""
                                      }
                                    >
                                      <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300 text-center">
                                        {key + 1}
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
        </>
      ) : (
        <div className="">
          <div className="italic text-red-700">Error fetching events.</div>
        </div>
      )}
      <PaymentCompleteModal
        open={paymentSuccesseful}
        setOpen={setPaymentSuccessful}
      />
      <EventDetailsSlideOut
        isSlideOutOpen={isSlideOutOpen}
        setIsSlideOutOpen={setIsSlideOutOpen}
      ></EventDetailsSlideOut>
      <RoundTimesModal {...modalState} closeModal={closeModal} />
    </>
  );
}
