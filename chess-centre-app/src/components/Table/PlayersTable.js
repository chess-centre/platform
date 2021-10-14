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
                Header: "ECF",
                columns: [{
                    Header: "Standard",
                    accessor: "standard",
                },
                {
                    Header: "Rapid",
                    accessor: "rapid",
                }]
            },
            {
                Header: "Chess.com",
                columns: [
                    {
                        Header: "Bullet",
                        accessor: "chesscomBullet",
                    },
                    {
                        Header: "Blitz",
                        accessor: "chesscomBlitz",
                    }
                ]
            },
            {
                Header: "Lichess",
                columns: [
                    {
                        Header: "Bullet",
                        accessor: "lichessBullet",
                    },
                    {
                        Header: "Blitz",
                        accessor: "lichessBlitz",
                    }
                ]
            }
        ],
        []
    );

    const data = players?.filter(m => m.ecfId != null) // <-- shouldn't be needed if AppSync could filter on null fields
        .sort((a, b) => b?.ecfRating - a?.ecfRating)
        .reduce((prev, member, index) => {
            const parsedChesscom = member.chesscomInfo ? JSON.parse(member.chesscomInfo) : "";
            const parsedLichess = member.liChessInfo ? JSON.parse(member.liChessInfo) : "";

            return [
                ...prev,
                {
                    rank: index += 1,
                    name: member.name,
                    standard: member.ecfRating === 0 ? null : member.ecfRating,
                    rapid: member.ecfRapid === 0 ? null : member.ecfRapid,
                    chesscomBullet: parsedChesscom?.chess_bullet?.last.rating,
                    chesscomBlitz: parsedChesscom?.chess_blitz?.last.rating,
                    lichessBullet: parsedLichess?.perfs?.bullet?.rating,
                    lichessBlitz: parsedLichess?.perfs?.blitz?.rating
                }
            ];
        }, []);
        
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
