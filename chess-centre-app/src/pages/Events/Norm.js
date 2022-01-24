import API from "@aws-amplify/api";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import RoundTimes from "../../components/RoundTimes/Rounds";
import VenueInfo from "../../components/Facilities";
import { prettyLongDate } from "../../utils/DateFormating";
import GawainAkoBlitz from "../../assets/img/gawain-ako.jpg";

const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      name
      description
      rounds
      time
      startDate
      endDate
      maxEntries
      entryCount
      complete
      cancelled
      isLive
      active
      type {
        id
        name
        description
        url
        color
        time
        maxEntries
        timeControl
        eventType
        defaultPrice
        canRegister
      }
    }
  }
`;

export default function NormEvent() {
    const { id } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [defaultPrice, setDefaultPrice] = useState();
    const [entryCount, setEntryCount] = useState(0);
    const [isFull, setIsFull] = useState(false);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        
        document.title = "The Chess Centre | IM Norm Seekers";

        const fetchEvent = async () => {
            setIsLoading(true);
            const response = await API.graphql({
                query: getEvent,
                variables: { id },
                authMode: "AWS_IAM",
            }).catch((error) => {
                console.log("Error fetching event.", id);
                console.log(error.response);
            });
            if (response && response.data) {
                const {
                    data: {
                        getEvent: {
                            startDate,
                            endDate,
                            maxEntries,
                            isLive,
                        } = {},
                    } = {},
                } = response;

                setStartDate(startDate);
                setEndDate(endDate);
                setDefaultPrice(defaultPrice);
                setEntryCount(entryCount);
                setIsFull(entryCount >= maxEntries);
                setIsLive(isLive);
            }
            setIsLoading(false);
        };
        fetchEvent();
    }, [id, startDate, endDate, defaultPrice]);

    return (
        <div>
            <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
                <LandingNav />
            </div>

            <div className="py-10 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
                    <div className="text-base max-w-prose mx-auto lg:max-w-none">
                        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
                            <span className="text-teal-500">
                                <i className="fas fa-chess-pawn"></i>
                            </span>{" "}
                            EJCOA Invitational
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            International Master Event
                        </p>
                        <p className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-500 sm:text-2xl">
                            Weds 23rd Feb - Sun 27th Feb
                        </p>
                        {!isLoading && isLive && (
                            <div className="mt-3">
                                <a
                                    href="/broadcast/live"
                                    className={`inline-flex items-center px-16 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-700 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400`}
                                >
                                    <span className="flex relative h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full rounded-full bg-orange-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
                                    </span>{" "}
                                    <span className="ml-2">Watch Here</span>
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="relative text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
                        <p className="text-left prose prose-teal text-gray-500 mx-auto lg:max-w-none sm:text-justify">
                            The Chess Centre is delighted to host it's first International Master (IM) Norm event!
                        </p>
                        <p className="mt-6 text-left prose prose-teal text-gray-500 mx-auto lg:max-w-none sm:text-justify">
                            Here are the players doing battle:
                        </p>
                        <div className="mt-6 text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
                            <ol className="prose prose-teal text-gray-500">
                                <li>IM Jose Camacho-Collados (KOR, 2400)</li>
                                <li>FM Jonah Willow (ENG, 2360)</li>
                                <li>FM Yichen Han (NED, 2347)</li>
                                <li>IM David Eggleston (ENG, 2343)</li>
                                <li>FM Paul Macklin (ENG, 2341)</li>
                                <li>FM William Claridge-Hansen (ENG, 2340)</li>
                                <li>FM Iain Gourlay (SCO, 2318)</li>
                                <li>IM Stephen Mannion (SCO, 2271)</li>
                                <li>FM Shreyas Royal (ENG, 2243)</li>
                                <li>FM Adam Ashton (ENG, 2379)</li>
                            </ol>
                        </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
                        <div className="relative">
                            <div className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify">
                                <h3>Event Information</h3>
                                <ul>
                                    <li>9 Rounds</li>
                                    <li>
                                        60 mins plus 30 second increment per player on the clock
                                    </li>
                                </ul>
                            </div>
                            <div className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify">
                                <h3>Live Games</h3>
                                <p className="text-left prose prose-teal text-gray-500 mx-auto lg:max-w-none sm:text-justify">
                                    We will be broadcasting the live games during the event across multiple platforms.
                                </p>
                                <ul>
                                    <li>Chess24</li>
                                    <li>ChessBomb</li>
                                </ul>
                            </div>
                            <div className="text-sm text-left mt-6 hidden sm:block">
                                <button
                                    className="text-teal-600 hover:text-teal-500"
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
                                isFull={isFull}
                                isLive={isLive}
                            />
                            <div className="text-sm text-center mt-6 sm:hidden">
                                <button
                                    className="text-teal-600 hover:text-teal-500"
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
