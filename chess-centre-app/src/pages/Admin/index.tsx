import API from "@aws-amplify/api";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAuthState, isAdmin } from "../../context/Auth";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import { classNames } from "../../utils/Classes";
import { useHistory } from "react-router-dom";
import { useFullEvents } from "../../api/events";
import { MemberItem, Entry, Section, Pairing, SectionPairings } from "./types";

const listMembers = /* GraphQL */ `
  query ListMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fideId
        ecfId
        username
        name
        ecfRating
        ecfRapid
        ecfMembership
        estimatedRating
        club
        createdAt
      }
    }
  }
`;

const updateMember = /* GraphQL */ `
  mutation UpdateMember(
    $input: UpdateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    updateMember(input: $input, condition: $condition) {
      ecfId
    }
  }
`;

export default function Admin() {
  const history = useHistory();
  const { user } = useAuthState();
  const [isFetching, setIsFetching] = useState(false);
  const [members, setMembers] = useState([]);

  async function checkStatus() {
    const status = await isAdmin();
    if (!status) {
      history.push("/app");
    }
  }

  useEffect(() => {
    document.title = "The Chess Centre | Admin";

    checkStatus();

    async function fetchStatus() {
      setIsFetching(true);
      const {
        data: {
          listMembers: { items: playersList },
        },
      }: any = await API.graphql({
        query: listMembers,
        variables: { limit: 500 },
        authMode: "AWS_IAM",
      });
      if (playersList) {
        setMembers(playersList.filter((m: any) => !m.ecfId).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
      setIsFetching(false);
    }
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <h1 className="relative mt-6 mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fad fa-tools text-sky-600"></i> Admin
        <div className="inline-flex align-top top-2 ml-2"></div>
        {isFetching && (
          <div className="absolute text-sky-500 mt-2 align-middle ml-2 text-sm inline-flex">
            <i className="fal fa-spinner-third fa-spin fa-fw"></i>
            <span className="text-xs text-gray-300 ml-2 font-normal">
              fetching data...
            </span>
          </div>
        )}
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <p className="ml-2 mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
            Utility functions to help maintain our site!
          </p>
        </div>
      </div>
      <div>
        <div className="rounded-md bg-sky-100 p-4 mb-2 mt-2 border">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-sky-600">
                Remember, with great power comes great responsibility
              </h3>
            </div>
          </div>
        </div>
      </div>

      <UpdateMemberECFId members={members} setMembers={setMembers} />

      <EventPreparation />
    </>
  );
}

function UpdateMemberECFId({ members, setMembers }) {
  const [isUpdatingECF, setIsUpdatingECF] = useState(false);
  const [selectedMember, setSelectedMember] = useState({
    id: null,
    _version: null,
    name: null,
  });
  const [ecfId, setECFId] = useState<string>("");
  const [updatedMembers, setUpdatedMembers] = useState<MemberItem[]>([]);
  const [isUpdatingRatings, setIsUpdatingRatings] = useState(false);
  const updateECFIdForMember = async () => {
    setIsUpdatingECF(true);

    if (selectedMember.id && ecfId) {
      const memberInfo = {
        id: selectedMember.id,
        _version: selectedMember._version,
        ecfId,
      };

      await API.graphql({
        query: updateMember,
        variables: { input: memberInfo },
        authMode: "AWS_IAM",
      });

      setUpdatedMembers([
        ...updatedMembers,
        {
          id: selectedMember.id,
          name: selectedMember.name,
          timeStamp: Date.now(),
          ecfId,
        },
      ]);
      setMembers([...members.filter((m: any) => m.id !== selectedMember.id)]);
      setSelectedMember({
        id: null,
        _version: null,
        name: null,
      });
      setECFId("");
      setIsUpdatingECF(false);
    }
    setIsUpdatingECF(false);
  };

  const handleECFIdUpdate = (id: string) => {
    setECFId(id);
  };

  const runUpdater = async () => {
    setIsUpdatingRatings(true);
    const response = await API.get("admin", "/rating-check", {}).catch((e) => {
      console.log(e);
    });
    console.log(response);
    setIsUpdatingRatings(false);
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="shadow rounded-lg border bg-white grid gap-2 xl:gap-4 mb-4 md:grid-cols-2 mt-2 px-4 py-6">
          <div>
            <MemberSearch
              members={members}
              selectedMember={selectedMember}
              setSelectedMember={setSelectedMember}
            />
            <div className="text-left">
              {isUpdatingECF && (
                <div className="text-gray-300 italic text-sm mt-4 ml-2">
                  <i className="fas fa-spinner-third fa-spin fa-fw text-sky-500"></i>{" "}
                  Update member ...
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1 mt-4 sm:mt-0">
            <label
              htmlFor="add-ecf-id"
              className="block text-sm font-medium text-gray-700"
            >
              Update their ECF data
            </label>
            <div className="flex">
              <div className="flex-grow">
                <input
                  onChange={(e) => handleECFIdUpdate(e.target.value)}
                  type="text"
                  name="add-ecf-id"
                  id="add-ecf-id"
                  value={ecfId || ""}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                  placeholder="ECF Rating Id"
                  aria-describedby="add-ecf-id"
                />
              </div>
              <span className="ml-3">
                <button
                  onClick={() => updateECFIdForMember()}
                  type="button"
                  className="bg-white inline-flex items-center px-4 py-2.5 sm:py-2 border border-gray-300 
              shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  <PlusIcon
                    className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Add</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="shadow rounded-lg border bg-white grid gap-2 xl:gap-4 mb-4 mt-2 px-6 py-4">
          {Boolean(updatedMembers.length) && (
            <div className="text-left overflow-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      ECF
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {updatedMembers.map((member, key) => (
                    <tr key={key}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                        {member.name}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        <a
                          className="text-teal-500 hover:text-teal-400 font-medium"
                          href={`https://www.ecfrating.org.uk/v2/new/player.php?ECF_code=${member.ecfId}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {member.ecfId}
                        </a>
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {moment(member.timeStamp).format(
                          "dddd, MMM Do, h:mm:ss a"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="sm:flex-inline mt-2">
            {Boolean(updatedMembers.length) && (
              <div className="text-xs md:text-sm text-gray-500 italic">
                Note: this information does not persist and will be wiped upon
                page reload or refresh.
              </div>
            )}
            <div className="text-right sm:-mt-8 mt-2">
              {!isUpdatingRatings && Boolean(updatedMembers.length) && (
                <button
                  onClick={() => runUpdater()}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm bg-sky-600 
                    font-medium rounded-md text-white hover:bg-sky-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Update Rating
                </button>
              )}
              {isUpdatingRatings && (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm bg-sky-700 
                  font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  <div className=" text-white align-middle mr-2 text-sm inline-flex">
                    <i className="fal fa-spinner-third fa-spin fa-fw"></i>
                  </div>
                  <span>Updating...</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EventPreparation() {
  const { isLoading, data } = useFullEvents();
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedType, setSelectedType] = useState("Swiss");
  const [broadcast, setBroadcast] = useState<string | undefined>();

  useEffect(() => {
    const broadcastData = convertToBroadcast(selectedEvent, selectedType);
    setBroadcast(JSON.stringify(broadcastData, undefined, 6));
  }, [selectedEvent, selectedType]);

  return (
    <div className="grid grid-cols-1">
      <div className="shadow rounded-lg border bg-white grid gap-2 xl:gap-4 mb-4 md:grid-cols-3 mt-2 px-4 py-6">
        {!isLoading && data && (
          <EventSelection
            eventData={data}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
        )}
        <div className="col-span-2">
          <div className="md:flex md:relative mb-1">
            <label
              htmlFor="json-event-data"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              JSON output{" "}
              <span className="text-xs text-gray-500">
                for presentation broadcast
              </span>
            </label>
            <EventTypeToggle setSelectedType={setSelectedType} />
          </div>
          <textarea
            name="json-event-data"
            className="block w-full rounded-md border-gray-300 shadow-xs focus:border-sky-500 focus:ring-sky-500 sm:text-xs"
            rows={20}
            readOnly={true}
            value={broadcast}
          />
        </div>
      </div>
    </div>
  );
}

function MemberSearch({ members, selectedMember, setSelectedMember }) {
  const [query, setQuery] = useState("");

  const filterMembers =
    query === ""
      ? members
      : members.filter((member) => {
          return member?.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleSelectedMember = (member: any) => {
    setSelectedMember(member);
  };

  return (
    <Combobox as="div" value={selectedMember} onChange={handleSelectedMember}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        Members{" "}
        <span className="text-xs text-gray-500">without ECF references</span>
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          placeholder="Select member..."
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(member: any) => member.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {Boolean(filterMembers.length) && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full hover:text-white overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filterMembers.map((member) => (
              <Combobox.Option
                key={member.id}
                value={member}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-sky-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span
                        className={classNames(
                          selected && "font-semibold", active ? "text-white" : "text-sky-600"
                        )}
                      >
                        {member.name}
                      </span>
                      <span
                        className={classNames(
                          "ml-2 mt-0.5 text-gray-500 text-xs",
                          active ? "text-sky-200" : "text-gray-500"
                        )}
                      >
                        {moment(member.createdAt).format("ddd Do MMM yyyy")}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-sky-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

function EventSelection({ eventData, selectedEvent, setSelectedEvent }) {
  const [query, setQuery] = useState("");

  const filterEvents =
    query === ""
      ? eventData
      : eventData.filter((eventInfo) => {
          return eventInfo?.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" value={selectedEvent} onChange={setSelectedEvent}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        Events <span className="text-xs text-gray-500">with entries</span>
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          placeholder="Select member..."
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(e: any) => e.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {Boolean(filterEvents.length) && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filterEvents.map((eventInfo) => (
              <Combobox.Option
                key={eventInfo.id}
                value={eventInfo}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-sky-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex space-x-2">
                      <div
                        className={classNames(selected && "font-semibold", active ? "text-white" : "text-sky-600")}
                      >
                        {eventInfo.name}
                      </div>
                      <div
                        className={classNames(
                          "ml-2 text-sm truncate text-gray-500",
                          active ? "text-sky-200" : "text-gray-400"
                        )}
                      >
                        {moment(eventInfo.startDate).format("MMM Do")}
                      </div>
                      <div
                        className={classNames(
                          "ml-2 text-sm truncate text-gray-500",
                          active ? "text-sky-200" : "text-gray-300"
                        )}
                      >
                        entries: {eventInfo.entries.items.length}
                      </div>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-sky-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-500 space-y-2 px-1">
        <p>
          A list of upcoming event entries. This allows you to prepare a{" "}
          <span className="font-bold">swiss</span> or{" "}
          <span className="font-bold">round robin</span> for our internal
          broadcast.
        </p>
        <p>
          Copy the JSON output into the broadcast admin. The output is editable
          so you can switch a player in or out easily.
        </p>
      </div>
    </Combobox>
  );
}

function getRating({
  ecfRating,
  ecfRapid,
  estimatedRating,
  fideRating,
  ecfRatingPartial = false,
  ecfRapidPartial = false,
  isBlitz,
  isRapid
}) {
  const standard = ecfRating ? parseInt(ecfRating, 10) : 0;
  const rapid = ecfRapid ? parseInt(ecfRapid, 10) : 0;
  const ratingObj = (rating: any, isPartial: boolean, key: string) => {
    return {
      value: rating,
      sort: rating !== "unrated" ? Number(rating) : 0,
      isPartial,
      key
    }
  }
  /**
   * Depending on the event type (blitz, rapid, standard) a provided order of precedence is used.
   * We want to display a rating most relevant to the event type and fallback to other ratings if not available
   */
  if (isBlitz) {
    if (rapid) return ratingObj(rapid, ecfRapidPartial, "");
    if (standard) return ratingObj(standard, ecfRatingPartial, "S");
    if (estimatedRating) return ratingObj(estimatedRating, ecfRatingPartial, "E");
    return ratingObj("unrated", ecfRatingPartial, "");
  }
  if (isRapid) {
    if (rapid) return ratingObj(rapid, ecfRapidPartial, "");
    if (standard) return ratingObj(standard, ecfRatingPartial, "S");
    if (estimatedRating) return ratingObj(estimatedRating, ecfRatingPartial, "E");
    return ratingObj("unrated", ecfRatingPartial, "");
  } else {
    // Standard Rating
    if (standard) return ratingObj(standard, ecfRatingPartial, "");
    if(fideRating) return ratingObj(fideRating, false, "F");
    if (rapid) return ratingObj(rapid, ecfRapidPartial, "R");
    if (estimatedRating) ratingObj(estimatedRating, ecfRatingPartial, "E");
    return ratingObj("unrated", ecfRatingPartial, "");
  }
}

function convertToBroadcast(event: any, eventType: string) {
  if (isEmpty(event)) return {};

  const sections = getSections(eventType);
  const entries = modelEntries(event.entries, event.name);

  const data = {
    name: `${event.name} ${moment().format("yyyy")}`,
    eventId: event.id,
    eventName: event.name,
    date: event.startDate,
    settings: {
      enableToggles: false,
      type: eventType,
      currentRound: 1,
      showRoundTimeForRound: 1,
      totalRounds: event.rounds,
      roundLive: false,
      showAll: false,
      showOpponentPairing: false,
      showPreviousRound: false,
      nextRoundTime: {
        "1": "10:00am",
        "2": "11:00am",
        "3": "12:30pm",
        "4": "1:30pm",
        "5": "2:30pm",
      },
      prizeGiving: "3:30pm",
    },
    players: getPlayers(entries, sections, eventType),
    pairings: getPairings(entries, sections, eventType, event.rounds),
    results: getResults(entries, sections, event.rounds),
  };

  return data;
}

function getSections(eventType: string): Section[] {
  switch (eventType) {
    case "Swiss":
      return [
        {
          section: "swiss",
          title: "Event Schedule",
          icon: "fad fa-chess-king",
        },
      ];
    case "RoundRobin":
      return [
        {
          section: "open",
          title: "Division 1",
          icon: "fad fa-chess-king",
        },
        {
          section: "major",
          title: "Division 2",
          icon: "fad fa-chess-queen",
        },
        {
          section: "minor",
          title: "Division 3",
          icon: "fad fa-chess-bishop",
        },
      ];
    case "Congress":
      return [
        {
          section: "open",
          title: "Open",
          icon: "fad fa-chess-king",
        },
        {
          section: "major",
          title: "Major",
          icon: "fad fa-chess-queen",
        },
        {
          section: "intermediate",
          title: "Intermediate",
          icon: "fad fa-chess-rook",
        },
        {
          section: "minor",
          title: "Minor",
          icon: "fad fa-chess-bishop",
        },
      ];
    default:
      return [
        {
          section: "swiss",
          title: "Event Schedule",
          icon: "fad fa-chess-king",
        },
      ];
  }
}

function modelEntries(entries: any, eventName: string): Entry[] {
  return [
    ...entries?.items?.map((entry: any, idx: number) => {
      const isBlitz = eventName.includes("Blitz");
      const isRapid = eventName.includes("Rapid");
      const rating = getRating({ ...entry.member, isBlitz, isRapid });
      return {
        id: idx + 1,
        section: entry.section,
        memberId: entry.member.id,
        name: entry.member.name,
        ratingInfo: {
          rating: rating.value,
          ...rating,
        },
      };
    }),
  ].sort((a: Entry, b: Entry) => b.ratingInfo.sort - a.ratingInfo.sort);
}

function getPlayers(entries: Entry[], sections: Section[], eventType: string) {
  function getEntryList(
    entries: Entry[],
    eventType: string,
    section: string,
    key: number
  ) {
    switch (eventType) {
      case "Swiss":
        return [
          ...entries.map((entry, seed) => ({
            ...entry,
            id: seed + 1,
            seed: seed + 1,
          })),
        ];
      case "RoundRobin":
        return [
          ...entries.slice(key * 6, key * 6 + 6).map((entry, seed) => ({
            ...entry,
            id: seed + 1,
            seed: seed + 1,
          })),
        ];
      case "Congress":
        return [
          ...entries
            .filter((e) => e.section === section)
            .map((entry, seed) => ({
              ...entry,
              id: seed + 1,
              seed: seed + 1,
              // Used for random rating anomalies where we need to distinguist between our proposed seed and the chess-results swiss manager
              chessResulsSeed: seed + 1
            })),
        ];
      default:
        return [];
    }
  }

  return [
    ...sections.map((s, key) => {
      const list = getEntryList(entries, eventType, s.section, key);
      return {
        count: list.length,
        section: s.section,
        title: s.title,
        icon: s.icon,
        entries: list,
      };
    }),
  ];
}

function getPairings(
  entries: Entry[],
  sections: Section[],
  eventType: string,
  rounds: number
): Pairing[] | SectionPairings[] | undefined {

  if (eventType === "Swiss") {
    return [
      {
        round: 1,
        pairings: [...new Array(Math.ceil(entries.length / 2))].map(
          (_, key) => {
            const drawSplit = Math.ceil(entries.length / 2) + key;
            const isOdd = (key + 1) % 2 === 0;
            return isOdd ? [drawSplit + 1, key + 1] : [key + 1, drawSplit + 1];
          }
        ),
      },
    ];
  }

  if (eventType === "RoundRobin") {
    return [
      {
        round: 1,
        pairings: [
          [1, 6],
          [2, 5],
          [3, 4],
        ],
      },
      {
        round: 2,
        pairings: [
          [6, 4],
          [5, 3],
          [1, 2],
        ],
      },
      {
        round: 3,
        pairings: [
          [2, 6],
          [3, 1],
          [4, 5],
        ],
      },
      {
        round: 4,
        pairings: [
          [6, 5],
          [1, 4],
          [2, 3],
        ],
      },
      {
        round: 5,
        pairings: [
          [3, 6],
          [4, 2],
          [5, 1],
        ],
      },
    ];
  }

  if (eventType === "Congress") {
    return [
      ...sections.map((s) => {
        const sectionEntries = entries.filter((e) => e.section === s.section);
        return {
          section: s.section,
          count: sectionEntries.length,
          sectionPairings: [...new Array(rounds)].map((_, key) => {
              return {
                round: key + 1,
                pairings: [
                  ...new Array(Math.ceil(sectionEntries.length / 2)).fill([]),
                ],
              };
            }),
        };
      }),
    ];
  }
}

function getResults(entries: Entry[], sections: Section[], rounds: number) {
  return [
    ...sections.map((s) => ({
      section: s.section,
      scores: [...new Array(rounds)].map((_, key) => ({
        round: key + 1,
        pairResults: [...new Array(Math.ceil(entries.length / 2)).fill([])],
      })),
    })),
  ];
}

function isEmpty(obj: object) {
  return (
    obj && // 👈 null and undefined check
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

function EventTypeToggle({ setSelectedType }) {
  const eventTypes = [
    { id: "Swiss", title: "Swiss", checked: true },
    { id: "RoundRobin", title: "Round Robin", checked: false },
    { id: "Congress", title: "Congress", checked: false },
  ];

  return (
    <div className="md:absolute md:right-2 ml-2 md:ml-0">
      <fieldset>
        <legend className="sr-only">Event Type</legend>
        <div className="flex items-center space-y-0 sm:space-x-10 space-x-6">
          {eventTypes.map((type) => (
            <div key={type.id} className="flex items-center">
              <input
                id={type.id}
                name="event-type"
                type="radio"
                defaultChecked={type.checked}
                onChange={() => setSelectedType(type.id)}
                className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-500"
              />
              <label
                htmlFor={type.id}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {type.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
