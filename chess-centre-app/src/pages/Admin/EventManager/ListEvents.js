import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { useQuery } from "react-query";
import { ManagedEventFactory } from "../../../lib/EventManager";

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
              ecfRating
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
    }));
  });
};

const preparePlayerData = (players) => {
  // Transforms member object to a shallow player record for event pairing:
  return players.reduce((pre, cur) => {
    return [...pre, {
      id: cur.memberId,
      name: cur.member.name,
      rating: cur.member.ecfRating
    }];
  }, []);
}

export default function ListEvents() {
  const { data } = useEvents();
  const [isLoading, setIsLoading] = useState(false);

  const createEvent = (eventDetails) => {
    const meta = new ManagedEventFactory(eventDetails);
    console.log(meta.eventState())
  };

  useEffect(() => {
    document.title = "The Chess Centre | Event Manager";
  }, []);

  return (
    <>
      <h1 className="relative mt-6 mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-tasks text-teal-600"></i> Event Manager
        <div className="inline-flex align-top top-2 ml-2"></div>
        {isLoading && (
          <div className="absolute text-teal-500 mt-2 align-middle ml-2 text-sm inline-flex">
            <i className="fal fa-spinner-third fa-spin fa-fw"></i>
          </div>
        )}
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="relative -ml-2 -mt-2 flex flex-wrap items-baseline">
          <p className="ml-2 mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
            Interface for micro management of a current event.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 py-6">
        {data &&
          data.map((event) => {
            return (
              <div
                key={event.id}
                className="text-sm border border-gray-200 bg-white p-2 shadow rounded-lg"
              >
                <div>Name: {event.name}</div>
                <div>Id: {event.id}</div>
                <div>Date: {event.startDate}</div>
                <div>Entries: {event.entryCount}</div>
                <button
                  onClick={() =>
                    createEvent({ eventId: event.id, name: event.name, players: preparePlayerData(event.entries.items) })
                  }
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Create Event
                </button>
                <div>
                  <ol>
                    {event.entries?.items?.map((e) => {
                      return (
                        <li key={e.memberId}>
                          <div>
                            {e.memberId} {e.member?.name} 
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
