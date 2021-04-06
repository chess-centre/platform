import React, { useState, useRef } from "react";
import * as Icons from "../../../../icons";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ReactCountryFlag from "react-country-flag";
import {
  getFideData,
  getECFData,
  updateChessInfo,
} from "../../../../api/profile/chess";
import LoadingGif from "../../../../assets/img/loading-teal.svg";

const Icon = ({ icon, ...props }) => {
  const Icon = Icons[icon];
  return <Icon {...props} />;
};

const Loading = () => {
  return (
    <div className="mt-8 flex">
      <div className="">
        <img alt="Loading" className="h-5 w-5" src={LoadingGif} />
      </div>
      <div className="text-xs  text-pink-700 dark:text-pink-500 ml-2">
        retrieving...
      </div>
    </div>
  );
};

const SearchRating = ({ ratingType, searching, useFlag }) => {
  return (
    <div className="col-span-3 sm:col-span-4">
      {ratingType.currentRating && !searching ? (
        <div className="flex mt-9">
          {useFlag ? (
            <>
              {ratingType.toString().includes("Not") ? null : (
                <ReactCountryFlag countryCode="GB" svg />
              )}
              <div className="text-xs ml-2 text-gray-500 dark:text-gray-400">
                {ratingType.currentRating}
              </div>
            </>
          ) : (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {ratingType.currentRating}
            </div>
          )}
        </div>
      ) : searching && !ratingType.searchStatus ? (
        <Loading />
      ) : ratingType.searchStatus && !searching ? (
        <div className="flex mt-9">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {ratingType.searchStatus}
          </div>
        </div>
      ) : null}
    </div>
  );
};

