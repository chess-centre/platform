import API from "@aws-amplify/api";
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { useStripe } from "@stripe/react-stripe-js";
import { useToasts } from "react-toast-notifications";
import { useAuthState } from "../../context/Auth";
import {
  EventCard,
  NoEventListed,
  SkelectonAppEventCard,
} from "./shared/AppEventCard";
import PaymentCompleteModal from "../Modal/PaymentCompleteModal";
import MemberEnryCompleteModal from "../Modal/MemberEntryCompleteModal";
import { useEvents } from "../../context/EventsContext";

export const createEntry = /* GraphQL */ `
  mutation CreateEntry(
    $input: CreateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    createEntry(input: $input, condition: $condition) {
      eventId
      memberId
      section
      byes
    }
  }
`;

export default function AppEvents() {
  const { user } = useAuthState();
  const { search } = useLocation();
  const history = useHistory();
  const {
    eventId,
    session_id,
    event_payment_success,
    section,
    byes,
    event_member_entry_success
  } = queryString.parse(search);
  const stripe = useStripe();
  const { addToast } = useToasts();
  const [paymentSuccesseful, setPaymentSuccessful] = useState(false);
  const [memberEntrySuccessful, setMemberEntrySuccessful] = useState(false);
  const { isLoading, error, data } = useEvents();

  const register = async (
    eventId: any,
    confirmSection: any,
    confirmByes: any
  ) => {
    try {
      const redirectTo = `${window.location.origin}/app/events`;
      const selectedSection = section
        ? section
        : confirmSection
        ? confirmSection
        : null;
      const byesSelection = byes ? byes : confirmByes ? confirmByes : null;
      const { sessionId, active, memberEntry } = await API.post("public", "/event/register", {
        body: {
          eventId,
          successUrl: redirectTo,
          cancelUrl: redirectTo,
          section: selectedSection,
          byes: byesSelection,
        },
      });
      if(active && memberEntry) {

        const entryInfo = {
          byes: byesSelection,
          section: selectedSection,
          eventId,
          memberId: user?.attributes?.sub
        }
        const entry = await API.graphql({ query: createEntry, variables: {input: entryInfo }});
        if(entry) {
          history.push('/app/events?event_member_entry_success=true');
        } else {
          console.log("error", entry)
        }

      } else {
        await stripe?.redirectToCheckout({ sessionId });
      }
      
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
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (eventId /* user has logged in via register button */) {
      register(eventId, section, byes);
    }
    if (
      event_payment_success &&
      session_id /* user has completed a payment */
    ) {
      setPaymentSuccessful(true);
    }

    if(event_member_entry_success) {
      setMemberEntrySuccessful(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, data]);

  return (
    <div className="mt-5 grid grid-col-1 sm:grid-cols-2 2xl:grid-cols-3 mb-10">
      <>
        {!error && (
          <>
            {!isLoading &&
              data &&
              data.map((event) => {
                return (
                  <EventCard
                    key={event.id}
                    {...{ ...event, eventId, register }}
                  />
                );
              })}

            {isLoading && (
              <>
                {[...new Array(9).keys()].map((k) => (
                  <SkelectonAppEventCard key={k} />
                ))}
              </>
            )}

            {data && data.length === 0 && <NoEventListed />}
          </>
        )}
      </>
      <>
        {error && (
          <div>
            <div className="italic text-red-700">Error fetching events.</div>
          </div>
        )}
      </>
      <PaymentCompleteModal
        open={paymentSuccesseful}
        setOpen={setPaymentSuccessful}
      />
      <MemberEnryCompleteModal
        open={memberEntrySuccessful}
        setOpen={setMemberEntrySuccessful}
      />
    </div>
  );
}
