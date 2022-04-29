import { useState, useEffect } from "react";

const QuestionsAndAnswers = ({ faqs, handleSelectedTags }) => {
  return faqs.map(({ question, Answer, tags }, key) => {
    return (
      <div key={key}>
        <dt className="text-lg leading-6 font-medium text-gray-900">
          <span dangerouslySetInnerHTML={{ __html: question }}></span>
        </dt>
        <dd className="mt-2 text-justify text-base text-gray-500 mb-1">
          <Answer />
        </dd>
        <div className="text-right">
          {tags && <span className="text-xs text-gray-500">category: </span>}
          {tags &&
            tags.map((tag, key) => {
              return (
                <span
                  key={key}
                  onClick={() => handleSelectedTags(tag)}
                  className="inline-flex items-center px-2 py-0.5 mr-1 rounded text-xs font-medium bg-teal-100 text-teal-800 hover:bg-teal-700 hover:text-white cursor-pointer"
                >
                  {tag}
                </span>
              );
            })}
        </div>
      </div>
    );
  });
};

const NoResultFound = () => {
  return (
    <div className="text-center text-2xl text-teal-600">
      <p className="mb-4">Can't find the answer you're looking for?</p>
      <p>
        <span className="mr-1">
          <i className="fad fa-inbox-in"></i>
        </span>{" "}
      </p>
      <p className="text-base">Contact us </p>
      <p className="text-gray-500 hover:text-teal-500 text-base">
        <a href="mailto:info@chesscentre.online">info@chesscentre.online</a>
      </p>
    </div>
  );
};

export const Results = ({
  faqs,
  totalQuestions,
  setSelectedTags,
  selectedTags,
  searchTerm,
  onResultChange
}) => {
  const [filteredQuestionsCount, setfilteredQuestionsCount] = useState(
    faqs.length
  );
  const [filteredResult, setFilteredResults] = useState(faqs);

  useEffect(() => {
    const filterResultList = () => {
      let filtered = [];

      if (selectedTags.length > 0) {
        // TODO: a more efficient way to achieve "selectable" tag search
        filtered = [
          ...faqs.filter(({ tags }) => {
            // NOTE: multiple tags in the same question are not quierable
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

    filterResultList();
  }, [faqs, selectedTags, searchTerm]);

  const handleSelectedTags = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((oldTags) => [...oldTags, tag]);
    }
    onResultChange({ tag });
  };

  return (
    <div>
      {filteredQuestionsCount !== totalQuestions && (
        <h3 className="text-center mb-6">
          <span className="inline-flex items-center px-8 py-0.5 rounded text-xs font-normal bg-gray-200 text-gray-400">
            Results {filteredQuestionsCount} / {totalQuestions}
          </span>
        </h3>
      )}
      <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-6 lg:grid-cols-3">
        <QuestionsAndAnswers faqs={filteredResult} handleSelectedTags={handleSelectedTags} />
      </div>
      {filteredQuestionsCount === 0 && <NoResultFound />}
    </div>
  );
};
