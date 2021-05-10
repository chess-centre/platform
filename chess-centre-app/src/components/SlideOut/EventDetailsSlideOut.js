import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import PlayingRoom from "../../assets/img/the-centre.png";
import { prettyDate } from "../../utils/DateFormating";
import { classNames, borderColor900 } from "../../utils/Classes";

export default function EventDetailsSlideOut(props) {
  const { slideState, user, setIsSlideOutOpen } = props;
  const { open, eventDetails } = slideState;

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
                        className="text-lg font-medium text-gray-900"
                      >
                        Event details
                      </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          className="bg-white z-100 rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-teal-500"
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
                  {/* Main */}
                  <div>
                    <div className="pb-1 sm:pb-6">
                      <div>
                        <div className="relative h-40 sm:h-52">
                          <div className="">
                            <img
                              className={classNames(borderColor900(eventDetails.type?.color),`absolute h-full w-full object-cover rounded-lg border-4`)}
                              src={PlayingRoom}
                              alt="Playing Hall"
                            />
                          </div>
                        </div>
                        <div className="mt-4 px-4 sm:flex sm:items-end sm:px-6">
                          <div className="sm:flex-1">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-bold text-xl text-gray-900 sm:text-2xl text-center">
                                  {eventDetails.name || eventDetails.type?.name}
                                </h3>
                              </div>
                            </div>
                            <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                              <button
                                autoFocus
                                type="button"
                                className="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:flex-1"
                              >
                                Sign up
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                      <dl className="space-y-4 px-4 sm:px-6 sm:space-y-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
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
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Location
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            Unit 8, Crescent Court, Ilkely, LS29 8DE
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Time Control
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {eventDetails.type?.timeControl}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
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
                          { eventDetails.entries?.items.length > 0 ? (<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Entries
                          </dt>) : ""}
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                          {eventDetails.entries?.items.length > 0 && (
                            <table className="table-auto m-auto border border-gray-100 mb-4 mt-0 sm:mt-2 rounded">
                              <thead className="bg-gray-100 dark:bg-gray-800 border-b-2 rounded-lg">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                  >
                                    Seed
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                  >
                                    Name
                                  </th>

                                  <th
                                    scope="col"
                                    className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                  >
                                    Rating
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                {eventDetails.entries?.items
                                  .sort(
                                    (a, b) =>
                                      Number(b.member.ecfRating) -
                                      Number(a.member.ecfRating)
                                  )
                                  .map(({ member, memberId }, key) => {
                                    const isEven = key % 2 === 0;
                                    return (
                                      <tr
                                        key={key}
                                        className={
                                          memberId === user.attributes.sub
                                            ? "bg-yellow-50"
                                            : isEven
                                            ? "bg-gray-50"
                                            : ""
                                        }
                                      >
                                        <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300 text-center">
                                          {key + 1}
                                        </td>
                                        <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                          {member?.name}
                                        </td>
                                        <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300 text-center">
                                          {member?.ecfRating}
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
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
