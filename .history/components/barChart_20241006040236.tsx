import React, { FC } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";

chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarChartProps = object;

const BarChart: FC<BarChartProps> = () => {
  const data: ChartData<"bar", number[], string> = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "income",
        data: [
          1200000, 2000000, 35000000, 23000000, 32399999, 3888820, 33399990,
          322000000, 38800000, 399993300, 22000000, 10000200,
        ],
        backgroundColor: "rgba(22, 163, 74, 1)",
        borderColor: "rgba(22, 163, 74, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
