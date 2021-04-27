import React from "react";
import { Link } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

export default function ClubNight() {
  return (
    <div>
      <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>

      <div className="py-10 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="text-base max-w-prose mx-auto lg:max-w-none">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
              Fun, Games and everything inbetween
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Club Nights
            </p>
          </div>
          <div className="relative z-10 text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
            <p className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify">
              TBC
            </p>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="relative z-10">
              <div className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify">
                <p>TBC</p>

                <p>TBC</p>

                <p>TBC</p>
              </div>
              <div className="text-sm text-left mt-6 hidden sm:block">
                <Link
                  className="text-teal-600 hover:text-teal-500"
                  to="/events"
                >
                  <i className="fad fa-long-arrow-alt-left"></i> back
                </Link>
              </div>
            </div>

            <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
              <svg
                className="hidden sm:block absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
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
                  height={384}
                  fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)"
                />
              </svg>

              <div className="text-sm text-center mt-6 sm:hidden">
                <Link
                  className="text-teal-600 hover:text-teal-500"
                  to="/"
                >
                  <i className="fad fa-long-arrow-alt-left"></i> back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
};