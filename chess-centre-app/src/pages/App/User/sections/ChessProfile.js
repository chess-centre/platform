import { API, Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";

const getMember = /* GraphQL */ `
  query GetMember($id: ID!) {
    getMember(id: $id) {
      id
      about
      fideId
      ecfId
      username
      name
      email
      ecfRating
      ecfRapid
    }
  }
`;

export default function ChessProfile() {
  const [newECFId, setNewECFId] = useState("");
  const [newFIDEId, setNewFIDEId] = useState("");
  const [ecfRating, setEcfRating] = useState("");
  const [ecfRapid, setEcfRapid] = useState("");

  useEffect(() => {
    const fetchMember = async () => {
      const {
        attributes: { sub },
      } = await Auth.currentAuthenticatedUser();
      const {
        data: {
          getMember: { ecfId, fideId, ecfRating, ecfRapid },
        },
      } = await API.graphql({
        query: getMember,
        authMode: "AWS_IAM",
        variables: { id: sub },
      });
      setNewFIDEId(fideId || "");
      setNewECFId(ecfId || "");
      setEcfRating(ecfRating || "");
      setEcfRapid(ecfRapid || "");
    };
    fetchMember();
  }, []);

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
              <div className="">
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
                    className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3  text-gray-700 sm:text-gray-500 cursor-not-allowed
                      focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-60`}
                    disabled
                    value={newECFId}
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
                      className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3  text-gray-700 sm:text-gray-500 cursor-not-allowed
                      focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-60`}
                      disabled
                      value={ecfRating}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-span-3 gap-6 mt-6">
                  <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex">Rapidplay</div>
                    <input
                      className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3  text-gray-700 sm:text-gray-500 cursor-not-allowed
                      focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-60`}
                      disabled
                      value={ecfRapid}
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
                    className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3  text-gray-700 sm:text-gray-500 cursor-not-allowed
                focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-60`}
                    disabled
                    value={newFIDEId}
                    type="text"
                    name={"fide_ref"}
                    id={"fide_ref"}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:text-right text-xs sm:px-6 border-t border-gray-50 dark:border-gray-700 italic text-center">
          <span>
            These fields will be automatically populated once you have an
            official rating with the{" "}
            <a
              className="text-teal-600 hover:text-teal-500"
              href="https://www.englishchess.org.uk/"
              target="_blank"
              rel="noreferrer"
            >
              English Chess Federation.
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
