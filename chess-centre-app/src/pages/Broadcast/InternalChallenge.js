import React from "react";
import QR from "../../assets/img/QR-live-games.png";

export const HomeTeam = [
    {
        id: 1,
        name: "Peter Shaw",
        rating: 2172,
    },
    {
        id: 2,
        name: "Chris Wright",
        rating: 1968,
    },
    {
        id: 3,
        name: "Gary Corcoran",
        rating: 1875,
    },
    {
        id: 4,
        name: "Kevin Winter",
        rating: 1773,
    },
    {
        id: 5,
        name: "Max Shaw",
        rating: 1796,
    },
    {
        id: 6,
        name: "Jacob Smith",
        rating: 1761,
    },
    {
        id: 7,
        name: "Nigel Redmond",
        rating: 1638,
    },
    {
        id: 8,
        name: "Harry Shaw",
        rating: undefined,
    },
    {
        id: 9,
        name: "Callum Greig",
        rating: undefined,
    },
    {
        id: 10,
        name: "Aidan Lee-Wardell",
        rating: undefined,
    },
];

export const AwayTeam = [
    {
        id: 1,
        name: "Dave Patrick",
        rating: 1900,
    },
    {
        id: 2,
        name: "Dave Keddie",
        rating: 1953,
    },
    {
        id: 3,
        name: "Robert Clegg",
        rating: 1870,
    },
    {
        id: 4,
        name: "Steve Westmoreland",
        rating: 1842,
    },
    {
        id: 5,
        name: "Dave College",
        rating: 1779,
    },
    {
        id: 6,
        name: "Dave Booth",
        rating: 1690,
    },
    {
        id: 7,
        name: "Amelia Fretwell",
        rating: undefined,
    },
    {
        id: 8,
        name: "Sean Keddie",
        rating: 1308,
    },
    {
        id: 9,
        name: "Graham White",
        rating: 1308,
    },
    {
        id: 10,
        name: "Patrick Clayton",
        rating: undefined,
    },
];


const results = [
    {
        round: 1,
        pairResults: [[], [], [], [], [], [], [], [], [], [], [], [], []],
    }
];

const players =
{
    homeTeam: HomeTeam,
    awayTeam: AwayTeam
};

const MatchTable = ({results}) => {
    const { homeTeam, awayTeam } = players;
    return (
        <div>
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto border-gray-300 dark:border-gray-700 border shadow">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Home
            </th>
                        <th
                            scope="col"
                            className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Vs
            </th>
                        <th
                            scope="col"
                            className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Away
            </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">

                    {homeTeam.map((p, key) => {
                        const [home, away] = results.find(
                            (r) => r.round === 1
                        ).pairResults[key];
                        const isEven = key % 2 === 0 ? true : false;
                        const hPlayer = p;
                        const aPlayer = awayTeam[key];
                        return (
                            <tr key={key} className="bg-white dark:bg-gray-800">
                                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                  <span className="font-light">{isEven ? "White " : "Black "} </span> {hPlayer.name} <span className="font-thin">({hPlayer.rating ? hPlayer.rating : "unrated"})</span>
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300 border-l-2 border-r-2 border-gray-100 dark:border-gray-700">
                                    {home || away
                                        ? `${home === 0.5 ? "½" : home} - ${away === 0.5 ? "½" : away
                                        }`
                                        : "? - ?"}
                                </td>
                                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {aPlayer.name} <span className="font-thin">({aPlayer.rating ? aPlayer.rating : "unrated"})</span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

/* 
 * This view pulls in three key components:
    1) the local iframe for internal DGT boards
    2) the current table / standings for the event
    3) relevant QR code for smartphones to pull up the games on their phone
*/
const Internal = (props) => {
    const { url } = props;

    return (
        <div className="grid grid-rows-4 grid-flow-col gap-4 px-10 py-10 h-screen">
            <div className="row-span-4 col-span-4 bg-gray-100 rounded-lg shadow-xs overflow-hidden">
                <div>
                    <div className="aspect-w-16 aspect-h-11">
                        <iframe
                            title="Live Games"
                            frameBorder="0"
                            allowFullScreen
                            src={url ? url : "http://192.168.1.248:1982/liveviewer/index.html"}
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-1 row-span-3 bg-gray-100 rounded-lg shadow-xs p-4">
                <div className="text-center">
                    <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                        <span className="bg-gradient-to-r text-gradient from-teal-600 to-teal-400">The Chess Centre</span>
                    </h2>
                    <h2>Welcomes</h2>
                    <h1 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900">Huddersfield & Holmfirth</h1>
                    <MatchTable
                        results={results}
                    />
                </div>
            </div>
            <div className="flex row-span-1 col-span-1 bg-gray-100 rounded-lg shadow-xs overflow-hidden p-2">
                <img
                    className="object-center w-40 mx-auto self-center"
                    src={QR}
                    alt="QR Code"
                />
            </div>
        </div>
    );
};

export default Internal;