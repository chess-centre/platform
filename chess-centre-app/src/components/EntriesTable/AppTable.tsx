import React, { useState, useRef, useEffect } from "react";
import { ExclamationIcon } from "@heroicons/react/solid";
import { classNames } from "../../utils/Classes";
import RatingFallbackModel from "../../components/Modal/RatingFallbackModal";
import { juniorSections, standardSections } from "../../api/sections";

export default function EntriesTable(data: any) {
  const { eventDetails } = data;
  const [selectedSection, handleSelectionSelect] = useState("open");
  const isRapid =
    eventDetails?.name?.includes("Rapidplay") ||
    eventDetails?.name?.includes("IGS");
  const isBlitz = eventDetails?.name?.includes("Blitz");
  const showTitled = useRef<boolean>(false);
  const showByes = useRef<boolean>(false);
  const [entriesState, setEntriesState] = useState<any>([]);
  const [showPartialMsg, setShowPartialMsg] = useState<boolean>(false);
  const [showRatingKey, setShowRatingKey] = useState<boolean>(false);
  const [ratingModal, showRatingModal] = useState<boolean>(false);
  const ratingsUpdated = useRef("");

  const getSectionInfo = (isJunior = false) => {
    const section = isJunior ? juniorSections : standardSections;
    return section.find(({ key }) => key === selectedSection)?.description;
  };

  useEffect(() => {
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
      if (
        eventDetails.entries?.items &&
        eventDetails.entries?.items.length > 0
      ) {
        const players = eventDetails.entries.items.reduce((list, entry) => {
          if (entry && entry.member) {
            const rating = getRating(entry.member);
            const row = {
              id: entry.member.id,
              name: entry.member.name,
              club: entry.member.club,
              title: entry.member?.chessTitle,
              rating,
              section: entry.section,
              byes: entry.byes,
              chessTitle: entry.member?.chessTitle,
              ecfLastUpdated: entry.member?.ecfLastUpdated
            };
            if (entry.byes && entry.byes !== "null") {
              showByes.current = true;
            }
            if (entry.member?.chessTitle) {
              showTitled.current = true;
            }

            if(entry.member?.ecfLastUpdated) {
              ratingsUpdated.current = entry.member?.ecfLastUpdated
            }

            list.push(row);
          }
          return list;
        }, []);
        return players;
      } else {
        return [];
      }
    };

    const entries = tableData()
      .sort((a: any, b: any) => b.rating.sort - a.rating.sort)
      .filter((row: any) => {
        if (eventDetails?.multipleSections) {
          return row.section.includes(selectedSection);
        } else {
          return true;
        }
      });

    const showPartial = entries.some((e: any) => Boolean(e.rating.isPartial));
    if (showPartial) {
      setShowPartialMsg(true);
    }

    const showRatingKey = entries.some((e: any) => Boolean(e.rating.key));
    if(showRatingKey) {
      setShowRatingKey(true)
    }

    setEntriesState(entries);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {eventDetails.multipleSections && (
        <>
          <div className="my-4">
            <SectionTabs handleSelectionSelect={handleSelectionSelect} />
          </div>
          <ul className="my-6 sm:mx-2 text-sm text-teal-700">
            <li>{getSectionInfo(eventDetails.name.includes("Junior"))}</li>
          </ul>
        </>
      )}

      <div className="overflow-x-auto">
        <table className="table-auto m-auto border border-gray-100 mb-4 mt-0 rounded w-full">
          <thead className="bg-gray-100 border-b-2 rounded-lg">
            <tr>
              <th
                scope="col"
                className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Seed
              </th>
              {showTitled.current && (
                <th
                  scope="col"
                  className="px-0 py-2 text-center text-xs font-medium text-gray-500 uppercase"
                >
                  Title
                </th>
              )}
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="hidden sm:block px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Club
              </th>
              <th
                scope="col"
                className="relative px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Rating
              </th>
              {showByes.current && (
                <th
                  scope="col"
                  className="relative px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase"
                >
                  Byes
                </th>
              )}
              {showRatingKey && (
                <th
                  scope="col"
                  className="relative px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase"
                >
                  Key
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
            {entriesState.length > 0 &&
              entriesState.map(
                ({ name, chessTitle, rating, club, byes }, key: number) => {
                  const isEven = key % 2 === 0;
                  return (
                    <tr
                      key={key}
                      className={classNames(
                        isEven ? "bg-gray-50" : "",
                        "hover:bg-yellow-50"
                      )}
                    >
                      <td className="px-2 pl-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                        {key + 1}
                      </td>
                      {showTitled.current && (
                        <td className="px-0 py-2 whitespace-nowrap text-sm font-medium text-teal-900 text-center">
                          {chessTitle}
                        </td>
                      )}
                      <td className="px-2 pl-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        {name}
                      </td>
                      <td className="hidden sm:block truncate px-2 pl-4 py-2 whitespace-nowrap text-xs text-gray-600">
                        {club}
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
                      {showByes.current && (
                        <td className="px-2 pl-4 py-2 whitespace-nowrap text-xs align-middle font-medium text-teal-700 text-center">
                          {byes
                            ? byes !== "null" && byes?.split("").join(",")
                            : ""}
                        </td>
                      )}
                      {showRatingKey && (
                        <td className="px-2 pl-4 py-2 whitespace-nowrap text-xs align-middle font-medium text-teal-700 text-center">
                          { rating.key ? <span className="cursor-pointer" onClick={() => showRatingModal(true)}>{rating.key}</span> : "" }
                        </td>
                      )}
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-left space-y-4">
        <RatingAlert />
        {showPartialMsg && <PartialAlert />}
      </div>
      <RatingFallbackModel eventType={isRapid ? "rapidplay" : "standard"} open={ratingModal} cancel={showRatingModal} lastUpdated={ratingsUpdated} />
    </div>
  );
}

function SectionTabs(props) {
  const { handleSelectionSelect } = props;

  const [sections, setSections] = useState([
    { name: "Open", current: true },
    { name: "Major", current: false },
    { name: "Inter", current: false },
    { name: "Minor", current: false },
  ]);

  const updateSectionSelected = (section) => {
    setSections((currentState) => {
      return [
        ...currentState.map((c) => {
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
        className="relative z-0 shadow flex divide-x divide-gray-200 sm:border"
        aria-label="Sections"
      >
        {sections.map((section) => (
          <div
            onClick={() => updateSectionSelected(section.name.toLowerCase())}
            key={section.name}
            className={classNames(
              section.current
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700",
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

function RatingAlert() {
  return (
    <div className="bg-teal-50 border-l-4 border-teal-400 p-2 xl:p-3">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-teal-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-xs xl:text-sm text-teal-700">
            Ratings are automatically checked against the ECF database, you may
            initially see "unrated" while we verify your info.
          </p>
        </div>
      </div>
    </div>
  );
}

function PartialAlert() {
  return (
    <div className="bg-gray-50 border-l-4 border-gray-400 p-2 xl:p-3">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className=" text-orange-500 ml-1">*</span>
        </div>
        <div className="ml-5">
          <p className="text-xs xl:text-sm text-gray-700 italic">
            Indicates a partial rating and is therefore eligible to enter any
            section until an official full rating is published.
          </p>
        </div>
      </div>
    </div>
  );
}
