import React, { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { useMember } from "../../api/member";
import PGNViewer from "../../components/ChessBoard/ChessBoard";

export const listGamesByWhiteMember = /* GraphQL */ `
  query ListGamesByWhiteMember(
    $whiteMemberId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGamesByWhiteMember(
      whiteMemberId: $whiteMemberId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        eventId
        whiteMemberId
        blackMemberId
        round
        result
        pgnStr
        pgn {
          bucket
          region
          key
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        whiteMember {
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          stripeCustomerId
          stripeCurrentPeriodEnd
          stripePriceId
          stripeProductId
        }
        blackMember {
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          stripeCustomerId
          stripeCurrentPeriodEnd
          stripePriceId
          stripeProductId
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const listGamesByBlackMember = /* GraphQL */ `
  query ListGamesByBlackMember(
    $blackMemberId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGamesByBlackMember(
      blackMemberId: $blackMemberId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        eventId
        whiteMemberId
        blackMemberId
        round
        result
        pgnStr
        pgn {
          bucket
          region
          key
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        whiteMember {
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          stripeCustomerId
          stripeCurrentPeriodEnd
          stripePriceId
          stripeProductId
        }
        blackMember {
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          stripeCustomerId
          stripeCurrentPeriodEnd
          stripePriceId
          stripeProductId
        }
      }
      nextToken
      startedAt
    }
  }
`;

export default function GamesView() {
  const { isLoading, error, data } = useMember();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchWhiteGames = async () => {
      const {
        data: {
          listGamesByWhiteMember: { items },
        },
      } = await API.graphql({
        query: listGamesByWhiteMember,
        variables: { whiteMemberId: data.id },
      });

      console.log(items);
      setGames((state) => {
        return [...state, ...items];
      });
    };

    const fetchBlackGames = async () => {
      const {
        data: {
          listGamesByBlackMember: { items },
        },
      } = await API.graphql({
        query: listGamesByBlackMember,
        variables: { blackMemberId: data.id },
      });

      console.log(items);
      setGames((state) => {
        return [...state, ...items];
      });
    };
    if (data) {
      fetchWhiteGames();
      fetchBlackGames();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <span className="text-teal-600">
          <i className="fas fa-chess-king"></i>
        </span>{" "}
        Games
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900 dark:text-white"></h3>
          <p className="ml-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here are competitive games played by our members in official events
          </p>
        </div>
      </div>
      <div className="bg-white px-2 sm:mt-6 max-w-7xl mx-auto lg:px-10 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 py-6 sm:py-10">
          {!isLoading && (
            <div>
              <h2 className="text-center sm:text-left text-base font-semibold text-teal-600 tracking-wide">
                List
              </h2>
              <div className="text-center sm:text-left text-base max-w-xl mt-5 mx-auto sm:text-md text-gray-500 md:pr-4">
                <ol>
                  {games.map((game, index) => (
                    <li key={index}>
                      {game.whiteMember.name} {game.whiteMember.ecfRating}{" "}
                      {game.result} {game.blackMember.name}{" "}
                      {game.blackMember.ecfRating}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-center sm:text-left text-base font-semibold text-teal-600 tracking-wide">
              Viewer
            </h2>
            <div className="overflow-auto p-2 mx-auto content-center">
             { games[0]?.pgnStr && <PGNViewer layout={"left"} size="400">{games[0].pgnStr.replace(/["']/g, "\"")}</PGNViewer> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
