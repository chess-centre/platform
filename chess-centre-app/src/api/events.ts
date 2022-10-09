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
    const yesterday = new Date(Date.now() - 3600 * 1000 * 24);
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
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

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
    } = await API.graphql({
      query: listEventsActiveLite,
      variables: { active: "yes", startDate: { gt: yesterday } },
      authMode: "AWS_IAM",
    });

    const sorted = events.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

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

const getEvent = /* GraphQL */ `
  query GetEvent(
    $id: ID!
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getEvent(id: $id) {
      id
      entryCount
    }
    listEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventId
        memberId
        section
        byes
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
          fideRating
          club
          gender
          chessTitle
        }
      }
      nextToken
      startedAt
    }
  }
`;

export const useFullEvents = () => {
  return useQuery("eventData", async () => {
    const threeMonths = new Date(Date.now() - 3600 * 1000 * 24 * 90);
    const {
      data: {
        listEventsActive: { items: events },
      },
    }: any = await API.graphql({
      query: listEventsFull,
      variables: { active: "yes", startDate: { gt: threeMonths } },
      authMode: "AWS_IAM",
    });

    const sorted = events
      .filter((e: any) => !!e.type.canRegister)
      .sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].entryCount > 99) {
        let list: any[] = [];
        const {
          data: { listEntrys: entries },
        }: any = await queryLargeEntryList({ id: sorted[i].id, nextToken: null });

        if (entries) {
          list = [...entries.items];
        }

        if (entries.nextToken) {
          const {
            data: { listEntrys: moreEntries },
          }: any = await queryLargeEntryList({
            id: sorted[i].id,
            nextToken: entries.nextToken,
          });
          list = [...list, ...moreEntries.items];
        }
        sorted[i].entries.items = list;
      }
    }

    return sorted.map((event) => ({
      ...event,
      name: event.name || event.type.name,
      description: event.description || event.type.description,
      time: event.time || event.type.time,
      maxEntries: event.maxEntries || event.type.maxEntries,
    }));
  });
};

async function queryLargeEntryList({ id, nextToken }) {
  return await API.graphql({
    query: getEvent,
    variables: { id, filter: { eventId: { eq: id } }, limit: 250, nextToken },
    authMode: "AWS_IAM",
  });
}
