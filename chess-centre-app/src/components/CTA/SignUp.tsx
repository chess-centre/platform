import { Link } from "react-router-dom";
import GamesExample from "../../assets/img/games-example.png";

export default function SignUp() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-4 sm:pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <i className="fal fa-analytics"></i><span className="block">Track your progress</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-teal-200">
                View your previous games and instantly check them with Lichess analysis.
              </p>
              <Link
                to="/register"
                className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-teal-600 hover:bg-teal-50"
              >
                Register free
              </Link>
              <Link
                to="/more-info"
                className="ml-2 mt-4 sm:mt-8 px-5 py-3 inline-flex items-center text-base font-medium text-gray-50 hover:text-white"
              >
                More info
              </Link>
            </div>
          </div>
          <div className="-mt-6 aspect-w-2 aspect-h-1">
            <img
              className="transform translate-x-6 translate-y-6 rounded-md sm:object-scale-down object-left-top xl:translate-x-10 lg:translate-y-20"
              src={GamesExample}
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  )
}