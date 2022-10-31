import React, { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { useAuthState } from "../../context/Auth";
import ECFPlayerTable from "../../components/Table/ECFPlayerTable";
import LichessPlayerTable from "../../components/Table/LichessPlayerTable";
import ChesscomPlayerTable from "../../components/Table/ChesscomPlayerTable";
import { classNames } from "../../utils/Classes";

const listMembers = /* GraphQL */ `
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
  const { user }: { user: any } = useAuthState();
  const [state, setState] = useState<any>({
    isLoading: false,
    isError: false,
    ecfPlayers: [],
    lichessPlayers: [],
    lichessStatuses: [],
    chesscomPlayers: [],
    tabs: [
      {
        name: "ECF",
        ref: "ecf",
        colour: "bg-teal-700",
        current: true,
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
        colour: "bg-yellow-700",
        current: false,
      },
    ],
    selectedTab: {
      ref: "ecf",
      colour: "bg-teal-700",
    },
  });

  const diffCheck = (current, previous) => {
    if (current > previous) return 1;
    if (current < previous) return -1;
    return 0;
  };

  const calculateTotalGames = (obj) => {
    const sum = (g) => (g ? g.win + g.loss + g.draw : 0);
    const bulletGames = obj.chess_bullet?.record || 0;
    const blitzGames = obj.chess_blitz?.record || 0;
    const rapidGames = obj.chess_rapid?.record || 0;
    return sum(bulletGames) + sum(blitzGames) + sum(rapidGames);
  };

  const lichessPlayerData = (players, lichessStatuses) => {
    if (players && players.length > 0) {
      const filtered = players
        .filter((m: any) => !!m.liChessUsername)
        .reduce((players, member, index) => {
          const parsedLichess = member.liChessInfo
            ? JSON.parse(member.liChessInfo)
            : undefined;

          const isOnline = lichessStatuses.find(
            (s: any) => s.id === member.liChessUsername.toLowerCase()
          );

          return [
            ...players,
            {
              id: member.id,
              rank: (index += 1),
              isOnline: isOnline?.online,
              name: member.name,
              handle: member.liChessUsername,
              total: parsedLichess?.count?.all || 0,
              puzzleRating: parsedLichess?.perfs?.puzzle?.rating,
              bulletDiff: diffCheck(
                parsedLichess?.perfs?.bullet?.rating,
                parsedLichess?.perfs?.bullet?.prev
              ),
              blitzDiff: diffCheck(
                parsedLichess?.perfs?.blitz?.rating,
                parsedLichess?.perfs?.blitz?.prev
              ),
              rapidDiff: diffCheck(
                parsedLichess?.perfs?.rapid?.rating,
                parsedLichess?.perfs?.rapid?.prev
              ),
              lichessBullet: parsedLichess?.perfs?.bullet?.rating,
              lichessBlitz: parsedLichess?.perfs?.blitz?.rating,
              lichessRapid: parsedLichess?.perfs?.rapid?.rating,
              lastUpdated: member.lichessLastUpdated,
            },
          ];
        }, [])
        .sort((a: any, b: any) => b.lichessBlitz - a.lichessBlitz)
        .map((player: any, i: number) => {
          player.rank = i + 1;
          return { ...player };
        });
      setState((state) => ({
        ...state,
        lichessPlayers: [...filtered],
        lichessStatuses,
      }));
    }
  };

  const chesscomPlayerData = (players: any) => {
    if (players && players.length > 0) {
      const filtered = players
        .filter((m: any) => !!m.chesscomUsername)
        .reduce((players: any, member: any) => {
          const parsedChesscom = member.chesscomInfo
            ? JSON.parse(member.chesscomInfo)
            : undefined;

          const totalGames = calculateTotalGames(parsedChesscom);

          return [
            ...players,
            {
              id: member.id,
              name: member.name,
              handle: member.chesscomUsername,
              chesscomUrl: parsedChesscom?.url,
              tactics: parsedChesscom?.tactics?.highest?.rating,
              total: totalGames,
              bulletDiff: diffCheck(
                parsedChesscom?.chess_bullet?.last?.rating,
                parsedChesscom?.chess_bullet?.last?.prev
              ),
              blitzDiff: diffCheck(
                parsedChesscom?.chess_blitz?.last?.rating,
                parsedChesscom?.chess_blitz?.last?.prev
              ),
              rapidDiff: diffCheck(
                parsedChesscom?.chess_rapid?.last?.rating,
                parsedChesscom?.chess_rapid?.last?.prev
              ),
              chesscomBlitz: parsedChesscom?.chess_blitz?.last?.rating,
              chesscomBullet: parsedChesscom?.chess_bullet?.last?.rating,
              chesscomRapid: parsedChesscom?.chess_rapid?.last?.rating,
              lastUpdated: member.chesscomLastUpdated,
            },
          ];
        }, [])
        .sort((a: any, b: any) => b.chesscomBlitz - a.chesscomBlitz)
        .map((player, i) => {
          player.rank = i + 1;
          return { ...player };
        });
      setState((state:any) => ({ ...state, chesscomPlayers: [...filtered] }));
    }
  };

  const ratingChange = (data, type) => {
    try {
      const sorted = JSON.parse(data).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      if (sorted && sorted.length > 1) {
        return Number(sorted[0][type] - sorted[1][type]);
      } else {
        return 0;
      }
    } catch (error) {
      return 0;
    }
  }

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
          const standardChange = ratingChange(member.ratingInfo, "standard");
          const rapid = member.ecfRapid
            ? member.ecfRapid === "0"
              ? undefined
              : member.ecfRapid
            : undefined;
          const rapidChange = ratingChange(member.ratingInfo, "rapid");

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
              standardChange,
              rapid,
              rapidChange
            },
          ];
        }, []);
      setState((state: any) => ({ ...state, ecfPlayers: [...filtered] }));
    }
  };

  const handleSelectedTab = ({ ref, colour }) => {
    setState((state) => ({
      ...state,
      selectedTab: { ref, colour },
      tabs: [
        ...state.tabs.map((tab) => ({
          ...tab,
          current: tab.ref === ref,
        })),
      ],
    }));
  };

  const renderTable = ({ ref, colour }) => {
    switch (ref) {
      case "ecf":
        return (
          <ECFPlayerTable
            players={state.ecfPlayers}
            {...{ colour }}
          />
        );
      case "lichess":
        return (
          <LichessPlayerTable
            userId={user?.attributes?.sub}
            players={state.lichessPlayers}
            statuses={state.lichessStatuses}
            {...{ colour }}
          />
        );
      case "chesscom":
        return (
          <ChesscomPlayerTable
            players={state.chesscomPlayers}
            {...{ colour }}
          />
        );
      default:
        return (
          <ECFPlayerTable
            players={state.ecfPlayers}
            {...{ colour }}
          />
        );
    }
  };

  useEffect(() => {
    document.title = "The Chess Centre | Players";

    const fetchRatedPlayers = async () => {
      setState((state) => ({ ...state, isLoading: true, isError: false }));
      const {
        data: {
          listMembers: { items: playersList },
        },
      }: any = await API.graphql({
        query: listMembers,
        // TODO: this filter isn't supported from some reason:
        variables: { limit: 500, filter: { ecfId: { ne: null } } },
        authMode: "AWS_IAM",
      });

      if (state.selectedTab.ref === "ecf") {
        ecfPlayerData(playersList);
      }

      if (state.selectedTab.ref === "chesscom") {
        chesscomPlayerData(playersList);
      }

      if (state.selectedTab.ref === "lichess") {
        const fetchStatuses = async () => await API.get("lichess", "/statuses", {});
        const lichessStatuses = await fetchStatuses();
        lichessPlayerData(playersList, lichessStatuses);
      }
      setState((state) => ({ ...state, isLoading: false, isError: false }));
    };

    try {
      fetchRatedPlayers();
    } catch (error) {
      console.log("Error", error);
      setState((state: any) => ({ ...state, isLoading: false, isError: true }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedTab]);

  return (
    <div className="overscroll-none">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-chess-king text-teal-600"></i> Players
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
          <RatingTypeTabs {...{ tabs: state.tabs, handleSelectedTab }} />
        </div>

        {!state.isLoading && !state.isError && (
          <div>{renderTable(state.selectedTab)}</div>
        )}

        {state.isLoading && (
          <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
            <span className="animate-pulse">
              <i className="aninmal-pulse fal fa-chess-clock fa-10x text-gray-400 opacity-50"></i>
            </span>
            <p className="mt-2 block text-sm font-medium text-gray-600">
              Loading players...
            </p>
          </div>
        )}

        {state.isError && (
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
