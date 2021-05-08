import React from "react";
import { Link } from "react-router-dom";
import { faqs } from "../../api/data.faqs";

export default function FAQs() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto pt-16 pb-10 px-4 sm:py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Frequently asked questions
        </h2>
        <div className="mt-12">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
            {faqs.slice(0, 6).map(({ question, answer }, index) => {
              return (
                <div key={index}>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    <span dangerouslySetInnerHTML={{ __html: question }}></span>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 text-justify">
                    <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="relative mt-8 mx-10 sm:mx-36">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-gray-50 text-sm text-teal-500 font-semibold hover:text-teal-700 hover:underline">
              <Link to="/faqs">more</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
