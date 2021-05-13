import React from "react";
import { Link } from "react-router-dom";
import ClubNightImage from "../../assets/img/club-night.jpg";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

export default function ClubNight() {
  return (
    <div>
      <div className="relative pt-6 pb-2">
        <LandingNav />
      </div>

      <div className="bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto py-12 px-4">
          <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
          <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div>
              <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
              <i className="fas fa-dice"></i> All fun and games 
              </h2>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Club Night
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
                      src={ClubNightImage}
                      alt="Drinks"
                      width={400}
                      height={800}
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <p className="text-lg text-gray-500 text-justify">
                  Our Thursday club nights are when we welcome new guests, existing members and get together for a few adhoc games, maybe some analysis or endgame studies (if that's your thing)!
                  This is a social event and thus, an opportunity to grab a few drinks, play some games and catch up with your team mates.
                </p>
              </div>
              <div className="mt-5 prose prose-teal text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                <p>
                  We plan to run a few bespoke themed events during our club nights but primarily these will be left up to members to decide what takes their fancy to keep it fresh and interesting.
                </p>
                <p>Possible bespoke events:</p>
                <ul>
                  <li>Four Player Chess</li>
                  <li>Doubles Chess</li>
                  <li>Themed Opening Nights</li>
                  <li>Blitz Chess (3min / 5min)</li>
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
};
