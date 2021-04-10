import React from "react";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

function OurMission() {
  return (
    <div>
      <div className="relative z-10 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav current="our-mission" />
      </div>
      <div className="py-16 xl:py-36 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-max lg:max-w-7xl mx-auto">
          <div className="relative mb-8 md:mb-2 md:px-6">
            <div className="text-base max-w-prose lg:max-w-none">
              <h2 className="leading-6 text-teal-600 font-semibold tracking-wide uppercase">
                Our Mission
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A blueprint for the future
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
                <div className="prose-lg text-gray-500 lg:max-w-none">
                  <p>
                    The Chess Centre is a dedicated, modern and comfortable
                    facility for the learning and playing of Chess. The idea
                    behind the Chess Centre was born out of the desire to having
                    cutting edge physical and digital facilities to support the
                    development of Chess. The founders, having played Chess
                    themselves since a young age, recognize the need to provide
                    a safe and appealing environment for encouraging new players
                    of all ages, backgrounds and abilities to the game.
                  </p>
                  <p>
                    The Chess Centre is open to all. Chess is not a game that
                    discriminates. Chess is universal and open to anyone who
                    wants to learn and play the game. The Chess Centre provides
                    a range of opportunities for those who share these aims to
                    meet, socialise and enjoy playing Chess.
                  </p>
                </div>
                <div className="mt-6 prose-lg text-gray-500 lg:mt-0">
                  <p>
                    It is our hope that the Chess Centre can provide a
                    blue-print for how the game of Chess can be organised,
                    modernized and made accessible to a new generation of Chess
                    players.
                  </p>
                  <p>
                    We welcome you to come join us on this journey, to be a
                    member, a volunteer or a contributor we know that however
                    large or small, we are sincerely grateful to everyone who
                    supports us.
                  </p>
                  <div className="inline-flex rounded-md shadow text-white">
                    <a
                      href="/membership"
                      className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-500 hover:bg-teal-700"
                    >
                      Join us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}

export default OurMission;
