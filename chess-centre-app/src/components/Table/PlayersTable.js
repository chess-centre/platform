import React from "react";
import { Link } from "react-router-dom";
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
                    },
                    {
                        Header: "Rapid",
                        accessor: "chesscomRapid",
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
                    },
                    {
                        Header: "Rapid",
                        accessor: "lichessRapid",
                    }
                ]
            }
        ],
        []
    );

    const data = players?.filter(m => !!m.ecfId) // <-- shouldn't be needed if AppSync could filter on null fields
        .sort((a, b) => b?.ecfRating - a?.ecfRating)
        .reduce((tableRows, member, index) => {
            const parsedChesscom = member.chesscomInfo ? JSON.parse(member.chesscomInfo) : "";
            const parsedLichess = member.liChessInfo ? JSON.parse(member.liChessInfo) : "";
            return [
                ...tableRows,
                // new row:
                {
                    rank: index += 1,
                    name: <Link className="text-teal-600" to={`/app/games/${member.id}`}>{member.name}</Link>,
                    standard: member.ecfRating === 0 ? "" : member.ecfRating,
                    rapid: member.ecfRapid === 0 ? "" : member.ecfRapid,
                    chesscomBullet: parsedChesscom?.chess_bullet?.last.rating,
                    chesscomBlitz: parsedChesscom?.chess_blitz?.last.rating,
                    chesscomRapid: parsedChesscom?.chess_rapid?.last.rating,
                    lichessBullet: parsedLichess?.perfs?.bullet?.rating,
                    lichessBlitz: parsedLichess?.perfs?.blitz?.rating,
                    lichessRapid: parsedLichess?.perfs?.rapid?.rating,
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
