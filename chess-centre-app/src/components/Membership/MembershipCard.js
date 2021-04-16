import React from "react";
import { Link } from "react-router-dom";

function MembershipCard({
  title,
  price,
  subHeading,
  benefits,
  discounted,
  plan,
}) {
  // HERE WE SHOULD DETERMINE CURRENT SIGNED IN / SUBSCRIBED STATUS

  // IF NOT SIGNED IN && NOT SUBSCRIBED = "sign in"

  // IF SIGNED IN && NOT SUBSCRIBED = "subscribe"

  // IF SIGNED && SUBSCRIBED = "cancel" OR "switch membership" OR direct to profile payment management screen

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
        <div>
          {discounted ? (
            <h3
              className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-orange-500 to-red-300 text-white"
              id="tier-standard"
            >
              {title}
            </h3>
          ) : (
            <h3
              className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-pink-600 to-pink-400 text-white"
              id="tier-standard"
            >
              {title}
            </h3>
          )}
        </div>
        <div className="mt-4 flex items-baseline text-6xl font-extrabold">
          {price}
          <span className="ml-1 text-2xl font-medium text-gray-500">/mo</span>
        </div>
        <p className="mt-5 text-lg text-gray-500">{subHeading}</p>
      </div>
      <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
        <ul className="space-y-4">
          {benefits.map((benefit) => (
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <span className="h-6 flex items-center sm:h-7">
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
              </div>
              <p className="ml-3 text-base text-gray-700">{benefit}</p>
            </li>
          ))}
        </ul>
        <div className="rounded-md shadow">
          <Link
            to={`/register?plan=${plan}`}
            className={`flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white ${
              discounted ? "bg-orange-brand " : "bg-teal-600 "
            } ${discounted ? "hover:bg-orange-400" : "hover:bg-teal-brand"}`}
            aria-describedby="tier-standard"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MembershipCard;
