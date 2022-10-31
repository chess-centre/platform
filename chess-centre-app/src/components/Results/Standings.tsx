import React, { useState } from "react";
import SettingsToggle from "./SettingsToggle";
import { Link } from "react-router-dom";
import { classNames } from "../../utils/Classes";

type StandingsProps = {
  roundByRound: any,
  settings: any,
  showTitle: boolean,
  division: string
}

export const Standings = ({
  roundByRound,
  settings,
  showTitle = false,
  division,
}: StandingsProps) => {

  const [highlightArrow, setHighlightArrow] = useState<number>(0);
  const [showOpponents, setShowOpponents] = useState<boolean>(
    settings.showOpponentPairing || false
  );
  const [showPairingColors, setShowPairingColors] = useState<boolean>(
    settings.showPairingColors || false
  );
  const highlightOpponent = (
    opponentPosition: number,
    showOpponents: boolean
  ): void => {
    if (showOpponents && highlightArrow !== opponentPosition) {
      setHighlightArrow(opponentPosition);
    }
  };

  return (
    <div>
      <div className="bg-orange-brand py-1 shadow-orange-600 font-medium text-white text-center rounded-t-md uppercase tracking-wider text-2xl">
        {division}
      </div>
      <div className="shadow-md overflow-x-auto w-full">
        <table className="w-full divide-y divide-slate-50">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="hidden sm:block px-1 py-3 text-center text-xs font-medium text-slate-900 uppercase tracking-wider"
              >
                Pos.
              </th>
              {showTitle && (
                <th
                  scope="col"
                  className="px-1 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider"
                >
                  Title
                </th>
              )}
              <th
                scope="col"
                className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider"
              >
                Player
              </th>
              <th
                scope="col"
                className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-slate-900 uppercase tracking-wider"
              >
                Rating
              </th>
              <th
                scope="col"
                className="block sm:hidden relative px-2 py-3 text-center text-xs font-medium text-slate-900 uppercase tracking-wider"
              >
                Total
              </th>
              {settings.totalRounds &&
                [...new Array(settings.totalRounds)].map((_, idx) => {
                  return (
                    <th
                      key={idx}
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-slate-900 uppercase tracking-wider"
                    >
                      {`R${idx + 1}`}
                    </th>
                  );
                })}

              <th
                scope="col"
                className="hidden sm:block relative px-2 py-3 text-center text-xs font-medium text-slate-900 uppercase tracking-wider"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody className="">
            {roundByRound.map((data, key: number) => {
              const position = key + 1;
              const isEven = key % 2 === 0;
              const highlightLeader = position === 1;
              const hightLightOpponent = position === highlightArrow && showOpponents 

              return (
                <tr
                  key={key}
                  className={classNames(
                    highlightLeader ? "border-b border-yellow-200 hover:bg-teal-50" : "border-b border-slate-50 hover:bg-teal-50",
                    hightLightOpponent ? "bg-teal-300" : isEven ? "bg-white" : "bg-slate-50",
                    showOpponents && "cursor-pointer"
                  )}
                >
                  <td className="hidden sm:block border-r border-slate-50 px-1 py-2 text-sm sm:text-md whitespace-nowrap text-center text-slate-800">
                    {position}
                  </td>
                  {showTitle && (
                    <td className="px-0 py-2 text-sm sm:text-md whitespace-nowrap text-center text-slate-50">
                      <span className="text-yellow-400 sm:font-bold">
                        {data.title}
                      </span>
                    </td>
                  )}
                  <td className="pl-4 text-left px-2 py-2 whitespace-nowrap text-sm sm:text-md text-teal-600 hover:text-teal-700">
                    <Link to={`/app/games/${data.memberId}`}>{data.name}</Link>
                    {position === 1 && (
                      <span className="ml-2 text-yellow-400">
                        <i className="fal fa-trophy-alt"></i>
                      </span>
                    )}
                  </td>

                  <td className="border-r border-slate-50 px-1 py-2 text-sm sm:text-md whitespace-nowrap text-center text-white">
                    <span className="text-teal-700">
                      {data.rating ? data.rating : "unrated"}
                    </span>
                  </td>
                  <td className="block sm:hidden px-2 sm:px-6 py-2 whitespace-nowrap text-center sm:font-bold text-slate-800">
                    <Total value={data.total} />
                  </td>

                  {data.rounds &&
                    data.rounds
                      .slice(0, settings.currentRound)
                      .map((r: any, idx: number) => {
                        const isLive =
                          idx + 1 === settings.currentRound &&
                          settings.roundLive;
                        const isFutureRound = idx + 1 > settings.currentRound;
                        const opponent = data.opponents[idx];
                        const color = data.colors[idx];
                        const opponentPosition =
                          roundByRound.findIndex((p) => p.seed === opponent) +
                          1;

                        return (
                          <td
                            key={idx}
                            className="px-4 py-2 whitespace-nowrap font-medium text-sm sm:text-md border-r border-slate-50"
                          >
                            <div
                              className="text-center"
                              onMouseOver={() =>
                                highlightOpponent(
                                  opponentPosition,
                                  showOpponents
                                )
                              }
                              onMouseLeave={() =>
                                highlightOpponent(0, showOpponents)
                              }
                            >
                              <ResultCell
                                idx={idx}
                                result={r}
                                isLive={isLive}
                                isFutureRound={isFutureRound}
                                opponent={opponentPosition}
                                color={color}
                                showPairing={showOpponents}
                                showColors={showPairingColors}
                              />
                            </div>
                          </td>
                        );
                      })}

                  <td className="hidden sm:block px-2 py-2 whitespace-nowrap text-center text-sm sm:font-bold text-slate-700">
                    <Total value={data.total} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="relative">
        {settings.enableToggles && (
          <div className="flex float-right mr-2">
            <div className="my-1 mr-6">
              <SettingsToggle
                name="Show Opponents"
                enabled={showOpponents}
                setEnabled={setShowOpponents}
              />
            </div>
            <div className="my-1">
              <SettingsToggle
                name="Show Colors"
                enabled={showPairingColors}
                setEnabled={setShowPairingColors}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function Total({ value }) {
  if (value % 1 !== 0) {
    return Math.floor(value) === 0 ? "½" : `${Math.floor(value)}½`;
  }
  return value;
}

function ResultCell({
  idx,
  result,
  isLive,
  isFutureRound,
  opponent,
  color,
  showPairing,
  showColors,
}) {
  const OpponentPairing = () =>
    showPairing && (
      <span className="absolute text-xxs -mt-1 text-slate-400 right-0 sm:right-1 2xl:right-2">
        {opponent}
      </span>
    );

  const PairingColor = () =>
    showColors && (
      <span className="absolute left-0 sm:left-1 bottom-2">
        {color === "W" ? (
          <span className="absolute flex flex-shrink-0 items-center justify-center">
            <span
              className={classNames(
                "bg-white border border-gray-300",
                "h-1.5 w-1.5 rounded-full"
              )}
              aria-hidden="true"
            />
          </span>
        ) : (
          <span className="absolute flex flex-shrink-0 items-center justify-center">
            <span
              className={classNames(
                "bg-black border border-gray-300",
                "h-1.5 w-1.5 rounded-full"
              )}
              aria-hidden="true"
            />
          </span>
        )}
      </span>
    );

  if (result === 1) {
    return (
      <div key={idx} className="relative px-2">
        <PairingColor />
        <span className="text-green-500">{result}</span>
        <OpponentPairing />
      </div>
    );
  }

  if (result === 0.5) {
    return (
      <div key={idx} className="relative px-2">
        <PairingColor />
        <span className="text-teal-500">½</span>
        <OpponentPairing />
      </div>
    );
  }

  if (result === 0) {
    return (
      <div key={idx} className="relative px-2">
        <PairingColor />
        <span className="text-red-500">{result}</span>
        <OpponentPairing />
      </div>
    );
  }

  if (isLive) {
    return (
      <div key={idx} className="px-2">
        <span className="text-orange-500 animate-pulse">Live</span>
      </div>
    );
  }

  if (isFutureRound) {
    return <div key={idx} className="px-2"></div>;
  }

  return (
    <div key={idx} className="px-2">
      x
    </div>
  );
}
