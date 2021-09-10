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
        eventName
        date
        whiteMemberId
        whiteRating
        blackMemberId
        blackRating
        round
        result
        pgnStr
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
  const { isLoading, error, data } = useMember();
  const [games, setGames] = useState([]);
  const [validPgn, setValidPgn] = useState("");

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


  const handleGameViewClick = (pgn) => {
    if(pgn) {
      setValidPgn(pgn.replace(/["']/g, '"'))
    }
  }

  return (
    <div>
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
            We're activily working towards publishing all your PGNs{" "}
            <span className="ml-2 items-center px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800 top-2">
              Coming Soon
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white sm:mt-6 mx-auto rounded-lg shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-6 mt-4 sm:mt-10 py-2 px-2 gap-3">
          <div className="col-span-4">
            {!isLoading && !error && (
              <>
              <div className="text-center sm:text-left text-base mt-5 sm:text-md text-gray-500">
                <GamesTable games={games} handleGameViewClick={handleGameViewClick} />
              </div>
              </>
            )}
          </div>
          <div className="col-span-2">
            <div className="m-auto">
            {!isLoading && !error && (
              <>
              <div className="text-center -ml-1 sm:text-left text-base mt-5 sm:text-md text-gray-500">
                  { validPgn && <PGNViewer layout={"top"}>{ validPgn }</PGNViewer> }
              </div>
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const GamesTable = ({ games, handleGameViewClick }) => {
  return (
    <div className="shadow-md rounded-lg overflow-auto">
      <table className="w-full divide-y divide-gray-200 table-auto border-gray-300 border rounded-lg">
        <thead className="bg-teal-700 dark:bg-gray-800 rounded-lg">
          <tr>
            <th
              scope="col"
              className="px-2 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            ></th>
            <th
              scope="col"
              className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            >
              White
            </th>
            <th
              scope="col"
              className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            >
              Rating
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            >
              Result
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            >
              Black
            </th>
            <th
              scope="col"
              className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            >
              Rating
            </th>
            <th
              scope="col"
              className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            >
              Event
            </th>
            <th
              scope="col"
              className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            >
              Game
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {games.map((game, key) => {
            return (
              <tr
                key={key}
                className="bg-white whitespace-nowrap text-sm hover:bg-yellow-50"
              >
                <td className="bg-gray-100 px-2 py-3 border-r text-center">
                  {key + 1}
                </td>
                <td onClick={() => handleGameViewClick(game.pgnStr)} className="flex-none px-2 pl-4 py-2 border-r text-gray-700">
                  {game.whiteMember.name}
                </td>
                <td className="flex-none px-2 pl-4 py-2 border-r text-gray-700">
                  {game.whiteRating}
                </td>
                <td className="px-2 py-4 border-r text-center text-gray-500 ">
                  {game.result}
                </td>
                <td className="flex-none border-r px-2 pl-4 py-2 text-gray-700">
                  {game.blackMember.name}
                </td>
                <td className="flex-none border-r px-2 pl-4 py-2 text-gray-700">
                  {game.blackRating}
                </td>
                <td className="flex-none border-r px-2 pl-4 py-2 text-gray-700">
                  {game.date}
                </td>
                <td className="flex-none border-r px-2 pl-4 py-2 text-gray-700">
                  {game.eventName}
                </td>
                <td className="flex-none border-r px-2 pl-4 py-2 text-gray-700">
                  {game.pgnStr ? (
                    <button
                      type="button"
                      onClick={() => handleGameViewClick(game.pgnStr)}
                      className={`text-teal-600 bg-gray-50 -ml-px relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300
 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
                    >
                      <i className="fas fa-game-board mr-2"></i> View
                    </button>
                  ) : "No PGN"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
