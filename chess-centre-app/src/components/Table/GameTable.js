import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Table, { SelectColumnFilter } from "./index"; // new
import GameViewerModal from "../Modal/GameViewerModal";

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
        Header: "id",
        accessor: "id",
      },
      {
        Header: "liChessUrl",
        accessor: "liChessUrl",
      },
      {
        Header: () => (<div className="mx-auto">Game</div>),
        accessor: "pgn",
        Cell: (props) => {
          if (props.cell.value) {
            return (
              <ViewGameButton
                pgn={props.cell.value}
                liChessUrl={props.row.values.liChessUrl}
              />
            );
          } else {
            return "";
          }
        },
      },
      {
        Header: "Opponent",
        accessor: "name",
        Cell: (props) => (
          <Link
            className="text-teal-600"
            to={`/app/games/${props.row.values.id}`}
          >
            {props.cell.value}
          </Link>
        ),
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Result",
        accessor: "result",
        Cell: (props) => {
          switch (props.cell.value) {
            case "win":
              return (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  win
                </span>
              );
            case "loss":
              return (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                  loss
                </span>
              );
            case "draw":
              return (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                  draw
                </span>
              );
            default:
              return (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  {props.cell.value}
                </span>
              );
          }
        },
      },
      {
        Header: () => (<div className="mx-auto">Colour</div>),
        accessor: "colour",
        Cell: (props) => {
          if (props.cell.value === "white") {
            return (
              <div className="text-center">
                <i className="far fa-chess-pawn"></i>
              </div>
            );
          } else {
            return (
              <div className="text-center">
                <i className="fas fa-chess-pawn"></i>
              </div>
            );
          }
        },
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
        Cell: (props) => (
          <span className="text-sm">{ moment(props.cell.value).format("Do MMM YYYY") }</span>
        )
      },
    ],
    []
  );

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

          return [
            ...prev,
            {
              id: opponent.id,
              pgn: game.pgnStr,
              name: opponent.name,
              rating: rating === "0" ? undefined : rating,
              result: resultType(game.result, colour),
              colour,
              event: game.eventName,
              date: new Date(game.date),
              type: game.type,
              liChessUrl: game.liChessUrl
            },
          ];
        }, [])
        .sort((a, b) => b.date - a.date);
    } else {
      return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl">
        <div className="mt-6">
          {data && <Table columns={columns} data={data} />}
        </div>
      </main>
      <GameViewerModal {...modalState} closeModal={closeModal} />
    </div>
  );
}
