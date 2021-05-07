import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import PlayingRoom from "../../assets/img/the-centre.png";
import { prettyDate } from "../../utils/DateFormating";

export default function Example(props) {
  const { isSlideOutOpen, setIsSlideOutOpen } = props;
  const { open, eventDetails } = isSlideOutOpen;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-10 top-10 z-50"
        open={open}
        onClose={() => setIsSlideOutOpen(state => ({ ...state, open: false }))}
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
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        id="slide-over-heading"
                        className="text-lg font-medium text-gray-900"
                      >
                        Event Details
                      </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          className="bg-white z-100 rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-teal-500"
                          onClick={() => setIsSlideOutOpen(state => ({ ...state, open: false }))}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6 border-none" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Main */}
                  <div>
                    <div className="pb-1 sm:pb-6">
                      <div>
                        <div className="relative h-40 sm:h-56">
                          <img
                            className="absolute h-full w-full object-cover"
                            src={PlayingRoom}
                            alt=""
                          />
                        </div>
                        <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                          <div className="sm:flex-1">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">
                                 { eventDetails.name }
                                </h3>
                              </div>
                              <p className="text-sm text-gray-500">
                               { eventDetails.description ? eventDetails.description : eventDetails.type?.description }
                              </p>
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
                      <dl className="space-y-8 px-4 sm:px-6 sm:space-y-6">
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Description
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <p>
                              { eventDetails.description ? eventDetails.description : eventDetails.type?.description }
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
                            { eventDetails.time }
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Date
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            { prettyDate(eventDetails.startDate, eventDetails.endDate)}
                          </dd>
                        </div>
                      </dl>
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
