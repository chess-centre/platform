import API from "@aws-amplify/api";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import RoundTimes from "../../components/RoundTimes/Rounds";
import TravelInformation from "../../components/Travel/Information";
import VenueInfo from "../../components/Facilities";
import { prettyDate } from "../../utils/DateFormating";

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

function CongressEvent() {
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
    document.title = "Sheffield Chess Centre | Congress";

    try {
      const fetchEvent = async () => {
        setIsLoading(true);
        const response = await API.graphql({
          query: getEvent,
          variables: { id },
          authMode: "AWS_IAM",
        }).catch((error) => {
          console.log("Error fetching event.", id);
          console.log(error);
        });
        if (response && response.data) {
          const {
            data: {
              getEvent: {
                startDate,
                endDate,
                entryCount,
                isLive,
                type: { defaultPrice, maxEntries } = {},
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
    } catch (error) {
      console.log("Error", error);
      setIsLoading(false);
    }
  }, [id, startDate, defaultPrice]);

  return (
    <div>
      <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav current="events" />
      </div>

      <div className="py-10 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="text-base max-w-prose mx-auto lg:max-w-none">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
              <i className="fad fa-rocket-launch"></i> Take it to the next
              level?
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Open Congress
            </p>
            <p className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-500 sm:text-2xl">
              {!isLoading && startDate && prettyDate(startDate, endDate)}
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
            <p className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify">
              Sheffield Chess Centre’s “Mini-Congresses” have been tailored
              specifically for our venue to provide a sophisticated and
              digitally supported congress tournament experience for our members
              and guests. Backed by our leading digital platform, competitors
              can register, track and review their participation in our Congress
              events online.
            </p>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="relative">
              <div className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify">
                <p>
                  When competitors visit our Chess Centre for the first time to
                  play in a Congress events, we hope that they are impressed by
                  the attention to detail that has been taken in providing
                  comfortable and modern facilities for this format of Chess.
                </p>
                <p>
                  Designed to accommodate modern working and social patterns,
                  our “Mini-Congresses” take place over a two day weekend, with
                  5 standard play rounds being played from Saturday morning to
                  Sunday afternoon. Though the games are quicker than many
                  congress tournaments, they are still within the parameters of
                  ECF standard play events and thus are fully rated.
                </p>
                <p>
                  The “all-play-all” format of players competing in rated groups
                  of 6 also ensures that players know they will receive a
                  competitive and challenging test of their skills across all
                  rounds of the competitions. There’s no where to hide in our
                  “Mini-Congresses”.
                </p>
                <h3>Event Information</h3>
                <p>
                  Players will be placed in a group of 6, based on rating, and
                  will play all others within their group during the 5 rounds of
                  the tournament.
                </p>
                <ul>
                  <li>5 Rounds</li>
                  <li>60 mins per player on the clock</li>
                  <li>All games will be ECF standard play rated.</li>
                  {defaultPrice && <li>Entry fee £{defaultPrice}</li>}
                  <li>Entries are currently limited to 18 players.</li>
                </ul>
              </div>
              {!isLoading && entryCount && entryCount > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <i className="fal fa-info-circle text-yellow-400 fa-2x"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700 sm:mt-2">
                        There are currently {entryCount}{" "}
                        {entryCount === 1 ? "entry" : "entries"}.
                        <br className="block sm:hidden" />
                        <Link
                          to={`/app/events/${id}`}
                          className="font-medium underline text-yellow-700 hover:text-yellow-600 sm:ml-2"
                        >
                          Login to see the full list
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <VenueInfo />

              <div className="text-sm text-left mt-6 hidden sm:block">
                <Link
                  className="text-teal-600 hover:text-teal-500"
                  to="/events"
                >
                  <i className="fad fa-long-arrow-alt-left"></i> back
                </Link>
              </div>
            </div>
            <div className="mt-12 relative text-base max-w-prose mx-auto md:mt-0 lg:max-w-none">
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
                eventType="congress"
                isFull={isFull}
                isLive={isLive}
              />
              <div className="mt-8">
                <TravelInformation eventType="congress" eventId={id} />
              </div>
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

export default CongressEvent;
