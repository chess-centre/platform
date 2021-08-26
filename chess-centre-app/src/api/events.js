import { API } from "aws-amplify";
import { useQuery } from "react-query";

export const listEventsActive = /* GraphQL */ `
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
          createdAt
          updatedAt
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
