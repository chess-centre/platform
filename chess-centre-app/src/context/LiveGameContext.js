import API from "@aws-amplify/api";
import React, { useEffect, useState } from "react";

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
        isLiveUrl
        active
      }
    }
  }
`;

export const LiveGameContext = React.createContext({
  eventInfo: [],
  isLoading: false,
});

export const LiveGameProvider = ({ children }) => {
  const yesterday = new Date(Date.now() - 3600 * 1000 * 24);
  const [eventInfo, setEventInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLiveEvents = async () => {
      setIsLoading(true);
      try {
        const {
          data: {
            listEventsActive: { items },
          },
        } = await API.graphql({
          query: listEventsActive,
          variables: {
            active: "yes",
            startDate: { gt: yesterday },
            filter: { isLive: { eq: true } },
          },
          authMode: "AWS_IAM",
        });
        if (items) {
          setEventInfo(items);
        }
      } catch (error) {
        console.log("Error", error);
      }
      setIsLoading(false);
    };
    try {
      fetchLiveEvents();
    } catch (error) {
      setIsLoading(false);
      console.log("Error loading live data", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LiveGameContext.Provider value={{ eventInfo, isLoading }}>
      {children}
    </LiveGameContext.Provider>
  );
};

export function useLiveGameState() {
  const context = React.useContext(LiveGameContext);
  if (!context) {
    throw new Error("useLiveGameState must be used within a LiveGameProvider");
  }

  return context;
}
