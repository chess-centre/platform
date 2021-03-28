import { TechRoadmap } from "./TechRoadmap";
import LandingNav from "../Navigation/LandingNav";
import FooterLanding from "../Footer/LandingFooter";

const Roadmap = () => {
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">
              Roadmap
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              What's going on?
            </p>
            <p className="text-base max-w-xl mt-5 mx-auto sm:text-xl text-gray-500">
              We want to involve as many people as possible in our mission! Follow our plans, get involved.
            </p>
            
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-8 lg:px-10">
        <TechRoadmap></TechRoadmap>
      </div>
      
      <FooterLanding />
    </div>
  );
};

export default Roadmap;
