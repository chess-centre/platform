import React from "react";
import { Standings, resultCheck } from ".";

const addSeeding = (players: any) =>
  players.map((player: any, idx: number) => ({ ...player, seed: idx + 1 }));

/**
 * Displays the list of results for a given event.
 * Some events run as either: round robin, swiss, or multiple swiss events defined as a "congress"
 */
export function ResultViewer({ data }) {

  const { pairings, players, results, settings } = JSON.parse(data);

  return (
      <div className="grid grid-cols-1 space-y-6">
        {players && players.map(({ entries, section, title }, index: number) => {

          const scores = results.find((r: any) => r.section === section).scores;
          const seededPlayers = addSeeding(entries);
          const { roundByRound } = resultCheck(pairings, seededPlayers, scores, settings);

          return (
            <div key={index}>
              <Standings
                roundByRound={roundByRound}
                division={title}
                settings={settings}
                showTitle={false}
               />
            </div>
          );
        })}
      </div>
  );
}
