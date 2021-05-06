import React, { useEffect, useState } from "react";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import { SearchIcon } from "@heroicons/react/solid";
import { faqs } from "../../api/home.faqs";

function QuestionsAndAnswers({ faqs, setSelectedTags }) {
  return faqs.map((faq, key) => {
    return (
      <div key={key}>
        <dt className="text-lg leading-6 font-medium text-gray-900">
          <span dangerouslySetInnerHTML={{ __html: faq.question }}></span>
        </dt>
        <dd className="mt-2 text-justify text-base text-gray-500 mb-1">
          <span dangerouslySetInnerHTML={{ __html: faq.answer }}></span>
        </dd>
        <div className="text-right">
          {faq.tags ? (
            <span className="text-xs text-gray-500">category: </span>
          ) : (
            ""
          )}
          {faq.tags &&
            faq.tags.map((tag, key) => {
              return (
                <span
                  key={key}
                  onClick={() => setSelectedTags(tag)}
                  className="inline-flex items-center px-2 py-0.5 mr-1 rounded text-xs font-medium bg-teal-100 text-teal-800 cursor-pointer"
                >
                  {tag}
                </span>
              );
            })}
        </div>
      </div>
    );
  });
}

export default function FAQs() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuestionsCount, setfilteredQuestionsCount] = useState(
    faqs.length
  );
  const [filteredResult, setFilteredResults] = useState(faqs);
  let totalQuestions = faqs.length;

  const handleSearchInput = (search) => {
    setSearchTerm(search);
  };

  const handleSelectedTags = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((oldTags) => [...oldTags, tag]);
    }
  };

  const handleRemoveTags = (tag) => {
    const newArr = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newArr);
  };

  useEffect(() => {
    const filterResultList = () => {
      let filtered = [];

      if (selectedTags.length > 0) {
        // must be a more efficient way to achieve this "selectable" tag search
        filtered = [
          ...faqs.filter(({ tags }) => {
            // BUG: multiple tags in the same question are not quierable:
            const t = tags || [];
            return t.every((tag) => selectedTags.includes(tag));
          }),
        ].filter(({ question }) =>
          question.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
      } else {
        filtered = faqs.filter(({ question }) =>
          question.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
      }
      setfilteredQuestionsCount(filtered.length);
      setFilteredResults(filtered);
    };

    console.log(selectedTags, searchTerm);

    filterResultList();
  }, [selectedTags, searchTerm]);

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
                      Search questions...
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
                        autoComplete="off"
                        id="search"
                        className="focus:border-teal-500 block w-full pl-10 sm:text-sm border-teal-500 rounded-md"
                        placeholder="Search questions..."
                      />
                    </div>
                  </div>
                </div>
                <div className="inline-block mt-2">
                  {selectedTags &&
                    selectedTags.map((tag, key) => {
                      return (
                        <span
                          key={key}
                          onClick={() => handleRemoveTags(tag)}
                          className="inline-flex items-center py-0.5 pl-2 pr-0.5 mr-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"
                        >
                          {tag}
                          <button
                            type="button"
                            className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500 focus:outline-none focus:bg-yellow-500 focus:text-white"
                          >
                            <svg
                              className="h-2 w-2"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 8 8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeWidth="1.5"
                                d="M1 1l6 6m0-6L1 7"
                              />
                            </svg>
                          </button>
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container m-auto">
          <div className="max-w-7xl mx-auto py-10 px-4 sm:py-10 sm:px-16 lg:px-16">
            <div className="">
              {filteredQuestionsCount === totalQuestions ? (
                ""
              ) : (
                <h3 className="text-center mb-6">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-300 text-gray-700">
                    Results {filteredQuestionsCount} / {totalQuestions}
                  </span>
                </h3>
              )}
              <dl className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-6 lg:grid-cols-3">
                <QuestionsAndAnswers
                  faqs={filteredResult}
                  setSelectedTags={handleSelectedTags}
                />
              </dl>
              {filteredQuestionsCount === 0 ? (
                <div className="text-center text-2xl text-teal-600">
                  <p className="mb-4">Can't find the answer you're looking for?</p>
                  <p><span className="mr-1"><i className="fad fa-inbox-in"></i></span> </p>
                  <p className="text-base">Contact us </p>
                  <p className="text-gray-500 hover:text-teal-500 text-base"><a href="mailto:info@chesscentre.online">info@chesscentre.online</a></p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}
