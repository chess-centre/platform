import API from "@aws-amplify/api";
import { useQuery } from "react-query";

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
      isLiveUrl
      isJunior
      active
      multipleSections
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
        memberEntry
      }
    }
  }
`;
export function useEvent({ eventId }) {
  return useQuery("widgetEvent", async () => {
    const {
      data: { getEvent: result },
    }: any = await API.graphql({
      query: getEvent,
      variables: {
        id: eventId,
      },
      authMode: "AWS_IAM",
    });
    return result;
  });
}