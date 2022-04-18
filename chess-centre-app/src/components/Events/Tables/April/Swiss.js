import React from "react";
import { classNames } from "../../../../utils/Classes";
import { Standings } from "../Shared/Standings";
import { PairingsTable } from "../Shared/Pairings";
import { resultCheck } from "../Shared/ResultsChecker";

const addSeeding = (players) =>
  players.map((player, idx) => ({ ...player, seed: idx + 1 }));

export default function Swiss({
  title,
  entries,
  pairings,
  results,
  settings,
  icon,
  boards,
}) {
  const players = addSeeding(entries);
  const isSwiss = settings.type === "Swiss";

  const { roundByRound } = resultCheck(pairings, players, results, settings);

  return (
    <div className="grid grid-cols-6 gap-3 mt-2">
      {pairings
        .slice(settings.currentRound - 1, settings.currentRound)
        .map((pairings, key) => (
          <div key={key} className={classNames(isSwiss && "col-span-2")}>
            <PairingsTable
              format={pairings}
              players={players}
              results={results}
              indexer={boards}
              settings={settings}
            />
          </div>
        ))}

        <Standings
          key={1}
          roundByRound={roundByRound}
          division={title}
          icon={icon}
          settings={settings}
        />

    </div>
  );
}
