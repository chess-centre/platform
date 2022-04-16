import { useState } from "react";
import { classNames } from "../../../../utils/Classes";
import SettingsToggle from "./SettingsToggle";
export const Standings = ({ roundByRound, division, icon, settings }) => {
  const [showOpponents, setShowOpponents] = useState(
    settings.showOpponentPairing
  );
  const [showPairingColors, setShowPairingColors] = useState(
    settings.showPairingColors
  );

  return (
    <>
      <div className="bg-cool-gray-900 py-4 border-2 border-teal-600 sm:leading-none shadow-md rounded-lg">
        <p>
          <i className={`${icon} text-teal-400 text-6xl`}></i>
        </p>
        <h3 className="text-white font-bold text-md mt-2">{division}</h3>
        {settings.type === "Swiss" &&
          Object.entries(settings.nextRoundTime).map(([round, time]) => (
            <div className="gap-2 text-white mt-6">
              <p className="p-2 font-bold text-2xl text-teal-600">
                Round {round}
              </p>
              <p>{time}</p>
            </div>
          ))}
      </div>
      <div
        className={classNames(
          settings.type === "Swiss" && "col-span-3",
          "border border-cool-gray-900 shadow-lg"
        )}
      >
        <table className="w-full divide-y divide-cool-gray-900">
          <thead className="bg-orange-brand">
            <tr>
              <th
                scope="col"
                className="px-1 py-3 text-left text-xs font-medium text-orange-900 uppercase tracking-wider"
              >
                Pos.
              </th>
              <th
                scope="col"
                className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-orange-900 uppercase tracking-wider"
              >
                Player
              </th>
              <th
                scope="col"
                className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-orange-900 uppercase tracking-wider"
              >
                Rating
              </th>
              <th
                scope="col"
                className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-orange-900 uppercase tracking-wider"
              >
                Round by Round
              </th>
              <th
                scope="col"
                className="relative px-6 py-3 text-center text-xs font-medium text-orange-900 uppercase tracking-wider"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-cool-gray-900">
            <tr>
              <td className="px-1 py-1 border-cool-gray-700" colSpan="5"></td>
            </tr>
            {roundByRound.map((data, key) => {
              const position = key + 1;
              const isEven = key % 2 === 0;

              return (
                <tr
                  key={key}
                  className={
                    isEven
                      ? "bg-cool-gray-800 hover:bg-pink-900 hover:opacity-90"
                      : "bg-cool-gray-900 hover:bg-pink-900 hover:opacity-90"
                  }
                >
                  <td className="border-r border-cool-gray-700 px-1 py-2 text-xs whitespace-nowrap text-center text-gray-50">
                    {position}
                  </td>
                  <td className="px-2 pl-4 text-left sm:px-4 py-2 whitespace-nowrap text-md font-medium text-white">
                    {data.title && (
                      <span className="mr-1 text-yellow-400 font-bold">
                        {data.title}
                      </span>
                    )}{" "}
                    {data.name}
                  </td>
                  <td className="border-r border-cool-gray-700 px-1 py-2 text-xs whitespace-nowrap text-left text-white">
                    <span className="text-teal-400 font-medium">
                      {data.rating ? data.rating : "unrated"}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-2 whitespace-nowrap font-medium text-md text-gray-700">
                    <div className="flex">
                      {data.rounds
                        .slice(0, settings.currentRound)
                        .map((r, idx) => {
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
                          );
                        })}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-2 whitespace-nowrap text-center font-bold text-gray-100">
                    <Total value={data.total} />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
        <div className="relative">
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
        </div>
      </div>
    </>
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
      <span className="absolute text-xxs -mt-1 text-gray-100 right-2">
        {opponent}
      </span>
    );

  const PairingColor = () =>
    showColors && (
      <span className="absolute text-xxs -mt-1 text-gray-100 left-2">
        {color}
      </span>
    );

  if (isLive) {
    return (
      <div key={idx} className="px-2 w-10">
        <span className="text-orange-brand animate-pulse">Live</span>
      </div>
    );
  }

  if (isFutureRound) {
    return <div key={idx} className="px-2 w-10"></div>;
  }

  if (result === 1) {
    return (
      <div key={idx} className="relative px-2 w-10">
        <PairingColor />
        <span className="text-green-500">{result}</span>
        <OpponentPairing />
      </div>
    );
  }

  if (result === 0.5) {
    return (
      <div key={idx} className="relative px-2 w-10">
        <PairingColor />
        <span className="text-blue-500">½</span>
        <OpponentPairing />
      </div>
    );
  }

  if (result === 0) {
    return (
      <div key={idx} className="relative px-2 w-10">
        <PairingColor />
        <span className="text-red-500">{result}</span>
        <OpponentPairing />
      </div>
    );
  }

  return (
    <div key={idx} className="px-2 w-10">
      x
    </div>
  );
}
