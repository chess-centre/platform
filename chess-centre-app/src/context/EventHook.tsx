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

const listEventsActiveLite = /* GraphQL */ `
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
        multipleSections
        type {
          id
          name
          description
          url
          color
          time
          maxEntries
          timeControl
          eventType
          defaultPrice
          canRegister
        }
      }
    }
  }
`;


export const useEventsLite = () => {
  return useQuery("eventDataLite", async () => {
    const yesterday = new Date(Date.now() - 3600 * 1000 * 24);
    const {
      data: {
        listEventsActive: { items: events },
      },
    }: any = await API.graphql({
      query: listEventsActiveLite,
      variables: { active: "yes", startDate: { gt: yesterday } },
      authMode: "AWS_IAM",
    });

    const sorted = events      
    // TODO: move to graphQL query:
      .filter((e: any) => !!e.type.canRegister)
      .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    return sorted.map((event) => ({
      ...event,
      name: event.name || event.type.name,
      description: event.description || event.type.description,
      time: event.time || event.type.time,
      maxEntries: event.maxEntries || event.type.maxEntries,
      color: event.type.color,
      url: event.type.url,
      isFull: event.entryCount >= (event.maxEntries || event.type.maxEntries),
    }));
  });
};