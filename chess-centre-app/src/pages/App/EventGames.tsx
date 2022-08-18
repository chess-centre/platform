import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@aws-amplify/api";
import EventGameTable from "../../components/Table/EventGameTable";

export const listGamesByEvent = /* GraphQL */ `
  query ListGamesByEvent(
    $eventId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGamesByEvent(
      eventId: $eventId
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
        whiteName
        whiteRating
        blackMemberId
        blackName
        blackRating
        round
        result
        type
        pgnStr
        liChessUrl
        whiteMember {
          id
          fideId
          ecfId
          username
          name
          ecfRating
          ecfRapid
          estimatedRating
          club
          chessTitle
        }
        blackMember {
          id
          fideId
          ecfId
          username
          name
          ecfRating
          ecfRapid
          estimatedRating
          club
          chessTitle
        }
      }
      nextToken
      startedAt
    }
  }
`;

export default function EventGamesView() {
  const { eventId } = useParams();
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const [isErrorGame, setIsErrorGame] = useState(false);
  const [games, setGames] = useState([]);
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    document.title = "The Chess Centre | Games by Event";

    const fetchGames = async (eventId) => {
      setIsLoadingGames(true);
      const {
        data: {
          listGamesByEvent: { items },
        },
      } = await API.graphql({
        query: listGamesByEvent,
        variables: { eventId },
        authMode: "AWS_IAM",
      });
      if (items) {
        setGames(items);
        setEventName(items[0].eventName);
        setIsLoadingGames(false);
      }
    };

    try {
      fetchGames(eventId);
    } catch (error) {
      console.log("Error", error);
      setIsLoadingGames(false);
      setIsErrorGame(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return (
    <div className="overscroll-none">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-chess-king text-teal-600"></i> Games <span className="text-sm text-gray-500">by event</span>
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="md:flex md:items-center md:justify-between">
          {eventName && (
            <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
              <p className="ml-2 mt-1 text-md text-gray-500 truncate">
                {eventName}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1">
        {!isLoadingGames && !isErrorGame && (
          <div>
            {games && games.length > 0 ? (
              <div>
                <EventGameTable games={games} />
              </div>
            ) : (
              <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                <span>
                  <i className="fal fa-chess fa-6x text-teal-500"></i>
                </span>
                <p className="mt-2 block text-sm font-medium text-gray-600">
                  No games for this event.
                </p>
              </div>
            )}
          </div>
        )}

        {isLoadingGames && (
          <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
            <span className="animate-pulse">
              <i className="aninmal-pulse fal fa-chess-board fa-10x text-teal-500 opacity-50"></i>
            </span>
            <p className="mt-2 block text-sm font-medium text-gray-600">
              Loading games...
            </p>
          </div>
        )}

        {isErrorGame && (
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
  );
}
