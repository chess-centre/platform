import React from "react";
import { useAuthState, updateUserAttributes } from "../../../context/Auth";

function Profile() {
  
  const { user } = useAuthState();
  const { email, family_name, given_name } = user.attributes;
  const [personalInfo, setPersonalInfo] = React.useState({
    email,
    family_name,
    given_name
  })

  const updatePersonalInfo = async () => {
    if(!personalInfo.family_name || !personalInfo.given_name) {
      // TODO: handle input warnings!
      return;
    }
    const updated = await updateUserAttributes(personalInfo.given_name, personalInfo.family_name);
    // TODO: handle completed update!
    console.log(updated);
  }


  return (
    <div className="mt-4 mb-4 lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
        <nav className="space-y-1">
          {/* <!-- Current: "bg-gray-50 text-teal-700 hover:text-teal-700 hover:bg-white", Default: "text-gray-900 hover:text-gray-900 hover:bg-gray-50" --> */}
          <a
            href="#"
            className="bg-gray-50 dark:bg-gray-800 text-teal-700 dark:text-teal-400 hover:text-teal-700 hover:bg-white group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            aria-current="page"
          >
            {/* <!-- Current: "text-teal-500 group-hover:text-teal-500", Default: "text-gray-400 group-hover:text-gray-500" --> */}

            <svg
              className="text-teal-500 dark:text-teal-400 group-hover:text-teal-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="truncate">Account</span>
          </a>

          <a
            href="#"
            className="text-gray-900 dark:text-gray-50 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium"
          >
            <svg
              className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span className="truncate">Plan &amp; Billing <span className="text-gray-400">(coming soon)</span></span>
          </a>

          <a
            href="#"
            className="text-gray-900 dark:text-gray-50 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700  group rounded-md px-3 py-2 flex items-center text-sm font-medium"
          >
            <svg
              className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
              />
            </svg>
            <span className="truncate">Integrations <span className="text-gray-400">(coming soon)</span></span>
          </a>
        </nav>
      </aside>

      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <div>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white dark:bg-gray-800 py-6 px-4 space-y-6 sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                  This indivation will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Username
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                      chesscentre.online/member/
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="focus:ring-teal-500 focus:border-teal-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </div>
              </div>
            

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                <label
                    htmlFor="ecf_id"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    ECF id
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="focus:ring-teal-500 focus:border-teal-500 flex-grow block w-full min-w-0 rounded-md dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900 sm:text-sm border-gray-300"
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                <label
                    htmlFor="fide_id"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    FIDE id
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="focus:ring-teal-500 focus:border-teal-500 flex-grow block w-full min-w-0 rounded-md dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900 sm:text-sm border-gray-300"
                    />
                  </div>
                </div>
              </div>

                <div className="col-span-3">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows="3"
                      className="shadow-sm focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border-gray-300 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900 rounded-md"
                      placeholder="you@example.com"
                    ></textarea>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6 dark:divide-white dark:divide-y">
              <button
                className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white dark:bg-gray-800 py-6 px-4 space-y-6 sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                  These details are used to help pairing 
                </p>
              </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    First name
                  </label>
                  <input
                    value={personalInfo.given_name}
                    onChange={e => setPersonalInfo(s => ({...s, given_name: e.target.value }))}
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Last name
                  </label>
                  <input
                    value={personalInfo.family_name}
                    onChange={e => setPersonalInfo(s => ({...s, family_name: e.target.value }))}
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="family-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="email_address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <input
                    value={email}
                    disabled
                    type="text"
                    name="email_address"
                    id="email_address"
                    autoComplete="email"
                    className="mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6">
              <button
                onClick={updatePersonalInfo}
                className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white dark:bg-gray-800 py-6 px-4 space-y-6 sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Notifications
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                  Let us know how we can keep in touch with you. We promise never to spam you 😊
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
                      <label htmlFor="events_email" className="font-medium text-gray-700 dark:text-gray-300">
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
                        <label htmlFor="offers_email" className="font-medium text-gray-700 dark:text-gray-300">
                          Offers and Promotions
                        </label>
                        <p className="text-gray-500 dark:text-gray-500">
                          Get notified if we have any special offers or promotions on entries to our events.
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
                      <label htmlFor="events_text" className="font-medium text-gray-700 dark:text-gray-300">
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
                        <label htmlFor="offers_text" className="font-medium text-gray-700 dark:text-gray-300">
                          Offers and Promotions
                        </label>
                        <p className="text-gray-500 dark:text-gray-500">
                          Get notified if we have any special offers or promotions on entries to our events.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6">
              <button
                className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
