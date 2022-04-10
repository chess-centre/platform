import { useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import FooterLanding from "../../components/Footer/LandingFooter";
import LandingNav from "../../components/Navigation/LandingNav";
import "swagger-ui-react/swagger-ui.css";
import "../../assets/css/swagger-custom.css";

const Developer = () => {
  useEffect(() => {
    document.title = "The Chess Centre | Developer";
  }, []);

  return (
    <div>
      <div className="bg-white">
        <div className="relative bg-gray-50 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
          <LandingNav />
        </div>
        <div className="bg-white">
          <div className="relative">
            <svg
              className="hidden xl:block absolute top-0 right-0 md:-mr-32 2xl:-mr-4"
              width="500"
              height="300"
              fill="none"
              viewBox="0 0 500 300"
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
                    className="text-gray-100"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="500"
                height="300"
                fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
              />
            </svg>

            <svg
              className="hidden md:block absolute top-32 left-0 md:-ml-32 2xl:-ml-4"
              width="500"
              height="300"
              fill="none"
              viewBox="0 0 500 270"
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
                    className="text-gray-100"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="500"
                height="280"
                fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
              />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-28 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">
                Developer
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Building the future
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Providing the tools to make chess events more accessible
              </p>
            </div>
          </div>
        </div>
        <div className="py-2 sm:px-32">
          <SwaggerUI url="/swagger.json" />
        </div>
        
        <FooterLanding />
      </div>
    </div>
  );
};

export default Developer;
