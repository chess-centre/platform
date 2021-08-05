import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import FooterLanding from "../../components/Footer/LandingFooter";
import { useAuthState } from "../../context/Auth";
import LandingNav from "../../components/Navigation/LandingNav";
import ComingEvents from "../../components/Calendar/ComingEvents";
import FAQs from "../../components/FAQs/Faqs";
import FindUs from "../../components/Map/FindUs";
import DownloadPWA from "../../components/Quote/PWA";
import { getPlayerGames } from "../../api/profile/chess";

const Home = () => {
  const showLiveGames = false; // make config driven
  const { user } = useAuthState();

  useEffect(() => {
    const fetch = async () => {
      const data = await getPlayerGames(225527);
      console.log("DATA", data);
    }
    fetch();
  }, [])

  return (
    <div>
      <div className="relative bg-gray-100 sm:bg-gray-50 overflow-hidden">
        <div
          className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full"
          aria-hidden="true"
        >
          <div className="relative h-full max-w-7xl mx-auto">
            <svg
              className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
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
                height="784"
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
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
                height="784"
                fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
              />
            </svg>
          </div>
        </div>

        <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
          <LandingNav />

          <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-18 xl:mt-24">
            <div className="text-center">
              <h2 className="-mt-5">
                <span className="text-gray-900 text-8xl sm:text-9xl">
                  <i className="fas fa-chess"></i>
                </span>
              </h2>
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                <span className="font-light">Welcome to</span>
                <br className="xl:hidden" />
                <span className="bg-gradient-to-r text-gradient from-teal-600 to-teal-400">
                  {" "}
                  The Chess Centre
                </span>
              </h2>

              <div className="mt-3 sm:mt-3 sm:max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                It's time things changed around here.{" "}
                <span role="img">🚀</span>
                <p className="mt-2 text-teal-500">Visit our dedicated venue in Ilkley</p>
              </div>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className={user ? "hidden" : "rounded-md shadow"}>
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
              {showLiveGames && (
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Link
                      to="/broadcast/live"
                      className={`
                    w-full flex items-center justify-center 
                    px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:border-teal-800 
                    focus:shadow-outline-teal transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10`}
                    >
                      <span class="flex relative h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
                      </span>{" "}
                      <span className="ml-2">Live Games</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-28">
        
        <div className="pt-4 pb-0 sm:py-10">

          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/FYG4Envbzro`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
      </div>

      <ComingEvents />
      <FAQs />
      <FindUs />
      <DownloadPWA />
      <FooterLanding />
    </div>
  );
};

export default Home;
