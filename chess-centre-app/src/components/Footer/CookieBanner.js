import React, { useState } from "react";
import CookieTermsModal from "../Modal/CookieTermsModal";
import { CogIcon, XIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
const COOKIE_POLICY = "cookiePolicy";

const CookieBanner = () => {
  
  const [isCookieModalOpen, setCookieModalOpen] = useState(false);
  const [isCookieBannerHidden, setCookieBannerHidden] = useState(false);

  const closeCookieModal = () => {
    setCookieModalOpen(false);
  };

  const acceptCookies = () => {
    window.localStorage.setItem(COOKIE_POLICY, "accepted");
    setCookieModalOpen(false);
    setCookieBannerHidden(true);
  }

  useEffect(() => {
    const getCookiePolicyStatus = () => {
      const cp = window.localStorage.getItem(COOKIE_POLICY);
      if(cp && cp === "accepted") {
        setCookieBannerHidden(true);
      }
    }
    getCookiePolicyStatus();
  },[]);

  return (
    <>
      <div
        className={
          isCookieBannerHidden ? `hidden` : `fixed inset-x-0 bottom-0 z-50`
        }
      >
        <div className="bg-teal-400">
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-1 sm:p-2 rounded-lg bg-teal-500">
                  <CogIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <p className="ml-2 sm:ml-3 font-medium text-white truncate">
                  <span className="md:hidden text-xs">We use cookies.</span>
                  <span className="hidden md:inline">
                    Cookies: Our application uses browser cookies in order to
                    function correctly.
                  </span>
                </p>
              </div>
              <div className="mr-1 sm:mr-3 w-auto">
                <button
                  onClick={() => setCookieModalOpen(true)}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-teal-500 hover:bg-teal-700 cursor-pointer"
                >
                  Learn More
                </button>
              </div>

              <div className="mr-1 sm:mr-3 w-auto">
                <button 
                  onClick={() => acceptCookies()}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-teal-600 bg-white hover:bg-teal-50 cursor-pointer">
                  Accept
                </button>
              </div>
              <div className="">
                <button
                  onClick={() => setCookieBannerHidden(true)}
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2 cursor-pointer"
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CookieTermsModal
        isCookieModalOpen={isCookieModalOpen}
        closeCookieModal={closeCookieModal}
        acceptCookies={acceptCookies}
      />
    </>
  );
};

export default CookieBanner;
