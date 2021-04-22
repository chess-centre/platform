import React, { useState } from "react";
import { Input } from "@windmill/react-ui";
import { useAuthState, updateUserAttributes } from "../../../../context/Auth";

import { useToasts } from "react-toast-notifications";
const FIRST_NAME = "first_name";
const LAST_NAME = "last_name";
const EMAIL_ADDRESS = "email_address"


function AccountInfo() {
  const { addToast } = useToasts();
  const { user } = useAuthState();
  const { email, email_verified, given_name, family_name } = user.attributes;

  const [firstName, setFirstName] = useState(given_name);
  const [lastName, setLastName] = useState(family_name);

  const updatePersonalInfo = async () => {
    if (!firstName || !lastName) {
      addToast("First Name or Surname cannot be blank.", {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }
    const error = await updateUserAttributes(firstName, lastName);
    if (error) {
      addToast("Oops! Something went wrong.", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    } else {
      addToast("Account info - saved!", {
        appearance: "success",
        autoDismiss: true,
      });
      return;
    }
  };

  const handleInput = (id, value) => {
    switch (id) {
      case FIRST_NAME:
        setFirstName(value);
        break;
      case LAST_NAME:
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
      <div className="shadow rounded-lg overflow-hidden">
        <div className="bg-white dark:bg-gray-800 py-6 px-6 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Account Information
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              These details are used to help pairing
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
              <Input
                className="text-xs sm:text-sm mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-400 focus:border-teal-400 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                value={firstName}
                onChange={(e) => handleInput(e.target.id, e.target.value)}
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
              <Input
                value={lastName}
                onChange={(e) => handleInput(e.target.value)}
                type="text"
                name={LAST_NAME}
                id={LAST_NAME}
                autoComplete="off"
                className="text-xs sm:text-sm mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-400 focus:border-teal-400 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
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
                value={email}
                disabled
                type="text"
                name={EMAIL_ADDRESS}
                id={EMAIL_ADDRESS}
                autoComplete="email"
                className="text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-70"
              />
            </div>
            {email_verified ? (
              <div className="col-span-2 sm:col-span-3">
                <div className="mt-8 flex align-middle">
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
                  <span className="flex text-gray-500 dark:text-gray-400 -mt-1 sm:mt-1 text-xs sm:text-sm font-medium">
                    Email Verified
                  </span>
                </div>
              </div>
            ) : // Here we should provide a "verify email button"
            null}
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6 border-t border-gray-50 dark:border-gray-700">
          <button
            onClick={updatePersonalInfo}
            className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-xs sm:text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Update
          </button>
        </div>
      </div>
  );
}

export default AccountInfo;
