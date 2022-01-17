import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useEffect, Fragment } from "react";
import FestivalMap from "../../components/Map/FestivalMap";
import EntriesTable from "../../components/EntriesTable/table";
import { rounds } from "../../api/data.roundTimes";
import FestivalHero from "../../assets/img/festival_hero.jpg";

const festival = {
  name: "Ilkley Chess Festival",
  version: {
    name: "1.0",
    date: "September 16th - 18th, 2022",
    datetime: "2022-09-16",
  },
  price: "$220",
  description: "",
  prizes: [
    "1st Place £300.00",
    "2nd Place £150.00",
    "3rd Place £90.00",
    "Grading Prize £50.00",
  ],
  imageSrc: "",
  imageAlt: "",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Festival() {
  const event = rounds.find(({ type }) => type === "festival");

  useEffect(() => {
    document.title = "The Chess Centre | Festival";
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:row-end-1 lg:col-span-4">
            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
              <img
                src={FestivalHero}
                alt="hero"
                className="object-center object-cover"
              />
            </div>
          </div>

          <div className="max-w-2xl text-center sm:text-left mx-auto mt-4 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-3xl font-extrabold tracking-tight  text-teal-brand sm:text-5xl">
                  <span className="text-orange-brand">Ilkley</span> Chess
                  Festival
                </h1>
                <p className="text-md text-blue-brand mt-2">
                  <time dateTime={festival.version.datetime}>
                    {festival.version.date}
                  </time>
                </p>
              </div>
            </div>

            <p className="text-gray-500 mt-6">{festival.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4">
              <Link
                to="/register/festival"
                className="w-full bg-blue-brand border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500"
              >
                Enter Now
              </Link>
            </div>

            <div className="border-t border-gray-200 mt-10 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Prizes</h3>
              <div className="mt-4 sm:mx-0">
                <Prizes />
              </div>
            </div>

            <div className="border-t border-gray-200 mt-10 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Location</h3>
              <p className="mt-4 text-sm text-gray-500">
                King’s Hall & Winter Garden
              </p>
              <p className="mt-2 text-sm text-gray-500">Station Road</p>
              <p className="mt-2 mb-10 text-sm text-gray-500">
                Ilkley, LS29 8HB
              </p>
              <FestivalMap />
            </div>

            <div className="hidden sm:block border-t border-gray-200 mt-10 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Share</h3>
              <ul className="flex items-center space-x-6 mt-4">
                <li>
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchesscentre.online%2Ffestival%2F&amp;src=sdkpreparse"
                    className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Facebook</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fchesscentre.online%2Ffestival&text=Checkout%20the%20Ilkley%20Chess%20Festival%2C%2016th-18th%20Sept"
                    className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Twitter</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
            <Tab.Group as="div">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-teal-600 text-teal-600"
                          : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                        "whitespace-nowrap py-6 border-b-2 font-medium text-sm"
                      )
                    }
                  >
                    Details
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-teal-600 text-teal-600"
                          : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                        "whitespace-nowrap py-6 border-b-2 font-medium text-sm"
                      )
                    }
                  >
                    Schedule
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-teal-600 text-teal-600"
                          : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                        "whitespace-nowrap py-6 border-b-2 font-medium text-sm"
                      )
                    }
                  >
                    Entries
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-teal-600 text-teal-600"
                          : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                        "whitespace-nowrap py-6 border-b-2 font-medium text-sm"
                      )
                    }
                  >
                    FAQs
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="-mb-10 py-5">
                  <div className="relative">
                    <div className="prose prose-blue text-gray-500 mx-auto lg:max-w-none text-justify">
                      <p>There will be four sections for our main event.</p>
                      <ul>
                        <li>5 Rounds</li>
                        <li>60 mins per player on the clock</li>
                        <li>All games will be ECF standard play rated.</li>
                        <li>Entry fee £30</li>
                      </ul>
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel as="dl" className="text-sm text-gray-500 py-5">
                  <Schedule event={event} />
                </Tab.Panel>

                <Tab.Panel as="dl" className="text-sm text-gray-500">
                  Entries
                  {/* <EntriesTable eventId="23424" eventType="standard" /> */}
                </Tab.Panel>

                <Tab.Panel className="pt-10">FAQs</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          <div className="block sm:hidden border-t border-gray-200 mt-10 pt-4">
            <h3 className="text-sm font-medium text-gray-900">Share</h3>
            <ul className="flex items-center space-x-6 mt-4">
              <li>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchesscentre.online%2Ffestival%2F&amp;src=sdkpreparse"
                  className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Share on Facebook</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fchesscentre.online%2Ffestival&text=Checkout%20the%20Ilkley%20Chess%20Festival%2C%2016th-18th%20Sept"
                  className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Share on Twitter</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const Schedule = ({ event }) => {
  return (
    <table className="mx-auto sm:mx-2 min-w-full divide-y divide-gray-200">
      <tbody className="bg-white divide-y divide-gray-200">
        {event &&
          event.rounds.map(({ round, time, day }, key) => {
            return (
              <Fragment key={key}>
                <tr key={key}>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Round {round}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {day}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {time}
                  </td>
                </tr>
                {event.break && event.break.afterRound === round && (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-2 text-center whitespace-nowrap text-xs font-medium text-gray-400"
                    >
                      Lunch Break
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        {event && event.prizeGiving && (
          <tr>
            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Prize Ceremony
            </td>
            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {event.prizeGiving.day}
            </td>
            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span className="">{event.prizeGiving.time}</span>
              <i className="ml-4 -mt-2 text-teal-600 fas fa-trophy-alt fa-2x"></i>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const Prizes = () => {
  return (
    <table className="mx-auto sm:mx-2 min-w-full divide-y divide-gray-200">
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            1st Prize
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            £300.00
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <i className="fas fa-trophy-alt text-yellow-400 text-lg"></i>
          </td>
        </tr>
        <tr>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            2nd Prize
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            £150.00
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <i className="fas fa-trophy-alt text-gray-400 text-lg"></i>
          </td>
        </tr>
        <tr>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            3rd Prize
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            £75.00
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <i className="fas fa-trophy-alt text-yellow-800 text-lg"></i>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
