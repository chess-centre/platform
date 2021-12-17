import React from "react";
import { Link } from "react-router-dom";
import Table from "./index"; // new

export default function PlayersTable({ players }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
        show: false,
      },
      {
        Header: "#",
        accessor: "rank",
      },
      {
        Header: "Name",
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
        Header: "ECF",
        disableSortBy: true,
        columns: [
          {
            Header: "Standard",
            accessor: "standard",
          },
          {
            Header: "Rapid",
            accessor: "rapid",
          },
        ],
      },
      {
        Header: "Chess.com",
        disableSortBy: true,
        columns: [
          {
            Header: "Bullet",
            accessor: "chesscomBullet",
          },
          {
            Header: "Blitz",
            accessor: "chesscomBlitz",
          },
          {
            Header: "Rapid",
            accessor: "chesscomRapid",
          },
        ],
      },
      {
        Header: "Lichess",
        disableSortBy: true,
        columns: [
          {
            Header: "Bullet",
            accessor: "lichessBullet",
          },
          {
            Header: "Blitz",
            accessor: "lichessBlitz",
          },
          {
            Header: "Rapid",
            accessor: "lichessRapid",
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl">
        <div className="mt-6">
          <Table
            columns={columns}
            data={players}
            searchPlaceholder="players..."
          />
        </div>
      </main>
    </div>
  );
}
