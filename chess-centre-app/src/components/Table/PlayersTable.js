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
        id: "ecf",
        Header: () => (<div className="mx-auto">ECF</div>),
        disableSortBy: true,
        columns: [
          {
            Header: "Standard",
            accessor: "standard",
          },
          {
            Header: "Rapid",
            accessor: "rapid"
          },
        ],
      },
      {
        id: "chess.com",
        Header: () => (<div className="mx-auto">chess.com</div>),
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
        id: "lichess",
        Header: () => (<div className="mx-auto">lichess</div>),
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
