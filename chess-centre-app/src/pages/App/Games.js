import React, { useMemo, useState } from "react";
import API from "@aws-amplify/api";
import { useMember } from "../../api/member";
import PGNViewer from "../../components/ChessBoard/ChessBoard";
import GameTable from "../../components/Table/GameTable";

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
        eventName
        date
        whiteMemberId
        whiteRating
        blackMemberId
        blackRating
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
        eventName
        date
        whiteRating
        blackMemberId
        blackRating
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
  const [selectedPGN, setSelectedPGN] = useState(null);
  const [games, setGames] = useState([]);

  useMemo(() => {
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

  const setSelectedGame = (pgn) => {
    if (pgn) {
      setSelectedPGN(pgn.replace(/["']/g, '"'));
    }
  };

  return (
    <div className="overscroll-none">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-chess-king text-teal-600"></i> Games
        <div className="inline-flex align-top top-2">
          <span className="ml-2 items-center px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 top-2">
            BETA
          </span>
        </div>
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-sm text-center sm:text-left text-gray-500 dark:text-gray-300">
            Your games played at our venue.
          </p>
        </div>
      </div>

      <div className="">
        <div className="">
          <div className="">
            {!isLoading && !error && (
              <div className="">
                <GameTable games={games} setSelectedGame={setSelectedGame} />
              </div>
            )}
          </div>
          <div>
            <div className="hidden sm:block relative">
              {/* WEB SPECIFIC */}
              <div className="mx-auto content-center overscroll-none">
                {selectedPGN && (
                  <PGNViewer layout={"left"} size="350">
                    {selectedPGN}
                  </PGNViewer>
                )}
              </div>
            </div>
            <div className="block sm:hidden relative">
              <div className="mb-4 h-full mt-4">
                <div className="bg-white">
                  {selectedPGN && (
                    <PGNViewer layout={"top"}>{selectedPGN}</PGNViewer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
