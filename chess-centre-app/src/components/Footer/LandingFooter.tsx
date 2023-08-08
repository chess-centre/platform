import React from "react";
import { Link } from "react-router-dom";
import CookieBanner  from "./CookieBanner";

const LandingFooter = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-3 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {/* <div className="px-3 sm:px-6 py-2">
            <Link
              to="/about"
              className="text-sm sm:text-base text-gray-500 hover:text-teal-brand"
            >
              About Us
            </Link>
          </div> */}
          <div className="px-3 sm:px-6 py-2">
            <Link
              to="/developer"
              className="text-sm sm:text-base text-gray-500 hover:text-teal-brand"
            >
              Developer
            </Link>
          </div>
          <div className="px-3 sm:px-6 py-2">
            <Link
              to="/roadmap"
              className="text-sm sm:text-base text-gray-500 hover:text-teal-brand"
            >
              Roadmap
            </Link>
          </div>
        </nav>
        <div className="mt-6 flex justify-center space-x-6">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/thechesscentre"
            className="text-gray-400 hover:text-pink-700"
          >
            <span className="sr-only">Instagram</span>
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/chess-centre/platform"
            className="text-gray-400 hover:text-gray-900"
          >
            <span className="sr-only">GitHub</span>
            <i className="fab fa-github fa-2x"></i>
          </a>
        </div>
        <p className="mt-6 text-center text-sm sm:text-base text-gray-400">
          &copy; 2020 The Chess Centre. All rights reserved.
        </p>
        <CookieBanner />
      </div>
    </footer>
  );
};

export default LandingFooter;