function ProfileInfo({ id, username, about, fideId, ecfId }) {
  const [newUsername, setUsername] = useState(username);
  const [newAbout, setAboutMe] = useState(about);

  // Fetches data from the "ECFPlayer" & "FidePlayer" dataStores and matches it to the users ID provided:
  const [ecfRating, setECFRating] = useState({});
  const [fideRating, setFideRating] = useState({});

  // Input values:
  const fideIdValue = useRef(fideId);
  const ecfIdValue = useRef(ecfId);

  // Loading States:
  const [isSearchingECF, setIsSearchingECF] = useState(false);
  const [isSearchingFIDE, setIsSearchingFIDE] = useState(false);
  const { addToast } = useToasts();

  const hasChanged = () => {
    // basic check to see if we actually need to do anything:
    let changed = false;
    if (newAbout !== about) {
      //console.log('about', newAbout, about)
      changed = true;
    }
    if (ecfRating.currentRating || ecfRating.ecfId !== ecfId) {
      //console.log('ecfId', ecfRating, ecfId)
      changed = true;
    }
    if (fideRating.currentRating || fideRating.fideId !== fideId) {
      //console.log('fideId', fideRating, fideId)
      changed = true;
    }
    if (newUsername !== username) {
      //console.log('username', newUsername, about)
      changed = true;
    }
    return changed;
  };

  const getECFInfo = async (searchId) => {
    if (searchId) {
      const info = await getECFData(searchId);
      if (info && info.currentRating) {
        setECFRating(result => ({...result, ...info, searchStatus: "" }));
      } else {
        setECFRating({ searchStatus: "Not found. ☹️" });
      }
    }
  };

  const getFIDEInfo = async (searchId) => {
    if (searchId) {
      const info = await getFideData(searchId);
      if (info && info.currentRating) {
        setFideRating(result => ({...result, ...info, searchStatus: "" }));
        console.log(fideRating);
      } else {
        setFideRating({ searchStatus: "Not found. ☹️" });
      }
    }
  };

  const handleSave = async () => {
    if (hasChanged()) {
      const data = {
        newUsername,
        fideId: fideIdValue.current.value ? Number(fideIdValue.current.value) : null,
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

  const searchECF = async (value) => {
    if (value.length === 7) {
      setIsSearchingECF(true);
      setTimeout(async () => {
        await getECFInfo(value);
        setIsSearchingECF(false);
      }, 1000);
    } else {
      setECFRating({});
      setIsSearchingECF(false);
    }
    setECFRating(s => ({ ...s , ecfId: value }));
  };

  const searchFIDE = async (value) => {
    if (value.length === 6) {
      setIsSearchingFIDE(true);
      setTimeout(async () => {
        await getFIDEInfo(value);
        setIsSearchingFIDE(false);
      }, 1000);
    } else {
      setFideRating({})
      setIsSearchingFIDE(false);
    }

  };


  return (
    <div>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white dark:bg-gray-800 py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              This indivation will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <div className="mt-1 rounded-md shadow-sm flex">
                <span
                  className={`text-xs bg-gray-50 border border-r-1 border-gray-300 rounded-l-md px-3 inline-flex 
                        items-center text-gray-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                >
                  <span className="hidden sm:block">
                    chesscentre.online/app/
                  </span>
                  members/
                </span>
                <input
                  type="text"
                  disabled
                  onChange={(e) => setUsername(e.target.value)}
                  defaultValue={username}
                  autoComplete="off"
                  id="username"
                  className={`disabled:opacity-50 text-xs focus:ring-teal-500 focus:border-teal-500 flex-grow block 
                      w-full min-w-0 rounded-none border border-r-1 dark:text-gray-400 sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900`}
                />
                <button disabled className="disabled:opacity-50 text-xs bg-teal-600 border border-teal-600 hover:bg-teal-700 rounded-r-md px-2 sm:px-3 inline-flex items-center text-gray-500 sm:text-sm dark:border-gray-700">
                    <Icon
                      className="ml-1 w-5 h-5 text-white"
                      icon="ClickIcon"
                    />
                </button>
              </div>
            </div>

            <div className="col-span-3 sm:col-span-2 gap-6">
              <div className="col-span-12 gap-6">
                <label
                  htmlFor="ecf_id"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <div className="flex">
                    ECF ref{" "}
                    <a
                      href="https://englishchessonline.org.uk/monthly-rating/"
                      alt="ECF Rating Website"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon
                        className="ml-1 w-5 h-5 text-teal-600 hover:text-teal-700"
                        icon="InfoIcon"
                      />
                    </a>
                  </div>
                </label>

                <div className="mt-1 rounded-md shadow-sm flex">
                  <input
                    onChange={(e) => searchECF(e.target.value)}
                    ref={ecfIdValue}
                    type="text"
                    name="ecf_ref"
                    id="ecf_ref"
                    autoComplete="off"
                    defaultValue={ecfId}
                    className="text-xs sm:text-sm focus:ring-teal-500 focus:border-teal-500 flex-grow block w-full min-w-0 rounded-md dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900 border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Fetch ECF Rating on ID input */}
            <SearchRating
              ratingType={ecfRating}
              searching={isSearchingECF}
              useFlag={false}
            />

            <div className="col-span-3 sm:col-span-2">
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
                      <Icon
                        className="ml-1 w-5 h-5 text-teal-600 hover:text-teal-700"
                        icon="InfoIcon"
                      />
                    </a>
                  </div>
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <input
                    onChange={(e) => searchFIDE(e.target.value)}
                    ref={fideIdValue}
                    type="text"
                    name="fide_ref"
                    id="fide_ref"
                    autoComplete="off"
                    defaultValue={fideId}
                    className="text-xs sm:text-base focus:ring-teal-500 focus:border-teal-500 flex-grow block w-full min-w-0 rounded-md dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900 border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Fetch FIDE Rating on ID input */}
            <SearchRating
              ratingType={fideRating}
              searching={isSearchingFIDE}
              useFlag={true}
            />

            <div className="col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                About
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows="4"
                  onChange={(e) => setAboutMe(e.target.value)}
                  defaultValue={about}
                  className="text-xs shadow-sm focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border-gray-300 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900 rounded-md"
                  placeholder="Example: My favourite opening is the Sicilian."
                ></textarea>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                Tell us what you love about Chess ♟️
              </p>
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
