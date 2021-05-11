import React, { useEffect } from "react";
import { XIcon, GlobeIcon } from '@heroicons/react/outline'

const usefulLinks = [
  {
    name: "Chess.com",
    description: "A fantastic resource for playing, learning and training.",
    url: "https://chess.com"
  }
]

function Banner() {
  return (
    <div className="absolute inset-x-0 pb-2 sm:pb-5">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="p-2 rounded-lg bg-teal-600 shadow-lg sm:p-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-teal-800">
              <GlobeIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="">We have a long road ahead but rest assured we are working on it!</span>
            </p>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
            <button
              type="button"
              className="-mr-1 flex p-2 rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

function UsefulLinksTable() {
  return (
    <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Link
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usefulLinks.map(({ name, description, url}, key) => (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default function Juniors() {

  useEffect(() => {
  }, []);

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fad fa-joystick text-teal-600"></i> Parents
          <div className="inline-flex align-top top-2">
          <span className="ml-2 items-center px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-teal-100 text-teal-700 top-2">
            Junior Membership
          </span>
        </div>
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <p className="ml-2 mt-1 text-sm text-center sm:text-left text-gray-500 dark:text-gray-400">
            Here is where we will provide some key resources and useful information to help with your childs progress.
          </p>
        </div>
      </div>
      <div className="relative grid gap-6 mb-8 md:grid-cols-2 mt-6">
        <Banner />
        <UsefulLinksTable />
      </div>
    </>
  );
}