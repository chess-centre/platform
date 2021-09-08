import React from 'react'
import Table, { SelectColumnFilter } from './index'  // new

export default function GameTable({ games }) {

  const columns = React.useMemo(() => [
    {
      Header: "White",
      accessor: 'white',
    },
    {
      Header: "Rating",
      accessor: 'wRating',
    },
    {
      Header: "Result",
      accessor: 'result',
    },
    {
      Header: "Black",
      accessor: 'black',
    },
    {
      Header: "Rating",
      accessor: 'bRating',
    },
    {
      Header: "Event",
      Filter: SelectColumnFilter,
      filter: 'includes',
      accessor: 'event',
    },
    {
      Header: "Date",
      accessor: 'date',
    }
  ], [])

  const data = games.reduce((prev, game) => {

    return [...prev, {
      white: game.whiteMember.name,
      wRating: game.whiteRating,
      result: game.result,
      black: game.blackMember.name,
      bRating: game.blackRating,
      date: game.date,
      event: game.eventName
    }]

  }, []);


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}