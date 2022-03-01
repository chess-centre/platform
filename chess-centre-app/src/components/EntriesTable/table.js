import React, { useState } from "react";
import { classNames } from "../../utils/Classes";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + " ..." : str;
}

export default function EntriesTable(data) {
  const { eventDetails } = data;
  const isRapid =
    eventDetails?.name?.includes("Rapidplay") ||
    eventDetails?.name?.includes("IGS");
  const isBlitz = eventDetails?.name?.includes("Blitz");

  const [selectedSection, handleSelectionSelect] = useState("open");

  const tableData = () => {
    /**
     * Calculates which rating should be listed dependant upon the data we have on a player.
     */
    const getRating = ({ ecfRating, ecfRapid, estimatedRating }) => {
      const standard = ecfRating ? parseInt(ecfRating, 10) : 0;
      const rapid = ecfRapid ? parseInt(ecfRapid, 10) : 0;

      if (isBlitz) {
        if (rapid) return { value: rapid, sort: rapid, key: "" };
        if (standard) return { value: standard, sort: standard, key: "S" };
        if (estimatedRating)
          return {
            value: estimatedRating,
            sort: Number(estimatedRating),
            key: "E",
          };
        return { value: "unrated", sort: 0, key: "" };
      }
      if (isRapid) {
        if (rapid) return { value: rapid, sort: rapid, key: "" };
        if (standard) return { value: standard, sort: standard, key: "S" };
        if (estimatedRating)
          return {
            value: estimatedRating,
            sort: Number(estimatedRating),
            key: "E",
          };
        return { value: "unrated", sort: 0, key: "" };
        // Standard Rating
      } else {
        if (standard) return { value: standard, sort: standard, key: "" };
        if (rapid) return { value: rapid, sort: rapid, key: "R" };
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
    if (eventDetails.entries?.items && eventDetails.entries?.items.length > 0) {
      return eventDetails.entries.items.reduce((list, entry) => {
        if (entry && entry.member) {
          const row = {
            id: entry.member.id,
            name: entry.member.name,
            club: entry.member.club ? truncate(entry.member.club, 12) : "",
            rating: getRating(entry.member),
            section: entry.section,
            byes: entry.byes
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
          <SectionTabs handleSelectionSelect={handleSelectionSelect} />
        </div>
      )}

      <table className="table-auto m-auto border border-gray-100 mb-4 mt-0 sm:mt-2 rounded w-full">
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
            <th
              scope="col"
              className="relative px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Byes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
          {tableData()
            .sort((a, b) => b.rating.sort - a.rating.sort)
            .filter((row) => {
              if (eventDetails?.multipleSections) {
                return row.section === selectedSection;
              } else {
                return true;
              }
            })
            .map(({ name, rating, club, byes }, key) => {
              const isEven = key % 2 === 0;
              return (
                <tr
                  key={key}
                  className={
                    isEven ? "bg-gray-50" : ""
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
                    {byes?.split("").join(",")}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
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
            current: section === c.name?.toLowerCase(),
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
        className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200 sm:mx-2 sm:border"
        aria-label="Sections"
      >
        {sections.map((section, tabIdx) => (
          <div
            onClick={() =>
              updateSectionSelected(section.name.toLocaleLowerCase())
            }
            key={section.name}
            className={classNames(
              section.current
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700",
              tabIdx === 0 ? "rounded-l-lg" : "",
              tabIdx === section.length - 1 ? "rounded-r-lg" : "",
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
