import { Link } from "react-router-dom";
import FestivalBuilding from "../../assets/img/festival_building.png";

const FestivalCTA = () => {
  return (
    <div className="relative bg-gray-50 py-10">
      <div className="text-center items-center mx-auto px-4 sm:px-28">
        <img
          alt="Festival Building"
          className="w-64 mx-auto"
          src={FestivalBuilding}
        />
        <h1 className="text-3xl font-extrabold tracking-tight  text-teal-brand sm:text-5xl">
          <span className="text-orange-brand">Ilkley</span> Chess Festival
        </h1>
        <p className="text-md text-gray-600 mt-2">
          <time dateTime="2022-09-16">September 16th - 18th</time>
        </p>

        <div className="relative mt-4">
          <div
            className="absolute inset-0 flex items-center sm:mx-80"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <Link
              to="/festival"
              className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalCTA;
