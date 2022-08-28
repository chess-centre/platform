import API from "@aws-amplify/api";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
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
import EventSectionSelectionModal from "../../components/Modal/EventSectionSelectModal";
import { juniorSections, standardSections } from "../../api/sections";

const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!, $filter: ModelEntryFilterInput, $limit: Int, $nextToken: String) {
    getEvent(id: $id) {
      id
      name
      description
      active
      multipleSections
    }
    listEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
            eventId
            memberId
            section
            byes
            createdAt
            updatedAt
            member {
              id
              fideId
              ecfId
              name
              ecfRatingPartial
              ecfRating
              ecfRapidPartial
              ecfRapid
              ecfMembership
              estimatedRating
              club
              gender
              membershipType
              chessTitle
            }
      }
      nextToken
      startedAt
    }
  }
`;

export default function EventDetails() {
  const { eventId } = useParams();
  const [eventName, setEventName] = useState("");
  const [eventInfo, setEventInfo] = useState<Event | undefined>();
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);
  const [eventEntries, setEventEntries] = useState({});
  const { isLoading, error, data } = useEvents();

  useEffect(() => {
    document.title = "The Chess Centre | Event Information";
    let isMounted = true;
    if (!isLoading && isMounted) {
      const e: Event = data.find((event: Event) => event.id === eventId);
      setEventInfo(e);
      setEventName(e.name);
    }

    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoadingEntries(true);

      const response = await API.graphql({
        query: getEvent,
        variables: { id: eventId, filter: { eventId: { eq: eventId } }, limit: 250 },
        authMode: "AWS_IAM",
      });

      if (response && response.data) {
        const {
          data: {
            getEvent: eventData,
            listEntrys: entries },
        } = response;

        if(entries.nextToken) {
          const additionalResponse = await API.graphql({
            query: getEvent,
            variables: { id: eventId, filter: { eventId: { eq: eventId } }, limit: 250, nextToken: entries.nextToken },
            authMode: "AWS_IAM",
          });

          const {
            data: {
              listEntrys: moreEntries },
          } = additionalResponse;

          const items = { items: [ ...entries.items, ...moreEntries.items ] };

          setEventEntries({ ...eventData, entries: items });

        } else {
          setEventEntries({ ...eventData, entries });
        }
      }
      setIsLoadingEntries(false);
    };
    fetchEntries();
  }, [eventId]);

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
                eventInfo &&
                Object.keys(eventInfo).length > 0 &&
                !Boolean(error) && <DetailsView data={eventInfo} isLoadingEntries={isLoadingEntries} entries={eventEntries} />}
            </div>
            <div>{isLoading && <LoadingView />}</div>
            <div>{Boolean(error) && <ErrorView />}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

interface Event {
  id: string;
  active: string;
  allowedToRegister: boolean;
  cancelled: boolean;
  complete: boolean;
  description: string;
  endDate: string;
  entries: Array<any>;
  entryCount: number;
  full: boolean;
  isLive: boolean;
  maxEntries: number;
  multipleSections: boolean;
  name: string;
  registered: boolean;
  rounds: number;
  startDate: string;
  time: string;
  type: {
    canRegister: boolean;
    color: string;
    defaultPrice: string;
    description: string;
    eventType: string;
    id: string;
    maxEntries: number;
    name: string;
    stripePriceId: string;
    time: string | null;
    timeControl: string;
    url: string;
  };
}

interface Props {
  data: Event;
  isLoadingEntries?: Boolean;
  entries?: any;
}

function DetailsView(props: Props) {
  const { data, isLoadingEntries, entries } = props;
  const { tags, organisers, address } = TemplateData[data.type.eventType];
  const [isJunior] = useState(data?.name.includes("Junior") || false);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [tabs, setTabs] = useState([
    { key: "schedule", name: "Schedule", current: true },
    { key: "entries", name: "Entries", current: false },
    { key: "travel", name: "Travel", current: false },
  ]);
  const [selected, setSelected] = useState("Schedule");

  const renderTab = (selected: string, data: Event) => {
    switch (selected) {
      case "Entries":
        return <Entries data={data} isLoadingEntries={isLoadingEntries} entries={entries} />;
      case "Schedule":
        return <Schedule data={data} />;
      case "Travel":
        return <Travel data={data} />;
      default:
        return <Schedule data={data} />;
    }
  };

  const showRegistration = () => {
    const { isLive, complete, cancelled, full, registered } = data;
    let show = true;
    if (isLive || complete || cancelled || full || registered) {
      show = false;
    }
    return show;
  };

  return (
    <div className="grid grid-cols-1 mb-10">
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
                      <p className="mt-2 text-sm text-gray-500">{address}</p>
                    </div>

                    <div className="mt-4 sm:flex sm:space-x-3 md:mt-0 items-center mx-auto space-y-3 sm:space-y-0 text-center">
                      {showRegistration() && (
                        <RegisterButton
                          id={data.id}
                          showByes={data.multipleSections && !isJunior}
                          multipleSections={data.multipleSections}
                          isJunior={isJunior}
                        />
                      )}

                      {data.registered && (
                        <span className="flex w-full sm:w-auto justify-center px-4 py-2 rounded-md border border-yellow-300 text-sm font-medium bg-yellow-100 text-yellow-800">
                          Entered
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="flex w-full sm:w-auto justify-center px-4 py-2 border border-gray-300 
                        shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                      >
                        <span>Contact Us</span>
                      </button>
                    </div>

                  </div>
                  {/* Mobile Sidebar  */}
                  <div className="lg:hidden">
                    <SummaryDetails
                      data={data}
                      tags={tags}
                      organisers={organisers}
                    />
                  </div>

                  <div className="py-3 lg:pt-8 mt-6 sm:mt-0">
                    <EventDescription
                      template={data.type.eventType}
                      multipleSections={data.multipleSections}
                      isJuniorEvent={data.name.includes("Junior")}
                    />
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
            <div className="hidden lg:block">
              <SummaryDetails data={data} tags={tags} organisers={organisers} />
            </div>
          </div>
        </div>
        <EventContactUsModal
          open={isModelOpen}
          setOpen={setIsModalOpen}
          eventName={data.name.trim()}
          eventStart={data.startDate.trim()}
        />
      </main>
    </div>
  );
}

function Entries(props: Props) {
  const { data, isLoadingEntries, entries } = props;

  let mergeEventInfoWithEntries = data;

  if(entries) {
    mergeEventInfoWithEntries = {
      ...data,
      entries: entries.entries
    }
  }

  return (
    <div className="mt-10">
      <>
        {!isLoadingEntries && <EntriesTable eventDetails={mergeEventInfoWithEntries} />}
      </>
      <>
        {isLoadingEntries && <p>Loading...</p>}
      </>

    </div>
  );
}

function Schedule(props: Props) {
  const { data } = props;

  let eventType = data.type.eventType;

  // TODO: refine list of eventTypes ensuring flexibility with static round schedule
  if(data?.name.includes("Festival") && data?.type?.eventType === "blitz") {
    eventType = "festival-blitz";
  }

  return (
    <div className="mt-2">
      <RoundTimes
        eventId={data.id}
        eventType={eventType}
        removeStyles={true}
      />
    </div>
  );
}

function Travel(props: Props) {
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
    <aside className="mt-8 lg:mt-0 lg:pl-8">
      <h2 className="sr-only">Details</h2>
      <div className="space-y-5">
        <div className="flex items-center space-x-2">
          <div>
            <i className="fas fa-calendar-alt text-gray-400"></i>
          </div>
          <div className="text-gray-900 text-sm font-medium">
            <span className="text-teal-600">Start</span>{" "}
            <time dateTime={data.startDate}>
              {moment(data.startDate).format("dddd, MMMM Do")}
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
                {moment(data.endDate).format("dddd, MMMM Do")}
              </time>
            </div>
          </div>
        )}
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

        <div className="flex items-center space-x-2">
          <div>
            <i className="fad fa-credit-card text-gray-400"></i>
          </div>
          <div className="text-gray-900 text-sm font-medium">
            <span className="text-teal-600">Entry Fee</span> £
            {data.type.defaultPrice}
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-b lg:border-b-0 border-gray-200 py-6 space-y-8">
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

interface RegisterButtonProps {
  id: string;
  multipleSections: boolean;
  showByes: boolean;
  isJunior: boolean;
}

function RegisterButton(props: RegisterButtonProps) {
  const {
    id,
    multipleSections = false,
    showByes = false,
    isJunior = false,
  } = props;
  const stripe = useStripe();
  const { addToast } = useToasts();

  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [modelOpen, setModalOpen] = useState(false);
  const handleRegister = async (
    id: string,
    section: string | undefined,
    byes: any
  ) => {
    setIsLoadingSignUp(true);
    await Auth.currentUserCredentials();
    await register(id, section, byes);
    setIsLoadingSignUp(false);
  };

  const openSectionSelectionModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const register = async (
    eventId: string,
    confirmSection: string,
    confirmByes: string
  ) => {
    try {
      const redirectTo = `${window.location.origin}/app/events/${eventId}`;
      const selectedSection = confirmSection ? confirmSection : null;
      const byesSelection = confirmByes ? confirmByes : null;
      const { sessionId } = await API.post("public", "/event/register", {
        body: {
          eventId,
          successUrl: redirectTo,
          cancelUrl: redirectTo,
          section: selectedSection,
          byes: byesSelection,
        },
      });
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      const mailToString = `mailto:support@chesscentre.online?subject=Event%20Sign%20Up%20Error&Body=%0D%0A// ---- DO NOT DELETE ----//%0D%0AEvent ID: ${eventId}%0D%0AUser ID: ${user.username}%0D%0AUser: ${user.attributes.given_name} ${user.attributes.family_name}%0D%0A// ---- THANK YOU ----//%0D%0A%0D%0A`;
      addToast(
        <div>
          Oops, something isn't working on our end.
          <br />
          If this persists, please{" "}
          <a className="font-bold underline" href={mailToString}>
            contact us
          </a>{" "}
          🛠️
        </div>,
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
      console.log("Error", error);
    }
  };

  const sections = isJunior ? juniorSections : standardSections;

  return (
    <div>
      {multipleSections ? (
        <>
          <button
            className="inline-flex w-full sm:w-auto justify-center px-4 py-2 border border-teal-600 shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            onClick={() => openSectionSelectionModal()}
          >
            Register
          </button>
        </>
      ) : (
        <button
          className="inline-flex w-full sm:w-auto justify-center px-4 py-2 border border-teal-600 shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          onClick={() => handleRegister(id, undefined, undefined)}
        >
          {isLoadingSignUp ? (
            <>
              <div className="mr-2">
                <i className="fas fa-spinner-third animate-spin -ml-4 sm:ml-0"></i>
              </div>
              <div className="text-sm">Loading...</div>
            </>
          ) : (
            `Register`
          )}
        </button>
      )}
      <EventSectionSelectionModal
        key={id}
        showByes={showByes}
        eventId={id}
        handleRegister={handleRegister}
        open={modelOpen}
        closeModal={closeModal}
        sections={sections}
        isJunior={isJunior}
      />
    </div>
  );
}
