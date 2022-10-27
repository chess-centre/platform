import React, { useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useResults } from "../../context/ResultContext";
import Brumdcrumbs from "../../components/Breadcrumbs";
import ResultsContactUsModal from "../../components/Modal/ResultsContactUsModal"
import Chesscom from "../../assets/img/chesscom.png";
import C24 from "../../assets/img/c24.png";
import { Robin } from "../../components/Results";

export default function ResultDetails() {
  document.title = "The Chess Centre | Result Information";

  const { resultId } = useParams();
  const { isLoading, error, data } = useResults({ resultId });

  return (
    <div className="overscroll-none">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-chess-king text-teal-600"></i> Result{" "}
        <span className="text-sm text-gray-500">standings</span>
      </h1>
      <div className="pb-4 ml-2">
        {!isLoading && (
          <Brumdcrumbs
            crumbs={[
              { name: "Results", link: "/app/results", current: false },
              { name: data.name, current: true },
            ]}
          />
        )}
      </div>
      <div className="border-b border-gray-200"></div>

      <div className="mx-auto grid grid-cols-1 max-w-full mb-10">
        <section className="sm:col-span-2 order-2 bg-white p-2 rounded-md shadow-lg">
          <div className="grid grid-cols-1">
            <div>
              {!isLoading && !Boolean(error) && (
                <DetailsView data={data} isLoadingEntries={isLoading} />
              )}
            </div>
            <div>{isLoading && <LoadingView />}</div>
            <div>{Boolean(error) && <ErrorView />}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

function DetailsView(props: any) {
  const { data } = props;
  const [isModelOpen, setIsModalOpen] = useState(false);
  const { pairings, players, results, settings, name, date } = JSON.parse(data.resultInfo);

  return (
    <div className="grid grid-cols-1 mb-2 sm:mb-6">
      <main className="flex-1">
        <div className="py-8 lg:py-10">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-3">
            <div className="lg:col-span-2 lg:pr-8 lg:border-r lg:border-gray-200">
              <div>
                <div>
                  <div className="md:flex md:items-center md:justify-between md:space-x-4 lg:border-b lg:pb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {data.name}
                      </h1>
                      <p className="mt-2 text-sm text-gray-500">{}</p>
                    </div>

                    <div className="mt-4 sm:flex sm:space-x-3 md:mt-0 items-center mx-auto space-y-3 sm:space-y-0 text-center">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="flex w-full sm:w-auto justify-center px-4 py-2 border border-gray-300 
                        shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600"
                      >
                        <span>Contact Us</span>
                      </button>
                    </div>
                  </div>
                  {/* Mobile Sidebar  */}
                  <div className="lg:hidden">
                    <SummaryDetails
                      data={data.event}
                    />
                  </div>

                  <div className="py-3 lg:pt-8 mt-6 sm:mt-0">
                    <div className="grid grid-cols-1 space-y-4">
                      {players.map(
                        ({ entries, section, title, icon }, index) => {
                          const scores = results.find(
                            (r) => r.section === section
                          ).scores;
                          return (
                            <Robin
                              key={index}
                              title={title}
                              pairings={pairings}
                              entries={entries}
                              results={scores}
                              settings={settings}
                              icon={icon}
                              boards={index}
                            />
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Desktop Sidebar  */}
            <div className="hidden lg:block">
              <SummaryDetails
                data={data.event}
              />
            </div>
          </div>
        </div>
        <ResultsContactUsModal
          open={isModelOpen}
          setOpen={setIsModalOpen}
          eventName={name}
          eventStart={date}
        />
      </main>
    </div>
  );
}

function LoadingView() {
  return (
    <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-10 text-center">
      <span className="animate-pulse">
        <i className="aninmal-pulse fal fa-chess-board fa-10x text-gray-400 opacity-50"></i>
      </span>
      <p className="mt-2 block text-sm font-medium text-gray-600">
        Loading event information...
      </p>
    </div>
  );
}

function ErrorView() {
  return (
    <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
      <span>
        <i className="aninmal-pulse fal fa-exclamation-square fa-10x text-orange-400 opacity-50"></i>
      </span>
      <p className="mt-2 block text-sm font-medium text-gray-600">
        Oops, there seems to be an issue loading this event info. Try again
        later.
      </p>
    </div>
  );
}

function SummaryDetails({ data }) {
  return (
    <aside className="mt-8 lg:mt-0 lg:pl-8">
      <h2 className="sr-only">Details</h2>
      <div className="space-y-5">
        <div className="flex items-center space-x-2">
          <div>
            <i className="fas fa-calendar-alt text-gray-400"></i>
          </div>
          <div className="text-gray-900 text-sm font-medium">
            <span className="text-teal-600">Held on</span>{" "}
            <time dateTime={data.startDate}>
              {moment(data.startDate).format("dddd, MMMM Do")}
            </time>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div>
            <i className="fas fa-flag text-gray-400"></i>
          </div>
          <div className="text-gray-900 text-sm font-medium">
            <span className="text-teal-600">Rounds</span> {data.rounds}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <i className="fas fa-users text-gray-400"></i>
          </div>
          <div className="text-gray-900 text-sm font-medium">
            <span className="text-teal-600">Entries</span> {data.entryCount}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div>
            <i className="fad fa-chess-clock text-gray-400"></i>
          </div>
          <div className="text-gray-900 text-sm font-medium">
            <span className="text-teal-600">Time Control</span>{" "}
            {data.timeControl ? data.timeControl : data.type.timeControl}
          </div>
        </div>
      </div>
    </aside>
  );
}
