import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import EntriesTable from "../../components/EntriesTable/AppTable";
import RoundTimes from "../../components/RoundTimes/AppRounds";
import { classNames } from "../../utils/Classes";
import {
  EventDescription,
  TemplateData,
} from "../../components/Templates/EventDescriptions";
import AppTravel from "../../components/Travel/AppTravel";
import Brumdcrumbs from "../../components/Breadcrumbs";
import EventContactUsModal from "../../components/Modal/EventContactUsModal";
import moment from "moment";

export default function EventDetails() {
  const { eventId } = useParams();
  const [eventName, setEventName] = useState("");
  const [eventInfo, setEventInfo] = useState({});
  const { isLoading, error, data } = useEvents(eventId);

  useEffect(() => {
    document.title = "The Chess Centre | Event Information";
    let isMounted = true;
    if (!isLoading && isMounted) {
      setEventInfo(data[0]);
      setEventName(data[0].name);
    }

    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="overscroll-none">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-chess-king text-teal-600"></i> Event{" "}
        <span className="text-sm text-gray-500">information</span>
      </h1>
      <div className="pb-4 ml-2">
        <Brumdcrumbs
          crumbs={[
            { name: "Events", link: "/app/events", current: false },
            { name: eventName, current: true },
          ]}
        />
      </div>
      <div className="border-b border-gray-200"></div>

      <div className="mx-auto grid grid-cols-1 max-w-full mb-10">
        <section className="sm:col-span-2 order-2 bg-white p-2 rounded-md shadow-lg">
          <div className="grid grid-cols-1">
            <div>
              {!isLoading &&
                Object.keys(eventInfo).length > 0 &&
                !Boolean(error) && <DetailsView data={eventInfo} />}
            </div>
            <div>{isLoading && <LoadingView />}</div>
            <div>{Boolean(error) && <ErrorView />}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

function DetailsView({ data }) {

  const { tags, organisers, address } = TemplateData[data.type.eventType];
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [tabs, setTabs] = useState([
    { key: "schedule", name: "Schedule", current: true },
    { key: "entries", name: "Entries", current: false },
    { key: "travel", name: "Travel", current: false },
  ]);
  const [selected, setSelected] = useState("Schedule");

  const renderTab = (selected, data) => {
    switch (selected) {
      case "Entries":
        return <Entries data={data} />;
      case "Schedule":
        return <Schedule data={data} />;
      case "Travel":
        return <Travel data={data} />;
      default:
        return <Schedule data={data} />;
    }
  };

  return (
    <div className="grid grid-cols-1 mb-10">
      <main className="flex-1">
        <div className="py-8 xl:py-10">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:grid xl:grid-cols-3">
            <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
              <div>
                <div>
                  <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {data.name}
                      </h1>
                      <p className="mt-2 text-sm text-gray-500">{address}</p>
                    </div>

                    <div className="mt-4 sm:flex sm:space-x-3 md:mt-0 items-center mx-auto space-y-3 sm:space-y-0 text-center">

                      <button
                        type="button"
                        className="sm:inline-flex w-full sm:w-auto justify-center px-4 py-2 border border-teal-600 shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        <span>Register</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="sm:inline-flex w-full sm:w-auto justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                      >
                        <span>Contact Us</span>
                      </button>
                    </div>
                  </div>
                  {/* Mobile Sidebar  */}
                  <div className="xl:hidden">
                    <SummaryDetails data={data} tags={tags} organisers={organisers} />
                  </div>
                  
                  <div className="py-3 xl:pt-8 mt-6 sm:mt-0">
                    <EventDescription template={data.type.eventType} />
                  </div>
                </div>
              </div>
              {/* TAB DETAILS */}
              <section className="mt-8">
                <div className="divide-y divide-gray-200">
                  <div className="flow-root">
                    <Tabs
                      tabs={tabs}
                      setSelected={setSelected}
                      setTabs={setTabs}
                    />
                    {renderTab(selected, data)}
                  </div>
                </div>
              </section>
            </div>
            {/* Desktop Sidebar  */}
            <div className="hidden xl:block">
              <SummaryDetails data={data} tags={tags} organisers={organisers} />
            </div>
          </div>
        </div>
        <EventContactUsModal open={isModelOpen} setOpen={setIsModalOpen} eventName={data.name.trim()} eventStart={data.startDate.trim()} />
      </main>
    </div>
  );
}

function Entries(props) {
  const { data } = props;
  return (
    <div className="mt-10">
      <EntriesTable eventDetails={data} />
    </div>
  );
}

function Schedule(props: any) {
  const { data } = props;
  return (
    <div className="mt-2">
      <RoundTimes
        eventId={data.id}
        eventType={data.type.eventType}
        removeStyles={true}
      />
    </div>
  );
}

function Travel(props: any) {
  const { data } = props;
  return (
    <div className="mt-2">
      <AppTravel eventType="rapidplay" eventId={data.id} />
    </div>
  );
}

function Tabs(props: any) {
  const { tabs, setSelected, setTabs } = props;
  const handleClick = (tab: string) => updateTabs(tab);
  const updateTabs = (tab: string) => {
    setSelected(tab);
    setTabs((prevState: any) =>
      prevState.map(({ name, icon }) => ({
        name,
        icon,
        current: name === tab,
      }))
    );
  };

  return (
    <div>
      <div className="block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab: any) => (
              <div
                onClick={() => handleClick(tab.name)}
                key={tab.name}
                className={classNames(
                  tab.current
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                  "whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
                {tab.count && (
                  <span
                    className={classNames(
                      tab.current
                        ? "bg-teal-100 text-teal-600"
                        : "bg-gray-100 text-gray-900",
                      "hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
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

function SummaryDetails({ data, tags, organisers }) {
  return (
    <aside className="mt-8 xl:mt-0 xl:pl-8">
      <h2 className="sr-only">Details</h2>
      <div className="space-y-5">
        <div className="flex items-center space-x-2">
          <div>
            <i className="fas fa-calendar-alt text-gray-400"></i>
          </div>
          <div className="text-gray-900 text-sm font-medium">
            <span className="text-teal-600">Start</span>{" "}
            <time dateTime={data.startDate}>
              {moment(data.startDate).format("ddd MMM Do, YYYY")}
            </time>
          </div>
        </div>
        {data.endDate && (
          <div className="flex items-center space-x-2">
            <div>
              <i className="fas fa-calendar-alt text-gray-400"></i>
            </div>
            <div className="text-gray-900 text-sm font-medium">
              <span className="text-teal-600">End</span>{" "}
              <time dateTime={data.endDate}>
                {moment(data.endDate).format("ddd MMM Do, YYYY")}
              </time>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <div>
            <i className="fas fa-flag text-gray-400"></i>
          </div>
          <div className="text-gray-900 text-sm font-medium">
            <span className="text-teal-600">Rounds</span>{" "}
            {data.rounds}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div>
            <i className="fas fa-users text-gray-400"></i>
          </div>
          <div className="text-gray-900 text-sm font-medium">
            <span className="text-teal-600">Entries</span>{" "}
            {data.entryCount}
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

        <div className="flex items-center space-x-2">
          <div>
            <i className="fad fa-credit-card text-gray-400"></i>
          </div>
          <div className="text-gray-900 text-sm font-medium">
            <span className="text-teal-600">Entry Fee</span>{" "}
            £{data.type.defaultPrice}
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-b xl:border-b-0 border-gray-200 py-6 space-y-8">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Organsers</h2>
          <ul className="mt-3 space-y-3">
            {organisers.map(({ name, imgUrl }) => (
              <li key={name} className="flex justify-start">
                <span className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-5 w-5 rounded-full"
                      src={imgUrl}
                      alt={name}
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {name}
                  </div>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Tags</h2>
          <ul className="mt-2 leading-8">
            {Boolean(tags.length) &&
              tags.map(({ name, color }) => (
                <li key={name} className="inline">
                  <span className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5">
                    <div className="absolute flex-shrink-0 flex items-center justify-center">
                      <span
                        className={classNames(
                          "h-1.5 w-1.5 rounded-full",
                          color
                        )}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3.5 text-sm font-medium text-gray-900">
                      {name}
                    </div>
                  </span>{" "}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

