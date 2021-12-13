import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { prettyLongDate } from "../../../../utils/DateFormating"

const FIRST_NAME = "first_name";
const LAST_NAME = "last_name";
const EMAIL_ADDRESS = "email_address";

export default function AccountProfile(props) {
  const [user, setUser] = useState({
    email: "",
    email_verified: false,
    given_name: "",
    family_name: "",
  });

  useEffect(() => {
    const fetchCognitoUser = async () => {
      const {
        attributes: { email, email_verified },
      } = await Auth.currentAuthenticatedUser();
      const given_name = props.name?.split(" ")[0] || "";
      const family_name = props.name?.split(" ")[1] || "";
      setUser((s) => ({
        ...s,
        email,
        email_verified,
        given_name,
        family_name,
      }));
    };
    fetchCognitoUser();
  }, [props]);

  return (
    <div className="shadow rounded-lg overflow-hidden">
      <div className="bg-white dark:bg-gray-800 py-6 px-6 space-y-6 sm:p-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Account Information
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Basic account details for event pairings and results.
          </p>
        </div>

        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={FIRST_NAME}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              First name
            </label>
            <input
              className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3  text-gray-700 sm:text-gray-500 cursor-not-allowed
                focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-70`}
              disabled
              value={user.given_name}
              type="text"
              name={FIRST_NAME}
              id={FIRST_NAME}
              autoComplete="off"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={LAST_NAME}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Last name
            </label>
            <input
              value={user.family_name}
              disabled
              type="text"
              name={LAST_NAME}
              id={LAST_NAME}
              autoComplete="off"
              className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-gray-500 cursor-not-allowed
              focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-701`}
            />
          </div>

          <div className="col-span-4 sm:col-span-3">
            <label
              htmlFor={EMAIL_ADDRESS}
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email address
            </label>
            <input
              value={user.email}
              disabled
              type="email"
              name={EMAIL_ADDRESS}
              id={EMAIL_ADDRESS}
              autoComplete="off"
              className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-gray-500  cursor-not-allowed
              focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-70`}
            />
          </div>
          {user.email_verified && (
            <div className="col-span-2 sm:col-span-3">
              <div className="mt-8 flex">
                <span className="h-6 flex items-center sm:h-7 mr-1">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-teal-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-500 mt-1 sm:flex dark:text-gray-400 text-xs sm:text-sm font-medium">
                  Verified
                </span>
              </div>
            </div>
          )}
          {props.expires && <>
            <div className="col-span-4 sm:col-span-3">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="renewal"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Membership Renewal
                </label>
                <input
                  value={prettyLongDate(props.expires)}
                  disabled
                  type="text"
                  name="renewal"
                  id="renewal"
                  autoComplete="off"
                  className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-gray-500 cursor-not-allowed
                          focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-701`}
                />
              </div>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <div className="mt-8 flex">
                <span className="h-6 flex items-center sm:h-7 mr-1">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-pink-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-500 mt-1 sm:flex dark:text-gray-400 text-xs sm:text-sm font-medium">
                  Active
                </span>
              </div>
            </div>
          </>
          }
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-right text-xs sm:px-6 border-t border-gray-50 dark:border-gray-700 italic">
        Need to update these details?{" "}
        <a
          className="text-teal-600 hover:text-teal-500"
          href="mailto:support@chesscentre.online"
        >
          support@chesscentre.online
        </a>
      </div>
    </div>
  );
}
