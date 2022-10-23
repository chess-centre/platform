import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Table from "./index";

export default function ResultsTable({ results }) {

  console.log(results)

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
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "View",
        accessor: "view",
        Cell: (props) => (
          <Link
            className="text-teal-600"
            to={`/app/results/${props.row.values.id}`}
          >
            view
          </Link>
        ),
      },
    ],
    []
  );

//   const data = useMemo(() => {
//     return results.result
// }, [results])


  return (
    <div className=" bg-gray-50 text-gray-900">
      <main className="max-w-5xl">
        <div className="mt-6">{results && <Table {...{ columns }} data={results} searchPlaceholder="events..." />}</div>
      </main>
    </div>
  );
}
