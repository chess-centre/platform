import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Table from "./index";
import GameViewerModal from "../Modal/GameViewerModal";

export default function EventGameTable({ games, eventName }) {
  const [modalState, setModalState] = useState({
    pgn: "",
    open: false,
    fileName: ""
  });

  const closeModal = () => {
    setModalState(() => ({ pgn: "", open: false, fileName: "" }));
  };
  const showModal = (pgn: string, fileName:string) => {
    setModalState({
      pgn,
      open: true,
      fileName
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
        Header: "whiteMemberId",
        accessor: "whiteMemberId",
      },
      {
        Header: "blackMemberId",
        accessor: "blackMemberId",
      },
      {
        Header: () => <div className="mx-auto">Game</div>,
        accessor: "pgn",
        Cell: (props) => {
          if (props.cell.value) {
            const { black, white } = props.row.values;
            return (
              <ViewGameButton
                pgn={props.cell.value}
                fileName={`${eventName}-${white}-vs-${black}`}
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
        Cell: (props) => {
          if (props.row.values.whiteMemberId) {
            return (
              <Link
                className="text-teal-600"
                to={`/app/games/${props.row.values.whiteMemberId}`}
              >
                {props.cell.value}
              </Link>
            );
          } else {
            return <span>{props.cell.value}</span>;
          }
        },
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
        Cell: (props) => {
          if (props.row.values.blackMemberId) {
            return (
              <Link
                className="text-teal-600"
                to={`/app/games/${props.row.values.blackMemberId}`}
              >
                {props.cell.value}
              </Link>
            );
          } else {
            return <span>{props.cell.value}</span>;
          }
        },
      },
      {
        Header: "Round",
        accessor: "round",
        Cell: (props) => <div className="text-center">{props.cell.value}</div>,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const ViewGameButton = ({ pgn, fileName }) => {
    return (
      <div className="text-center">
        <button
          onClick={() => showModal(pgn, fileName)}
          type="button"
          className="inline-flex items-center px-2 py-1.5 border border-transparent rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
          return [
            ...prev,
            {
              id: game.id,
              eventId: game.eventId,
              pgn: game.pgnStr,
              whiteMemberId: game.whiteMemberId,
              white: game.whiteName,
              whiteRating: game.whiteRating,
              result: game.result,
              blackMemberId: game.blackMemberId,
              blackRating: game.blackRating,
              black: game.blackName,
              date: new Date(game.date),
              type: game.type,
              round: game.round,
              liChessUrl: game.liChessUrl,
            },
          ];
        }, [])
        .sort((a, b) => {
          if (b.eventId === a.eventId) {
            return b.round - a.round;
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
