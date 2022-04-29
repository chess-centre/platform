import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import Devices from "../../assets/img/device-users.png";


export default function BetaSlideOut(props) {
  const { slideState, setIsSlideOutOpen } = props;
  const { open } = slideState;

  const mailToSupport = () => {
    const userAgent = window.navigator.userAgent
    return `mailto:support@chesscentre.online?subject=Support%20Issue&Body=%0D%0A// ---- DO NOT DELETE ----//%0D%0A Device: ${userAgent} %0D%0A// ---- THANK YOU ----//%0D%0A%0D%0A`
  }

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
                        className="text-2xl m-auto tracking-tight leading-10 font-extrabold text-blue-500 sm:text-3xl sm:leading-none"
                      >
                        <span className="text-gray-400 text-sm font-normal">It can only get </span>Beta ...
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
                  <div>
                    <div className="text-center">
                      <h3 className="mt-2 text-sm font-medium text-gray-900 mb-4">
                        We prioritise our efforts on most popular devices.
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 px-6 mb-4">
                        Unfortunately this means not everyone's experience is optimal. 😢
                      </p>
                      <img src={Devices} alt="device stats" className="h-128 m-auto" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        Spotted an issue?
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Send us a quick screenshot and we'll get right on it!
                      </p>
                      <div className="mt-6">
                        <a href={mailToSupport()}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                          <PlusIcon
                            className="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Raise Issue
                        </a>
                      </div>
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
                            className="w-full text-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
