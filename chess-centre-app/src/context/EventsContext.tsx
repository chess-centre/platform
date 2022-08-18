import API from "@aws-amplify/api";
import { useQuery } from "react-query";
import { useAuthState } from "./Auth";

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
        }
        entries {
          items {
            id
            eventId
            memberId
            section
            byes
            createdAt
            updatedAt
            member {
              id
              fideId
              ecfId
              name
              ecfRatingPartial
              ecfRating
              ecfRapidPartial
              ecfRapid
              ecfMembership
              estimatedRating
              club
              gender
              membershipType
            }
          }
        }
      }
    }
  }
`;

export function useEvents() {
  const { user } = useAuthState();
  const yesterday = new Date(Date.now() - 3600 * 1000 * 24);

  function alreadyRegistered(event) {
    return !!event.entries.items.find(
      (e: any) => e.memberId === user?.attributes?.sub
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
      .filter((e: any) => !!e.type.canRegister)
      .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    const eventList = sorted.map((event: any) => ({
      ...event,
      allowedToRegister:
        !alreadyRegistered(event) && !isFull(event) && !event?.isLive,
      full: isFull(event),
      registered: alreadyRegistered(event),
    }));

    return eventList;

  });
}
