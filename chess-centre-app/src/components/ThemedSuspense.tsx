import React from "react";
import Logo from "../assets/img/ssc-logo-black.svg";

function ThemedSuspense() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="m-auto text-center">
        <p className="mb-10 text-center">
          <img className="animate-pulse w-20 sm:w-40" src={Logo} alt="Loading" />
        </p>
        <p className="animate-bounce text-yellow-600 dark:text-yellow-400">Loading...</p>
      </div>
    </div>
  );
}

export default ThemedSuspense;
