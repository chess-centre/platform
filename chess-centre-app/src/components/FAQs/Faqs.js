import React from "react";
import { faqs as mockFAQs } from "../../api/mock.home";

function FAQs({ questions }) {
  if (!questions) questions = mockFAQs;

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Frequently asked questions
        </h2>
        <div className="mt-12">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
            {questions.map(({ question, answer }, index) => {
              return (
                <div key={index}>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    <span dangerouslySetInnerHTML={{ __html: question }}></span>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
