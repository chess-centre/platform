import React, { useState } from "react";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import { SearchIcon } from "@heroicons/react/solid";
import { faqs } from "../../api/home.faqs";


function QuestionsAndAnswer({ faqs }) {

    return faqs
      .map((faq) => {
        return (
          <div key={faq.id}>
            <dt className="text-lg leading-6 font-medium text-gray-900">
              <span
                dangerouslySetInnerHTML={{ __html: faq.question }}
              ></span>
            </dt>
            <dd className="mt-2 text-justify text-base text-gray-500">
              <span
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              ></span>
            </dd>
          </div>
        );
      });
}


export default function FAQs() {
  const [filteredQuestionsCount, setfilteredQuestionsCount] = useState(faqs.length);
  const [filteredResult, setFilteredResults] = useState(faqs);
  let totalQuestions = faqs.length;


  const handleSearchInput = (searchTerm) => {

    const filtered = faqs.filter(({ question }) => question.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    setfilteredQuestionsCount(filtered.length);
    setFilteredResults(filtered);
  };


  return (
    <div>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-2 xl:pb-6">
          <LandingNav current="events" />
        </div>
        <div className="bg-white">
          <div>
            <div className="relative">
              <svg
                className="hidden xl:block absolute top-48 mb-1 right-0 md:-mr-32 2xl:-mr-4"
                width="500"
                height="100"
                fill="none"
                viewBox="0 0 500 100"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      className="text-gray-100"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="500"
                  height="100"
                  fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
                />
              </svg>

              <svg
                className="hidden md:block absolute top-0 left-0 md:-ml-32 2xl:-ml-4"
                width="500"
                height="200"
                fill="none"
                viewBox="0 0 500 200"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      className="text-gray-100"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="500"
                  height="200"
                  fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
                />
              </svg>
            </div>
          </div>
          <div className="max-w-7xl mx-auto py-10 px-4 sm:py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">
                Ask away
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                FAQs
              </p>
              <div className="pr-4 pl-4 sm:px-52">
                <div className="relative self-center mt-6 bg-gray-100 rounded-lg flex sm:mt-8">
                  <div className="flex-1 min-w-0">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative rounded-md shadow-lg">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        onChange={(e) => handleSearchInput(e.target.value)}
                        type="search"
                        name="search"
                        id="search"
                        className="focus:border-teal-500 block w-full pl-10 sm:text-sm border-teal-500 rounded-md"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container m-auto">
          <div className="max-w-7xl mx-auto py-10 px-4 sm:py-10 sm:px-16 lg:px-16">
            <div className="">
              {
                filteredQuestionsCount === totalQuestions ? "" : (
             
              <h3 className="text-center mb-6">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-800">
                 Results {filteredQuestionsCount} / {totalQuestions}
                </span>
              </h3>)
               }
              <dl className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-6 lg:grid-cols-3">
                <QuestionsAndAnswer faqs={filteredResult} />
              </dl>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}
