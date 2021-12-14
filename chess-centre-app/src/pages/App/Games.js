import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "@aws-amplify/api";
import { useMember } from "../../api/member";
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
  const [playerId, setPlayerId] = useState(memberId);
  const [description, setDescription] = useState("Find your most recent games here");

  useMemo(() => {
    const fetchWhiteGames = async (id) => {
      const {
        data: {
          listGamesByWhiteMember: { items },
        },
      } = await API.graphql({
        query: listGamesByWhiteMember,
        variables: { whiteMemberId: id },
        authMode: "AWS_IAM"
      });
      setGames((state) => {
        return [...state, ...items];
      });
    };

    const fetchBlackGames = async (id) => {
      const {
        data: {
          listGamesByBlackMember: { items },
        },
      } = await API.graphql({
        query: listGamesByBlackMember,
        variables: { blackMemberId: id },
        authMode: "AWS_IAM"
      });
      setGames((state) => {
        return [...state, ...items];
      });
      
    };

    const fetchAllGames = async (id) => {
      setIsLoadingGames(true);
      fetchWhiteGames(id)
      fetchBlackGames(id)
      setIsLoadingGames(false);
      setIsErrorGame(false);
    }


    try {

      if(memberId) {
        setPlayerId(memberId);
        fetchAllGames(memberId);
        setDescription("Opponent games");
      } else if(data && data.id) {
        setPlayerId(data.id);
        fetchAllGames(data.id);
        setDescription("Find your most recent games here");
      }

    } catch (error) {
      console.log(error);
      setIsLoadingGames(false);
      setIsErrorGame(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
          <p className="text-sm text-left text-gray-500 dark:text-gray-300">
            { description }
          </p>
        </div>
      </div>

      <div className="">
        <div className="">
          <div className="">
            {!isLoading && !isLoadingGames && !error && !isErrorGame && (
              <div>
                {
                  games ? (<div className="">
                    <GameTable games={games} memberId={playerId} />
                  </div>) : (<div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                    <span>
                      <i className="fal fa-chess fa-6x text-teal-500"></i>
                    </span>
                    <p className="mt-2 block text-sm font-medium text-gray-600">
                      No games yet.
                    </p>
                    <p className="mt-2 block text-sm font-medium text-gray-600">
                      Enter one of our fantastic <Link className="text-teal-500 font-medium hover:underline" to="/app/events">events</Link> to get your games published.
                    </p>
                  </div>)
                }
              </div>
            )}

            {
              (isLoading || isLoadingGames) && (
                <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                  <span className="animate-pulse">
                    <i className="aninmal-pulse fal fa-chess-board fa-10x text-teal-500 opacity-50"></i>
                  </span>
                  <p className="mt-2 block text-sm font-medium text-gray-600">
                    Loading games...
                  </p>
                </div>
              )
            }

            {
              (error || isErrorGame) && (
                <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                  <span>
                    <i className="aninmal-pulse fal fa-exclamation-square fa-10x text-orange-400 opacity-50"></i>
                  </span>
                  <p className="mt-2 block text-sm font-medium text-gray-600">
                    Oops, there seems to be an issue loading your games. Try again later.
                  </p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
