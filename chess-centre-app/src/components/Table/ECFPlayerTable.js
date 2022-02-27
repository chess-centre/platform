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
        Header: "formArray",
        accessor: "formArray",
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
        Header: "Form",
        accessor: "form",
        Cell: (props) => {
          return (
            <div className="flex gap-1">
              {" "}
              {props.row.values.formArray.map((r, key) => {
                switch (r) {
                  case 1:
                    return (
                      <div
                        key={key}
                        className="shadow-lg bg-green-600 hover:bg-green-500 text-white text-sx text-center min-w-5 cursor-pointer rounded-sm"
                      >
                        W
                      </div>
                    );
                  case 0:
                    return (
                      <div
                        key={key}
                        className="shadow-lg bg-red-600 hover:bg-red-500 text-white text-sx text-center min-w-5 cursor-pointer rounded-sm"
                      >
                        L
                      </div>
                    );
                  case 0.5:
                    return (
                      <div
                        key={key}
                        className="shadow-lg bg-yellow-600 hover:bg-yellow-500 text-white text-sx text-center min-w-5 cursor-pointer rounded-sm"
                      >
                        D
                      </div>
                    );
                  default:
                    return (
                      <div
                        key={key}
                        className="shadow-lg bg-gray-400 text-gray-200 text-sx text-center min-w-5 rounded-sm cursor-default"
                      >
                        -
                      </div>
                    );
                }
              })}{" "}
              <span className="sr-only">form</span>
            </div>
          );
        },
      },
      {
        Header: () => <div>Standard</div>,
        accessor: "standard",
        Cell: (props) => (
          <div className="text-gray-700 font-semibold text-sm ml-5">
            {props.cell.value}
          </div>
        ),
      },
      {
        Header: () => <div>Rapid</div>,
        accessor: "rapid",
        Cell: (props) => (
          <div className="text-gray-700 font-semibold text-sm ml-5">
            {props.cell.value}
          </div>
        ),
      },
      {
        Header: "Club",
        accessor: "club",
      }
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
