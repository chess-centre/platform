import React from "react";
import Logo from "../assets/img/logo.svg";

function ThemedSuspense() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="m-auto">
        <p className="mb-10">
          <img className="animate-ping" src={Logo} alt="Loading" />
        </p>
        <p className="animate-bounce text-teal-700 dark:text-teal-400">Loading...</p>
      </div>
    </div>
  );
}

export default ThemedSuspense;
