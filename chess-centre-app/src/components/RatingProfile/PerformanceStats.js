import { useEffect, useState } from "react";
import DefaultAvatar from "../../assets/img/default-avatar.png";

const initialState = {
  points: 0,
  games: 0,
  ratings: [],
  ratingsAdjusted: [],
  averageRating: 0,
  performanceRating: 0,
};



export default function PerformanceStats({
  playerInfo,
  games,
  openModal,
  avatarUrl,
  setAvatar,
}) {
  useEffect(() => {
    if (playerInfo && playerInfo.chesscomInfo) {
      const { avatar } = JSON.parse(playerInfo.chesscomInfo);
      setAvatar(avatar);
    } else {
      setAvatar("");
    }
    return () => {};
  }, [playerInfo, setAvatar]);

  return (
    <div className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-4">
        <h3 className="text-gray-500 text-sm font-medium">
          <div className="mb-2">Results Overview</div>
        </h3>

        {avatarUrl ? (
          <img
            className="w-32 h-32 flex-shrink-0 mx-auto rounded-md"
            src={avatarUrl}
            alt=""
          />
        ) : (
          <img
            className="w-32 h-32 flex-shrink-0 mx-auto rounded-md hover:opacity-70 cursor-pointer"
            src={DefaultAvatar}
            alt=""
            onClick={openModal}
          />
        )}

        <div className="mt-3 grid grid-cols-2 gap-4 sm:gap-4 lg:grid-cols-2">
          <div className="relative border border-gray-200 bg-white rounded-md">
            <div className="bg-teal-600 rounded-t-md text-white uppercase font-medium text-sm py-2 mb-2">
              Standard
            </div>
            <div className="text-lg font-medium">
              {playerInfo?.ecfRating || <span className="text-gray-500 font-normal">Unrated</span>}
            </div>
            <PerformanceCard
              playerInfo={playerInfo}
              games={games}
              type="standard"
            />
          </div>

          <div className="border border-gray-200 bg-white rounded-md">
            <div className="bg-orange-600 rounded-t-md text-white uppercase font-medium text-sm py-2 mb-2">
              Rapid
            </div>
            <div className="text-lg font-medium">
              {playerInfo?.ecfRapid || <span className="text-gray-500 font-normal">Unrated</span>}
            </div>
            <PerformanceCard
              playerInfo={playerInfo}
              games={games}
              type="rapid"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex divide-x divide-gray-200 bg-gray-100 h-4"></div>
      </div>
    </div>
  );
}

const PerformanceCard = ({ playerInfo, games, type }) => {
  const [stats, setStats] = useState(initialState);

  useEffect(() => {
    if (games && games.length > 0) {
      const calculations = calculatePerformanceRating(
        playerInfo.id,
        games,
        type
      );
      setStats(() => ({ ...calculations }));
    }
  }, [games, playerInfo, type]);

  return (
    <dl className="mt-2 flex-grow flex flex-col justify-between text-gray-600">
      <dt className="text-sm font-medium">Games</dt>
      <dd className="text-lg font-medium text-teal-600">{stats.games}</dd>
      <dt className="text-sm font-medium">Perf. Rating</dt>
      <dd className="m-3">
        {stats &&
        stats.performanceRating &&
        stats.performanceRating >= playerInfo.ecfRating ? (
          <span className="px-6 py-1 text-green-800 text-lg font-medium bg-green-100 rounded-lg">
            {stats.performanceRating}
          </span>
        ) : (
          <span className="px-6 py-1 text-red-800 text-lg font-medium bg-red-100 rounded-lg">
            {stats.performanceRating}
          </span>
        )}
      </dd>
      <dt className="text-sm font-medium">Av. Opp. Rating</dt>
      <dd className="m-3">
        <span className="px-6 py-1 text-gray-800 text-lg font-medium bg-gray-100 rounded-lg">
          {stats.averageRating}
        </span>
      </dd>
      <div className="text-xs text-gray-500 mb-2 mt-2">Unrated games {stats.unratedGames}</div>
    </dl>
  );
};


const calculatePerformanceRating = (id, games, type) => {

  let countUnratedGames = 0;

  const maxOpponentRating = (rating = 1500, opponentRating) => {
    const diff = opponentRating - rating;
    if (diff > 400) {
      return rating + 400;
    }
    if (opponentRating < 400) {
      return rating - 400;
    }
    return opponentRating;
  };

  const stats = games
    .filter((game) => game.type === type)
    .filter(game => {
        if (game.whiteMemberId === id && !Boolean(game.blackRating)) {
          countUnratedGames++;
          return false;
        } else if (game.blackMemberId === id && !Boolean(game.whiteRating)) {
          countUnratedGames++;
          return false;
        }
      return true;
    })
    .reduce(
      (stats, game) => {
        if (game.whiteMemberId === id) {
          const opponentRating = maxOpponentRating(
            game.whiteRating,
            game.blackRating
          );

          stats.games += 1;
          stats.ratings.push(game.blackRating);
          switch (game.result) {
            case "1-0":
              stats.points += 1;
              stats.ratingsAdjusted.push(opponentRating + 400);
              break;
            case "0.5-0.5":
              stats.points += 0.5;
              stats.ratingsAdjusted.push(opponentRating);
              break;
            case "0-1":
              stats.ratingsAdjusted.push(opponentRating - 400);
              break;
            default:
              break;
          }
        }
        if (game.blackMemberId === id) {
          const opponentRating = maxOpponentRating(
            game.blackRating,
            game.whiteRating
          );
          stats.games += 1;
          stats.ratings.push(game.whiteRating);
          switch (game.result) {
            case "0-1":
              stats.points += 1;
              stats.ratingsAdjusted.push(opponentRating + 400);
              break;
            case "0.5-0.5":
              stats.points += 0.5;
              stats.ratingsAdjusted.push(opponentRating);
              break;
            case "1-0":
              stats.ratingsAdjusted.push(opponentRating - 400);
              break;
            default:
              break;
          }
        }
        const ratingSum = stats.ratings.reduce(
          (sum, rating) => (sum += rating),
          0
        );
        stats.averageRating = Number(
          Math.abs(ratingSum / stats.games).toFixed(0)
        );
        const adjustedRatingSum = stats.ratingsAdjusted.reduce(
          (sum, rating) => (sum += rating),
          0
        );
        stats.performanceRating = Number(
          Math.abs(adjustedRatingSum / stats.games).toFixed(0)
        );
        return { ...stats };
      },
      {
        points: 0,
        games: 0,
        ratings: [],
        ratingsAdjusted: [],
        averageRating: 0,
        performanceRating: 0,
      }
    );

  // accounts for the discrepency:
  stats.unratedGames = countUnratedGames;
  return stats;
};
