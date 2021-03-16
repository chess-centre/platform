import React from "react";

function MembershipCard({ title, price, subHeading, benefits, discounted }) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
        <div>
          <h3
            className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-orange-100 text-orange-600"
            id="tier-standard"
          >
            {title}
          </h3>
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
                <svg
                  className="h-6 w-6 text-green-500"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="ml-3 text-base text-gray-700">{benefit}</p>
            </li>
          ))}
        </ul>
        <div className="rounded-md shadow">
          <a
            href="/"
            className={`flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-${
              discounted ? "orange-600" : "teal-800"
            } hover:bg-${
              discounted ? "orange-700" : "teal-900"
            }" aria-describedby="tier-standard`}
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default MembershipCard;
