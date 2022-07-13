import React, { useState, useEffect } from "react";
import moment from "moment";
import { classNames } from "../../../../utils/Classes";

export default function ChessProfile(props) {
  const {
    fideId,
    ecfId,
    ecfRating,
    ecfRapid,
    ecfMembership,
    ecfLastUpdated,
  } = props;

  const [lastUpdated, setLastUpdated] = useState(Date.now());

  useEffect(() => {
    if (ecfLastUpdated) {
      setLastUpdated(ecfLastUpdated);
    }
  }, [ecfLastUpdated]);

  return (
    <div>
      <div className="shadow rounded-lg overflow-hidden">
        <div className="bg-white dark:bg-gray-800 py-6 px-6 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Your chess rating information - used to track games and progress
              for official events.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3 gap-6">
              <div>
                <label
                  htmlFor="ecf_id"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <div className="flex">
                    ECF ref{" "}
                    <a
                      href="https://www.ecfrating.org.uk/v2/new/list_players.php"
                      alt="ECF Rating Website"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fad fa-question-circle ml-1 text-teal-600 hover:text-teal-700"></i>
                    </a>
                  </div>
                </label>

                <div className="mt-1 rounded-md shadow-sm flex">
                  <input
                    className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-gray-500 cursor-not-allowed
                    focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800`}
                    disabled
                    defaultValue={ecfId}
                    type="text"
                    name={"ecf_ref"}
                    id={"ecf_ref"}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3 gap-6 mt-6">
                  <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex">Standard</div>
                    <input
                      className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-gray-500 cursor-not-allowed
                      focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800`}
                      disabled
                      defaultValue={ecfRating}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-span-3 gap-6 mt-6">
                  <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex">Rapidplay</div>
                    <input
                      className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-gray-500 cursor-not-allowed
                      focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800`}
                      disabled
                      defaultValue={ecfRapid}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <div className="col-span-12 gap-6">
                <label
                  htmlFor="fide_id"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <div className="flex">
                    FIDE ref{" "}
                    <a
                      href="https://ratings.fide.com/"
                      alt="Fide Rating Website"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fad fa-question-circle ml-1 text-teal-600 hover:text-teal-700"></i>
                    </a>
                  </div>
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <input
                    className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-gray-500 cursor-not-allowed
                    focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800`}
                    disabled
                    defaultValue={fideId}
                    type="text"
                    name={"fide_ref"}
                    id={"fide_ref"}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <div className="inline-flex mt-6 sm:mt-14">
                  <div className="text-gray-700 text-sm font-medium mr-2">
                    ECF Member status:
                  </div>
                  <div className="-mt-1">
                    <EcfMembershipStatus status={ecfMembership} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {lastUpdated && (
            <div className="text-right text-xs text-gray-300 italic">
              Last updated: {moment(lastUpdated).format("Do MMM YY @ HH:mm")}{" "}
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-center sm:text-right text-xs sm:text-sm sm:px-6 border-t border-gray-50 dark:border-gray-700 italic">
          <span>
            These fields are automatically populated, our schedule runs daily to check against the{" "}
            <span className="block sm:hidden"></span>
            <a
              className="text-teal-600 hover:text-teal-500 text-"
              href="https://www.englishchess.org.uk/"
              target="_blank"
              rel="noreferrer"
            >
              English Chess Federation
            </a>
            {" "} rating database.
          </span>
        </div>
      </div>
    </div>
  );
}

const EcfMembershipStatus = ({ status }) => {
  const label = (txtColor, bgColor, text) => {
    return (
      <span
        className={classNames(
          txtColor,
          bgColor,
          `items-center px-2.5 py-0.5 rounded-md text-sm font-medium`
        )}
      >
        {text}
      </span>
    );
  };
  switch (status) {
    case "ECF SUPPORTER":
      return label("text-blue-800", "bg-blue-100", status);
    case "BRONZE":
      return label("text-white", "bg-yellow-700", status);
    case "SILVER":
      return label("text-cool-gray-800", "bg-cool-gray-100", status);
    case "GOLD":
      return label("text-yellow-800", "bg-yellow-100", status);
    case "PLATINUM":
      return label("text-pink-800", "bg-pink-100", status);
    default:
      return label("text-gray-400", "bg-gray-50", status ? status : "None");
  }
};
