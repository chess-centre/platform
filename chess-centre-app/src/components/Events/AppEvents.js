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
import { classNames, bgColor900 } from "../../utils/Classes";
import PaymentCompleteModal from "../../components/Modal/PaymentCompleteModal";
import EventDetailsSlideOut from "../../components/SlideOut/EventDetailsSlideOut";

export const listEvents = /* GraphQL */ `
  query ListEventsActive(
    $active: String
    $startDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventsActive(
      active: $active
      startDate: $startDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
        type {
          id
          name
          description
          url
          color
          time
          maxEntries
          stripePriceId
          timeControl
          eventType
          defaultPrice
          canRegister
        }
        entries {
          items {
            id
            eventId
            memberId
            createdAt
            updatedAt
            member {
              id
              about
              fideId
              ecfId
              username
              name
              email
              ecfRating
              ecfRapid
              club
              membershipType
              gameInfo
              ratingInfo
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
  const today = new Date();

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
        listEventsActive: { items: events },
      },
    } = await API.graphql({
      query: listEvents,
      variables: { active: 'yes', startDate: { gt: today } }
    });

    const sorted = events
      // TODO: move to graphQL query:
      .filter((e) => !!e.type.canRegister)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return sorted.map((event) => ({
      ...event,
      allowedToRegister: !alreadyRegistered(event) && !isFull(event),
      full: isFull(event),
      registered: alreadyRegistered(event)
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
  const [slideState, setIsSlideOutOpen] = useState({
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
      addToast("Oops. Seems something isn't working on our end.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (eventId /* user has logged in via register button */) {
      register(eventId);
    }
    if (
      event_payment_success &&
      session_id /* user has completed a payment */
    ) {
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
                  full,
                  registered,
                  maxEntries,
                  entryCount,
                  rounds,
                },
                key
              ) => {
                return (
                  <section
                    key={key}
                    className="relative sm:mr-3 mb-3 rounded-lg border"
                  >
                    <div
                      className={classNames(
                        bgColor900(type.color),
                        "absolute left-0 z-10 inset-y-0 py-1 px-1.5 text-xs rounded-l-lg"
                      )}
                    ></div>
                    <div
                      className={classNames(
                        "bg-gray-200",
                        "absolute left-3 z-10 inset-y-0 py-1 px-0.5 border-l text-xs"
                      )}
                    ></div>
                    <div className="bg-white dark:bg-gray-800 pt-4 shadow rounded-lg overflow-hidden h-full">
                      <div className="pl-9 pr-4 sm:pl-9 space-y-2 pb-2">
                        <div className="grid grid-cols-3">
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
                            {

                            }
                            {type.defaultPrice && !registered && !full ? (
                              <p className="text-sm text-gray-700 mr-2">
                                <span className="inline">
                                  Entry Fee: £{type.defaultPrice}
                                </span>{" "}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-700 mr-2">
                                <span className="inline">
                                  Entry Fee:{" "}
                                  <span className="text-teal-500 text-xs">
                                    { registered? "PAID" : full ? "Closed" : "" }
                                  </span>
                                </span>{" "}
                              </p>
                            )}
                          </div>
                          <div className="flex-initial flex-nowrap">
                            <div className="text-right">
                              {allowedToRegister ? (
                                <Register id={id} register={register} />
                              ) : (
                                <p className="text-sm text-gray-700 mr-2">
                                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                    { registered ? "Entered" : (full ? "Full" : "") }
                                  </span>{" "}
                                </p>
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
                        <div className="flex flex-wrap">
                          <div className="sm:inline text-xs text-gray-900-700 mr-2 mb-2">
                            <i className="fad fa-calendar-alt mr-1"></i>
                            <span className="text-teal-700">
                              {prettyDate(startDate, endDate)}
                            </span>{" "}
                          </div>
                          {rounds && (
                            <div
                              className="sm:inline text-xs text-gray-900 cursor-pointer mr-2 mb-2"
                              onClick={() => showModal(id, type.eventType)}
                            >
                              <i className="fad fa-flag mr-1"></i>
                              <span className="inline text-teal-700">
                                {rounds} rounds
                              </span>{" "}
                            </div>
                          )}
                          <div
                            className="sm:inline  text-xs text-gray-900 cursor-pointer mr-2 mb-2"
                            onClick={() =>
                              setIsSlideOutOpen({
                                open: true,
                                eventDetails: {
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
                              })
                            }
                          >
                            <i className="fas fa-info mr-1"></i>
                            <span className="inline text-teal-700">
                              More info
                            </span>{" "}
                          </div>
                        </div>
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
        slideState={slideState}
        setIsSlideOutOpen={setIsSlideOutOpen}
        user={user}
      ></EventDetailsSlideOut>
      <RoundTimesModal {...modalState} closeModal={closeModal} />
    </>
  );
}
