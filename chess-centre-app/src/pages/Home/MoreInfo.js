import { useEffect } from "react";
import { Link } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import PlayersExample from "../../assets/img/players-example.png";
import DashboardExample from "../../assets/img/dashboard-example.png";
import IntegrationsExample from "../../assets/img/integrations-example.png";
import PlayersMobileExample from "../../assets/img/players-mobile-example.png";
import DashboardMobileExample from "../../assets/img/dashboard-mobile-example.png";
import IntegrationsMobileExample from "../../assets/img/integrations-mobile-example.png";

export default function MoreInfo() {
  useEffect(() => {
    document.title = "The Chess Centre | More Info";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="relative z-10 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6 border-b bg-gray-50">
        <LandingNav />
      </div>
      <div className="relative pt-16 pb-4 sm:pb-32 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 bg-white"
        />
        <div className="relative">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div>
                  <span className="h-12 w-12 rounded-md flex items-center justify-center bg-teal-600">
                    <i className="fal fa-users-crown text-2xl text-white"></i>
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                    Detailed player progress
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Follow the progress of your favourite local players. Anyone
                    participating in our events will have their results
                    automatically published, this includes games and performance
                    metrics.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="events"
                      className="inline-flex bg-teal-600 hover:bg-teal-500 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700"
                    >
                      See our events
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div>
                  <p className="text-base text-gray-500">
                    All games played during our events are submitted to the{" "}
                    <span className="font-medium">
                      English Chess Federation
                    </span>{" "}
                    for official rating publication.
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden sm:block mt-12 sm:mt-16 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={PlayersExample}
                  alt="Players performance tracking"
                />
              </div>
            </div>
            <div className="block sm:hidden mx-6 mt-10">
                <img
                  className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                  src={PlayersMobileExample}
                  alt=""
                />
            </div>
          </div>
        </div>
        <div className="mt-12 sm:mt-24">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
              <div>
                <div>
                  <span className="h-12 w-12 rounded-md flex items-center justify-center bg-teal-600">
                    <i className="fad fa-chart-pie text-2xl text-white"></i>
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                    Personal performance insights
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Quickly view your overall performance across all your over
                    the board games. We automatically track your rating
                    progress, even pulling your previous results.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="register"
                      className="inline-flex bg-teal-600 hover:bg-teal-500 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700"
                    >
                      Register now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
              <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={DashboardExample}
                  alt="Dashboard insights"
                />
              </div>
            </div>
            <div className="block sm:hidden mx-6 mt-16">
                <img
                  className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                  src={DashboardMobileExample}
                  alt=""
                />
            </div>
          </div>
        </div>
        <div className="relative pt-16">
            <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
              <div className="relative">
                <div className="text-center items-center object-center mx-auto">
                  <span className="h-12 w-12 rounded-md px-5 py-4 items-center justify-center bg-teal-600">
                    <i className="fas fa-chess-bishop text-2xl text-white"></i>
                  </span>
                </div>
                <p className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  Play online?
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  Pull all your ratings into one place
                </p>
              </div>
              <div className="hidden sm:block mt-12 -mb-10 sm:-mb-24 lg:-mb-80">
                <img
                  className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                  src={IntegrationsExample}
                  alt=""
                />
              </div>
              <div className="block sm:hidden mx-6 mt-10">
                <img
                  className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                  src={IntegrationsMobileExample}
                  alt=""
                />
              </div>
            </div>
          </div>
      </div>

      <FooterLanding />
    </div>
  );
}
