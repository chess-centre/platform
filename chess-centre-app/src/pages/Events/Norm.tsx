import { useParams, useHistory } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import RoundTimes from "../../components/RoundTimes/Rounds";


const players = [
    {
        fed: "🇰🇷",
        name: "Jose Camacho-Collados",
        title: "IM",
        rating: 2400
    }, {
        fed: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        name: "Jonah Willow",
        title: "FM",
        rating: 2360
    }, {
        fed: "🇳🇱",
        name: "Yichen Han",
        title: "FM",
        rating: 2347
    }, {
        fed: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        name: "David Eggleston",
        title: "IM",
        rating: 2343
    }, {
        fed: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        name: "Paul Macklin",
        title: "FM",
        rating: 2341
    }, {
        fed: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        name: "William Claridge-Hansen",
        title: "FM",
        rating: 2340
    }, {
        fed: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        name: "Iain Gourlay",
        title: "FM",
        rating: 2318
    }, {
        fed: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        name: "Stephen Mannion",
        title: "IM",
        rating: 2271
    }, {
        fed: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        name: "Shreyas Royal",
        title: "FM",
        rating: 2243
    }, {
        fed: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        name: "Adam Ashton",
        title: "FM",
        rating: 2379
    },
]

export default function NormEvent() {
    const { id } = useParams();
    const history = useHistory();

    return (
        <div>
            <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
                <LandingNav />
            </div>

            <div className="py-10 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
                    <div className="text-base max-w-prose mx-auto lg:max-w-none">
                        <h2 className="text-base text-yellow-500 font-semibold tracking-wide uppercase">
                            <span className="text-yellow-400">
                                <i className="fas fa-chess-pawn"></i>
                            </span>{" "}
                            EJCOA Invitational
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            IM Norm Event
                        </p>
                        <p className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-500 sm:text-2xl">
                            Weds 23rd Feb - Sun 27th Feb
                        </p>
                    </div>

                    <div className="relative text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
                        <p className="text-left prose prose-yellow text-gray-500 mx-auto lg:max-w-none sm:text-justify">
                            The Chess Centre is delighted to host it's first International Master (IM) Norm event!
                        </p>
                        <p className="mt-6 text-left prose prose-yellow text-gray-500 mx-auto lg:max-w-none sm:text-justify">
                            Here are the players doing battle:
                        </p>
                        <div className="mt-6 text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            FED
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            NAME
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            TITLE
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            RATING
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {players.sort((a, b) => b.rating - a.rating).map((player) => (
                                        <tr className="hover:bg-yellow-50" key={player.name}>
                                            <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{player.fed}</td>
                                            <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{player.name}</td>
                                            <td className="px-2 py-3 whitespace-nowrap text-sm text-center">
                                                {player.title === "IM" && <span className="text-yellow-400">{player.title}</span>}
                                                {player.title === "FM" && <span className="text-orange-900">{player.title}</span>}
                                            </td>
                                            <td className="px-2 py-3 whitespace-nowrap text-sm text-yellow-400 text-center">{player.rating}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
                        <div className="relative">
                            <div className="prose prose-yellow text-gray-500 mx-auto lg:max-w-none text-justify">
                                <h3>Event Information</h3>
                                <ul>
                                    <li>9 Rounds</li>
                                    <li>
                                        60 mins plus 30 second increment per player on the clock
                                    </li>
                                </ul>
                                <h3>What is a Norm?</h3>
                                <div>
                                    <p>A norm is a high level of performance in a chess tournament achieved against other titled players.</p>
                                    <p>The level of performance is typically measured in tournament performance rating above a certain threshold (for instance, 2400 for IM).</p>
                                    <p>Several norms are among the requirements to receive a title such as Grandmaster (GM) or International Master (IM) from FIDE.</p>
                                </div>
                            </div>
                            <div className="prose prose-yellow text-gray-500 mx-auto lg:max-w-none text-justify">
                                <h3>Live Games</h3>
                                <p className="text-left prose prose-yellow text-gray-500 mx-auto lg:max-w-none sm:text-justify">
                                    We will be broadcasting the live games during the event across multiple platforms.
                                </p>
                                <ul>
                                    <li>Chess24</li>
                                    <li>ChessBomb</li>
                                </ul>
                            </div>
                            <div className="text-sm text-left mt-6 hidden sm:block">
                                <button
                                    className="text-yellow-500 hover:text-yellow-400"
                                    onClick={history.goBack}
                                >
                                    <i className="fad fa-long-arrow-alt-left"></i> back
                                </button>
                            </div>
                        </div>
                        <div className="mt-12 relative text-base max-w-prose mx-auto md:-mt-96 lg:max-w-none">
                            <svg
                                className="hidden sm:block absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
                                width={404}
                                height={384}
                                fill="none"
                                viewBox="0 0 404 384"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
                                        x={0}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect
                                            x={0}
                                            y={0}
                                            width={4}
                                            height={4}
                                            className="text-gray-200"
                                            fill="currentColor"
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width={404}
                                    height={384}
                                    fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)"
                                />
                            </svg>
                            <RoundTimes
                                eventId={id}
                                eventType="norm"
                                isFull={false}
                                isLive={false}
                            />
                            <div className="text-sm text-center mt-6 sm:hidden">
                                <button
                                    className="text-yellow-500 hover:text-yellow-400"
                                    onClick={history.goBack}
                                >
                                    <i className="fad fa-long-arrow-alt-left"></i> back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterLanding />
        </div>
    );
}
