import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { classNames } from "../../utils/Classes";

export default function EventManager() {
    const [isLoading, setIsLoading] = useState(false);
    const [liveEventInfo, setLiveEventInfo] = useState({});
    const [players, setPlayers] = useState([]);
    const [pairings, setPairings] = useState([]);


    const refreshEventData = () => {
        const liveEvent = JSON.parse(localStorage.getItem("live-event"));
        setLiveEventInfo(liveEvent);

        setPlayers(liveEvent.players[0].entries);
        setPairings(liveEvent.pairings);
        console.log(liveEvent.pairings)

    }

    useEffect(() => {

        document.title = "The Chess Centre | Event Manager";

        refreshEventData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sections = [
        { title: 'Open', description: 'Average Rating:', current: true },
        { title: 'Major', description: 'Average Rating:', current: false },
        { title: 'Minor', description: 'Average Rating:', current: false },
      ]

    return (
        <>
            <h1 className="relative mt-6 mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                <i className="fad fa-tasks text-sky-600"></i> Event Manager
                <div className="inline-flex align-top top-2 ml-2">
                </div>
                {isLoading && (
                    <div className="absolute text-sky-500 mt-2 align-middle ml-2 text-sm inline-flex">
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


            <div className="grid grid-cols-1">
                <div>
                    {
                        Boolean(pairings.length) && pairings.map(round => {
                            return (<div className="shadow rounded-lg border bg-white my-4 p-4">
                                <div className="h4 font-red-hat-display text-center">Round {round.round}</div>
                                {round.pairings.map(pairing => {
                                    const white = players.find(({ id }) => id === pairing[0]);
                                    const black = players.find(({ id }) => id === pairing[1]);

                                    return (<PairingInput whiteInfo={white} blackInfo={black} />);
                                })}
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-7 py-2 border border-teal-500 shadow-sm text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>)


                        })
                    }
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
                        className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div className="w-1/4 px-2 py-4">
                    <input
                        type="text"
                        name={whiteInfo.name}
                        id={whiteInfo.name}
                        defaultValue={whiteInfo.ratingInfo.rating}
                        className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div className="w-48 text-center text-xs m-auto">
                <select
                    id="result"
                    name="result"
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
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
                        className="w-full block shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div className="w-3/4 px-2 py-4">
                    <input
                        type="text"
                        name={blackInfo.name}
                        id={blackInfo.name}
                        defaultValue={blackInfo.name}
                        className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

            </div>
        </div>
    )
}


function SectionSelector({ sections }) {
  const [selected, setSelected] = useState(sections[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change published status</Listbox.Label>
          <div className="relative">
            <div className="inline-flex shadow-sm rounded-md divide-x divide-teal-600">
              <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-teal-600">
                <div className="relative inline-flex items-center bg-teal-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium">{selected.title}</p>
                </div>
                <Listbox.Button className="relative inline-flex items-center bg-teal-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500">
                  <span className="sr-only">Change published status</span>
                  <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
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
                        active ? 'text-white bg-teal-500' : 'text-gray-900',
                        'cursor-default select-none relative p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className={selected ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                          {selected ? (
                            <span className={active ? 'text-white' : 'text-teal-500'}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                        <p className={classNames(active ? 'text-teal-200' : 'text-gray-500', 'mt-2')}>
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
  )
}
