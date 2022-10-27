import React from "react";
import { Standings, resultCheck } from "../../components/Results";

const addSeeding = (players) =>
  players.map((player, idx) => ({ ...player, seed: idx + 1 }));

export function Robin({ title, pairings, entries, results, settings, icon, boards }) {

  const players = addSeeding(entries);

  const { roundByRound } = resultCheck(pairings, players, results, settings);

  return (
    <div>
      <Standings roundByRound={roundByRound} division={title} settings={settings}></Standings>
    </div>
  );
}