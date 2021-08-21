import { API } from "aws-amplify";
import { useQuery } from "react-query";
import { listEventsActive } from "../graphql/queries";

export const useEvents = () => {
  return useQuery("eventData", async () => {
    const today = new Date();
    const {
      data: {
        listEventsActive: { items: events },
      },
    } = await API.graphql({
      query: listEventsActive,
      variables: { active: "yes", startDate: { gt: today } },
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
