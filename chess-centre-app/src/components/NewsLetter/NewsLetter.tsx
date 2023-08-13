import { API } from "aws-amplify";
import React, { useState } from "react";
import Loading from "../../assets/img/loading.svg";
import ValidateEmail from "../../utils/ValidateEmail";

const createMailingList = /* GraphQL */ `
  mutation CreateMailingList(
    $input: CreateMailingListInput!
    $condition: ModelMailingListConditionInput
  ) {
    createMailingList(input: $input, condition: $condition) {
      email
      enabled
    }
  }
`;

export default function NewsLetter() {
  const [isSubcribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!ValidateEmail(email)) return;
    setIsLoading(true);
    try {
      const user = {
        email,
        enabled: true,
      };
      const newUser = await API.graphql({
        query: createMailingList,
        variables: { input: user }
      });

      if (newUser) {
        setIsSubscribed(true);
        setEmail("");
      }
      setIsLoading(false);
    } catch (error) {
      setIsSubscribed(false);
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="relative sm:py-16">
        <div aria-hidden="true" className="hidden sm:block">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
          <svg
            className="absolute top-8 left-1/2 -ml-3"
            width={404}
            height={392}
            fill="none"
            viewBox="0 0 404 392"
          >
            <defs>
              <pattern
                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={392}
              fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
            />
          </svg>
        </div>
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative rounded-2xl px-6 py-10 bg-yellow-500 overflow-hidden shadow-xl sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
            >
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  className="text-yellow-400 text-opacity-40"
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                />
                <path
                  className="text-yellow-600 text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                />
              </svg>
            </div>
            <div className="relative">
              {isLoading ? (
                <div className="flex">
                  <img
                    alt="Loading"
                    className="h-6 w-6 object-center"
                    src={Loading}
                  />
                  <p className="sm:text-center text-white ml-3 font-medium">
                    Subscribing to events...
                  </p>
                </div>
              ) : isSubcribed ? (
                <div className="sm:text-center">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                    Thank you!
                  </h2>
                  <p className="mt-6 mx-auto max-w-2xl text-lg text-yellow-100">
                    {email}
                  </p>
                  <p className="mt-6 mx-auto max-w-2xl text-lg text-yellow-200">
                    We look forward to sharing our future events with you.
                  </p>
                </div>
              ) : (
                <>
                  <div className="sm:text-center">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                      Get notified about our events.
                    </h2>
                    <p className="mt-6 mx-auto max-w-2xl text-lg text-yellow-200">
                      We're going to be hosting all kinds of fantastic events,
                      so stay tuned for great things to come!
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="mt-12 sm:mx-auto sm:max-w-lg sm:flex"
                  >
                    <div className="min-w-0 flex-1">
                      <label htmlFor="email_address" className="sr-only">
                        Email address
                      </label>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        id="email_address"
                        name="email_address"
                        value={email}
                        type="email"
                        className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-3">
                      <button
                        type="submit"
                        className="block w-full rounded-md border border-transparent px-5 py-3 bg-yellow-400 text-base font-medium text-white shadow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-500 sm:px-10 cursor-pointer"
                      >
                        Notify me
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
