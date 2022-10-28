import React, { useMemo } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Table from "./index";

export default function ResultsTable({ results }) {
  const tableData = results
    .map((r: any) => {
      return {
        ...r,
        date: r.event.startDate,
        entries: r.event.entryCount
      };
    })
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

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
        accessor: "name",
        Cell: (props) => (
          <Link
            className="text-teal-600 text-sm"
            to={`/app/results/${props.row.values.id}`}
          >
            {props.cell.value}
          </Link>
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
          <div className="text-sm text-gray-600">
            {moment(props.cell.value).format("Do MMM yy")}
          </div>
        ),
      },
      {
        Header: "Entries",
        accessor: "entries",
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
    <div className="bg-gray-50 text-gray-900">
      <main className="max-w-5xl">
        <div className="mt-6">
          {tableData && (
            <Table
              {...{ columns }}
              data={tableData}
              searchPlaceholder="events..."
            />
          )}
        </div>
      </main>
    </div>
  );
}
