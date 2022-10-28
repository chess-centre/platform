import API from "@aws-amplify/api";
import { useQuery } from "react-query";

export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
      id
      resultInfo
      eventID
      eventType
      name
      complete
      isLive
      winners
      dgtCloudUrl
      ecfLMSUrl
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
  }
`;

export function useResults({ resultId }) {
  return useQuery("resultData", async () => {
    const {
      data: { getResult: result },
    }: any = await API.graphql({
      query: getResult,
      variables: {
        id: resultId,
      },
      authMode: "AWS_IAM",
    });

    return result;
  });
}
