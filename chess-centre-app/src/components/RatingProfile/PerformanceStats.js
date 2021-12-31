import { useEffect, useState } from "react";
import DefaultAvatar from "../../assets/img/default-avatar.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const initialState = {
  points: 0,
  games: 0,
  ratings: [],
  ratingsAdjusted: [],
  averageRating: 0,
  performanceRating: 0,
};

const calculatePerformanceRating = (id, games) => {
  return games.reduce(
    (stats, game) => {
      if (game.whiteMemberId === id) {
        stats.games += 1;
        stats.ratings.push(game.blackRating);
        switch (game.result) {
          case "1-0":
            stats.points += 1;
            stats.ratingsAdjusted.push(game.blackRating + 400);
            break;
          case "0.5-0.5":
            stats.points += 0.5;
            stats.ratingsAdjusted.push(game.blackRating);
            break;
          case "0-1":
            stats.ratingsAdjusted.push(game.blackRating - 400);
            break;
          default:
            break;
        }
      }
      if (game.blackMemberId === id) {
        stats.games += 1;
        stats.ratings.push(game.whiteRating);
        switch (game.result) {
          case "0-1":
            stats.points += 1;
            stats.ratingsAdjusted.push(game.whiteRating + 400);
            break;
          case "0.5-0.5":
            stats.points += 0.5;
            stats.ratingsAdjusted.push(game.whiteRating);
            break;
          case "1-0":
            stats.ratingsAdjusted.push(game.whiteRating - 400);
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
};

export default function PerformanceStats({ playerInfo, games }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [stats, setStats] = useState(initialState);

  useEffect(() => {
    if (playerInfo && playerInfo.chesscomInfo) {
      const { avatar } = JSON.parse(playerInfo.chesscomInfo);
      setAvatarUrl(avatar);
    } else {
      setAvatarUrl("");
    }

    if (games && games.length > 0) {
      const calculations = calculatePerformanceRating(playerInfo.id, games);
      setStats(() => ({ ...calculations }));
    }

    return () => {};
  }, [playerInfo, games]);

  return (
    <div className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-4">
        <h3 className="text-gray-900 text-5xl font-medium mb-4">
          <i className="fal fa-sigma mr-1 text-teal-600"></i>
          <span className="sr-only">Performance</span>
        </h3>
        {avatarUrl ? (
          <img
            className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
            src={avatarUrl}
            alt=""
          />
        ) : (
          <img
            className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
            src={DefaultAvatar}
            alt=""
          />
        )}
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="text-sm font-medium">Games</dt>
          <dd className="ext-gray-800 text-lg font-medium text-teal-600">{stats.games}</dd>
          <dt className="text-sm font-medium">Performance Rating</dt>
          <dd className="m-3">
            {stats.performanceRating >= playerInfo.ecfRating ? (
              <span className="px-6 py-1 text-green-800 text-lg font-medium bg-green-100 rounded-lg">
                {stats.performanceRating}
              </span>
            ) : (
              <span className="px-6 py-1 text-red-800 text-lg font-medium bg-red-100 rounded-lg">
                {stats.performanceRating}
              </span>
            )}
          </dd>
          <dt className="text-sm font-medium">Av. Opponent Rating</dt>
          <dd className="m-3">
            <span className="px-6 py-1 text-gray-800 text-lg font-medium bg-gray-100 rounded-lg">
              {stats.averageRating}
            </span>
          </dd>
        </dl>
        <div className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <div className="col-span-1 flex shadow-sm rounded-md">
            <div
              className={classNames(
                "bg-teal-500",
                "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
              )}
            >
              S
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <div className="text-gray-900 font-medium hover:text-gray-600">
                  Standard
                </div>
                <p className="text-gray-500">{playerInfo?.ecfRating || 0}</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex shadow-sm rounded-md">
            <div
              className={classNames(
                "bg-orange-400",
                "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
              )}
            >
              R
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <div className="text-gray-900 font-medium hover:text-gray-600">
                  Rapid
                </div>
                <p className="text-gray-500">{playerInfo?.ecfRapid || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200 bg-gray-100 h-4"></div>
      </div>
    </div>
  );
}
