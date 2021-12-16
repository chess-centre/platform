import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import { Search } from "../../components/FAQs/Search";
import { Results } from "../../components/FAQs/Results";
import { searchQuery } from "../../utils/UrlChange";
import { faqs } from "../../api/data.faqs";

export default function FAQs() {
  const history = useHistory();
  const location = useLocation();
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const totalQuestions = faqs.length;
  const onResultChange = query => { 
    const search = searchQuery(location.search, query);
    history.replace({ pathname: location.pathname, search });
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
                <Search
                  onResultChange={onResultChange}
                  setSearchTerm={setSearchTerm}
                  setSelectedTags={setSelectedTags}
                  selectedTags={selectedTags}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container m-auto">
          <div className="max-w-7xl mx-auto py-10 px-4 sm:py-10 sm:px-16 lg:px-16">
            <Results
              faqs={faqs}
              totalQuestions={totalQuestions}
              onResultChange={onResultChange}
              setSelectedTags={setSelectedTags}
              selectedTags={selectedTags}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}
