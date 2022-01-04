import React from "react";
import { Link } from "react-router-dom";
import Table from "./index";

export default function ECFPlayersTable({ players, colour }) {
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
        Header: "Club",
        accessor: "club"
      },
      {
        Header: () => (<div className="mx-auto">Standard</div>),
        accessor: "standard",
        Cell: (props) => (
          <div className="text-center text-gray-700 text-sm">
            {props.cell.value}
          </div>
        ),
      },
      {
        Header: () => (<div className="mx-auto">Rapid</div>),
        accessor: "rapid",
        Cell: (props) => (
          <div className="text-center text-gray-700 text-sm">
            {props.cell.value}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="md:max-w-5xl">
        <div className="mt-6">
          {players && (
            <Table
              columns={columns}
              data={players}
              searchPlaceholder="players..."
              colour={colour}
            />
          )}
        </div>
      </main>
    </div>
  );
}
