export const tempData = {
  type: "line",
  data: {
    labels: [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ],
    datasets: [
      {
        label: "Number of Moons",
        data: [0, 3, 15, 33, 79, 82, 44, 31, 22, 12],
        // background: "linear-gradient(blue white)",
        fill: true,
        borderColor: "red",
        borderWidth: 3,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    lineTension: 0,
    scales: {
      milimeters: [
        {
          title: {
            display: true,
          },
        },
      ],
    },
  },
};

export default tempData;
