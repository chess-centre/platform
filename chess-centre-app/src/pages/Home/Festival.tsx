import API from "@aws-amplify/api";
import { Tab } from "@headlessui/react";
import { useParams } from "react-router-dom";
import React, { useEffect, Fragment, useState } from "react";
import { ExclamationIcon } from "@heroicons/react/solid";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import FestivalMap from "../../components/Map/FestivalMap";
import FestivalBuilding from "../../assets/img/festival_building.png";
import QueenElizabeth from "../../assets/img/our-queen-elizabeth.png";
import Chesscom from "../../assets/img/chesscom.png";
import C24 from "../../assets/img/c24.png";
import EntriesTable from "../../components/EntriesTable/festivalTable";
import { rounds } from "../../api/data.roundTimes";
import { classNames } from "../../utils/Classes";
import FestivalHero from "../../assets/img/festival_hero.jpg";
import ConfirmEntry from "../../components/Modal/ConfirmFestivalEntry";

const festival = {
  name: "Ilkley Chess Festival",
  date: "September 16th - 18th, 2022",
  datetime: "2022-09-16",
};

const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!, $filter: ModelEntryFilterInput, $limit: Int, $nextToken: String) {
    getEvent(id: $id) {
      id
      name
      description
      rounds
      time
      startDate
      endDate
      maxEntries
      entryCount
      complete
      cancelled
      isLive
      isLiveUrl
      active
      multipleSections
      type {
        id
        name
        description
        url
        color
        time
        maxEntries
        timeControl
        eventType
        defaultPrice
        canRegister
      }
    }
    listEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventId
        memberId
        section
        byes
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
            ecfLastUpdated
            fideRating
            club
            gender
            chessTitle
          }
      }
      nextToken
      startedAt
    }
  }
