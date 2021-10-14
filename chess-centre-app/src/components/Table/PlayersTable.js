import React from "react";
import Table from "./index"; // new

export default function PlayersTable({ players }) {

    const columns = React.useMemo(
        () => [
            {
                Header: "#",
                accessor: "rank"
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Standard",
                accessor: "standard",
            },
            {
                Header: "Rapid",
                accessor: "rapid",
            },
            {
                Header: "Chess.com",
                accessor: "chesscom",
            },
            {
                Header: "Lichess",
                accessor: "lichess",
            }
        ],
        []
    );

    const data = players?.filter(m => m.ecfId != null) // <-- shouldn't be needed if AppSync could filter on null fields
        .reduce((prev, member, index) => {
            const parsedChesscom = member.chesscomInfo ? JSON.parse(member.chesscomInfo) : "";
            const parsedLichess = member.liChessInfo ? JSON.parse(member.liChessInfo) : "";

            return [
                ...prev,
                {
                    rank: index += 1,
                    name: member.name,
                    standard: member.ecfRating,
                    rapid: member.ecfRapid,
                    chesscom: parsedChesscom?.chess_blitz?.last.rating,
                    lichess: parsedLichess?.perfs?.blitz?.rating
                }
            ];
        }, [])
        .sort((a, b) => b.standard - a.standard);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <main className="max-w-5xl">
                <div className="mt-6">
                    <Table columns={columns} data={data} searchPlaceholder="players..." />
                </div>
            </main>
        </div>
    );
}
