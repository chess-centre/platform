import React from "react";
import { Link } from "react-router-dom";
import BobBurnsTrophy from "../../assets/img/bob-burns-trophy.jpg";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

const previousWinners = [
  {
    year: 1985,
    winner: "A Kawalec",
  },
  {
    year: 1986,
    winner: "D Fletcher",
  },
  {
    year: 1987,
    winner: "A Kawalec",
  },
  {
    year: 1988,
    winner: "S Scott",
  },
  {
    year: 1989,
    winner: "S Scott",
  },
  {
    year: 1990,
    winner: "S Barrett",
  },
  {
    year: 1991,
    winner: "S Barrett",
  },
  {
    year: 1992,
    winner: "S Barrett",
  },
  {
    year: 1993,
    winner: "S Scott",
  },
  {
    year: 1994,
    winner: "P Gayson",
  },
  {
    year: 1999,
    winner: "R Van Kemanade",
  },
  {
    year: 2000,
    winner: "M Clarke",
  },
  {
    year: 2001,
    winner: "C Wright",
  },
  {
    year: 2002,
    winner: "C Wright",
  },
  {
    year: 2003,
    winner: "M Walker",
  },
  {
    year: 2004,
    winner: "M Walker",
  },
  {
    year: 2006,
    winner: "M Walker",
  },
  {
    year: 2009,
    winner: "P Shaw",
  },
  {
    year: 2010,
    winner: "P Shaw",
  },
  {
    year: 2011,
    winner: "A Lang",
  },
  {
    year: 2012,
    winner: "P Watson, S Scurfield, A Lang",
  },
  {
    year: 2013,
    winner: "P Watson",
  },
  {
    year: 2014,
    winner: "P Watson",
  },
  {
    year: 2015,
    winner: "W Williams",
  },
  {
    year: 2016,
    winner: "M Walker",
  },
  {
    year: 2017,
    winner: "M Crowther, M Walker",
  },
  {
    year: 2018,
    winner: "P Rooney",
  },
  {
    year: 2019,
    winner: "M Walker",
  },
];

const entries = [
  {
    name: "Matthew D Webb",
    rating: "2553**",
  },
  {
    name: "Peter Shaw",
    rating: "2188",
  },
  {
    name: "David Barlow",
    rating: "2005",
  },
  {
    name: "Gawain Ako",
    rating: "1942",
  },
  {
    name: "Gary Corcoran",
    rating: "1875",
  },
  {
    name: "John Holliday",
    rating: "1713",
  },
  {
    name: "Steve Harrington",
    rating: "1621",
  },
];

const EntriesTable = ({ data }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
          >
            Seed
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Rating
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ name, rating }, seedIdx) => (
          <tr
            key={seedIdx}
            className={seedIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
              {seedIdx + 1}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
              {name}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {rating}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const PreviousWinnersTable = ({ data }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
          >
            Year
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Winner
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ winner, year }, winnerIdx) => (
          <tr
            key={winnerIdx}
            className={winnerIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
              {year}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {winner}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function BobBurns() {
  return (
    <div>
      <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>

      <div className="bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
          <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div>
              <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
                A BDCA Event
              </h2>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Bob Burns 2021
              </h3>
            </div>
          </div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <svg
                className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="de316486-4a29-4312-bdfc-fbce2132a2c1"
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
                  fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                />
              </svg>
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <figure>
                  <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                    <img
                      className="rounded-lg shadow-lg object-cover object-center"
                      src={BobBurnsTrophy}
                      alt="Bob Burns Trophy"
                      width={400}
                      height={800}
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <p className="text-lg text-gray-500 text-justify">
                  The{" "}
                  <a
                    className="text-teal-500 hover:text-teal-700 font-medium"
                    href="https://www.bradfordchess.co.uk/"
                  >
                    BDCA
                  </a>{" "}
                  has kindly allowed us to host this years annual{" "}
                  <span className="font-medium">Bob Burns</span> summer
                  tournament which will take place in our dedicated Chess Centre
                  in Ilkely.
                </p>
              </div>
              <div className="prose prose-teal text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1 grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <h3>Details</h3>
                  <div className="ml-4">
                    <p>
                      <span className="text-teal-500">
                        <i className="fad fa-flag mr-2"></i>
                      </span>
                      5 Rounds
                    </p>
                    <p>
                      <span className="text-teal-500">
                        <i className="fad fa-chess-clock mr-2"></i>
                      </span>
                      90 minutes per player
                    </p>
                    <p>
                      <span className="text-teal-500">
                        <i className="fad fa-clock mr-2"></i>
                      </span>
                      7:00pm start time
                    </p>
                    <p>
                      <span className="text-teal-500">
                        <i className="fad fa-map-marker-alt mr-2"></i>
                      </span>
                      8, Crescent Court, Ilkely, LS29 8DE
                    </p>
                    <p>
                      <span className="text-teal-500">
                        <i className="fad fa-money-bill mr-2"></i>
                      </span>
                      £5 entry fee*
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 italic mt-4 ml-2">
                    * The BDCA have subsidised this event to provide you with
                    50% off from the initial £10 entry fee.
                  </div>
                </div>
                <div>
                  <h3>Dates</h3>
                  <div className="ml-4">
                    <p>
                      <span className="text-teal-500 font-medium">
                        Round 1.
                      </span>{" "}
                      Tues, 29th June
                    </p>
                    <p>
                      <span className="text-teal-500 font-medium">
                        Round 2.
                      </span>{" "}
                      Tues, 6th July
                    </p>
                    <p>
                      <span className="text-teal-500 font-medium">
                        Round 3.
                      </span>{" "}
                      Tues, 20th July
                    </p>
                    <p>
                      <span className="text-teal-500 font-medium">
                        Round 4.
                      </span>{" "}
                      Tues, 3rd August
                    </p>
                    <p>
                      <span className="text-teal-500 font-medium">
                        Round 5.
                      </span>{" "}
                      Tues, 17th August
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-4">
                  <a
                    href="mailto:info@chesscentre.online?subject=BDCA | Bob Burns Entry Request&body=Name:%0D%0A%0D%0AECF rating (if known):%0D%0A%0D%0A"
                    className={`w-full flex items-center justify-center px-8 py-3 
                    border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-700 no-underline
                     
                     `}
                  >
                    Enter now
                  </a>
                </div>
              <div className="prose prose-teal text-gray-500 mx-auto">
                <h3>Current entries</h3>
                <EntriesTable data={entries} />
                <span className="text-xs italic">
                  ** Estimated rating based on previous ECF grade conversion
                </span>
              </div>
              <div className="mt-6 prose prose-teal text-gray-500">
                <h3>Previous winners</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-4">
                <div className="mb-5 sm:mb-0 gap-4 mr-2">
                  <PreviousWinnersTable
                    data={previousWinners.slice(0, previousWinners.length / 2)}
                  />
                </div>
                <div className="gap-4 mr-2">
                  <PreviousWinnersTable
                    data={previousWinners.slice(
                      previousWinners.length / 2,
                      previousWinners.length
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="text-sm text-center mt-6 sm:hidden">
              <Link className="text-teal-600 hover:text-teal-500" to="/">
                <i className="fad fa-long-arrow-alt-left"></i> back
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}
