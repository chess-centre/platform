import React from "react";
import { Link } from "react-router-dom";
import MatchNightImage from "../../assets/img/match-night.jpg";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

export default function MatchNight() {
  return (
    <div>
      <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>

      <div className="bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
          <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div>
              <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
                Put your skills to the test
              </h2>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Match Nights
              </h3>
            </div>
          </div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <svg
                className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="de316486-4a29-4312-bdfc-fbce2132a2c1"
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
                  fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                />
              </svg>
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <figure>
                  <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                    <img
                      className="rounded-lg shadow-lg object-cover object-center"
                      src={MatchNightImage}
                      alt="Girl playing chess"
                      width={1000}
                      height={1200}
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <p className="text-lg text-gray-500">
                  These dates are reserved for our Chess Centre members, here we
                  participate in team events and competitions. These are either
                  internally hosted or events being run as part of the wider
                  Chess community such as the{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-500 hover:text-teal-700 no-underline"
                    href="https://www.bradfordchess.co.uk/"
                  >
                    BDCA Bradford Chess League
                  </a>
                  .
                </p>
              </div>
              <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                <p>
                  Each Match Night will be listed and detailed within our app so
                  you can see our fixtures are up coming and what are the
                  various events we are involved in.
                </p>
                <p>The types of events we'll participate in:</p>
                <ul>
                  <li>Team league matches</li>
                  <li>Team Cup competitions</li>
                  <li>Individual events</li>
                </ul>
              </div>
            </div>
            <div className="text-sm text-center mt-6 sm:hidden">
              <Link className="text-teal-600 hover:text-teal-500" to="/">
                <i className="fad fa-long-arrow-alt-left"></i> back
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}
