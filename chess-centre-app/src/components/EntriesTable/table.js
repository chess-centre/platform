import React, { useState } from "react";
import { classNames } from "../../utils/Classes";

export default function EntriesTable(props) {
  const { eventId, eventType } = props;
  const [tabs, setTabs] = useState([
    { name: "Open", icon: "fa-users", current: true },
    { name: "Major", icon: "fa-users", current: false },
    { name: "Intermediate", icon: "fa-users", current: false },
    { name: "Minor", icon: "fa-users", current: false },
  ]);
  const [selected, setSelected] = useState("Open");

  const renderInfo = (selected, eventId, eventType) => {
    switch (selected) {
      case "Open":
        return <Table />;
      case "Major":
        return <Table {...{ eventId, eventType }} />;
      case "Intermediate":
        return <Table {...{ eventId, eventType }} />;
      case "Minor":
        return <Table {...{ eventId, eventType }} />;        
      default:
        return <Table />;
    }
  };

  return (
    <div className={"relative bg-white rounded-lg shadow-lg"}>
      <div className="rounded-t-lg px-6 py-2 sm:pt-8">
        <div className="relative text-lg text-gray-700">
          <h2 className="text-center font-bold mb-4 tracking-tight text-gray-900 mt-3 sm:mt-0">
            Entries
          </h2>
          <Tabs tabs={tabs} setSelected={setSelected} setTabs={setTabs} />
          {renderInfo(selected, eventId, eventType)}
        </div>
      </div>
      <div className="mt-2 relative flex items-center sm:items-start bg-teal-700 rounded-b-lg not-italic py-2 px-6 sm:pl-12 sm:pr-10"></div>
    </div>
  );
}

function Tabs(props) {
  const { tabs, setSelected, setTabs } = props;
  const handleChange = (e) => updateTabs(e.target.value);
  const handleClick = (tab) => updateTabs(tab);

  const updateTabs = (tab) => {
    setSelected(tab);
    setTabs((prevState) =>
      prevState.map(({ name, icon }) => ({
        name,
        icon,
        current: name === tab,
      }))
    );
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          onChange={handleChange}
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <div
                onClick={() => handleClick(tab.name)}
                key={tab.name}
                className={classNames(
                  tab.current
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <span>
                  <i className={`far ${tab.icon} mr-2`}></i>
                </span>
                {tab.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function Table(data) {
  const { eventDetails } = data;

  if(!eventDetails) return;

  const sub = "";
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
            club: entry.member.club,
            byes: "",
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
              className="relative px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Byes
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
            .map(({ name, rating, club, byes, id }, key) => {
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
                  <td className="px-2 pl-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {byes}
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

