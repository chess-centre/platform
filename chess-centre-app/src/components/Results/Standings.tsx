import React, { useState } from "react";
import SettingsToggle from "./SettingsToggle";
import { Link } from "react-router-dom";
import { classNames } from "../../utils/Classes";
import { RoundObj } from "./checker";
import { Sparklines, SparklinesLine } from "react-sparklines";

type StandingsProps = {
  roundByRound: RoundObj[];
  settings: any;
  showTitle: boolean;
  division: string;
  congress: boolean;
  headerClasses: string;
};

export const Standings = ({
  roundByRound,
  settings,
  showTitle = false,
  division,
  congress = false,
  headerClasses,
}: StandingsProps) => {
  const [activeRow, setActiveRow] = useState<number>(0);
  const [expanded, toggleExpanded] = useState<boolean>(false);
  const [highlightArrow, setHighlightArrow] = useState<number>(0);
  const [showOpponents] = useState<boolean>(
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

  const expandStats = (row: number) => {
    if (activeRow === row) {
      toggleExpanded((pre) => !pre);
    } else {
      toggleExpanded(true);
    }
    setActiveRow(row);
  };

  return (
    <div>
      <div
        className={classNames(
          headerClasses,
          "py-1 font-medium  text-center rounded-t-md uppercase tracking-wider text-2xl"
        )}
      >
        {division}
      </div>
      <div className="shadow-md overflow-x-auto w-full">
        <table className="w-full divide-y divide-slate-50">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-1 py-3 text-center text-xs font-medium text-teal-brand uppercase tracking-wider"
              >
                <i className="fad fa-chart-pie-alt"></i>
              </th>
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
              const isWinner =
                roundByRound[key].total === roundByRound[0].total;
              const isEven = key % 2 === 0;
              const hightLightOpponent =
                position === highlightArrow && showOpponents;

              return (
                <React.Fragment key={key}>
                  <tr
                    onClick={() => expandStats(key)}
                    key={key}
                    className={classNames(
                      hightLightOpponent
                        ? "bg-teal-300"
                        : isEven && !isWinner
                        ? "bg-white"
                        : isWinner
                        ? "bg-yellow-50 border border-b border-white"
                        : "bg-slate-50",
                      showOpponents && "cursor-pointer",
                      "hover:bg-teal-100"
                    )}
                  >
                    <td className="border-r border-slate-50 px-1 py-2 text-sm sm:text-md whitespace-nowrap text-center text-slate-400">
                      {activeRow === key && expanded ? (
                        <i className="fas fa-chevron-down"></i>
                      ) : (
                        <i className="fas fa-chevron-right"></i>
                      )}
                    </td>
                    <td className="hidden sm:block border-r border-slate-50 px-1 py-2 text-sm sm:text-md whitespace-nowrap text-center text-slate-800">
                      {isWinner ? "1st" : position}
                    </td>
                    {showTitle && (
                      <td className="px-0 py-2 text-sm sm:text-md whitespace-nowrap text-center text-slate-50">
                        <span className="text-yellow-400 sm:font-bold">
                          {data.title}
                        </span>
                      </td>
                    )}
                    <td className="pl-4 text-left px-2 py-2 whitespace-nowrap text-sm sm:text-md text-teal-600 hover:text-teal-700">
                      <Link to={`/app/games/${data.memberId}`}>
                        {data.name}
                      </Link>
                      {isWinner && (
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
                            roundByRound.findIndex((p) => {
                              if (congress) {
                                return p.chessResulsSeed === opponent;
                              }
                              return p.seed === opponent;
                            }) + 1;

                          return (
                            <td
                              key={idx}
                              className="px-2 sm:px-3 py-2 whitespace-nowrap font-medium text-sm sm:text-md border-r border-slate-50"
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
                  <tr
                    key={data.memberId}
                    className={classNames(
                      activeRow === key && expanded ? "" : "hidden"
                    )}
                  >
                    <td colSpan={100} className="shadow-inner shadow-slate-300">
                      <Statistics data={data} />
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="relative">
        {settings.enableToggles && (
          <div className="flex float-right mr-2">
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
    showPairing &&
    opponent !== 0 && (
      <span className="absolute text-xxs -mt-1 text-slate-400 right-0">
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

function Statistics({ data }: { data: RoundObj }) {
  const [currentIdx, setCurrentIdx] = useState<number>(4);

  const updatePerformanceRating = (idx: number) => {
    setCurrentIdx(idx);
  };

  const perf = data.details.reduce((prev, cur, idx) => {
    const { average, tpr, games } = performanceRating({
      playerRating: data.rating,
      opponentRatings: data.details.slice(0, idx + 1),
      results: data.rounds.slice(0, idx + 1),
    });
    return [
      ...prev,
      {
        average,
        tpr,
        games,
      },
    ];
  }, [] as any);

  data.perf = perf;

  return (
    <div>
      <div className="grid grid-cols-2">

        <StatisticsTable
          data={data}
          updatePerformanceRating={updatePerformanceRating}
        />
        <StatisticsSummary perf={perf} idx={currentIdx} />
      </div>
    </div>
  );
}

function StatisticsTable({ data, updatePerformanceRating }) {
  const { details, rounds, colors }: RoundObj = data;

  return (
    <div className="inline-block min-w-full align-middle m-1">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="text-center font-thin text-sm text-teal-600 px-1"
            >
              #
            </th>
            <th
              scope="col"
              className="py-1 pl-2 text-left font-thin text-sm text-teal-600"
            >
              Name
            </th>
            <th
              scope="col"
              className="text-center font-thin text-xs mx-auto text-teal-600"
            >
              <span>
                <i className="fas fa-game-board-alt"></i>
              </span>
            </th>
            <th
              scope="col"
              className="py-1 text-center font-thin text-sm text-teal-600"
            >
              + / -
            </th>
            <th
              scope="col"
              className="py-1 text-center font-thin text-sm text-teal-600"
            >
              Rating
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {details &&
            details.map((opponent, key) => {
              if (opponent) {
                return (
                  <tr
                    className={classNames("hover:bg-slate-50")}
                    key={opponent.memberId}
                    onMouseEnter={() => updatePerformanceRating(key)}
                    onMouseLeave={() =>
                      updatePerformanceRating(rounds.length - 1)
                    }
                  >
                    <td className="whitespace-nowrap text-center text-sm text-slate-600">
                      {key + 1}
                    </td>
                    <td className="whitespace-nowrap py-1 pl-2 text-sm text-slate-600">
                      {opponent.name}
                    </td>
                    <td className="whitespace-nowrap text-center text-sm text-slate-600">
                      {colors[key] === "W" ? (
                        <span className="flex flex-shrink-0 items-center justify-center">
                          <span
                            className={classNames(
                              "bg-white border border-gray-300",
                              "h-2.5 w-2.5 rounded-full"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      ) : (
                        <span className="flex flex-shrink-0 items-center justify-center">
                          <span
                            className={classNames(
                              "bg-black border border-gray-300",
                              "h-2.5 w-2.5 rounded-full"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap text-center py-1 text-sm text-slate-600">
                      {rounds[key] === 0.5 ? "½" : rounds[key]}
                    </td>
                    <td className="whitespace-nowrap text-center py-1 text-sm text-slate-500">
                      {opponent?.ratingInfo?.rating}
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={key}>
                    <td className="whitespace-nowrap text-center text-sm font-medium text-slate-600">
                      {key + 1}
                    </td>
                    <td
                      colSpan={4}
                      className="whitespace-nowrap text-center py-1 pl-4 pr-3 text-sm text-slate-500 sm:pl-6 md:pl-0 bg-red-50"
                    >
                      bye
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>
    </div>
  );
}

function StatisticsSummary({ perf, idx }) {
  const tprData = perf.slice(0, idx + 1).reduce((pre, cur) => [...pre, Number(cur.tpr)], []);
  const avData = perf.slice(0, idx + 1).reduce((pre, cur) => [...pre, Number(cur.average)], []);
  const plural = perf[idx].games > 1 ? "games" : "game";
  return (
    <div className="grid grid-cols-2 text-center justify-center items-center">
      <div className="mt-10 border-r border-slate-300">
        <div className="text-xs text-slate-400 mb-2">TPR</div>
        <div className="text-teal-600 text-3xl sm:text-5xl">{perf[idx].tpr}</div>
        <div className="text-xs text-slate-400 mt-2">
          after {perf[idx].games} rated {plural}
        </div>
      </div>
      <div className="mt-10 bottom-0">
        <div className="text-xs text-slate-400 mb-2">Average Rating</div>
        <div className="text-blue-brand text-3xl sm:text-5xl">{perf[idx].average}</div>
        <div className="text-xs text-slate-400 mt-2">
          after {perf[idx].games} rated {plural}
        </div>
      </div>
      <div className="-mt-2">
        <Sparklines data={tprData}>
          <SparklinesLine color="#0096a4" />
        </Sparklines>
      </div>
      <div className="-mt-2">
        <Sparklines data={avData}>
          <SparklinesLine color="#f0802b" />
        </Sparklines>
      </div>
    </div>
  );
}

const performanceRating = ({ playerRating, opponentRatings, results }) => {
  const maxOpponentRating = (rating: number, opponentRating: number) => {
    const diff = opponentRating - rating;
    if (diff > 400) {
      return rating + 400;
    }
    if (opponentRating < 400) {
      return rating - 400;
    }
    return opponentRating;
  };

  type Progression = { gained: number, sum: number, games: number }

  const { gained, sum, games }: Progression = opponentRatings.reduce(
    (pre: Progression, cur, idx: number) => {
      if (cur && typeof cur.ratingInfo.value === "number") {
        pre.games += 1;
        pre.sum += cur.ratingInfo.value;
        const oR = maxOpponentRating(playerRating, cur.ratingInfo.value);
        const change = results[idx] === 1 ? 400 : results[idx] === 0 ? -400 : 0;
        pre.gained += oR + change;
      }
      return pre;
    },
    { gained: 0, sum: 0, games: 0 }
  );
  return {
    tpr: isNaN(gained / games) ? 0 : (gained / games).toFixed(0),
    average: isNaN(sum / games) ? 0 : (sum / games).toFixed(0),
    games,
  };
};
