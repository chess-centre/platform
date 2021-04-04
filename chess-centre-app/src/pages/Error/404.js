import React from "react";
import Logo from "../../assets/img/logo.svg";

function Page404() {
  return (
    <div className="flex flex-col items-center">
      <h1><img alt="Logo" className="w-12 h-12 mt-8" src={Logo} /></h1>
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200 mb-8">
        404
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Oh no! Page not found. Check the address or{" "}
        <a
          className="text-teal-600 hover:underline dark:text-teal-300"
          href="../"
        >
          go back
        </a>
        .
      </p>
      
    </div>
  );
}

export default Page404;
