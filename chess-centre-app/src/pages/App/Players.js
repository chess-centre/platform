import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "@aws-amplify/api";
import PlayersTable from "../../components/Table/PlayersTable";
import BetaSlideOut from "../../components/SlideOut/BetaSlideOut";

export const listMembers = /* GraphQL */ `
  query ListMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        about
        fideId
        ecfId
        username
        name
        ecfRating
        ecfRapid
        ecfMembership
        estimatedRating
        club
        gameInfo
        ratingInfo
        liChessUsername
        liChessInfo
        chesscomUsername
        chesscomInfo
      }
    }
  }
`;

export default function Players() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [players, setPlayers] = useState([]);
  const [slideState, setIsSlideOutOpen] = useState({
    open: false,
    eventDetails: {},
  });

  const santitizePlayerData = (players) => {
    if (players && players.length > 0) {
      const filtered = players
        .filter((m) => !!m.ecfId)
        .sort((a, b) => b?.ecfRating - a?.ecfRating)
        .reduce((players, member, index) => {
          const parsedChesscom = member.chesscomInfo
            ? JSON.parse(member.chesscomInfo)
            : undefined;
          const parsedLichess = member.liChessInfo
            ? JSON.parse(member.liChessInfo)
            : undefined;
          const standard = member.ecfRating
            ? member.ecfRating === "0"
              ? undefined
              : member.ecfRating
            : undefined;
          const rapid = member.ecfRapid
            ? member.ecfRapid === "0"
              ? undefined
              : member.ecfRapid
            : undefined;
          return [
            ...players,
            {
              id: member.id,
              rank: (index += 1),
              name: member.name,
              standard,
              rapid,
              chesscomBullet: parsedChesscom?.chess_bullet?.last?.rating,
              chesscomBlitz: parsedChesscom?.chess_blitz?.last?.rating,
              chesscomRapid: parsedChesscom?.chess_rapid?.last?.rating,
              lichessBullet: parsedLichess?.perfs?.bullet?.rating,
              lichessBlitz: parsedLichess?.perfs?.blitz?.rating,
              lichessRapid: parsedLichess?.perfs?.rapid?.rating
            },
          ];
        }, []);
      setPlayers(filtered);
    }
  };

  useMemo(() => {
    const fetchRatedPlayers = async () => {
      setIsLoading(true);
      const {
        data: {
          listMembers: { items: playersList },
        },
      } = await API.graphql({
        query: listMembers,
        // TODO: this filter isn't supported from some reason:
        variables: { limit: 500, filter: { ecfId: { ne: null } } },
        authMode: "AWS_IAM",
      });
      santitizePlayerData(playersList);
      setIsLoading(false);
      setIsError(false);
    };

    try {
      fetchRatedPlayers();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overscroll-none">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-chess-king text-teal-600"></i> Players
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
          <p className="text-sm text-left text-gray-500 dark:text-gray-300 mb-2">
            Players who have registered an account with us.
          </p>
        </div>
      </div>

      <div className="">
        <div className="">
          <div className="">
            {!isLoading && !isError && (
              <div>
                {players ? (
                  <div className="">
                    <PlayersTable players={players} />
                  </div>
                ) : (
                  <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                    <span>
                      <i className="fal fa-chess fa-6x text-teal-500"></i>
                    </span>
                    <p className="mt-2 block text-sm font-medium text-gray-600">
                      No Rated Players.
                    </p>
                    <p className="mt-2 block text-sm font-medium text-gray-600">
                      Checkout out some of our fantastic{" "}
                      <Link
                        className="text-teal-500 font-medium hover:underline"
                        to="/app/events"
                      >
                        events
                      </Link>{" "}
                      to get your own rating.
                    </p>
                  </div>
                )}
              </div>
            )}

            {isLoading && (
              <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                <span className="animate-pulse">
                  <i className="aninmal-pulse fal fa-chess-clock fa-10x text-teal-500 opacity-50"></i>
                </span>
                <p className="mt-2 block text-sm font-medium text-gray-600">
                  Loading players...
                </p>
              </div>
            )}

            {isError && (
              <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                <span>
                  <i className="aninmal-pulse fal fa-exclamation-square fa-10x text-orange-400 opacity-50"></i>
                </span>
                <p className="mt-2 block text-sm font-medium text-gray-600">
                  Oops, there seems to be an issue loading player ratings. Try
                  again later.
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
