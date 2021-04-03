import React from "react";

function Notifications() {
  return (
    <div>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white dark:bg-gray-800 py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Notifications
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Let us know how we can keep in touch with you. We promise never to
              spam you 😊
            </p>
          </div>

          <fieldset>
            <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
              By Email
            </legend>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="h-5 flex items-center">
                  <input
                    id="events_email"
                    name="events_email"
                    type="checkbox"
                    className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-orange-brand dark:focus:ring-orange-brand rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="events_email"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Events
                  </label>
                  <p className="text-gray-500 dark:text-gray-500">
                    Get notified about special events and invitationals
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-start">
                  <div className="h-5 flex items-center">
                    <input
                      id="offers_email"
                      name="offers_email"
                      type="checkbox"
                      className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-orange-brand dark:focus:ring-orange-800 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="offers_email"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Offers and Promotions
                    </label>
                    <p className="text-gray-500 dark:text-gray-500">
                      Get notified if we have any special offers or promotions
                      on entries to our events.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
              By Text
            </legend>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="h-5 flex items-center">
                  <input
                    id="events_text"
                    name="events_text"
                    type="checkbox"
                    className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-orange-brand dark:focus:ring-orange-800 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="events_text"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Events
                  </label>
                  <p className="text-gray-500 dark:text-gray-500">
                    Get notified about special events and invitationals
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-start">
                  <div className="h-5 flex items-center">
                    <input
                      id="offers_text"
                      name="offers_text"
                      type="checkbox"
                      className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-orange-brand dark:focus:ring-orange-800 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="offers_text"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Offers and Promotions
                    </label>
                    <p className="text-gray-500 dark:text-gray-500">
                      Get notified if we have any special offers or promotions
                      on entries to our events.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6">
          <button className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notifications;