import { API } from "aws-amplify";
import { useQuery } from "react-query";

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
          timeControl
          eventType
          defaultPrice
          canRegister
          createdAt
          updatedAt
        }
        entries {
          items {
            id
            eventId
            memberId
          }
        }
      }
    }
  }
`;

export const useEvents = () => {
  return useQuery("eventData", async () => {
    const yesterday = new Date(Date.now() - (3600 * 1000 * 24));
    const {
      data: {
        listEventsActive: { items: events },
      },
    } = await API.graphql({
      query: listEventsActive,
      variables: { active: "yes", startDate: { gt: yesterday } },
      authMode: "AWS_IAM",
    });

    const sorted = events.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );

    return sorted.map((event) => ({
      ...event,
      name: event.name || event.type.name,
      description: event.description || event.type.description,
      time: event.time || event.type.time,
      maxEntries: event.maxEntries || event.type.maxEntries,
      color: event.type.color,
      url: event.type.url,
      isFull: event.entryCount >= (event.maxEntries || event.type.maxEntries)
    }));
  });
};

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
    const yesterday = new Date(Date.now() - (3600 * 1000 * 24));
    const {
      data: {
        listEventsActive: { items: events },
      },
    } = await API.graphql({
      query: listEventsActiveLite,
      variables: { active: "yes", startDate: { gt: yesterday } },
      authMode: "AWS_IAM",
    });

    const sorted = events.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );

    return sorted.map((event) => ({
      ...event,
      name: event.name || event.type.name,
      description: event.description || event.type.description,
      time: event.time || event.type.time,
      maxEntries: event.maxEntries || event.type.maxEntries,
      color: event.type.color,
      url: event.type.url,
      isFull: event.entryCount >= (event.maxEntries || event.type.maxEntries)
    }));
  });
};

const listEventsFull = /* GraphQL */ `
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
          time
          maxEntries
          timeControl
          eventType
          canRegister
        }
        entries {
          items {
            id
            eventId
            section
            byes
            member {
              id
              name
              email
              ecfRating
              ecfRapid
              ecfMembership
              ecfRapidPartial
              ecfRatingPartial
              estimatedRating
              chessTitle
              club
              isJunior
            }
          }
        }
      }
    }
  }
`;


export const useFullEvents = () => {
  return useQuery("eventData", async () => {
    const yesterday = new Date(Date.now() - (3600 * 1000 * 24));
    const {
      data: {
        listEventsActive: { items: events },
      },
    } = await API.graphql({
      query: listEventsFull,
      variables: { active: "yes", startDate: { gt: yesterday } },
      authMode: "AWS_IAM",
    });

    const sorted = events.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );

    return sorted.map((event) => ({
      ...event,
      name: event.name || event.type.name,
      description: event.description || event.type.description,
      time: event.time || event.type.time,
      maxEntries: event.maxEntries || event.type.maxEntries,
    }));
  });
};
