import React, { useEffect } from "react";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

function OurVision() {
  useEffect(() => {
    document.title = "Sheffield Chess Centre | Our Vision";
  }, []);

  return (
    <div>
      <div className="relative z-10 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav current="our-mission" />
      </div>
      <div className="py-12 xl:py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-max lg:max-w-7xl mx-auto">
          <div className="relative mb-8 md:mb-2 md:px-6">
            <div className="text-base max-w-prose lg:max-w-none">
              <h2 className="leading-6 text-yellow-500 font-semibold tracking-wide uppercase">
                Our Vision
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Sheffield Chess Centre
              </p>
            </div>
          </div>
          <div className="relative">
            <svg
              className="hidden md:block absolute top-0 right-0 -mt-20 -mr-20"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="384"
                fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
              />
            </svg>
            <svg
              className="hidden md:block absolute bottom-0 left-0 -mb-20 -ml-20"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="7a00fe67-0343-4a3c-8e81-c145097a3ce0"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="384"
                fill="url(#7a00fe67-0343-4a3c-8e81-c145097a3ce0)"
              />
            </svg>
            <div className="relative md:bg-white md:p-6">
              <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="prose-lg text-gray-700 lg:max-w-none text-justify">
                  <p>
                    The Sheffield Chess Centre is one of the first dedicated Chess Centres in the United Kingdom.
                    In the United States and many European countries, where there is a tradition of chess venues open every day of the week, this wouldn’t be unusual.
                    Think of the world-famous traditions of the Marshall Chess Club, or the St. Louis club in Missouri known around the world.
                    But in England, such chess venues are rare. Ilkley successfully launched their chess centre just before the pandemic (if they can do it, so can we!),
                    and the London Mind Sports Centre has a focus on chess.
                    Our model is different to both, but we’re also learning from their experiences.
                  </p>
                  <p>
                    We’re a Community Interest Company, which means that if (eventually) we were ever to make a profit,
                    the ‘Asset Lock’ in our corporate governance requires us to pump it right back into the ‘community’ of chess players.
                    Player development is at the heart of our ethos.
                    From beginner to grandmaster, almost everyone wants to improve their own play.
                  </p>
                </div>
                <div className="mt-6 prose prose-lg text-gray-700 lg:mt-0 text-justify">
                  <p>
                    Chess is the great equaliser: your age, gender, race, etc. don’t mean anything once the battle begins on the 64 squares.
                    We want to foster the development of chess across South Yorkshire.
                    For everyone.
                  </p>
                  <p>
                    Chess is the great equaliser: your age, gender, race, etc. don’t mean anything once the battle begins on the 64 squares.
                    We want to foster the development of chess across South Yorkshire.
                    For everyone.
                  </p>
                  <p>
                    Whether it’s casual chess with a coffee and snack, coaching, sessions with titled players,
                    or a competitive rated event, we want all who are interested in chess to find that we offer something for them.
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}

export default OurVision;
