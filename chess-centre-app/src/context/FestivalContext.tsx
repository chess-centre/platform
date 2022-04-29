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
      }
    }
  }
`;

export const FestivalContext = React.createContext({
    eventId: "",
    loadingEvent: false
});

export const FestivalProvider = ({ children }) => {

    const [loadingEvent, setEventLoading] = useState(false);
    const [eventId, setEventId] = useState("");

    useEffect(() => {
        const fetchFestivalEvent = async () => {
            setEventLoading(true);
            try {
                const {
                    data: {
                        listEventsActive: { items },
                    },
                } = await API.graphql({
                    query: listEventsActive,
                    variables: {
                        active: "yes",
                    },
                    authMode: "AWS_IAM",
                });
                if (items) {
                    const eventInfo = items.filter(i => i?.name?.includes("Festival"));
                    setEventId(eventInfo[0]?.id);
                }
            } catch (error) {
                console.log("Error", error);
            }
            setEventLoading(false);
        };
        try {
            fetchFestivalEvent();
        } catch (error) {
            setEventLoading(false);
            console.log("Error loading live data", error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FestivalContext.Provider value={{ eventId, loadingEvent }}>
            {children}
        </FestivalContext.Provider>
    );
};

export function useFestivalContext() {
    const context = React.useContext(FestivalContext);
    if (!context) {
        throw new Error("useFestivalContext must be used within a FestivalProvider");
    }
    return context;
}
