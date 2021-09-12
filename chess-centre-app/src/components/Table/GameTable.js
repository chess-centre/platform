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
      Header: "Colour",
      accessor: 'colour',
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
  ], []);

  const resultType = (result, colour) => {
    if(colour === "white") {
      if(result === "1-0") {
        return "win";
      }
      if(result === "0-1") {
        return "loss";
      }
    }
    if(colour === "black") {
      if(result === "0-1") {
        return "win";
      }
      if(result === "1-0") {
        return "loss";
      }
    }
    return "draw";
  }

  const data = games.reduce((prev, game) => {

    const opponent = game.whiteMember.id === memberId ? game.blackMember : game.whiteMember;
    const colour = game.whiteMember.id === memberId ? "white" : "black";
    const rating = game.type === "standard" ? opponent.ecfRating : opponent.ecfRapid;

    return [...prev, {
      name: opponent.name,
      rating,
      result: resultType(game.result),
      colour,
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