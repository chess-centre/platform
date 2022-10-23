import API from "@aws-amplify/api";
import { useQuery } from "react-query";

export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
      id
      pairings
      results
      players
      eventID
      name
      complete
      live
      winner
      dgtCloudUrl
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