`;

export default function Festival() {
  const { id } = useParams() as any;
  const event = rounds.find(({ type }) => type === "festival");
  const [isLoading, setIsLoading] = useState(false);
  const [eventEntries, setEventEntries] = useState({});
  const [entriesCount, setEntriesCount] = useState(0);

  useEffect(() => {
    document.title = "Sheffield Chess Centre | Festival";

    const fetchEvent = async () => {
      setIsLoading(true);
      const response: any = await API.graphql({
        query: getEvent,
        variables: { id, filter: { eventId: { eq: id } }, limit: 250 },
        authMode: "AWS_IAM",
      });

      if (response && response.data) {
        const {
          data: {
            getEvent: eventData,
            listEntrys: entries },
        }: any = response;


        if (entries.nextToken) {
          const additionalResponse = await API.graphql({
            query: getEvent,
            variables: { id, filter: { eventId: { eq: id } }, limit: 250, nextToken: entries.nextToken },
            authMode: "AWS_IAM",
          });

          const {
            data: {
              listEntrys: moreEntries },
          }: any = additionalResponse;

          const items = { items: [...entries.items, ...moreEntries.items] };

          setEventEntries({ ...eventData, entries: items });
          setEntriesCount(items.items.length);

        } else {
          setEventEntries({ ...eventData, entries });
          if (entries?.items) {
            setEntriesCount(entries?.items.length);
          }
        }
      }
      setIsLoading(false);
    };
    fetchEvent();
  }, [id]);

  return (
    <div className="relative bg-white">
      <div className=" bg-gray-50 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>
      <div className="mx-auto py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:row-end-1 lg:col-span-4">
            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
              <img
                src={FestivalHero}
                alt="hero"
                className="object-center object-cover"
              />
            </div>
          </div>

          <div className="max-w-2xl text-center sm:text-left mx-auto mt-4 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
            {/* TITLE */}
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-3xl font-extrabold tracking-tight  text-yellow-brand sm:text-5xl">
                  <span className="text-orange-brand">Ilkley</span> Chess
                  Festival
                </h1>
                <p className="text-md text-blue-brand mt-2">
                  <time dateTime={festival.datetime}>{festival.date}</time>
                </p>
              </div>
            </div>

            {/* PRIZES */}
            <div className="border-t border-gray-200 mt-6 pt-6 mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Prizes{" "}
                <span className="text-sm text-gray-500">for all sections</span>
              </h3>
              <div className="mt-4 sm:mx-0">
                <Prizes />
              </div>
            </div>

            {/* ENTRY FORM */}
            <div className="hidden sm:block">
              <EntryForm id={id} />
            </div>

            {/* LOCATION */}
            <div className="border-t border-gray-200 mt-10 pt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="order-2 sm:order-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    Location
                  </h3>
                  <p className="mt-4 text-sm text-gray-500">
                    King&#39;s Hall &#38; Winter Garden
                  </p>
                  <p className="mt-2 text-sm text-gray-500">Station Road</p>
                  <p className="mt-2 mb-10 text-sm text-gray-500">
                    Ilkley, LS29 8HB
                  </p>
                </div>
                <div className="order-1 sm:order-2">
                  <img
                    className="w-6/7 -mt-6"
                    alt="festival building"
                    src={FestivalBuilding}
                  />
                </div>
              </div>

              <FestivalMap />
            </div>
          </div>

          {/* MORE DETAILS */}
          <div className="w-full max-w-2xl mx-auto sm:mt-16 mt-6 lg:max-w-none lg:mt-0 lg:col-span-4">
            <Tab.Group as="div">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-yellow-500 text-yellow-500"
                          : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                        "whitespace-nowrap py-6 border-b-2 font-medium text-sm focus:ring-transparent"
                      )
                    }
                  >
                    Details
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-yellow-500 text-yellow-500"
                          : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                        "whitespace-nowrap py-6 border-b-2 font-medium text-sm focus:ring-transparent"
                      )
                    }
                  >
                    Schedule
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-yellow-500 text-yellow-500"
                          : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                        "whitespace-nowrap py-6 border-b-2 font-medium text-sm focus:ring-transparent"
                      )
                    }
                  >
                    Entries
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-yellow-500 text-yellow-500"
                          : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                        "whitespace-nowrap py-6 border-b-2 font-medium text-sm focus:ring-transparent"
                      )
                    }
                  >
                    FAQs
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="-mb-10 py-5 focus:ring-transparent">
                  <div className="relative">
                    <div className="prose prose-blue text-gray-500 mx-auto lg:max-w-none text-justify">
                      <p>In loving memory of <span className="font-bold text-yellow-brand">Her Majesty Queen Elizabeth II</span> we will be holding a minutes silence on Saturday morning before round 2.</p>
                      <img
                        src={QueenElizabeth}
                        alt="Queen Elizabeth"
                        className="object-center object-cover w-80 rounded-md shadow-md"
                      />
                      <p></p>
                    </div>
                    <div className="prose prose-blue text-gray-500 mx-auto lg:max-w-none text-justify">
                      <h2>Sections</h2>
                      <ul className="font-medium text-yellow-brand">
                        <li>Open</li>
                        <li>
                          Major{" "}
                          <span className="text-xs text-gray-500">
                            (2000 ECF and below)
                          </span>
                        </li>
                        <li>
                          Intermediate{" "}
                          <span className="text-xs text-gray-500">
                            (1750 ECF and below)
                          </span>
                        </li>
                        <li>
                          Minor{" "}
                          <span className="text-xs text-gray-500">
                            (1500 ECF and below)
                          </span>
                        </li>
                      </ul>
                      <p className="text-sm">
                        Unrated players will not be eligible for section
                        specific grading prizes.
                      </p>
                    </div>
                    <div className="rounded-md bg-yellow-50 p-4 my-4 hidden sm:block">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ExclamationIcon
                            className="h-5 w-5 text-yellow-400"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            ECF Membership Required
                          </h3>
                          <div className="mt-2 text-sm text-yellow-600">
                            <p>
                              All entries <span className="italic">should</span>{" "}
                              have an ECF membership, create yours here:{" "}
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href={`https://www.englishchess.org.uk/ecf-membership-rates-and-joining-details/`}
                                className="font-medium underline text-yellow-600 hover:text-yellow-500"
                              >
                                ECF Membership
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="prose prose-blue text-gray-500 mx-auto lg:max-w-none text-justify mt-4">
                      <h2>Event Information</h2>
                      <ul className="font-medium text-yellow-brand">
                        <li>
                          Rounds: <span className="text-blue-brand">5</span>{" "}
                          <span className="text-gray-600 text-sm font-normal">
                            see schedule
                          </span>
                        </li>
                        <li>
                          Time Control:{" "}
                          <span className="text-blue-brand text-md">
                            90{" "}
                            <span className="text-sm text-gray-600 font-normal">
                              mins per player
                            </span>{" "}
                            + 10{" "}
                            <span className="text-sm text-gray-600 font-normal">
                              second increment
                            </span>
                          </span>
                        </li>
                        <li>
                          Entry fee:{" "}
                          <span className="text-blue-brand">£30</span>
                        </li>
                      </ul>
                      <p className="text-sm">
                        Standard ECF rules apply. All games will be submited to
                        the ECF for offical rating calculation.
                      </p>
                    </div>
                    <div className="hidden sm:block prose prose-blue text-gray-500 mx-auto lg:max-w-none text-justify mt-4 sm:mb-6">
                      <h2>Broadcast</h2>
                      <p className="text-sm">
                        It is with great pleasure we will be broadcasting our top boards to the following Chess websites:
                      </p>
                      <div className="grid grid-cols-2">
                        <div>
                          <a href="https://www.chess.com/events/2022-ilkley-chess-festival">
                            <img className="w-32 sm:w-48 m-auto" alt="chess.com" src={Chesscom} />
                          </a>
                        </div>
                        <div className="mt-2">
                          <a href="https://chess24.com/en/watch/live-tournaments/ikley-chess-festival-2022-open#live">
                            <img className="w-32 sm:w-48 m-auto" alt="chess24" src={C24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel
                  as="dl"
                  className="text-gray-500 py-5 focus:ring-transparent"
                >
                  <div className="prose prose-blue mb-4">
                    <h2>Schedule</h2>
                  </div>
                  <Schedule event={event} />
                </Tab.Panel>

                <Tab.Panel
                  as="dl"
                  className="text-sm text-gray-500 py-5 focus:ring-transparent"
                >
                  <div className="prose prose-blue text-gray-500 mx-auto lg:max-w-none text-justify">
                    <h2>
                      Entries{" "}
                      <span className="text-gray-500 font-medium text-sm">
                        ( {entriesCount} )
                      </span>
                    </h2>

                    {!isLoading && eventEntries && (
                      <EntriesTable eventDetails={eventEntries} />
                    )}

                    {isLoading && (
                      <div className="text-gray-300 italic text-center">
                        <i className="fas fa-spinner-third fa-spin fa-fw text-yellow-400"></i>{" "}
                        fetching entry details ...
                      </div>
                    )}
                  </div>
                </Tab.Panel>
                <Tab.Panel
                  as="dl"
                  className="text-sm text-gray-500 py-5 focus:ring-transparent"
                >
                  <div className="prose prose-yellow text-gray-500 mx-auto lg:max-w-none text-justify">
                    <h2>FAQs</h2>
                    <ul>
                      <li>
                        <span className="font-bold text-yellow-500">
                          Missing my ECF rating
                        </span>
                        <p>
                          We automatically search and check ECF rating data upon
                          account registration. If we are unable to accurately
                          determine your ECF rating (if you have one) we will
                          contact you. Otherwise, leave it with us, your rating
                          will appear within a few hours of any event entry!
                        </p>
                      </li>
                      <li>
                        <span className="font-bold text-yellow-500">
                          Withdraw entry
                        </span>
                        <p>
                          If you are unable to make this event, please{" "}
                          <a
                            className="text-yellow-500 hover:underline"
                            href="mailto:support@chesscentre.online?subject=Withdraw%20Festival%20Entry"
                          >
                            contact us
                          </a>{" "}
                          as soon as possible so we can process any refund.
                          Unfortunately, those who withdraw on the day or fail
                          to attend will not be eligible for refunds as we offer
                          your place to other players.
                        </p>
                      </li>
                      <li>
                        <span className="font-bold text-yellow-500">
                          Rating list
                        </span>
                        <p>
                          We will use the latest ECF ratings published on the{" "}
                          <span className="font-bold">1st September 2022</span>{" "}
                          for this event, this may mean entries have to switch
                          sections if their rating jumps beyond the specified
                          rating cap. We will contact all players where this
                          occurs but will automatically move players up to the
                          next eligible section.
                        </p>
                      </li>
                      <li>
                        <span className="font-bold text-yellow-500">
                          Anti-Cheating{" "}
                        </span>
                        <p>
                          We are working with an official FIDE registered
                          tournament arbiter to provide clear guidance for
                          electronic devices.
                        </p>
                        <p>
                          <span className="font-bold">ECF</span>{" "}
                          <a href="https://www.englishchess.org.uk/wp-content/uploads/2019/12/Anti-Cheating-Document.pdf">
                            anti-cheating policy
                          </a>
                        </p>
                        <p>
                          <span className="font-bold">FIDE</span>{" "}
                          <a href="https://www.fide.com/FIDE/handbook/Anti%20Cheating%20Guidelines.pdf">
                            anti-cheating guidelines
                          </a>
                        </p>
                      </li>
                    </ul>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            {/* ENTRY FORM */}
            <div className="block sm:hidden mt-12">
              <EntryForm id={id} />
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}

