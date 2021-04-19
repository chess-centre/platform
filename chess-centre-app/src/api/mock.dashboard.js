export const lineLegends = [
  { title: "Long Play", color: "bg-teal-brand" },
  { title: "Rapid", color: "bg-orange-brand" },
];

export const barLegends = [
  { title: "Long Play", color: "bg-teal-brand" },
  { title: "Rapid", color: "bg-orange-brand" },
];

export const lineOptions = {
  data: {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    datasets: [
      {
        label: "Long Play",
        backgroundColor: "#0694a2",
        borderColor: "#0694a2",
        data: [2240, 2245, 2270, 2290, 2210, 2201, 2231],
        fill: false,
      },
      {
        label: "Rapid",
        fill: false,
        backgroundColor: "#f0802b",
        borderColor: "#f0802b",
        data: [2310, 2345, 2290, 2295, 2410, 2370, 2365],
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

export const barOptions = {
  data: {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    datasets: [
      {
        label: "Long Play",
        backgroundColor: "#0694a2",
        borderWidth: 1,
        data: [3, 14, 10, 9, 16, 1, 3],
      },
      {
        label: "Rapid",
        backgroundColor: "#f0802b",
        borderWidth: 1,
        data: [22, 20, 16, 13, 9, 1, 5],
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
