import React from "react";
import { Standings, resultCheck } from "../../components/Results";

const addSeeding = (players: any) =>
  players.map((player: any, idx: number) => ({ ...player, seed: idx + 1 }));

export function Robin({ title, pairings, entries, results, settings }) {

  const players = addSeeding(entries);
  const { roundByRound } = resultCheck(pairings, players, results, settings);

  return (
    <div>
      <Standings roundByRound={roundByRound} division={title} settings={settings}></Standings>
    </div>
  );
}