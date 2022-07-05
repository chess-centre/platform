import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { borderColor600 } from "tailwind-dynamic-classes";
import JuniorRapidPlay from "../../assets/img/junior-rapidplay.jpg";
import OpenRapidPlay from "../../assets/img/dave-barlow-vs-gary-corcoran.jpg";
import OpenCongress from "../../assets/img/june-congress-round-4.jpg";
import QuickSearch from "../FAQs/QuickSearch";
import { prettyDate } from "../../utils/DateFormating";
import { classNames } from "../../utils/Classes";

function truncate(str: string, n: number) {
  return str.length > n ? str.substr(0, n - 1) + " ..." : str;
}

function EntriesTable(data) {
  const { user, eventDetails } = data;
  const sub = user.attributes.sub;
  const isRapid =
    eventDetails?.name?.includes("Rapidplay") ||
    eventDetails?.name?.includes("IGS");
  const isBlitz = eventDetails?.name?.includes("Blitz");
  const isJunior = eventDetails?.name?.includes("Junior");
  const sectionOverrides = isJunior ? [
    { name: "Open", current: true },
    { name: "Major", current: false },
    { name: "Inter", current: false },
    { name: "Minor", current: false },
  ]: undefined

  const [selectedSection, handleSelectionSelect] = useState("open");

  const tableData = () => {
    /**
     * Calculates which rating should be listed dependant upon the data we have on a player.
     */
    const getRating = ({
      ecfRating,
      ecfRapid,
      estimatedRating,
      ecfRatingPartial = false,
      ecfRapidPartial = false,
    }) => {
      const standard = ecfRating ? parseInt(ecfRating, 10) : 0;
      const rapid = ecfRapid ? parseInt(ecfRapid, 10) : 0;

      if (isBlitz) {
        if (rapid)
          return {
            value: rapid,
            sort: rapid,
            isPartial: ecfRapidPartial,
            key: "",
          };
        if (standard)
          return {
            value: standard,
            sort: standard,
            isPartial: ecfRatingPartial,
            key: "S",
          };
        if (estimatedRating)
          return {
            value: estimatedRating,
            sort: Number(estimatedRating),
            isPartial: ecfRatingPartial,
            key: "E",
          };
        return {
          value: "unrated",
          sort: 0,
          isPartial: ecfRatingPartial,
          key: "",
        };
      }
      if (isRapid) {
        if (rapid)
          return {
            value: rapid,
            sort: rapid,
            isPartial: ecfRapidPartial,
            key: "",
          };
        if (standard)
          return {
            value: standard,
            sort: standard,
            isPartial: ecfRatingPartial,
            key: "S",
          };
        if (estimatedRating)
          return {
            value: estimatedRating,
            sort: Number(estimatedRating),
            isPartial: ecfRatingPartial,
            key: "E",
          };
        return {
          value: "unrated",
          sort: 0,
          isPartial: ecfRatingPartial,
          key: "",
        };
        // Standard Rating
      } else {
        if (standard)
          return {
            value: standard,
            sort: standard,
            isPartial: ecfRatingPartial,
            key: "",
          };
        if (rapid)
          return {
            value: rapid,
            sort: rapid,
            isPartial: ecfRapidPartial,
            key: "R",
          };
        if (estimatedRating)
          return {
            value: estimatedRating,
            sort: Number(estimatedRating),
            isPartial: ecfRatingPartial,
            key: "E",
          };
        return {
          value: "unrated",
          sort: 0,
          isPartial: ecfRatingPartial,
          key: "",
        };
      }
    };

    /**
     * Returns a clean list of table data which has a pre defined sort integar on the rating object
     */
    if (eventDetails.entries?.items && eventDetails.entries?.items.length > 0) {
      return eventDetails.entries.items.reduce((list, entry) => {
        if (entry && entry.member) {
          const rating = getRating(entry.member);
          const row = {
            id: entry.member.id,
            name: entry.member.name,
            club: entry.member.club ? truncate(entry.member.club, 12) : "",
            rating,
            section: entry.section,
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
      {eventDetails.multipleSections && (
        <div className="my-4">
          <SectionTabs handleSelectionSelect={handleSelectionSelect} sectionOverrides={sectionOverrides} />
        </div>
      )}

      <div className="overflow-x-auto mb-4">
        <table className="table-auto m-auto border border-gray-100 mt-0 sm:mt-2 rounded w-full">
          <thead className="bg-gray-100 border-b-2 rounded-lg">
            <tr>
              <th
                scope="col"
                className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Seed
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Name
              </th>

              <th
                scope="col"
                className="relative px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Rating
              </th>
              <th
                scope="col"
                className="hidden sm:block px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Club
              </th>
              <th
                scope="col"
                className="relative px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Alt
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
            {tableData()
              .sort((a, b) => b.rating.sort - a.rating.sort)
              .filter((row) => {
                if (eventDetails?.multipleSections) {
                  return row.section.includes(selectedSection);
                } else {
                  return true;
                }
              })
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

                    <td className="px-2 pl-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                      {rating.isPartial ? (
                        <span className="italic text-gray-500 ml-2">
                          {rating.value}{" "}
                          <span className="text-orange-500">*</span>
                        </span>
                      ) : (
                        <span>{rating.value}</span>
                      )}
                    </td>
                    <td className="hidden sm:block px-2 pl-4 py-2 whitespace-nowrap text-xs text-gray-600">
                      {club}
                    </td>
                    <td className="px-2 pl-4 py-2 whitespace-nowrap text-xs align-middle font-medium text-teal-700 text-center">
                      {rating.key}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
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
            <span className="font-bold text-teal-700">S</span> = Standard ECF
            rating used
          </p>
        ) : (
          <p className="ml-2">
            <span className="font-bold text-teal-700">R</span> = Rapidplay ECF
            rating used
          </p>
        )}
        <p className="ml-2">
          <span className="font-bold text-teal-700">E</span> = Estimated rating
          is used
        </p>
        <p className="ml-2 italic">
          <span className="text-orange-500">* </span> = Partial rating
        </p>
      </div>
    </div>
  );
}

type SectionTabProps = {
  handleSelectionSelect: Function | undefined,
  sectionOverrides: Array<any> | undefined
}

function SectionTabs(props: SectionTabProps) {
  const { handleSelectionSelect, sectionOverrides } = props;

  const initialSections = sectionOverrides && sectionOverrides.length > 0 ? sectionOverrides : [
    { name: "Open", current: true },
    { name: "Major", current: false },
    { name: "Inter", current: false },
    { name: "Minor", current: false },
  ];

  const [sections, setSections] = useState(initialSections);

  const updateSectionSelected = (section: string) => {
    setSections((currentState: any) => {
      return [
        ...currentState.map((c: any) => {
          return {
            ...c,
            current: section.includes(c.name?.toLowerCase()),
          };
        }),
      ];
    });

    if (handleSelectionSelect && typeof handleSelectionSelect === "function") {
      handleSelectionSelect(section);
    }
  };

  return (
    <div>
      <nav
        className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
        aria-label="Sections"
      >
        {sections.map((section, tabIdx) => (
          <div
            onClick={() => updateSectionSelected(section.name.toLowerCase())}
            key={section.name}
            className={classNames(
              section.current
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700",
              tabIdx === 0 ? "rounded-l-lg" : "",
              tabIdx === sections.length - 1 ? "rounded-r-lg" : "",
              "group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-2 text-xs font-medium text-center hover:bg-gray-50 focus:z-10 cursor-pointer"
            )}
            aria-current={section.current ? "page" : undefined}
          >
            <span>{section.name}</span>
            <span
              aria-hidden="true"
              className={classNames(
                section.current ? "bg-teal-500" : "bg-transparent",
                "absolute inset-x-0 bottom-0 h-0.5"
              )}
            />
          </div>
        ))}
      </nav>
    </div>
  );
}

type DetailProps = {
  slideState: any,
  user: any,
  setIsSlideOutOpen: Function
};

export default function EventDetailsSlideOut(props: DetailProps) {
  const { slideState, user, setIsSlideOutOpen } = props;
  const { open, eventDetails } = slideState;

  function selectImage(type: string) {
    if (type?.includes("junior")) {
      return JuniorRapidPlay;
    }

    switch (type) {
      case "congress":
        return OpenCongress;
      case "rapidplay":
        return OpenRapidPlay;
      default:
        return OpenCongress;
    }
  }

  // TODO: add address information to event details:
  function addressLookup(name: string): string {
    if (name?.includes("IGS")) {
      return "Ilkley Grammar School, Armitage Hall, LS29 8TH";
    }
    if (name?.includes("Festival") && !name?.includes("Blitz")) {
      return "King's Hall & Winter Garden, Station Road, Ilkley, LS29 8HB";
    }
    return "Unit 8, Crescent Court, Ilkely, LS29 8DE";
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
                        <div
                          className={classNames(
                            eventDetails.type?.color === "blue"
                              ? "border-blue-brand"
                              : borderColor600[eventDetails.type?.color],
                            "border-4 relative h-52 rounded-md"
                          )}
                        >
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
                            {addressLookup(eventDetails?.name)}
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
                          {eventDetails.entries?.items.length > 0 && (
                            <>
                              <dt className="text-sm font-medium text-teal-700 sm:w-40 sm:flex-shrink-0">
                                <i className="fad fa-users mr-1 text-gray-900"></i>{" "}
                                Entries{" "}
                                <span className="text-gray-500 text-xs">{`( ${eventDetails.entries?.items.length} )`}</span>
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                <EntriesTable
                                  user={user}
                                  eventDetails={eventDetails}
                                />
                              </dd>
                            </>
                          )}
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
