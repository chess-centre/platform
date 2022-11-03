import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "@aws-amplify/api";
import EventGameTable from "../../components/Table/EventGameTable";
import Brumdcrumbs from "../../components/Breadcrumbs";

export const listGamesByEvent = /* GraphQL */ `
  query ListGamesByEvent(
    $id: ID!
    $eventId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getEvent(id: $id) {
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
      active
      results {
        items {
          id
          eventID
          eventType
          name
          complete
          winners
        }
      }
      entries {
        items {
          id
          eventId
          memberId
        }
        nextToken
        startedAt
      }
    }
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
  const [games, setGames] = useState<any[]>([]);
  const [eventName, setEventName] = useState<any>("");
  const [eventInfo, setEventInfo] = useState<any | null>(null);
  const [pgnCount, setPgnCount] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    document.title = "The Chess Centre | Games by Event";

    const fetchGames = async () => {
      setIsLoadingGames(true);

      try {
        
        const {
          data: {
            listGamesByEvent: { items, nextToken },
            getEvent,
          },
        }: any = await API.graphql({
          query: listGamesByEvent,
          variables: { eventId, id: eventId },
          authMode: "AWS_IAM",
        })
  
        const games: any[] = await moreGames(nextToken);
  
        if (items && Array.isArray(items)) {
          const g = [...items, ...games];
          setGames(g);
          setPgnCount(g.filter((game) => !!game.pgnStr).length || 0);
          setEventName(items[0].eventName);
          setIsLoadingGames(false);

          if(getEvent) {
            setEventInfo(getEvent);
            setAverageRating(getAverageRating(getEvent.entries.items, g));
          }
        }
      } catch (error) {
        setIsLoadingGames(false);
        setIsErrorGame(true);
      }
    };

    const moreGames = async (nextToken: any) => {
      let token = nextToken;
      let games: any[] = [];

      while (token) {
        const {
          data: {
            listGamesByEvent: { items, nextToken },
          },
        }: any = await API.graphql({
          query: listGamesByEvent,
          variables: { eventId, nextToken: token, id: eventId },
          authMode: "AWS_IAM",
        });
        games = [...games, ...items];
        token = nextToken;
      }
      return games;
    };

    try {
      fetchGames();
    } catch (error) {
      console.log("Error", error);
      setIsLoadingGames(false);
      setIsErrorGame(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  function getAverageRating(entries: any[], games: any[]): number {
    let ratedPlayers = 0;
    const playerWithRatings = entries.reduce((prev, cur) => {
      const rating = games.find(game => game.whiteMemberId === cur.memberId)?.whiteRating || null;
      if(rating && typeof rating === 'number') {
        prev += rating;
        ratedPlayers++;
      }
      return prev;
    }, 0);
    return Number(playerWithRatings / ratedPlayers);
  }

  function downloadPGNs(fileName: string, games: any) {
    const name = fileName.split(" ").join("-").toLowerCase();
    const pgns = games
      .filter((game) => !!game.pgnStr)
      .sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .reduce((pre: string, cur: any) => {
        if (cur.pgnStr) {
          pre += cur.pgnStr.replace(/["']/g, '"') + "\r\r";
        }
        return pre;
      }, "");
    saveFile(name, pgns);
  }

  function saveFile(filename: string, data: string | undefined) {
    if (!data) return;
    const blob = new Blob([data], { type: "application/vnd.chess-pgn" });
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = `${filename}-chess-centre-games.pgn`;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }

  return (
    <div className="overscroll-none">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-chess-king text-teal-600"></i> Games{" "}
        <span className="text-sm text-gray-500">by event</span>
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="ml-2">
          {eventName && (
            <Brumdcrumbs
              crumbs={[
                { name: "Games", link: "/app/games", current: false },
                { name: eventName, current: true },
              ]}
            />
          )}
        </div>
      </div>

      <div className="mt-2 max-w-3xl mx-auto grid grid-cols-1 gap-4 md:max-w-full xl:grid-cols-3">
        <section className="sm:col-span-2 sm:order-1 order-2">
          <div className="grid grid-cols-1">
            {!isLoadingGames && !isErrorGame && (
              <div>
                {games && games.length > 0 ? (
                  <div>
                    <EventGameTable games={games} eventName={eventName} />
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
                  <i className="aninmal-pulse fal fa-exclamation-square fa-10x text-red-500 opacity-50"></i>
                </span>
                <p className="mt-2 block text-sm font-medium text-gray-600">
                  Oops, there seems to be an issue loading the games for this event. Try again
                  later.
                </p>
              </div>
            )}
          </div>
        </section>
        <section className="col-span-1 sm:order-2 order-1 sm:mt-5">
          <div className="text-center ">
            <h3 className="text-gray-700 text-lg font-medium">
              <div className="mb-3">Overview</div>
            </h3>
            <dl className="mt-2 flex-grow flex flex-col justify-between text-gray-600 bg-white p-6 shadow rounded-lg">
              <dt className="text-sm font-medium">Total Games</dt>
              <dd className="text-8xl font-medium text-teal-600">
                {games.length}
              </dd>
              <dt className="text-sm font-medium">Average Rating</dt>
              <dd className="text-3xl font-medium text-teal-600">{ averageRating.toFixed(0) }</dd>
            </dl>
            <div className="mb-2 mt-4">
              {eventInfo && eventInfo?.results?.items[0]?.complete && (
                <Link
                  to={`/app/results/${eventInfo?.results?.items[0]?.id}`}
                  className="inline-flex w-full justify-center rounded-md border border-gray-200
                  bg-teal-600 px-4 py-2 text-base font-medium text-gray-100 shadow-sm hover:bg-teal-500 hover:border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:text-sm"
                >
                  See Standings
                </Link>
              )}
            </div>
            <div>
              {Boolean(pgnCount) && (
                <>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-gray-200
                  bg-gray-100 px-4 py-2 text-base font-medium text-teal-700 shadow-sm hover:bg-gray-200 hover:border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => downloadPGNs(eventName, games)}
                  >
                    <i className="far fa-cloud-download mr-2 mt-1"></i>{" "}
                    {`Download PGNs`}
                  </button>
                  <div className="text-xs text-gray-500 mt-2">
                    Playable games available {pgnCount}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
