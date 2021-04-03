import React from "react";
import { Link } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";


function Events() {
  return (
    <div>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
          <LandingNav current="events" />
        </div>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">
                Events
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Join us
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Our members can register for events and see more about the
                players already entered.
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="max-w-7xl mx-auto py-10 px-4 sm:py-10 sm:px-6 lg:px-8 text-center">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                defaultValue="All"
                className="block w-full focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
              >
                <option>Junior</option>
                <option>Congresses</option>
                <option>Socials</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <nav
                className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                aria-label="Tabs"
              >
                <Link
                  to="#"
                  className="text-gray-900 rounded-l-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                  aria-current="page"
                >
                  <span>All</span>
                  <span
                    aria-hidden="true"
                    className="bg-teal-500 absolute inset-x-0 bottom-0 h-0.5"
                  ></span>
                </Link>

                <Link
                  to="#"
                  className="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                >
                  <span>Junior</span>
                  <span
                    aria-hidden="true"
                    className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                  ></span>
                </Link>

                <Link
                  to="#"
                  className="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                >
                  <span>Congresses</span>
                  <span
                    aria-hidden="true"
                    className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                  ></span>
                </Link>

                <Link
                  to="#"
                  className="text-gray-500 hover:text-gray-700 rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                >
                  <span>Socials</span>
                  <span
                    aria-hidden="true"
                    className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                  ></span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}

export default Events;
