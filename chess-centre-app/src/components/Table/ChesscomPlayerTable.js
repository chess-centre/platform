import React from "react";
import moment from "moment";
import Table from "./index";

export default function ChesscomPlayersTable({ players, colour }) {

  const DiffArrow = (diff) => {
    switch (diff) {
      case 1:
        return <i className="text-green-500 fas fa-caret-up mr-2"></i>;
      case -1:
        return <i className="text-red-700 fas fa-caret-down mr-2"></i>;
      case 0:
        return <i className="text-gray-200 far fa-caret-right mr-2"></i>;
      default:
        return <></>;
    }
  };

  const numberWithCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleOpenProfile = (url) => {
    window.open(url, "_blank").focus();
  };


  const columns = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
        show: false,
      },
      {
        Header: "bulletDiff",
        accessor: "bulletDiff",
        show: false,
      },
      {
        Header: "blitzDiff",
        accessor: "blitzDiff",
        show: false,
      },
      {
        Header: "rapidDiff",
        accessor: "rapidDiff",
        show: false,
      },
      {
        Header: "chesscomUrl",
        accessor: "chesscomUrl",
        show: false,
      },
      {
        Header: "#",
        accessor: "rank",
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: () => <div className="mx-auto">Games</div>,
        accessor: "total",
        Cell: (props) => (
          <div className="font-medium text-sm text-center">
            {numberWithCommas(props.cell.value)}
          </div>
        ),
      },
      {
        Header: "Bullet",
        accessor: "chesscomBullet",
        Cell: (props) => (
          <div className="text-sm text-gray-500">
            {props.cell.value && DiffArrow(props.row.values.bulletDiff)}
            {props.cell.value}
          </div>
        ),
      },
      {
        Header: "Blitz",
        accessor: "chesscomBlitz",
        Cell: (props) => (
          <div className="text-sm text-gray-500">
            {props.cell.value && DiffArrow(props.row.values.blitzDiff)}
            {props.cell.value}
          </div>
        ),
      },
      {
        Header: "Rapid",
        accessor: "chesscomRapid",
        Cell: (props) => (
          <div className="text-sm text-gray-500">
            {props.cell.value && DiffArrow(props.row.values.rapidDiff)}
            {props.cell.value}
          </div>
        ),
      },
      {
        Header: "Tactics",
        accessor: "tactics",
        Cell: (props) => (
          <div className="text-gray-500 text-sm text-center">{props.cell.value}</div>
        ),
      },
      {
        Header: "Handle",
        accessor: "handle",
        Cell: (props) => (
            <div
              onClick={() => handleOpenProfile(props.row.values.chesscomUrl)}
              className={`w-full text-center items-center px-2.5 py-1 border border-gray-200 
              shadow-sm text-xs rounded text-teal-600 bg-white hover:bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 cursor-pointer`}
            >
              @{props.cell.value}
            </div>
        )
      },
      {
        Header: "Last Updated",
        accessor: "lastUpdated",
        Cell: (props) => (
          <div
            className="text-sm text-gray-500"
          >
            {moment(props.cell.value).format("Do MMM @ HH:mm")}
          </div>
        ),
      }
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="md:max-w-5xl">
        <div className="mt-6">
          { players && <Table
            columns={columns}
            data={players}
            searchPlaceholder="players..."
            colour={colour}
          /> }
        </div>
      </main>
    </div>
  );
}
