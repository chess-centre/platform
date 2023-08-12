import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

function OurMission() {
  useEffect(() => {
    document.title = "Sheffield Chess Centre | Our Mission";
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
                <div className="prose-lg text-gray-700 lg:max-w-none">
                  <p>
                    The Chess Centre is a dedicated, modern and comfortable
                    facility for learning and playing Chess.
                  </p>
                  <p>
                    Our focus is to provide cutting-edge physical and digital
                    facilities to support the growth and development of Chess.
                  </p>
                  <p>
                    We,{" "}
                    <Link
                      to="/about"
                      className="text-yellow-400 hover:text-yellow-600"
                    >
                      the founders
                    </Link>
                    , having played Chess from an early age have benefitted from
                    the discipline, concentration and creativity that this game
                    brings. It is these benefits which we want to share with
                    you.
                  </p>
                  <p>
                    The Chess Centre is open to all, it is not a game that
                    discriminates, it is universal and welcomes anyone who wants
                    to learn and play. The Chess Centre provides a range of
                    opportunities for those who share these aims to meet,
                    socialise and enjoy playing Chess.
                  </p>
                </div>
                <div className="mt-6 prose prose-lg text-gray-700 lg:mt-0">
                  <p>
                    It is our hope that The Chess Centre can provide a
                    blue-print for how the game of Chess can be organised,
                    modernized and made accessible to all.
                  </p>
                  <blockquote>
                    <p>
                      This is only a foretaste of what is to come, and only the
                      shadow of what is going to be
                    </p>
                  </blockquote>
                  <p>
                    We invite you to come join us on this exciting journey, to
                    be a member, a volunteer, a code contributor or just a
                    friendly face to pop in from time to time. We know that
                    however large or small your involvement we are sincerely
                    grateful to everyone who supports us. ❤️
                  </p>
                </div>
                <div></div>
              </div>
              <div className="lg:grid lg:grid-cols-1 lg:gap-6">
                <div className="object-center text-center mt-10 sm:-mt-10">
                  <Link
                    to="/roadmap"
                    className="sm:float-right flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700"
                  >
                    Our Roadmap
                  </Link>
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
