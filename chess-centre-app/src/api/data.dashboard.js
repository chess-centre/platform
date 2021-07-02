export const getTotalGameCount = (type, gameInfo) => {
  const data = gameInfo ? JSON.parse(gameInfo) : [];
  return data.reduce((pre, { games }) => {
    pre += Number(games[type]);
    return pre;
  }, 0);
};

const getMonthByMonthGameCount = (type, data) => {
  return data.reduce((pre, { games }) => {
    return [...pre, games[type]];
  }, []);
};

const getMonthByMonthRating = (type, data) => {
  return data.reduce((pre, { rating }) => {
    if(rating[type]) {
      return [...pre, rating[type]];
    } else return [...pre]
  }, []);
};

const getMonths = (data) => {
  return data.reduce((pre, { month }) => {
    return [...pre, month] 
  }, []);
}

export const RatingProgressChart = (
  ratingInfo
) => {

  const data = ratingInfo ? JSON.parse(ratingInfo) : [];
  const months = getMonths(data);
  const longPlayRatings = getMonthByMonthRating("longPlay", data);
  const rapidplayRatings = getMonthByMonthRating("rapidPlay", data);

  return {
    data: {
      labels: [...months],
      datasets: [
        {
          label: "Standard",
          backgroundColor: "#0694a2",
          borderColor: "#0694a2",
          data: [...longPlayRatings],
          fill: false,
        },
        {
          label: "Rapid",
          fill: false,
          backgroundColor: "#f0802b",
          borderColor: "#f0802b",
          data: [...rapidplayRatings],
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      },
    },
    legend: {
      display: false,
    },
  };
};

export const GamesChart = (gameInfo) => {

  const data = gameInfo ? JSON.parse(gameInfo) : [];
  const months = getMonths(data);
  const longPlayGamesCount = getMonthByMonthGameCount("longPlay", data);
  const rapidplayGamesCount = getMonthByMonthGameCount("rapidPlay", data);

  return {
    data: {
      labels: [...months],
      datasets: [
        {
          label: "Standard",
          backgroundColor: "#0694a2",
          borderWidth: 1,
          data: [...longPlayGamesCount],
        },
        {
          label: "Rapid",
          backgroundColor: "#f0802b",
          borderWidth: 1,
          data: [rapidplayGamesCount],
        },
      ],
    },
    options: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  };
};
