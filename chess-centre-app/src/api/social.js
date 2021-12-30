import { API } from "aws-amplify";
import { useQuery } from "react-query";

export const useInstagram = ({ count, tag }) => {
  return useQuery("instagramFeed", async () => {
    const response = await API.get("social", `/instagram/feed`, {
      queryStringParameters: {
        count,
        tag,
      },
    }).catch((e) => {
      console.log("error", e);
      return;
    });
    return response;
  });
};