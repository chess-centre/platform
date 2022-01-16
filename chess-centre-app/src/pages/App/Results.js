import { useEffect } from "react";
import Logo from "../../assets/img/logo.svg";

function Results() {
  useEffect(() => {
    document.title = "The Chess Centre | Results";
  }, []);

  return (
    <div>
      <div className="relative mt-10 sm:mt-20 py-3 sm:max-w-xl mx-auto">
        <div
          className={
            "absolute inset-0 bg-teal-700 shadow-lg transform skew-y-0 sm:-rotate-6 rounded-lg"
          }
        ></div>

        <div className="relative px-4 ml-2 mr-2 py-10 bg-white shadow-lg rounded-lg sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <img alt="Logo" src={Logo} className="h-7 sm:h-8 m-auto mb-2" />
            </div>
            <div className="divide-y divide-gray-200">
              <div className="sm:py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  COMING SOON!
                </h1>
                <h4 className="text-center text-gray-700">Results</h4>
                <p className="text-teal-800">
                  <span role="img">🐻</span> with us, we're busy completely
                  rebuilding your results view...
                </p>
                <ul className="list-disc space-y-2">
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">
                      See the latest result, tables, pictures and links to ECF
                      submitted data
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">
                      Check games of each player and see their rating
                      performance
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">
                      Play through all DGT board broadcast games via Lichess
                    </p>
                  </li>
                </ul>
              </div>
              <div className="pt-4 text-base leading-6 sm:text-lg sm:leading-7 mt-3">
                <p className="font-bold">Write code? 🐵</p>
                <p>
                  Checkout the source code for this site and get involved.
                  <a
                    href="https://github.com/chess-centre"
                    className="text-teal-600 hover:text-teal-700"
                  >
                    {" "}
                    Let's do this &rarr;{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
