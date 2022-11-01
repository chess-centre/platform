import React, { useState } from "react";
import { Standings, resultCheck, resultCheckCongress } from ".";
import { classNames } from "../../utils/Classes";

const addSeeding = (players: any) =>
  players.map((player: any, idx: number) => ({ ...player, seed: idx + 1 }));

/**
 * Displays the list of results for a given event.
 * Some events run as either: round robin, swiss, or multiple swiss events defined as a "congress"
 */
export function ResultViewer({ data }) {
  const [selectedSection, handleSelectionSelect] = useState("open");

  const { pairings, players, results, settings } = JSON.parse(data);

  if (settings.type.toLowerCase() === "congress") {
    const theme = {
      open: "bg-blue-festival text-orange-festival",
      major: "bg-yellow-festival text-blue-festival",
      intermediate: "bg-orange-festival text-blue-festival",
      minor: "bg-teal-festival text-blue-festival",
    };

    return (
      <div>
        <div className="mb-6">
          <SectionTabs handleSelectionSelect={handleSelectionSelect} />
        </div>
        <div className="grid grid-cols-1 space-y-6">
          {players &&
            players
              .filter(({ section }) => section.includes(selectedSection))
              .map(({ entries, section, title }, index: number) => {
                const scores = results.find((r: any) => r.section === section)
                  .scores;
                const sectionIdx = pairings.findIndex(
                  (p) => p.section === section
                );
                const seededPlayers = addSeeding(entries);
                const { roundByRound } = resultCheckCongress(
                  pairings[sectionIdx].sectionPairings,
                  seededPlayers,
                  scores,
                  settings
                );
                return (
                  <div key={sectionIdx}>
                    <Standings
                      roundByRound={roundByRound}
                      division={title}
                      settings={settings}
                      showTitle={false}
                      congress={true}
                      headerClasses={theme[section]}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 space-y-6">
        {players &&
          players.map(({ entries, section, title }, index: number) => {
            const scores = results.find((r: any) => r.section === section)
              .scores;
            const seededPlayers = addSeeding(entries);
            const { roundByRound } = resultCheck(
              pairings,
              seededPlayers,
              scores,
              settings
            );

            return (
              <div key={index}>
                <Standings
                  roundByRound={roundByRound}
                  division={title}
                  settings={settings}
                  showTitle={false}
                  congress={false}
                  headerClasses="bg-orange-brand shadow-orange-600 text-white"
                />
              </div>
            );
          })}
      </div>
    );
  }
}

type SectionTabProps = {
  handleSelectionSelect: Function;
};

function SectionTabs(props: SectionTabProps) {
  const { handleSelectionSelect } = props;

  const [sections, setSections] = useState([
    { name: "Open", current: true },
    { name: "Major", current: false },
    { name: "Inter", current: false },
    { name: "Minor", current: false },
  ]);

  const updateSectionSelected = (section) => {
    setSections((currentState) => {
      return [
        ...currentState.map((c) => {
          return {
            ...c,
            current: section.includes(c.name?.toLowerCase()),
          };
        }),
      ];
    });

    if (handleSelectionSelect && typeof handleSelectionSelect === "function") {
      handleSelectionSelect(section);
    }
  };

  return (
    <div>
      <nav
        className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200 sm:border"
        aria-label="Sections"
      >
        {sections.map((section, tabIdx) => (
          <div
            onClick={() => updateSectionSelected(section.name.toLowerCase())}
            key={section.name}
            className={classNames(
              section.current
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700",
              tabIdx === 0 ? "rounded-l-lg" : "",
              tabIdx === sections.length - 1 ? "rounded-r-lg" : "",
              "group relative min-w-0 flex-1 overflow-hidden bg-white py-2.5 px-2 text-xs font-medium text-center hover:bg-gray-50 focus:z-10 cursor-pointer"
            )}
            aria-current={section.current ? "page" : undefined}
          >
            <span>{section.name}</span>
            <span
              aria-hidden="true"
              className={classNames(
                section.current ? "bg-teal-500" : "bg-transparent",
                "absolute inset-x-0 bottom-0 h-0.5"
              )}
            />
          </div>
        ))}
      </nav>
    </div>
  );
}
