import React from "react";
import moment from "moment";
import Table from "./index";

export default function ChesscomPlayersTable({ players, colour }) {

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
        accessor: "name"
      },
      {
        Header: "Handle",
        accessor: "handle"
      },
      {
        Header: "Blitz",
        accessor: "chesscomBlitz"
      },
      {
        Header: "Bullet",
        accessor: "chesscomBullet"
      },
      {
        Header: "Rapid",
        accessor: "chesscomRapid"
      },
      {
        Header: "Tactics",
        accessor: "tactics"
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
