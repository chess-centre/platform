import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";

const contacts = [
  {
    name: "Jonathan Arnott",
    email: "info@chesscentre.online",
    image: "/andy.png",
    enquiryType: ["general", "membership", "juniors"]
  },
  {
    name: "Matt Webb",
    email: "support@chesscentre.online",
    image: "/matt.png",
    enquiryType: ["technical", "result errors"]
  }
];

export default function EventContactUsModal({ open, setOpen, eventName, eventStart }): JSX.Element {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                    <i className="fas fa-headset text-yellow-500"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Contact Us
                    </Dialog.Title>
                    <div className="mt-2">
                      <ul className="divide-y divide-gray-200 text-left">
                        {contacts.map((contact, key) => (
                          <li key={key} className="py-4 flex">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={contact.image}
                              alt=""
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {contact.name}
                              </p>
                              <p className="text-sm text-yellow-400">
                                <a href={`mailto:${contact.email}?subject=Event%20Enquiry%20|%20${eventName}%20${moment(eventStart).format("Do MMMM")}`}>{contact.email}</a>
                              </p>
                              <p className="text-xs space-x-2 mt-2 text-gray-500">
                                Enquiry{" "}
                                {contact.enquiryType?.map((type, key) => <span key={key} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-pink-800">{ type }</span>)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 sm:text-sm"
                    onClick={() => setOpen(false)}
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
