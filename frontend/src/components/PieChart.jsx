import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  // Prepare chart data
  const chartData = {
    labels: ["Total Projects", "Ongoing Projects", "Future Projects"],
    datasets: [
      {
        label: "# of Projects",
        data: [data.totalProjects, data.ongoingProjects, data.futureProjects],
        backgroundColor: ["#194185", "#1570ef", "#84caff"],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Optional chart configuration
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>Project Summary</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
