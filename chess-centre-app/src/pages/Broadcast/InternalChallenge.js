import React from "react";
import QR from "../../assets/img/QR-live-games.png";

export const HomeTeam = [
    {
        id: 1,
        name: "Edward Green",
        rating: 0,
    },
    {
        id: 2,
        name: "Rory Bruce (c)",
        rating: 0,
    },
    {
        id: 3,
        name: "Charlie Wainwright",
        rating: 0,
    },
    {
        id: 4,
        name: "Alex Rawse",
        rating: 0,
    },
    {
        id: 5,
        name: "Ella Bradford",
        rating: 0,
    },
    {
        id: 6,
        name: "Freya Bramall",
        rating: 0,
    },
    {
        id: 7,
        name: "Leo Logan",
        rating: 0,
    },
    {
        id: 8,
        name: "Theo Kennedy",
        rating: 0,
    },
    {
        id: 9,
        name: "Zakariyya Walker",
        rating: 0,
    },
];

export const AwayTeam = [
    {
        id: 1,
        name: "Youjia Bi",
        rating: 0,
    },
    {
        id: 2,
        name: "Sienna Xu",
        rating: 0,
    },
    {
        id: 3,
        name: "Aashita Roychowdhury",
        rating: 0,
    },
    {
        id: 4,
        name: "Chistopher Beatham",
        rating: 0,
    },
    {
        id: 5,
        name: "Dexter Dalgeish",
        rating: 0,
    },
    {
        id: 6,
        name: "Milo Green",
        rating: 0,
    },
    {
        id: 7,
        name: "Eva Connearn",
        rating: 0,
    },
    {
        id: 8,
        name: "Pranav Raja Srinivasan",
        rating: 0,
    },
    {
        id: 9,
        name: "Kavin Raja Srinivasan",
        rating: 0,
    },
];


const results = [
    {
        round: 1,
        pairResults: [[], [], [], [], [], [], [], [], [], [], [], [], []],
    },
    {
        round: 2,
        pairResults: [[], [], [], [], [], [], [], [], [], [], [], [], []],
    }
];

const players =
{
    homeTeam: HomeTeam,
    awayTeam: AwayTeam
};

const MatchTable = ({ results, round, whiteOnOdd, showRating = false }) => {
    const { homeTeam, awayTeam } = players;
    let homeScore = 0;
    let awayScore = 0;
    return (
        <div>
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto border-gray-300 dark:border-gray-700 border shadow">
                <thead className="bg-teal-500 dark:bg-gray-800">
                    <tr>
                        <th
                            scope="col"
                            className="px-2 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        ></th>
                        <th
                            scope="col"
                            className="flex-grow-0 w-80 px-2 sm:px-4 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Home
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        ></th>
                        <th
                            scope="col"
                            className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Vs
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        ></th>
                        <th
                            scope="col"
                            className="flex-grow-0 w-80 px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Away
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">

                    {homeTeam.map((p, key) => {
                        const [home, away] = results.find(
                            (r) => r.round === round
                        ).pairResults[key];
                        homeScore += home ? home : 0;
                        awayScore = + away ? away : 0;
                        const isEven = key % 2 === 0 ? true : false;
                        const homeColour = whiteOnOdd ? (isEven ? "W" : "B") : (isEven ? "B" : "W");
                        const awayColour = whiteOnOdd ? (isEven ? "B" : "W") : (isEven ? "W" : "B");
                        const hPlayer = p;
                        const aPlayer = awayTeam[key];
                        return (
                            <tr key={key} className="bg-white dark:bg-gray-800">
                                <td className="bg-gray-100 px-2 py-3 border-r text-xs">
                                    {key + 1}
                                </td>
                                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {hPlayer.name} <span className="font-thin">{showRating && (hPlayer.rating ? hPlayer.rating : "unrated")}</span>
                                </td>
                                <td className="bg-yellow-50 px-2 py-3 border-r border-l text-xs">
                                    {homeColour}
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300 border-l-2 border-r-2 border-gray-100 dark:border-gray-700">
                                    {home || away
                                        ? `${home === 0.5 ? "½" : home} - ${away === 0.5 ? "½" : away
                                        }`
                                        : "? - ?"}
                                </td>
                                <td className="bg-yellow-50 px-2 py-3 border-r border-l text-xs">
                                    {awayColour}
                                </td>
                                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {aPlayer.name} <span className="font-thin">{showRating && (aPlayer.rating ? aPlayer.rating : "unrated")}</span>
                                </td>
                            </tr>
                        );
                    })}
                    <tr className="bg-gray-100 dark:bg-gray-800">
                        <td className="">

                        </td>
                        <td className="">

                        </td>
                        <td className="">
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm bg-white text-gray-500 border-2 border-gray-200 ">
                            {`${homeScore} - ${awayScore}`}
                        </td>
                        <td className="">
                        </td>
                        <td className="">

                        </td>
                    </tr>
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
        <div className="text-center">
            <h2 className="mt-4 text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                <span className="bg-gradient-to-r text-gradient from-teal-600 to-teal-400">
                    The Chess Centre
                </span>
            </h2>
            <h3 className="text-1xl tracking-tight leading-10 font-extrabold text-orange-700">
                <span className="">Welcomes</span>
            </h3>
            <h3 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900">
                <span className="text-gray-900">Leeds Junior Chess Club</span>
            </h3>
            <div className="grid grid-rows-4 grid-flow-col gap-4 px-10 py-2 h-screen">
                <div className="col-span-1 row-span-3 bg-gray-100 rounded-lg shadow-xs p-4">
                    <div className="text-center">
                        <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-700">Game One</h2>
                        <MatchTable
                            results={results}
                            round={1}
                            whiteOnOdd={true}
                        />
                    </div>
                </div>
                <div className="col-span-1 row-span-3 bg-gray-100 rounded-lg shadow-xs p-4">
                    <div className="text-center">
                        <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-700">Game Two</h2>
                        <MatchTable
                            results={results}
                            round={2}
                            whiteOnOdd={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Internal;