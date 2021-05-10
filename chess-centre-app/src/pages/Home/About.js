import React from "react";
import FooterLanding from "../../components/Footer/LandingFooter";
import LandingNav from "../../components/Navigation/LandingNav";
import Volunteers from "../../components/Volunteers";
import MattAndyImage from "../../assets/img/matt-andy.jpg";

const About = () => {
  return (
    <div>
      <div className="bg-white">
        <div className="relative bg-gray-50 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
          <LandingNav />
        </div>
        <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6 text-center">
            About us
          </h2>
          <div className="space-y-12 lg:grid lg:grid-cols-1 lg:gap-8 lg:space-y-0 mb-4">
            <div className="mb-2 m-auto object-center">
              <img
                className="object-cover shadow-lg rounded-lg"
                src={MattAndyImage}
                alt=""
              />
            </div>
          </div>
          <div className="space-y-12 lg:grid lg:grid-cols-1 lg:gap-8 lg:space-y-0 mb-8">
            <p className="text-xl text-gray-500 text-center sm:px-52">
              Playing chess together since secondary school Matt &#38; Andy
              decided now was time to put their professional skills to good use
              and setup a dedicated centre for this wonderful game.
            </p>
          </div>
          <div className="space-y-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
            <div className="lg:col-span-2">
              <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
                <li>
                  <div className="space-y-4">
                    <div className="text-lg leading-6 font-medium space-y-1 text-center">
                      <h3>Matthew Webb</h3>
                      <p className="text-teal-600">Co-founder</p>
                    </div>
                    <div className="text-lg text-justify text-gray-500 mb-2">
                      <p className="mb-2">
                        Matt has competed in Chess events all across the World,
                        taking a year out of professional working life to
                        compete in competitions far and wide. Matt has won
                        numerous UK Open Congresses and has represented
                        Yorkshire (Open) team on top board, winning three county
                        championships.
                      </p>
                      <p className="mb-2">
                        When not building our digital Chess Centre experience,
                        Matt is a Lead Engineer working for a Leading Global
                        Investment Bank. He enjoys spending time with his Nieces
                        &#38; Nephews and also travelling to Las Vegas to play
                        in the World Series of Poker.
                      </p>
                      <p className="mb-2">
                        Matt's two favourite players are{" "}
                        <a
                          className="text-teal-600 hover:text-teal-700 hover:underline"
                          href="https://en.wikipedia.org/wiki/Rashid_Nezhmetdinov"
                        >
                          Rashid Nezhmetdinov
                        </a>{" "}
                        and{" "}
                        <a
                          className="text-teal-600 hover:text-teal-700 hover:underline"
                          href="https://en.wikipedia.org/wiki/Baadur_Jobava"
                        >
                          Baadur Jobava
                        </a>{" "}
                        as they appeal to his natural attacking style.
                      </p>
                      <p></p>
                    </div>

                    <ul className="flex space-x-5">
                      <li>
                        <a
                          href="https://www.linkedin.com/in/matt-d-webb/"
                          className="text-gray-400 hover:text-blue-800 fa-2x"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://github.com/matt-d-webb"
                          className="text-gray-400 hover:text-gray-900 fa-2x"
                        >
                          <span className="sr-only">GitHub</span>
                          <i className="fab fa-github"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="space-y-4">
                    <div className="text-lg leading-6 font-medium space-y-1 text-center">
                      <h3>Andrew Wainwright</h3>
                      <p className="text-teal-600">Co-founder</p>
                    </div>
                    <div className="text-lg text-justify">
                      <p className="text-gray-500 mb-2">
                        Andy has run a range of teams, clubs and Chess events
                        for over 20 years, ranging from local leagues, to county
                        and junior chess. Having learned Chess at an early age
                        Andy was keen to share the benefits of the game with his
                        own children, and has also coached junior players for
                        many years. As such, Andy leads our junior development
                        activities and is lead coach for all of our beginners.
                      </p>
                      <p className="text-gray-500 mb-2">
                        When not coaching Chess, Andy is a Technology lawyer,
                        Junior Football Coach, Dad and keen Labrador walker! His
                        favourite opening is the Sicilian Najdorf, and his
                        favourite player is{" "}
                        <a
                          className="text-teal-600 hover:text-teal-700 hover:underline"
                          href="https://en.wikipedia.org/wiki/Mikhail_Tal"
                        >
                          Mikhail Tal
                        </a>
                        .
                      </p>
                    </div>
                    <ul className="flex space-x-5">
                      <li>
                        <a
                          href="https://www.linkedin.com/in/andrew-wainwright-88b60a6/"
                          className="text-gray-400 hover:text-blue-800 fa-2x"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative mt-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-gray-500">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#6B7280"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
          <Volunteers />
        </div>

        <FooterLanding></FooterLanding>
      </div>
    </div>
  );
};

export default About;
