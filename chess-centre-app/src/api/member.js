import { API } from "aws-amplify";
import { useQuery } from "react-query";
import { useAuthState } from "../context/Auth";

const getMember = /* GraphQL */ `
  query GetMember($id: ID!) {
    getMember(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;

export const useMember = () => {
  const { user } = useAuthState();

  return useQuery("memberData", async () => {
    const {
      data: { getMember: member }
    } = await API.graphql({
      query: getMember,
      variables:  { id: user.attributes.sub },
      authMode: "AWS_IAM",
    });
    return member;
  });
};