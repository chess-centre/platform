import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Table from "./index";

export default function ResultsTable({ results }) {

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "eventID",
        accessor: "eventID",
      },
      {
        Header: "Event Name",
        accessor: "name"
      },
      {
        Header: "Result Details",
        accessor: "view",
        Cell: (props) => (
          <Link
            className="text-teal-600 text-center sm:text-left"
            to={`/app/results/${props.row.values.id}`}
          >
            view
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <div className=" bg-gray-50 text-gray-900">
      <main className="max-w-5xl">
        <div className="mt-6">{results && <Table {...{ columns }} data={results} searchPlaceholder="events..." />}</div>
      </main>
    </div>
  );
}