const Schedule = ({ event }) => {
  return (
    <table className="mx-auto sm:mx-0 min-w-full divide-y divide-gray-200">
      <tbody className="bg-white divide-y divide-gray-200">
        {event &&
          event.rounds.map(({ round, time, day }, key) => {
            return (
              <Fragment key={key}>
                <tr key={key}>
                  <td className="px-0 sm:px-0 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Round {round}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {day}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {time}
                  </td>
                </tr>
                {event.break && event.break.afterRound === round && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-2 text-center whitespace-nowrap text-xs font-medium text-gray-400"
                    >
                      Lunch Break
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        {event && event.prizeGiving && (
          <tr>
            <td className="px-0 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Prize Ceremony
            </td>
            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {event.prizeGiving.day}
            </td>
            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span className="">{event.prizeGiving.time}</span>
              <i className="ml-4 -mt-2 text-yellow-500 fas fa-trophy-alt fa-2x"></i>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const Prizes = () => {
  return (
    <table className="mx-auto sm:mx-0 min-w-full divide-y divide-gray-200">
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            1st Prize
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            £300.00
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <i className="fas fa-trophy-alt text-yellow-400 text-lg"></i>
          </td>
        </tr>
        <tr>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            2nd Prize
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            £150.00
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <i className="fas fa-trophy-alt text-gray-400 text-lg"></i>
          </td>
        </tr>
        <tr>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            3rd Prize
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            £75.00
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <i className="fas fa-trophy-alt text-yellow-800 text-lg"></i>
          </td>
        </tr>
        <tr>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            Grading Prizes
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            £50.00
          </td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <i className="fas fa-medal text-blue-brand text-lg"></i>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const EntryForm = ({ id }) => {
  const [section] = useState("open");
  const [selectedRoundOne] = useState(false);
  const [selectedRoundTwo] = useState(false);
  const [selectedRoundThree] = useState(false);
  const [selectedRoundFour] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [byesSelected, setByesSelected] = useState("");

  const generateUrl = () => {
    const sectionStr = `&section=${section}`;
    const r1 = selectedRoundOne ? "1" : "";
    const r2 = selectedRoundTwo ? "2" : "";
    const r3 = selectedRoundThree ? "3" : "";
    const r4 = selectedRoundFour ? "4" : "";
    const byes = `${r1}${r2}${r3}${r4}`;
    const byesStr = byes ? `&byes=${byes}` : "";
    return `/register?eventId=${id}${sectionStr}${byesStr}`;
  };

  return (
    <div>
      <div className="mt-4 mx-auto">
        <a rel="noreferrer" className="w-full border rounded-md py-1.5 px-8 flex items-center justify-center text-base font-medium text-blue-brand hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-yellow-400"
          href="https://chess-results.com/tnr665788.aspx?lan=1&art=0" target="_blank">Chess Results</a>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4">
      </div>
      <ConfirmEntry setOpen={setModalOpen} open={modalOpen} section={section} byes={byesSelected} url={generateUrl()} />
    </div>
  );
};
