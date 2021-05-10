export const lineLegends = [
  { title: "Standard", color: "bg-teal-brand" },
  { title: "Rapid", color: "bg-orange-brand" },
];

export const barLegends = [
  { title: "Standard", color: "bg-teal-brand" },
  { title: "Rapid", color: "bg-orange-brand" },
];

export const RatingProgressChart = (longPlayRatings, rapidplayRatings) => ({
  data: {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
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
});

export const GamesChart = ( longPlayGamesCount, rapidplayGamesCount) => ({
  data: {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
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
});
