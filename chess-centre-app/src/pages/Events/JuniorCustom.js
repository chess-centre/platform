import API from "@aws-amplify/api";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { ExclamationIcon } from "@heroicons/react/solid";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import RoundTimes from "../../components/RoundTimes/Rounds";
import { prettyLongDate } from "../../utils/DateFormating";
import IlkleyGrammar from "../../assets/img/ilkley-grammar.jpg";

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

export default function JuniorCustomEvent() {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [defaultPrice, setDefaultPrice] = useState();
  const [entryCount, setEntryCount] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    document.title = "The Chess Centre | IGS Junior Event";

    const fetchEvent = async () => {
      setIsLoading(true);
      try {
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
                entryCount,
                isLive,
                type: { defaultPrice, maxEntries } = {},
              } = {},
            } = {},
          } = response;
          setStartDate(startDate);
          setDefaultPrice(defaultPrice);
          setEntryCount(entryCount);
          setIsFull(entryCount >= maxEntries);
          setIsLive(isLive);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error", error);
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [id, startDate, defaultPrice]);

  return (
    <div>
      <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>

      <div className="py-10 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="text-base max-w-prose mx-auto lg:max-w-none">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
              <i className="fad fa-bolt"></i> Let's go!
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              IGS Junior Event
            </p>
            <p className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-500 sm:text-2xl">
              {!isLoading && startDate && prettyLongDate(startDate)}
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
            <p className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify py-2">
              The Chess Centre brings to you our{" "}
              <span className="font-semibold">1st Junior Rapidplay</span> held
              at the Ilkley Grammar School.
            </p>
            <p className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify py-2">
              This event is open to all juniors under the age of 18 as at 1st
              September 2021.
            </p>
            <div className="prose prose-teal text-teal-600 mx-auto lg:max-w-none text-justify">
              <h3>Sections</h3>
              <ul>
                <li>Open</li>
                <li>
                  Major{" "}
                  <span className="text-xs text-gray-500">
                    (1450 ECF and below)
                  </span>
                </li>
                <li>
                  Intermediate{" "}
                  <span className="text-xs text-gray-500">
                    (1200 ECF and below)
                  </span>
                </li>
                <li>
                  Minor{" "}
                  <span className="text-xs text-gray-500">
                    (1000 ECF and below)
                  </span>
                </li>
              </ul>
              <p className="italic text-gray-500 text-xs">
                Players with fewer than 15 competitive games may enter any
                section, irrespective of rating.
              </p>
            </div>
          </div>
          {!isLoading && Boolean(entryCount) && (
            <div className="relative mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
              <div className="rounded-md bg-green-50 p-4 my-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      There are currently {entryCount}{" "}
                      {entryCount === 1 ? "entry" : "entries"}.
                      <br className="block sm:hidden" />
                      <Link
                        to={`/app/events?show_info=${id}`}
                        className="font-medium underline text-green-700 hover:text-green-600 sm:ml-2"
                      >
                        Login to see the full list
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="relative">
              <div className="prose text-gray-500 mx-auto lg:max-w-none text-justify">
                <h3>Event Information</h3>
                <p>
                  <i className="text-teal-600 fas fa-sitemap w-8"></i> 6 Rounds
                </p>
                <p>
                  <i className="text-teal-600 fas fa-chess-clock w-8"></i> 25
                  mins per player on the clock
                </p>
                <p>
                  <i className="text-teal-600 fas fa-badge-check w-8"></i> All
                  games will be ECF rapidplay rated
                </p>
                <p>
                  <i className="text-teal-600 fas fa-trophy w-8"></i> Trophies
                  in all sections for{" "}
                  <span className="font-semibold">top 3</span> finishers
                </p>
                <p>
                  <i className="text-teal-600 fas fa-medal w-8"></i> Age
                  category medals per section
                </p>
                <p>
                  <i className="text-teal-600 fas fa-pound-sign w-8"></i> Entry
                  fee £{defaultPrice}
                </p>
              </div>

              <div className="rounded-md bg-yellow-50 p-4 my-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationIcon
                      className="h-5 w-5 text-yellow-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      ECF Membership Required
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        All entries <span className="underline">must</span> have
                        an ECF membership. New members can create a FREE Junior
                        silver membership{" "}
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`https://www.englishchess.org.uk/ecf-membership-rates-and-joining-details/`}
                          className="font-medium underline text-yellow-700 hover:text-yellow-600"
                        >click here</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify my-4">
                <p className="italic text-xs">
                  Entries will close on the evening of{" "}
                  <span className="font-semibold">Thursday 19th May</span>
                </p>
                <h3>Address</h3>
                <p>Ilkley Grammar School, Armitage Hall, LS29 8TH</p>
                <p className="text-xs italic text-gray-500 -mt-10">
                  Entrance via Springs Lane
                </p>
                <div className="max-h-96">
                  <img
                    className="object-cover shadow-lg rounded-lg"
                    src={IlkleyGrammar}
                    alt="Ilkley Grammar School"
                  />
                </div>
              </div>
              <div className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify">
                <h4>Parental notes</h4>
                <p>
                  The organisers are only responsible for juniors in the playing
                  hall. We strongly recommend juniors are supervised when they
                  are not playing.
                </p>
                <p>
                  <i className="fas fa-camera-retro text-2xl text-teal-700"></i>{" "}
                  It is a condition of entry that photographs may be taken and
                  used for publicity. If you do not wish photographs of your
                  child to be used you must tell us on the day. Photos may
                  appear on our Chess Centre website or associated social media
                  pages (Facebook, Instagram, etc).
                </p>
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
            <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
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
                eventType="junior"
                isFull={isFull}
                isLive={isLive}
                showSections={true}
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
