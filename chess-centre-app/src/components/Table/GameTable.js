import React from 'react'
import Table, { SelectColumnFilter } from './index'  // new

export default function GameTable({ games, memberId }) {

  const columns = React.useMemo(() => [
    {
      Header: "Opponent",
      accessor: 'name',
    },
    {
      Header: "Rating",
      accessor: 'rating',
    },
    {
      Header: "Result",
      accessor: 'result',
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

    const opponent = game.whiteMember.id === memberId ? game.whiteMember : game.blackMember;
    const rating = game.type === "standard" ? opponent.ecfRating : opponent.ecfRapid;

    return [...prev, {
      name: opponent.name,
      rating,
      result: game.result,
      event: game.eventName,
      date: game.date,
      type: game.type
    }]

  }, []);


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl">
        <div className="mt-6">
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}