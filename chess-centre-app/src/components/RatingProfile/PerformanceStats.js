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
  const maxOpponentRating = (rating, opponentRating) => {
    const diff = opponentRating - rating;
    if (diff > 400) {
      return rating + 400;
    }
    if (opponentRating < 400) {
      return rating - 400;
    }
    return opponentRating;
  };

  return games.reduce(
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
};

export default function PerformanceStats({ playerInfo, games, openModal, avatarUrl, setAvatar }) {
  const [stats, setStats] = useState(initialState);

  useEffect(() => {
    if (playerInfo && playerInfo.chesscomInfo) {
      const { avatar } = JSON.parse(playerInfo.chesscomInfo);
      setAvatar(avatar);
    } else {
      setAvatar("");
    }

    if (games && games.length > 0) {
      const calculations = calculatePerformanceRating(playerInfo.id, games);
      setStats(() => ({ ...calculations }));
    }

    return () => { };
  }, [playerInfo, games, setAvatar]);

  return (
    <div className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-4">
        <h3 className="text-gray-500 text-sm font-sans mb-4">
          <div className="mb-2">Results Overview</div>
          <i className="fal fa-sigma mr-1 text-teal-600 text-4xl"></i>
        </h3>

        {avatarUrl ? (
          <img
            className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
            src={avatarUrl}
            alt=""
          />
        ) : (
          <img
            className="w-32 h-32 flex-shrink-0 mx-auto rounded-full hover:opacity-70 cursor-pointer"
            src={DefaultAvatar}
            alt=""
            onClick={openModal}
          />
        )}
        <dl className="mt-2 flex-grow flex flex-col justify-between text-gray-600">
          <dt className="text-sm font-medium">Games</dt>
          <dd className="text-lg font-medium text-teal-600">
            {stats.games}
          </dd>
          <dt className="text-sm font-medium">Performance Rating</dt>
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
          <dt className="text-sm font-medium">Av. Opponent Rating</dt>
          <dd className="m-3">
            <span className="px-6 py-1 text-gray-800 text-lg font-medium bg-gray-100 rounded-lg">
              {stats.averageRating}
            </span>
          </dd>
        </dl>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:gap-6 2xl:grid-cols-2">
          <RatingCard color="bg-teal-500" name="Standard" rating={playerInfo?.ecfRating} />
          <RatingCard color="bg-orange-400" name="Rapid" rating={playerInfo?.ecfRapid} />
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200 bg-gray-100 h-4"></div>
      </div>
    </div>
  );
}

const RatingCard = ({ color, name, rating }) => {
  return (<div className="col-span-1 flex shadow-sm rounded-md">
    <div
      className={classNames(
        color,
        "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
      )}
    >
      {name.charAt(0)}
    </div>
    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
      <div className="flex-1 px-4 py-2 text-sm truncate">
        <div className="text-gray-900 font-medium hover:text-gray-600">
          {name}
        </div>
        <p className="text-gray-500">{rating || 0}</p>
      </div>
    </div>
  </div>)
}