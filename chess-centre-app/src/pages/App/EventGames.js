import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@aws-amplify/api";
import EventGameTable from "../../components/Table/EventGameTable";
import BetaSlideOut from "../../components/SlideOut/BetaSlideOut";

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
        pgn {
          bucket
          region
          key
        }
        pgnStr
        liChessUrl
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
          games {
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
            pgn {
              bucket
              region
              key
            }
            pgnStr
            liChessUrl
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
              active
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
          }
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
          entries {
            items {
              id
              eventId
              memberId
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
        }
        blackMember {
          id
          about
          fideId
          ecfId
          username
          name
          email
          games {
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
            pgn {
              bucket
              region
              key
            }
            pgnStr
            liChessUrl
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
              active
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
          }
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
          entries {
            items {
              id
              eventId
              memberId
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
        }
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
          active
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          results {
            items {
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
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          games {
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
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
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
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          entries {
            items {
              id
              eventId
              memberId
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
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
  const [slideState, setIsSlideOutOpen] = useState({
    open: false,
    eventDetails: {},
  });

  useEffect(() => {
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
      if(items) {
        setGames(items);
        setEventName(items[0].eventName)
        setIsLoadingGames(false);
      }
    };

    try {
        fetchGames(eventId);
    } catch (error) {
      console.log(error);
      setIsLoadingGames(false);
      setIsErrorGame(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

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
          {eventName && (
            <h1 className="text-sm text-left text-gray-500">
              Result for event{" "}
              <span className="text-orange-brand font-medium">{eventName}</span>
            </h1>
          )}
        </div>
      </div>

      <div className="">
        <div className="">
          <div className="">
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

            {(isLoadingGames) && (
              <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                <span className="animate-pulse">
                  <i className="aninmal-pulse fal fa-chess-board fa-10x text-teal-500 opacity-50"></i>
                </span>
                <p className="mt-2 block text-sm font-medium text-gray-600">
                  Loading games...
                </p>
              </div>
            )}

            {(isErrorGame) && (
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
