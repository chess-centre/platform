import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "@aws-amplify/api";
import { useMember } from "../../api/member";
import GameTable from "../../components/Table/GameTable";
import BetaSlideOut from "../../components/SlideOut/BetaSlideOut";

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
        liChessUrl
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
          createdAt
          updatedAt
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
        liChessUrl
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
        }
      }
      nextToken
      startedAt
    }
  }
`;

export default function GamesView() {
  const { memberId } = useParams();
  const { isLoading, error, data } = useMember();
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const [isErrorGame, setIsErrorGame] = useState(false);
  const [games, setGames] = useState([]);
  const [currentUser, setCurrentUser] = useState(true);
  const [playerId, setPlayerId] = useState(memberId);
  const [playerName, setPlayerName] = useState("");
  const [slideState, setIsSlideOutOpen] = useState({
    open: false,
    eventDetails: {},
  });

  const santitizeGameDate = games => {
    
  }

  useEffect(() => {
    const fetchWhiteGames = async (id) => {
      const {
        data: {
          listGamesByWhiteMember: { items },
        },
      } = await API.graphql({
        query: listGamesByWhiteMember,
        variables: { whiteMemberId: id },
        authMode: "AWS_IAM",
      });
      return items;
    };

    const fetchBlackGames = async (id) => {
      const {
        data: {
          listGamesByBlackMember: { items },
        },
      } = await API.graphql({
        query: listGamesByBlackMember,
        variables: { blackMemberId: id },
        authMode: "AWS_IAM",
      });



      setGames((state) => {
        return [...state, ...items];
      });
      return items;
    };

    const fetchAllGames = async (id) => {
      setIsLoadingGames(true);
      const whiteGames = await fetchWhiteGames(id);

      const blackGames = await fetchBlackGames(id);
      if (whiteGames[0]?.whiteMember?.name) {
        setPlayerName(whiteGames[0]?.whiteMember?.name);
      }
      if (blackGames[0]?.blackMember?.name) {
        setPlayerName(blackGames[0]?.blackMember?.name);
      }
      setGames([...whiteGames, ...blackGames]);
      setIsLoadingGames(false);
      setIsErrorGame(false);
    };

    try {
      if (memberId) {
        setPlayerId(memberId);
        fetchAllGames(memberId);
        // Can occur if you look at an opponents games and select your own name!
        if (data && data.id === memberId) {
          setCurrentUser(true);
        } else {
          setCurrentUser(false);
        }
      } else if (data && data.id) {
        setPlayerId(data.id);
        fetchAllGames(data.id);
        setCurrentUser(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingGames(false);
      setIsErrorGame(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, memberId]);

  return (
    <div className="overscroll-none">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-chess-king text-teal-600"></i> Games
        <div className="inline-flex align-top top-2">
          <span
            onClick={() => setIsSlideOutOpen({ open: true })}
            className="ml-2 cursor-pointer items-center px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 top-2"
          >
            BETA
          </span>
        </div>
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="md:flex md:items-center md:justify-between">
          {playerName && (
            <h1 className="text-sm text-left text-gray-500">
              Individual results for{" "}
              <span className="text-teal-800">{playerName}</span>
            </h1>
          )}
        </div>
      </div>

      <div className="">
        <div className="">
          <div className="">
            {!isLoading && !isLoadingGames && !error && !isErrorGame && (
              <div>
                {games && games.length > 0 ? (
                  <div className="">
                    <GameTable games={games} memberId={playerId} />
                  </div>
                ) : (
                  <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                    <span>
                      <i className="fal fa-chess fa-6x text-teal-500"></i>
                    </span>
                    <p className="mt-2 block text-sm font-medium text-gray-600">
                      No games yet.
                    </p>
                    {playerName && currentUser && (
                      <p className="mt-2 block text-sm font-medium text-gray-600">
                        Enter one of our fantastic{" "}
                        <Link
                          className="text-teal-500 font-medium hover:underline"
                          to="/app/events"
                        >
                          events
                        </Link>{" "}
                        to get your games published.
                      </p>
                    )}

                   {!currentUser && (
                      <p className="mt-2 block text-sm font-medium text-gray-600">
                        Encourage this player to enter into one of our fantastic{" "}
                        <Link
                          className="text-teal-500 font-medium hover:underline"
                          to="/app/events"
                        >
                          events
                        </Link>!
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {(isLoading || isLoadingGames) && (
              <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                <span className="animate-pulse">
                  <i className="aninmal-pulse fal fa-chess-board fa-10x text-teal-500 opacity-50"></i>
                </span>
                <p className="mt-2 block text-sm font-medium text-gray-600">
                  Loading games...
                </p>
              </div>
            )}

            {(error || isErrorGame) && (
              <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                <span>
                  <i className="aninmal-pulse fal fa-exclamation-square fa-10x text-orange-400 opacity-50"></i>
                </span>
                <p className="mt-2 block text-sm font-medium text-gray-600">
                  Oops, there seems to be an issue loading your games. Try again
                  later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BetaSlideOut
        slideState={slideState}
        setIsSlideOutOpen={setIsSlideOutOpen}
      ></BetaSlideOut>
    </div>
  );
}
