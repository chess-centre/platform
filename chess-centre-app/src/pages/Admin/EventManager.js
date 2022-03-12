import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import data from "../../components/Events/Tables/March/meta.json";
//import { Switch } from "@headlessui/react";
import { classNames } from "../../utils/Classes";

export default function EventManager() {
  const [isLoading,] = useState(false);

  const [players, setPlayers] = useState([]);
  const [pairings, setPairings] = useState([]);
  const [settings, setSettings] = useState({});
  const [sections,] = useState([
    { title: "Open", description: "Average Rating:", current: true },
    { title: "Major", description: "Average Rating:", current: false },
    { title: "Minor", description: "Average Rating:", current: false },
  ]);

  const refreshEventData = () => {
    const liveEvent = JSON.parse(localStorage.getItem("live-event"));


    setSettings(liveEvent.settings);
    setPlayers(liveEvent.players[0].entries);
    setPairings(liveEvent.pairings);
    console.log(liveEvent.pairings);
  };

  useEffect(() => {
    document.title = "The Chess Centre | Event Manager";

    if (!localStorage.getItem("live-event")) {
      console.log("updating local storage");
      localStorage.setItem("live-event", JSON.stringify(data));
    }

    localStorage.setItem("live-event", JSON.stringify(data));

    refreshEventData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="relative mt-6 mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-tasks text-teal-600"></i> Event Manager
        <div className="inline-flex align-top top-2 ml-2"></div>
        {isLoading && (
          <div className="absolute text-teal-500 mt-2 align-middle ml-2 text-sm inline-flex">
            <i className="fal fa-spinner-third fa-spin fa-fw"></i>
          </div>
        )}
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="relative -ml-2 -mt-2 flex flex-wrap items-baseline">
          <p className="ml-2 mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
            Interface for micro management of a current event.
          </p>
          <div className="absolute right-0 -mt-2">
            <SectionSelector sections={sections} />
          </div>
        </div>
      </div>

      {settings && (
        <div className="grid grid-cols-4 shadow rounded-lg border bg-white my-2 p-4">
          <div className="text-sm font-medium">
            Current Round:{" "}
            <span className="font-normal">{settings.currentRound} / {settings.totalRounds}</span>
          </div>
          <div className="text-sm font-medium">
            Round Live:{" "}
            <span className="font-normal">
              {settings.roundLive ? "Yes" : "No"}
            </span>
          </div>
          <div className="text-sm font-medium">
            Section:{" "}
            <span className="font-normal">
              {sections.find(s => s.current === true).title}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1">
        <div>
          {Boolean(pairings.length) &&
            pairings.map((round) => {
              return (
                <div
                  key={round.round}
                  className="shadow rounded-lg border bg-white my-4 p-4"
                >
                  <div className="h4 font-red-hat-display text-center">
                    Round {round.round}
                  </div>
                  {round.pairings.map((pairing) => {
                    const white = players.find(({ id }) => id === pairing[0]);
                    const black = players.find(({ id }) => id === pairing[1]);

                    return (
                      <div key={pairing[0]}>
                        <PairingInput whiteInfo={white} blackInfo={black} />
                      </div>
                    );
                  })}
                  <div className="text-center">
                    <button
                      type="button"
                      className="inline-flex items-center px-7 py-2 border border-teal-500 shadow-sm text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Complete Round
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

const PairingInput = ({ whiteInfo, blackInfo }) => {
  return (
    <div className="flex px-10">
      <div className="flex w-full">
        <div className="w-3/4 px-2 py-4">
          <input
            type="text"
            name={whiteInfo.name}
            id={whiteInfo.name}
            defaultValue={whiteInfo.name}
            className="block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="w-1/4 px-2 py-4">
          <input
            type="text"
            name={whiteInfo.name}
            id={whiteInfo.name}
            defaultValue={whiteInfo.ratingInfo.rating}
            className="block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="w-48 text-center text-xs m-auto">
        <select
          id="result"
          name="result"
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        >
          <option>? - ?</option>
          <option>1 - 0</option>
          <option>½ - ½</option>
          <option>0 - 1</option>
        </select>
      </div>
      <div className="flex w-full">
        <div className="w-1/4 px-2 py-4">
          <input
            type="text"
            name={blackInfo.name}
            id={blackInfo.name}
            defaultValue={blackInfo.ratingInfo.rating}
            className="w-full block shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="w-3/4 px-2 py-4">
          <input
            type="text"
            name={blackInfo.name}
            id={blackInfo.name}
            defaultValue={blackInfo.name}
            className="block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

function SectionSelector({ sections }) {
  const [selected, setSelected] = useState(sections[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            Change published status
          </Listbox.Label>
          <div className="relative">
            <div className="inline-flex shadow-sm rounded-md divide-x divide-teal-600">
              <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-teal-600">
                <div className="relative inline-flex items-center bg-teal-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium">{selected.title}</p>
                </div>
                <Listbox.Button className="relative inline-flex items-center bg-teal-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500">
                  <span className="sr-only">Change published status</span>
                  <ChevronDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {sections.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-teal-500" : "text-gray-900",
                        "cursor-default select-none relative p-4 text-sm"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? "font-semibold" : "font-normal"
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? "text-white" : "text-teal-500"
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                        <p
                          className={classNames(
                            active ? "text-teal-200" : "text-gray-500",
                            "mt-2"
                          )}
                        >
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

// function SettingSwitch({ enabled, setEnabled }) {
//   return (
//     <Switch
//       checked={enabled}
//       onChange={setEnabled}
//       className={classNames(
//         enabled ? "bg-teal-600" : "bg-gray-200",
//         "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//       )}
//     >
//       <span className="sr-only">Use setting</span>
//       <span
//         className={classNames(
//           enabled ? "translate-x-5" : "translate-x-0",
//           "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
//         )}
//       >
//         <span
//           className={classNames(
//             enabled
//               ? "opacity-0 ease-out duration-100"
//               : "opacity-100 ease-in duration-200",
//             "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
//           )}
//           aria-hidden="true"
//         >
//           <svg
//             className="h-3 w-3 text-gray-400"
//             fill="none"
//             viewBox="0 0 12 12"
//           >
//             <path
//               d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
//               stroke="currentColor"
//               strokeWidth={2}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </span>
//         <span
//           className={classNames(
//             enabled
//               ? "opacity-100 ease-in duration-200"
//               : "opacity-0 ease-out duration-100",
//             "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
//           )}
//           aria-hidden="true"
//         >
//           <svg
//             className="h-3 w-3 text-teal-600"
//             fill="currentColor"
//             viewBox="0 0 12 12"
//           >
//             <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
//           </svg>
//         </span>
//       </span>
//     </Switch>
//   );
// }
