import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale
);

const PieComponent = ({ houseNamesArray, houseTotalsArray }) => {
  const types = houseNamesArray.map((houses) => {
    const type = houses.split(" ");
    const modifiedHouseTitle = type[type.length - 1].slice(-2);

    return modifiedHouseTitle;
  });

  const data = {
    labels: types,
    datasets: [
      {
        data: houseTotalsArray,
        backgroundColor: [
          "red",
          "yellow",
          "blue",
          "green",
          "black",
          "purple",
          "gray",
          "brown",
        ],
      },
    ],
  };

  const options = {
    // maintainAspectRatio: true,
    aspectRatio: 2, // Increase the aspect ratio to enlarge the chart
    cutout: "20%", // Adjust the cutout to control the size of the inner hole (doughnut hole)
    responsive: true,
    plugins: {
      legend: {
        position: "right", // Position the legend on the right side
        labels: {
          usePointStyle: true, // Use point style for the labels
          boxWidth: 40,
          font: {
            size: 12,
            weight: "bold",
          },
          padding: 8,
          color: "#000",
        },
      },
    },
  };

  return (
    <div className="h-full w-full relative">
      <div className="absolute right-0 left-0 py-14 px-10 w-full">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default PieComponent;
