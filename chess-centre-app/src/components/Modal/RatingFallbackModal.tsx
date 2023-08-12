import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";

export default function RatingFallbackModal({
  open,
  cancel,
  eventType,
  lastUpdated,
}): JSX.Element {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => cancel(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-orange-100">
                    <i className="fas fa-chess-king text-orange-brand"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      How Ratings Are Listed
                    </Dialog.Title>
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="text-xs py-1 px-2 mt-3 text-justify">
                        <p className="mb-2">
                          The latest{" "}
                          <span className="text-yellow-600">ECF {eventType}</span>{" "}
                          ratings are used for this event, where we cannot find
                          one, we use the below (in order of precedence) to
                          determine playing strength and seeding on our entry
                          list.
                        </p>
                        <p className="mb-2">Rating reference key</p>
                        {eventType !== "rapidplay" && (
                          <p className="ml-2 mb-2">
                            <span className="font-bold text-yellow-600">R</span> =
                            Rapidplay ECF rating used
                          </p>
                        )}
                        {eventType !== "standard" && (
                          <p className="ml-2 mb-2">
                            <span className="font-bold text-yellow-600">S</span> =
                            Standard ECF rating used
                          </p>
                        )}
                        <p className="ml-2 mb-2">
                          <span className="font-bold text-yellow-600">F</span> =
                          FIDE standard rating used
                        </p>
                        <p className="ml-2 mb-2">
                          <span className="font-bold text-yellow-600">E</span> =
                          Estimated rating is used
                        </p>
                        <p className="ml-2 mb-2">
                          <span className="text-orange-500">* </span> = <span className="italic">Partial
                          rating</span>
                        </p>
                        <p className="text-xs text-center text-gray-900 mt-2">
                          Ratings last updated
                        </p>
                        <p className="text-xs text-center text-yellow-500">
                          {moment(lastUpdated).format("MMMM Do YYYY, h:mm a")}
                        </p>
                        <p className="mb-2 mt-4 text-center">
                          Do not hestitate to reach out to us if you have any
                          questions via "Contact Us" button.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-gray-100 
                    border border-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-200"
                    onClick={() => cancel(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
