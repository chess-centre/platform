import React from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";
import { classNames } from "../../utils/Classes";

export default function Brumdcrumbs({ crumbs }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              to="/app/dashboard"
              className="text-gray-400 hover:text-gray-500"
            >
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {crumbs.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {page.current ? (
                <div
                  className={classNames(
                    "ml-4 text-sm font-medium",
                    "text-teal-500 cursor-default"
                  )}
                  aria-current="page"
                >
                  {page.name}
                </div>
              ) : (
                <Link
                  to={page.link}
                  className={classNames(
                    "ml-4 text-sm font-medium",
                    "text-gray-500 hover:text-gray-700"
                  )}
                  aria-current={undefined}
                >
                  {page.name}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
