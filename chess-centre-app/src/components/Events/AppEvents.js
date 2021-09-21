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
import { classNames, bgColor700 } from "../../utils/Classes";
import PaymentCompleteModal from "../../components/Modal/PaymentCompleteModal";
import EventDetailsSlideOut from "../../components/SlideOut/EventDetailsSlideOut";

const listEventsActive = /* GraphQL */ `
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
        complete
        cancelled
        isLive
        active
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
              createdAt
              updatedAt
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
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;

function useEvents() {
  const { user } = useAuthState();
  const yesterday = new Date(Date.now() - 3600 * 1000 * 24);

  function alreadyRegistered(event) {
    return !!event.entries.items.find(
      (e) => e.memberId === user.attributes.sub
    );
  }
  function isFull(event) {
    return event.entryCount >= (event.maxEntries || event.type.maxEntries);
  }

  return useQuery("eventData", async () => {
    const {
      data: {
        listEventsActive: { items: events },
      },
    } = await API.graphql({
      query: listEventsActive,
      variables: { active: "yes", startDate: { gt: yesterday } },
    });

    const sorted = events
      // TODO: move to graphQL query:
      .filter((e) => !!e.type.canRegister)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return sorted.map((event) => ({
      ...event,
      allowedToRegister: !alreadyRegistered(event) && !isFull(event),
      full: isFull(event),
      registered: alreadyRegistered(event),
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
      const mailToString = `mailto:support@chesscentre.online?subject=Event%20Sign%20Up%20Error&Body=%0D%0A// ---- DO NOT DELETE ----//%0D%0AEvent ID: ${eventId}%0D%0AUser ID: ${user.username}%0D%0AUser: ${user.attributes.given_name} ${user.attributes.family_name}%0D%0A// ---- THANK YOU ----//%0D%0A%0D%0A`;
      addToast(
        <div>
          Oops, something isn't working on our end.
          <br />
          If this persists, please{" "}
          <a className="font-bold underline" href={mailToString}>
            contact us
          </a>{" "}
          🛠️
        </div>,
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
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
                        bgColor700(type.color),
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
                            {}
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
                                    {registered ? "PAID" : full ? "Closed" : ""}
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
                                    {registered
                                      ? "Entered"
                                      : full
                                      ? "Full"
                                      : ""}
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
          ) :(
            <> { [1,2,3,4,5,6,7,8,9].map(key => <SkelectonAppEventCard key={key} />) } </>
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

function SkelectonAppEventCard({ key }) {
  return (
    <section key={key} className="animate-pulse relative sm:mr-3 mb-3 rounded-lg border">
      <div
        className={classNames(
          "bg-gray-300",
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
            <div className="col-span-3">
              <div className="text-lg w-1/2 leading-6 font-medium text-gray-900 dark:text-white h-8 rounded-md bg-gray-200 mb-2"></div>
              <p className="font-semibold text-2xl sm:text-3xl text-gray-900 m-auto cursor-pointer h-4 bg-gray-200 rounded-md mb-2"></p>
              <p className="font-semibold text-2xl sm:text-3xl text-gray-900 m-auto cursor-pointer h-4 bg-gray-200 rounded-md mb-2"></p>
            </div>
            <div className="flex-initial flex-nowrap">
              <div className="text-right"></div>
            </div>
            <div className="col-span-3">
              <p className="text-sm text-gray-700 mr-2">
                <span className="inline"></span>{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="sm:inline text-xs text-gray-900-700 mr-2 mb-2">
              <i className="fad fa-calendar-alt mr-1"></i>
            </div>
            <div className="sm:inline text-xs text-gray-900 cursor-pointer  mr-2 mb-2">
              <i className="fad fa-flag mr-1"></i>
            </div>
            <div className="sm:inline  text-xs text-gray-900 cursor-pointer mr-2 mb-2">
              <i className="fas fa-info mr-1"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
