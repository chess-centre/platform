import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Table from "./index";
import GameViewerModal from "../Modal/GameViewerModal";

export default function EventGameTable({ games, memberId }) {
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

  const columns = useMemo(
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
        Header: () => <div className="mx-auto">Game</div>,
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
        Header: "White",
        accessor: "white",
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
        Header: () => <div className="mx-auto">Rating</div>,
        accessor: "whiteRating",
        Cell: (props) => (
          <div className="text-center text-sm">{props.cell.value}</div>
        ),
      },
      {
        Header: () => <div className="mx-auto">Result</div>,
        accessor: "result",
        Cell: (props) => {
          const result = props.cell.value;
          if (result.includes("0.5")) {
            return <div className="text-center">½-½</div>;
          }
          return <div className="text-center">{result}</div>;
        },
      },
      {
        Header: () => <div className="mx-auto">Rating</div>,
        accessor: "blackRating",
        Cell: (props) => (
          <div className="text-center text-sm">{props.cell.value}</div>
        ),
      },
      {
        Header: "Black",
        accessor: "black",
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
        Header: "Round",
        accessor: "round",
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
          <span className="text-sm">
            {moment(props.cell.value).format("Do MMM YYYY")}
          </span>
        ),
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

  const data = useMemo(() => {
    if (games.length > 0) {
      return games
        .reduce((prev, game) => {
          const opponent =
          game.whiteMember.id === memberId
            ? game.blackMember
            : game.whiteMember;
          return [
            ...prev,
            {
              id: opponent.id,
              eventId: game.eventId,
              pgn: game.pgnStr,
              white: game.whiteMember.name,
              whiteRating: game.whiteRating,
              result: game.result,
              blackRating: game.blackRating,
              black: game.blackMember.name,
              date: new Date(game.date),
              type: game.type,
              round: game.round,
              liChessUrl: game.liChessUrl,
            },
          ];
        }, [])
        .sort((a, b) => {
          if(b.eventId === a.eventId) {
            return b.round - a.round
          }
          return b.date - a.date;
        });
    } else {
      return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl">
        <div className="mt-6">{data && <Table {...{ columns, data }} />}</div>
      </main>
      <GameViewerModal {...{ ...modalState, closeModal }} />
    </div>
  );
}
