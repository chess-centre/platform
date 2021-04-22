import React, { useState, useRef } from "react";
import { Input, Textarea } from "@windmill/react-ui";
import { useToasts } from "react-toast-notifications";
import {
  updateChessInfo,
} from "../../../../api/profile/chess";

function ProfileInfo({ id, username, about, fideId, ecfId }) {
  const [newUsername, setUsername] = useState(username);
  const [newAbout, setAboutMe] = useState(about);

  // Fetches data from the "ECFPlayer" & "FidePlayer" dataStores and matches it to the users ID provided:
  const [ecfRatingId, setECFRatingId] = useState({});
  const [fideRatingId, setFideRatingId] = useState({});

  // Input values:
  const fideIdValue = useRef(fideId);
  const ecfIdValue = useRef(ecfId);
  const { addToast } = useToasts();

  const hasChanged = () => {
    // basic check to see if we actually need to do anything:
    let changed = false;
    if (newAbout !== about) {
      //console.log('about', newAbout, about)
      changed = true;
    }
    if (ecfRatingId.ecfId !== ecfId) {
      //console.log('ecfId', ecfRating, ecfId)
      changed = true;
    }
    if (fideRatingId.fideId !== fideId) {
      //console.log('fideId', fideRating, fideId)
      changed = true;
    }
    return changed;
  };

  const handleSave = async () => {
    if (hasChanged()) {
      const data = {
        newUsername,
        fideId: fideIdValue.current.value
          ? Number(fideIdValue.current.value)
          : null,
        ecfId: ecfIdValue.current.value,
        newAbout,
      };
      await updateChessInfo(id, data);
      addToast("Updates - saved!", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      console.log("Nothing to do here.");
    }
  };

  return (
    <div>
      <div className="shadow rounded-lg overflow-hidden">
        <div className="bg-white dark:bg-gray-800 py-6 px-6 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Tell us a little more about you! Providing any of your
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                About
              </label>
              <div className="mt-1">
                <Textarea
                  id="about"
                  name="about"
                  rows="4"
                  onChange={(e) => setAboutMe(e.target.value)}
                  defaultValue={about}
                  className="text-xs sm:text-sm mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-400 focus:border-teal-400 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                  placeholder="Example: My favourite opening is the Sicilian."
                ></Textarea>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                Tell us what you love about Chess{" "}
                <span className="text-gray-900">
                  <i className="fas fa-chess"></i>
                </span>
              </p>
            </div>

            <div className="col-span-6 sm:col-span-3 gap-6">
              <div className="col-span-12 gap-6">
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
                      <i class="fad fa-question-circle ml-1 text-teal-600 hover:text-teal-700"></i>
                    </a>
                  </div>
                </label>

                <div className="mt-1 rounded-md shadow-sm flex">
                  <Input
                    onChange={(e) => setECFRatingId(e.target.value)}
                    ref={ecfIdValue}
                    type="text"
                    name="ecf_ref"
                    id="ecf_ref"
                    autoComplete="off"
                    defaultValue={ecfId}
                    className="text-xs sm:text-sm mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-400 focus:border-teal-400 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                  />
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
                      <i class="fad fa-question-circle ml-1 text-teal-600 hover:text-teal-700"></i>
                    </a>
                  </div>
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <Input
                    onChange={(e) => setFideRatingId(e.target.value)}
                    ref={fideIdValue}
                    type="text"
                    name="fide_ref"
                    id="fide_ref"
                    autoComplete="off"
                    defaultValue={fideId}
                    className="text-xs sm:text-sm mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-400 focus:border-teal-400 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6 border-t border-gray-50 dark:border-gray-700">
          <button
            onClick={handleSave}
            className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-xs sm:text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
