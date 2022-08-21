import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

export default function ConfirmFestivalEntry({ open, setOpen, section, byes, url }) {

    const cancelButtonRef = useRef(null)


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
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100">
                                        <span className="text-lg"><i className="fas fa-badge-check text-teal-600"></i></span>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                            Festival Entry
                                        </Dialog.Title>
                                        <div className="mt-2 text-sm text-gray-500 space-y-3">
                                            <p className="text-sm text-gray-500">
                                                Please confirm your entry information is correct
                                            </p>
                                            <div className="text-lg mx-4">
                                                <table className="min-w-full divide-y divide-gray-300">
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        <tr>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Section</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-md text-teal-500 text-left">{section}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Bye Rounds</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-md text-teal-500 text-left">
                                                                {Boolean(byes.length) ? byes.split("")
                                                                    .map((bye: string, key: number) => {
                                                                        const isLast = byes.length === key + 1;
                                                                        return <span key={key} className="space-x-1">{bye}{isLast ? "" : <span className="text-gray-500 text-xs">{" "}&amp;{" "}</span>}</span>
                                                                    }) : <span className="text-gray-500">none</span>}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <p>
                                                You will then be directed to register your account (or login) and prompted for event payment
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <Link
                                        to={url}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:col-start-2 sm:text-sm"
                                    >
                                        Continue
                                    </Link>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <p className="text-center mt-4 text-xs text-gray-400 italic">
                                    Note: ECF rating details are captured automatically.
                                </p>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
