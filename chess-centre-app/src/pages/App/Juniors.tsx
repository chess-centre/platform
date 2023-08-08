import React, { useEffect } from "react";
import QuickSearch from "../../components/FAQs/QuickSearch";

const usefulLinks = [
  {
    name: "ECF",
    description:
      "The English Chess Federation website for UK wide events and information.",
    url: "https://www.englishchess.org.uk/",
    displayUrl: "englishchess.org.uk",
  },
  {
    name: "FIDE",
    description: "The Internation Chess Federation, news, rating and events.",
    url: "https://www.fide.com/",
    displayUrl: "fide.com",
  },
  {
    name: "Chess.com",
    description:
      "A fantastic resource for playing, learning and training online.",
    url: "https://chess.com",
    displayUrl: "chess.com",
  },
  {
    name: "Chessable",
    description: "Great articles, video courses and more.",
    url: "https://www.chessable.com/blog/",
    displayUrl: "chessable.com",
  },
  {
    name: "Lichess",
    description:
      "Free Online playing site, regular tournaments and live streams.",
    url: "https://lichess.org/",
    displayUrl: "lichess.org",
  },
  {
    name: "Ginger GM",
    description:
      "A wonderful, entertaining and content rich chess site for learning and improving your game.",
    url: "https://gingergm.com/",
    displayUrl: "gingergm.com",
  },
];

function UsefulLinksTable() {
  return (
    <div className="inline-block min-w-lg">
      <div className="inline-block min-w-full">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="divide-y divide-gray-200">
            <thead className="bg-teal-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden sm:block px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                >
                  Visit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usefulLinks.map(
                ({ name, description, url, displayUrl }, key) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {name}
                    </td>
                    <td className="hidden sm:block px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a
                        className="text-teal-500 hover:text-teal-700 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                        href={url}
                      >
                        {displayUrl}
                      </a>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Juniors() {
  useEffect(() => {
    document.title = "The Chess Centre | Juniors";
  }, []);

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fad fa-joystick text-teal-600"></i> Juniors
        <div className="inline-flex align-top top-2">
          <span className="ml-2 items-center px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-teal-100 text-teal-700 top-2">
            Resources
          </span>
        </div>
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <p className="ml-2 mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
            Here is where we will provide some key resources and useful
            information to help with your childs progress.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <UsefulLinksTable />
      </div>
      <div className="mt-8 sm:mt-4 text-right sm:text-left">
        <QuickSearch tag="juniors" />
      </div>
    </>
  );
}
