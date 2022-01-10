import React, { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import ECFPlayerTable from "../../components/Table/ECFPlayerTable";
import LichessPlayerTable from "../../components/Table/LichessPlayerTable";
import ChesscomPlayerTable from "../../components/Table/ChesscomPlayerTable";
import BetaSlideOut from "../../components/SlideOut/BetaSlideOut";
import { classNames } from "../../utils/Classes";

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
        lichessLastUpdated
        chesscomUsername
        chesscomInfo
        chesscomLastUpdated
      }
    }
  }
`;

export default function Players() {
  const [tabs, setTabs] = useState([
    { 
      name: "ECF", 
      ref: "ecf", 
      colour: "bg-teal-700", 
      current: true 
    },
    {
      name: "Lichess",
      ref: "lichess",
      colour: "bg-purple-800",
      current: false,
    },
    {
      name: "Chess.com",
      ref: "chesscom",
      colour: "bg-yellow-600",
      current: false,
    },
  ]);
  const [selectedTab, setSelectedTab] = useState({
    ref: "ecf",
    colour: "bg-teal-700",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ecfPlayers, setECFPlayers] = useState([]);
  const [lichessPlayers, setLichessPlayers] = useState([]);
  const [chesscomPlayers, setChesscomPlayers] = useState([]);

  const [slideState, setIsSlideOutOpen] = useState({
    open: false,
    eventDetails: {},
  });

  const lichessPlayerData = (players) => {
    if (players && players.length > 0) {
      const filtered = players
        .filter((m) => !!m.liChessUsername)
        .reduce((players, member, index) => {
          const parsedLichess = member.liChessInfo
            ? JSON.parse(member.liChessInfo)
            : undefined;

          const diffCheck = (current, previous) => {
            if(current > previous) return 1;
            if(current < previous) return -1;
            return 0;
          };
          
          return [
            ...players,
            {
              id: member.id,
              rank: (index += 1),
              name: member.name,
              handle: member.liChessUsername,
              total: parsedLichess?.count?.all || 0,
              puzzleRating: parsedLichess?.perfs?.puzzle?.rating,
              bulletDiff: diffCheck(parsedLichess?.perfs?.bullet?.rating, parsedLichess?.perfs?.bullet?.prev),
              blitzDiff: diffCheck(parsedLichess?.perfs?.blitz?.rating, parsedLichess?.perfs?.blitz?.prev),
              rapidDiff: diffCheck(parsedLichess?.perfs?.rapid?.rating, parsedLichess?.perfs?.rapid?.prev),
              lichessBullet: parsedLichess?.perfs?.bullet?.rating,
              lichessBlitz: parsedLichess?.perfs?.blitz?.rating,
              lichessRapid: parsedLichess?.perfs?.rapid?.rating,
              lastUpdated: member.lichessLastUpdated,
            },
          ];
        }, [])
        .sort((a, b) => b.lichessBlitz - a.lichessBlitz)
        .map((player, i) => {
          player.rank = i + 1;
          return { ...player };
        });
      setLichessPlayers(filtered);
    }
  };

  const chesscomPlayerData = (players) => {
    if (players && players.length > 0) {
      const filtered = players
        .filter((m) => !!m.chesscomUsername)
        .reduce((players, member) => {
          const parsedChesscom = member.chesscomInfo
            ? JSON.parse(member.chesscomInfo)
            : undefined;

          return [
            ...players,
            {
              id: member.id,
              name: member.name,
              handle: member.chesscomUsername,
              tactics: parsedChesscom?.tactics?.highest?.rating,
              chesscomBlitz: parsedChesscom?.chess_blitz?.last?.rating,
              chesscomBullet: parsedChesscom?.chess_bullet?.last?.rating,
              chesscomRapid: parsedChesscom?.chess_rapid?.last?.rating,
              lastUpdated: member.chesscomLastUpdated,
            },
          ];
        }, [])
        .sort((a, b) => b.chesscomBlitz - a.chesscomBlitz)
        .map((player, i) => {
          player.rank = i + 1;
          return { ...player };
        });
      setChesscomPlayers(filtered);
    }
  };

  const ecfPlayerData = (players) => {
    if (players && players.length > 0) {
      const filtered = players
        .filter((m) => !!m.ecfId)
        .sort((a, b) => b?.ecfRating - a?.ecfRating)
        .reduce((players, member, index) => {
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

          const form = member.gameInfo
            ? JSON.parse(member.gameInfo)?.formStats
            : [];
          const formCount = form?.reduce((p, c) => p + c, 0) || 0;

          while (form.length < 6) {
            form.unshift("");
          }

          return [
            ...players,
            {
              id: member.id,
              formArray: form,
              rank: (index += 1),
              name: member.name,
              club: member.club,
              form: formCount,
              standard,
              rapid,
            },
          ];
        }, []);
      setECFPlayers(filtered);
    }
  };

  const handleSelectedTab = ({ ref, colour }) => {
    setTabs((state) => [
      ...state.map((s) => ({
        ...s,
        current: s.ref === ref,
      })),
    ]);
    setSelectedTab({ ref, colour });
  };

  const renderTable = ({ ref, colour }) => {
    switch (ref) {
      case "ecf":
        return <ECFPlayerTable players={ecfPlayers} {...{ colour }} />;
      case "lichess":
        return <LichessPlayerTable players={lichessPlayers} {...{ colour }} />;
      case "chesscom":
        return (
          <ChesscomPlayerTable players={chesscomPlayers} {...{ colour }} />
        );
      default:
        return <ECFPlayerTable players={ecfPlayers} {...{ colour }} />;
    }
  };

  useEffect(() => {
    document.title = "The Chess Centre | Players";

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
      ecfPlayerData(playersList);
      lichessPlayerData(playersList);
      chesscomPlayerData(playersList);
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
  }, [selectedTab]);

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

      <div className="grid grid-cols-1">
        <div className="mt-4 mb-2">
          <RatingTypeTabs {...{ tabs, handleSelectedTab }} />
        </div>

        {!isLoading && !isError && <div>{renderTable(selectedTab)}</div>}

        {isLoading && (
          <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
            <span className="animate-pulse">
              <i className="aninmal-pulse fal fa-chess-clock fa-10x text-gray-400 opacity-50"></i>
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
              Oops, there seems to be an issue loading player ratings. Try again
              later.
            </p>
          </div>
        )}
      </div>

      <BetaSlideOut
        slideState={slideState}
        setIsSlideOutOpen={setIsSlideOutOpen}
      ></BetaSlideOut>
    </div>
  );
}

function RatingTypeTabs({ handleSelectedTab, tabs }) {
  return (
    <nav
      className="relative z-0 rounded-lg shadow sm:max-w-sm flex divide-x divide-gray-200"
      aria-label="Tabs"
    >
      {tabs.map((tab, tabIdx) => (
        <div
          key={tab.name}
          onClick={() => handleSelectedTab(tab)}
          className={classNames(
            tab.current ? "text-gray-900" : "text-gray-500 hover:text-gray-700",
            tabIdx === 0 ? "rounded-l-lg" : "",
            tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
            "group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 cursor-pointer"
          )}
          aria-current={tab.current ? "page" : undefined}
        >
          <span>{tab.name}</span>
          <span
            aria-hidden="true"
            className={classNames(
              tab.current ? tab.colour : "bg-transparent",
              "absolute inset-x-0 bottom-0 h-0.5"
            )}
          />
        </div>
      ))}
    </nav>
  );
}
