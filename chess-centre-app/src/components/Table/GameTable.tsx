import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import QuickSearch from "../FAQs/QuickSearch";
import Table from "./index";
import GameViewerModal from "../Modal/GameViewerModal";

export default function GameTable({ games, memberId }) {
  const [modalState, setModalState] = useState({
    pgn: "",
    open: false,
  });

  const closeModal = () => {
    setModalState(() => ({ pgn: "", open: false }));
  };
  const showModal = (pgn) => {
    setModalState({
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
        Header: "eventId",
        accessor: "eventId",
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
        Cell: (props) => {
          if (props.row.values.id) {
            return (
              <Link
                className="text-teal-600"
                to={`/app/games/${props.row.values.id}`}
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
        accessor: "rating",
        Cell: (props) => (
          <div className="text-center text-sm">{props.cell.value}</div>
        ),
      },
      {
        Header: () => <div className="mx-auto">Result</div>,
        accessor: "result",
        Cell: (props) => {
          switch (props.cell.value) {
            case "win":
              return (
                <div className="mx-auto bg-green-600 hover:bg-green-500 text-white text-sx text-center w-7 cursor-pointer rounded-sm">
                  W
                </div>
              );
            case "loss":
              return (
                <div className="mx-auto bg-red-700 hover:bg-red-600 text-white text-sx text-center w-7 cursor-pointer rounded-sm">
                  L
                </div>
              );
            case "draw":
              return (
                <div className="mx-auto bg-yellow-500 hover:bg-yellow-400 text-white text-sx text-center w-7 cursor-pointer rounded-sm">
                  D
                </div>
              );
            default:
              return (
                <div className="mx-auto bg-gray-50 hover:bg-gray-100 text-white text-sx text-center w-7 cursor-pointer rounded-sm"></div>
              );
          }
        },
      },
      {
        Header: () => <div className="mx-auto">Colour</div>,
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
        Header: () => <div className="mx-auto">Round</div>,
        accessor: "round",
        Cell: (props) => <div className="text-center">{props.cell.value}</div>,
      },
      {
        Header: "Event",
        accessor: "event",
        Cell: (props) => (
          <Link
            className="text-teal-600"
            to={`/app/games/event/${props.row.values.eventId}`}
          >
            {props.cell.value}
          </Link>
        ),
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

  const ViewGameButton = ({ pgn }) => {
    return (
      <div className="text-center">
        <button
          onClick={() => showModal(pgn)}
          type="button"
          className="inline-flex items-center px-2 py-1.5 border border-transparent rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <i className="fas fa-chess-king"></i>
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

  const data = useMemo(() => {
    if (games.length > 0) {
      return games
        .reduce((prev, game) => {
          let opponentName = "unknown";
          let opponentId = "";

          if(game.whiteMemberId === memberId) {
            opponentName = game.blackName;
            opponentId =  game.blackMemberId;
          }
          if(game.blackMemberId === memberId) {
            opponentName = game.whiteName;
            opponentId = game.whiteMemberId;
          }

          const colour = game.whiteMemberId === memberId ? "white" : "black";
          // flip to opponent rating:
          const rating =
            game.whiteMemberId === memberId
              ? game.blackRating
              : game.whiteRating;

          return [
            ...prev,
            {
              id: opponentId,
              pgn: game.pgnStr,
              eventId: game.eventId,
              name: opponentName,
              rating: rating === "0" ? undefined : rating,
              result: resultType(game.result, colour),
              colour,
              round: game.round,
              event: game.eventName,
              date: new Date(game.date),
              type: game.type,
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
    <div className=" bg-gray-50 text-gray-900">
      <main className="max-w-5xl">
        <div className="mt-6">{data && <Table {...{ columns, data }} />}</div>
        <div className="mt-4 sm:mt-4 text-right">
          <QuickSearch tag="games" />
        </div>
      </main>
      <GameViewerModal {...{ ...modalState, closeModal }} />
    </div>
  );
}
