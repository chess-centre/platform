import React, { useEffect, useState } from "react";

import API from "@aws-amplify/api";
import EventResultTable from "../../components/Table/EventResultTable";

export const listResults = /* GraphQL */ `
  query ListResults(
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        resultInfo
        eventID
        name
        complete
        isLive
        winners
        dgtCloudUrl
        event {
          name
          description
          rounds
          time
          startDate
          endDate
          entryCount
        }
      }
      nextToken
      startedAt
    }
  }
`;


export default function ResultView() {
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [isErrorResult, setIsErrorResult] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    document.title = "The Chess Centre | Event Results";

    const fetchResults = async () => {
      setIsLoadingResults(true);
      
      const {
        data: {
          listResults: { items, nextToken },
        },
      }: any = await API.graphql({
        query: listResults,
        authMode: "AWS_IAM",
      });

      const responses: any[] = await moreResults(nextToken);

      if (items && Array.isArray(items)) {
        setResults([...items, ...responses]);
        setIsLoadingResults(false);
      }
    };

    const moreResults = async (nextToken: any) => {
      let token = nextToken;
      let responses: any[] = [];

      while(token) {
        const {
          data: {
            listResults: { items, nextToken },
          },
        }: any = await API.graphql({
          query: listResults,
          authMode: "AWS_IAM",
        });

        responses = [...responses, ...items];
        token = nextToken;
      }
      return responses;
    }

    try {
      fetchResults();
    } catch (error) {
      console.log("Error", error);
      setIsLoadingResults(false);
      setIsErrorResult(true);
    }

  }, []);

  return (
    <div className="overscroll-none">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-chess-king text-teal-600"></i> Results <span className="text-sm text-gray-500"></span>
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-sm text-left text-gray-500 dark:text-gray-300 mb-2">
            Our previous events
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1">
        {!isLoadingResults && !isErrorResult && (
          <div>
            {results && results.length > 0 ? (
              <div>
                <EventResultTable results={results} />
              </div>
            ) : (
              <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
                <span>
                  <i className="fal fa-chess fa-6x text-teal-500"></i>
                </span>
                <p className="mt-2 block text-sm font-medium text-gray-600">
                  No results found!
                </p>
              </div>
            )}
          </div>
        )}

        {isLoadingResults && (
          <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
            <span className="animate-pulse">
              <i className="aninmal-pulse fal fa-chess-board fa-10x text-teal-500 opacity-50"></i>
            </span>
            <p className="mt-2 block text-sm font-medium text-gray-600">
              Loading results...
            </p>
          </div>
        )}

        {isErrorResult && (
          <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
            <span>
              <i className="aninmal-pulse fal fa-exclamation-square fa-10x text-orange-400 opacity-50"></i>
            </span>
            <p className="mt-2 block text-sm font-medium text-gray-600">
              Oops, there seems to be an issue loading our latest event results. Try again
              later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
