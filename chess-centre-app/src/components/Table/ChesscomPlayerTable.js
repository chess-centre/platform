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
        Header: "#",
        accessor: "rank",
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Handle",
        accessor: "handle"
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
