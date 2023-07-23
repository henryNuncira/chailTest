import React, { useEffect } from "react";
import Chart from 'chart.js/auto';
import "./dataChart.css";

const DataChart = ({ data }) => {
  const labels = Object.keys(data[0]);
  const values = Object.values(data[0]);

  useEffect(() => {
    const ctx = document.getElementById("myChart");

    // Check if there's an existing chart instance on the canvas
    const existingChart = Chart.getChart(ctx);

    // Destroy the existing chart if it exists
    if (existingChart) {
      existingChart.destroy();
    }
    // Create a new chart
    const colors = [
      "Red",
      "mistyrose",
      "Yellow",
      "Green",
      "lavender",
      "Orange",
      "Grey",
      "Lime",
      "Teal",
      "Maroon",
      "Navy",
      "Blue",
      "Silver",
      "Gold",
      "greenyellow",
      "floralwhite",
      "Magenta",
      "Indigo",
    ];
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Stadistics",
            data: values,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }
        ]
      }
    });
  }, []);

  return (
    <div className="container-chart">
      <canvas id="myChart" className="chart-data" width="600" height="600" />
    </div>
  );
};

export default DataChart;
