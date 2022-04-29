import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import JuniorClubImage from "../../assets/img/create-account-small.jpg";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

export default function JuniorClub() {
  const history = useHistory();

  useEffect(() => {
    document.title = "The Chess Centre | Junior Club";
  }, []);

  return (
    <div>
      <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>

      <div className="bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
          <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div>
              <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
                Junior Chess Club
              </h2>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Get started now
              </h3>
            </div>
          </div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <svg
                className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                />
              </svg>
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <figure>
                  <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                    <img
                      className="rounded-lg shadow-lg object-cover object-center"
                      src={JuniorClubImage}
                      alt="Girl playing chess"
                      width={1000}
                      height={1200}
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <p className="text-lg text-gray-500">
                  The Chess Centre’s junior Chess Club is open to boys and girls
                  aged 6 - 16 years of age.
                </p>
              </div>
              <div className="mt-5 prose prose-teal text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                <p>
                  Irrespective of experience, playing strength or ability all
                  children are welcome to join our Junior Club. In the Junior
                  Club they will learn from our dedicated coaching team all the
                  fundamentals of the game, whilst developing their cognitive
                  reasoning skills, problem solving and spatial awareness.
                </p>
                <p>
                  Alongside the more technical elements of the game we also
                  believe that it is just as important for Children learning
                  Chess to also develop their teamwork, sportsmanship and social
                  skills, all of which is possible as part of our Junior Club
                  activities.
                </p>
                <p>
                  So if you would like to learn more about the game of Chess in
                  a fun, friendly and safe environment then please{" "}
                  <a
                    className="text-teal-500 hover:text-teal-700 hover:underline"
                    href="mailto:info@chesscentre.online"
                  >
                    contact us
                  </a>{" "}
                  to book a place.
                </p>
              </div>
            </div>
            <div className="text-sm text-center mt-6 sm:hidden">
              <button
                className="text-teal-600 hover:text-teal-500"
                onClick={history.goBack}
              >
                <i className="fad fa-long-arrow-alt-left"></i> back
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}
