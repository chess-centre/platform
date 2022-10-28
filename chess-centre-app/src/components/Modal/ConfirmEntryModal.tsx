import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ConfirmEntry({
  eventId,
  open,
  cancel,
  handleRegister,
}): JSX.Element {
  const confirmEntry = () => {
    handleRegister(eventId, undefined, undefined);
    cancel();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={cancel}>
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
                  <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
                    <i className="fas fa-heart text-red-600"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Confirm Entry
                    </Dialog.Title>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        As a valued member of our amazing chess community we are
                        delighted to offer <span>FREE</span> entry to this
                        event.
                      </p>
                      <p></p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-gray-100 
                    border border-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-200"
                    onClick={() => cancel()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-sm font-medium text-white hover:bg-teal-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    onClick={() => confirmEntry()}
                  >
                    Confirm Entry
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
