import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { borderColor600 } from "tailwind-dynamic-classes";
import JuniorRapidPlay from "../../assets/img/junior-rapidplay.jpg";
import OpenRapidPlay from "../../assets/img/dave-barlow-vs-gary-corcoran.jpg";
import OpenCongress from "../../assets/img/june-congress-round-4.jpg";
import QuickSearch from "../FAQs/QuickSearch";
import { prettyDate } from "../../utils/DateFormating";
import { classNames } from "../../utils/Classes";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + " ..." : str;
}

function EntriesTable(data) {
  const { user, eventDetails } = data;
  const sub = user.attributes.sub;
  const isRapid = eventDetails?.name?.includes("Rapidplay");
  const isBlitz = eventDetails?.name?.includes("Blitz");

  const tableData = () => {
    /**
     * Calculates which rating should be listed dependant upon the data we have on a player.
     */
    const getRating = ({ ecfRating, ecfRapid, estimatedRating }) => {

      const standard = ecfRating ? parseInt(ecfRating, 10) : 0;
      const rapid = ecfRapid ? parseInt(ecfRapid, 10) : 0;

      if (isBlitz) {
        if (rapid)
          return { value: rapid, sort: rapid, key: "" };
        if (standard)
          return { value: standard, sort: standard, key: "S" };
        if (estimatedRating)
          return {
            value: estimatedRating,
            sort: Number(estimatedRating),
            key: "E",
          };
        return { value: "unrated", sort: 0, key: "" };
      }
      if (isRapid) {
        if (rapid)
          return { value: rapid, sort: rapid, key: "" };
        if (standard)
          return { value: standard, sort: standard, key: "S" };
        if (estimatedRating)
          return {
            value: estimatedRating,
            sort: Number(estimatedRating),
            key: "E",
          };
        return { value: "unrated", sort: 0, key: "" };
        // Standard Rating
      } else {
        if (standard)
          return { value: standard, sort: standard, key: "" };
        if (rapid)
          return { value: rapid, sort: rapid, key: "R" };
        if (estimatedRating)
          return {
            value: estimatedRating,
            sort: Number(estimatedRating),
            key: "E",
          };
        return { value: "unrated", sort: 0, key: "" };
      }
    };

    /**
     * Returns a clean list of table data which has a pre defined sort integar on the rating object
     */
    if(eventDetails.entries?.items && eventDetails.entries?.items.length > 0) {
      return eventDetails.entries.items.reduce((list, entry) => {
        if(entry && entry.member) {
          const row = {
            id: entry.member.id,
            name: entry.member.name,
            club: entry.member.club ? truncate(entry.member.club, 12) : "",
            rating: getRating(entry.member),
          };
          list.push(row);
        }
        return list;
      }, []);
      
    } else {
      return [];
    }
  };

  return (
    <div>
      <table className="table-auto m-auto border border-gray-100 mb-4 mt-0 sm:mt-2 rounded w-full">
        <thead className="bg-gray-100 border-b-2 rounded-lg">
          <tr>
            <th
              scope="col"
              className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Seed
            </th>
            <th
              scope="col"
              className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="hidden sm:block px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Club
            </th>
            <th
              scope="col"
              className="relative px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Rating
            </th>
            <th
              scope="col"
              className="relative px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Alt
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
          {tableData()
            .sort((a, b) => b.rating.sort - a.rating.sort)
            .map(({ name, rating, club, id }, key) => {
              const isEven = key % 2 === 0;
              return (
                <tr
                  key={key}
                  className={
                    id === sub ? "bg-yellow-50" : isEven ? "bg-gray-50" : ""
                  }
                >
                  <td className="px-2 pl-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {key + 1}
                  </td>
                  <td className="px-2 pl-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {name}
                  </td>
                  <td className="hidden sm:block px-2 pl-4 py-2 whitespace-nowrap text-xs text-gray-600">
                    {club}
                  </td>
                  <td className="px-2 pl-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {rating.value}
                  </td>
                  <td className="px-2 pl-4 py-2 whitespace-nowrap text-xs align-middle font-medium text-teal-700 text-center">
                    {rating.key}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="text-xs text-gray-400 border border-dashed p-4">
        {isBlitz ? (
          <p className="mb-2">
            The latest ECF rapidplay are used for our blitz events, where a
            rapidplay rating is not available, we use their standard long play
            rating or an estimate if possible. This will be highlighted in the
            entry next to the players name.
          </p>
        ) : (
          <p className="mb-2">
            The latest ECF ratings are used for all players with a published
            rating, where a rating is not available their{" "}
            {isRapid ? "standard long play " : "Rapidplay "}
            rating is used or an estimate if possible. This will be highlighted
            in the entry next to the players name.
          </p>
        )}
        <p className="mb-2">Alt Key</p>
        {isRapid || isBlitz ? (
          <p className="ml-2">
            <span className="font-bold text-teal-700">S</span> - standard ECF
            rating used
          </p>
        ) : (
          <p className="ml-2">
            <span className="font-bold text-teal-700">R</span> - rapidplay ECF
            rating used
          </p>
        )}
        <p className="ml-2">
          <span className="font-bold text-teal-700">E</span> - estimated rating
          is used
        </p>
      </div>
    </div>
  );
}

export default function EventDetailsSlideOut(props) {
  const { slideState, user, setIsSlideOutOpen } = props;
  const { open, eventDetails } = slideState;

  function selectImage(type) {
    switch (type) {
      case "congress":
        return OpenCongress;
      case "rapidplay":
        return OpenRapidPlay;
      case "junior-rapidplay":
        return JuniorRapidPlay;
      default:
        return OpenCongress;
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-10 top-10 z-50"
        open={open}
        onClose={() =>
          setIsSlideOutOpen((state) => ({ ...state, open: false }))
        }
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-2 max-w-full flex sm:pl-2">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll mr-2 sm:mr-0">
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        id="slide-over-heading"
                        className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-3xl sm:leading-none"
                      >
                        {eventDetails.name || eventDetails.type?.name}
                      </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          autoFocus={false}
                          className="bg-white z-50 rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-teal-500"
                          onClick={() =>
                            setIsSlideOutOpen((state) => ({
                              ...state,
                              open: false,
                            }))
                          }
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon
                            className="h-6 w-6 border-none"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="pb-1 sm:pb-6">
                      <div>
                        <div className={classNames(borderColor600[eventDetails.type?.color], "border-4 relative h-52 rounded-md")}>
                            <img
                              className="border-gray-200 border-4 absolute h-full w-full object-cover "
                              src={selectImage(eventDetails.type?.eventType)}
                              alt="Playing Hall"
                            />
                        </div>
                      </div>
                    </div>
                    <div className="px-2 pt-2 pb-5 sm:px-0 sm:pt-0">
                      <dl className="space-y-4 px-2 sm:px-6 sm:space-y-4">
                        <div>
                          <dt className="text-sm font-medium text-teal-700 sm:w-40 sm:flex-shrink-0">
                            <i className="fas fa-info-square text-gray-900 mr-1"></i>{" "}
                            Description
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <p>
                              {eventDetails.description
                                ? eventDetails.description
                                : eventDetails.type?.description}
                            </p>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-teal-700 sm:w-40 sm:flex-shrink-0">
                            <i className="fad fa-map-pin text-gray-900 mr-1"></i>{" "}
                            Location
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            Unit 8, Crescent Court, Ilkely, LS29 8DE
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-teal-700 sm:w-40 sm:flex-shrink-0">
                            <i className="fad fa-chess-clock text-gray-900 mr-1"></i>{" "}
                            Time Control
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {eventDetails.type?.timeControl}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-teal-700 sm:w-40 sm:flex-shrink-0">
                            <i className="fad fa-calendar-alt text-gray-900 mr-1"></i>{" "}
                            Date
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {prettyDate(
                              eventDetails.startDate,
                              eventDetails.endDate
                            )}
                          </dd>
                        </div>

                        <div>
                          {eventDetails.entries?.items.length > 0 ? (
                            <dt className="text-sm font-medium text-teal-700 sm:w-40 sm:flex-shrink-0">
                              <i className="fad fa-users mr-1 text-gray-900"></i> Entries
                            </dt>
                          ) : (
                            ""
                          )}
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {eventDetails.entries?.items.length > 0 && (
                              <EntriesTable
                                user={user}
                                eventDetails={eventDetails}
                              />
                            )}
                          </dd>
                        </div>
                      </dl>                      
                    </div>
                    <div className="px-4 sm:flex sm:items-end sm:px-6 mb-2">
                      <div className="sm:flex-1">
                        <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                          <button
                            onClick={() =>
                              setIsSlideOutOpen((state) => ({
                                ...state,
                                open: false,
                              }))
                            }
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right mr-2 -mt-10">
                        <QuickSearch tag="events" />
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
