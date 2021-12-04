import React, { useState } from "react";
import Table, { SelectColumnFilter } from "./index"; // new
import GameViewerModal from "../Modal/GameViewerModal";
import { prettyDate } from "../../utils/DateFormating";

export default function GameTable({ games, memberId }) {
  
  const [modalState, setModalState] = useState({
    pgn: "",
    open: false,
  });

  const closeModal = () => {
    setModalState(() => ({ pgn: "", open: false }));
  };
  const showModal = (pgn, liChessUrl) => {
    setModalState({
      liChessUrl,
      pgn,
      open: true,
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Game",
        accessor: "pgn",
      },
      {
        Header: "Opponent",
        accessor: "name",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Result",
        accessor: "result",
      },
      {
        Header: "Colour",
        accessor: "colour",
      },
      {
        Header: "Event",
        Filter: SelectColumnFilter,
        filter: "includes",
        accessor: "event",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  const resultType = (result, colour) => {
    if (colour === "white") {
      if (result === "1-0") {
        return "win";
      }
      if (result === "0-1") {
        return "loss";
      }
    }
    if (colour === "black") {
      if (result === "0-1") {
        return "win";
      }
      if (result === "1-0") {
        return "loss";
      }
    }
    return "draw";
  };

  const data = React.useMemo(() => {
    if (games.length > 0) {
      return games
        .reduce((prev, game) => {
          const opponent =
            game.whiteMember.id === memberId
              ? game.blackMember
              : game.whiteMember;
          const colour = game.whiteMember.id === memberId ? "white" : "black";
          const rating =
            game.type === "standard" ? opponent.ecfRating : opponent.ecfRapid;

          const ViewGameButton = ({ pgn, liChessUrl }) => {
            return (
              <div className="text-center">
                <button
                  onClick={() => showModal(pgn, liChessUrl)}
                  type="button"
                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <i className="fas fa-chess-queen"></i>
                </button>
              </div>
            );
          };

          return [
            ...prev,
            {
              pgn: game.pgnStr ? (
                <ViewGameButton
                  pgn={game.pgnStr}
                  liChessUrl={game.liChessUrl}
                />
              ) : (
                ""
              ),
              name: opponent.name,
              rating,
              result: resultType(game.result, colour),
              colour,
              event: game.eventName,
              date: prettyDate(game.date),
              type: game.type,
            },
          ];
        }, [])
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      return undefined;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl">
        <div className="mt-6">
          { data && <Table columns={columns} data={data} /> }
        </div>
      </main>
      <GameViewerModal {...modalState} closeModal={closeModal} />
    </div>
  );
}
