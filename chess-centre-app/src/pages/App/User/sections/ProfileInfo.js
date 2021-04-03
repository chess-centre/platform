import React, { useState } from "react";
import debounce from "lodash.debounce";
//import { useToasts } from "react-toast-notifications";
import { getFideData } from "../../../../api/profile/get";
import LoadingGif from "../../../../assets/img/loading-teal.svg";

const Loading = () => {
  return (
    <div className="mt-8 flex">
      <div className="">
        <img alt="Loading" className="h-5 w-5" src={LoadingGif} />
      </div>
      <div className="text-xs  text-pink-700 ml-2">retrieving...</div>
    </div>
  );
};

function ProfileInfo({ username }) {
  const [, setUsername] = useState(username);
  const [isSearchingECF, setIsSearchingECF] = useState(false);
  //const [ecfGrade, setECFGrade] = useState(null);
  const [fideRating, setFideRating] = useState(null);
  const [isSearchingFIDE, setIsSearchingFIDE] = useState(false);
  //const { addToast } = useToasts();

  const getFIDEInfo = async (id) => {
    if (id) {
      const info = await getFideData(id);
      console.log("found!", id, info);
      if (info.currentRating) {
        setFideRating(info.currentRating);
      } else {
        setFideRating("Not Found!");
      }
    }
  };

  const handleUserNameUpdate = (e) => {
    setUsername(e.target.value);
  };

  const searchECF = async (e) => {
    if (e.target.value.length > 5) {
      setIsSearchingECF(true);
      //await getECFInfo();
      setIsSearchingECF(false);
    }
  };

  const searchFIDE = async (e) => {
    const ref = e.target.value;
    if (ref.length === 6) {
      setIsSearchingFIDE(true);
      await getFIDEInfo(ref);
      setIsSearchingFIDE(false);
    } else {
      setFideRating(null)
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
                <span className="text-xs  bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                  chesscentre.online/app/members/
                </span>
                <input
                  type="text"
                  name="username"
                  onChange={handleUserNameUpdate}
                  defaultValue={username}
                  id="username"
                  className="focus:ring-teal-500 focus:border-teal-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900"
                />
              </div>
            </div>

            <div className="col-span-3 sm:col-span-2 gap-6">
              <div className="col-span-12 gap-6">
                <label
                  htmlFor="ecf_id"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  ECF reference
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <input
                    onChange={(e) => searchECF(e)}
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="focus:ring-teal-500 focus:border-teal-500 flex-grow block w-full min-w-0 rounded-md dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900 sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-3 sm:col-span-1">
              {isSearchingECF ? <Loading /> : null}
            </div>

            <div className="col-span-3 sm:col-span-2">
              <div className="col-span-12 gap-6">
                <label
                  htmlFor="fide_id"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  FIDE refernce
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <input
                    onChange={(e) => searchFIDE(e)}
                    type="text"
                    name="fide_ref"
                    id="fide_ref"
                    className="focus:ring-teal-500 focus:border-teal-500 flex-grow block w-full min-w-0 rounded-md dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900 sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-3 sm:col-span-1 gap-6 ">
              {fideRating && !isSearchingFIDE ? (
                <div className="mt-9">
                  <div className="text-xs ml-2">
                    {fideRating}
                  </div>
                </div>
              ) : isSearchingFIDE ? (
                <Loading />
              ) : null}
            </div>

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
                  rows="3"
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
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6 dark:divide-white dark:divide-y">
          <button className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
