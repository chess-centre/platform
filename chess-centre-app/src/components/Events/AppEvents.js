import API from "@aws-amplify/api";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useQuery } from "react-query";
import { useStripe } from "@stripe/react-stripe-js";
import { useToasts } from "react-toast-notifications";
import { useAuthState } from "../../context/Auth";
import RoundTimesModal from "../Modal/RoundTimesModal";
import { EventCard, NoEventListed, SkelectonAppEventCard } from "./shared/AppEventCard";
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
      allowedToRegister:
        !alreadyRegistered(event) && !isFull(event) && !event?.isLive,
      full: isFull(event),
      registered: alreadyRegistered(event),
    }));
  });
}

export default function AppEvents() {
  const { user } = useAuthState();
  const { search } = useLocation();
  const { eventId, session_id, event_payment_success, show_info } = queryString.parse(
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

    if (show_info /* user is rendering the page specifically to view entries */) {
      const eventDetails = data?.find(event => event.id === show_info);
      if (eventDetails) {
        setIsSlideOutOpen({
          open: true,
          eventDetails: { ...eventDetails },
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, data]);

  return (
    <div className="mt-5 grid grid-col-1 sm:grid-cols-2  2xl:grid-cols-3">
      {!error && (
        <>
          {!isLoading &&
            data &&
            data.map(event => {
              return (
                <EventCard {...{ ...event, eventId, register, showModal, setIsSlideOutOpen }} />
              );
            }
            )}



          {isLoading && (
            <>
              {[...new Array(9)].map((_, key) => (
                <SkelectonAppEventCard key={key} />
              ))}
            </>
          )}

          {data && data.length === 0 && (
            <NoEventListed />
          )}
        </>
      )}

      {error && (
        <div>
          <div className="italic text-red-700">Error fetching events.</div>
        </div>
      )}

      <PaymentCompleteModal
        open={paymentSuccesseful}
        setOpen={setPaymentSuccessful}
      />
      <EventDetailsSlideOut {...{ user, slideState, setIsSlideOutOpen }} />
      <RoundTimesModal {...modalState} closeModal={closeModal} />
    </div>
  );
}
