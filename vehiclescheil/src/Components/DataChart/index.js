import React, { useEffect } from "react";
import Chart from 'chart.js/auto';
import "./dataChart.css";

const DataChart = ({ data, chartType, selectedFilter}) => {
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
    if (chartType === "Pie") {
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: selectedFilter,
              data: values,
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1
            }
          ]
        }
      });
    } else if (chartType === "Bar") {
      new Chart(ctx, {
        type: "bar", // Set the chart type to "bar"
        data: {
          labels: labels,
          datasets: [
            {
              label: selectedFilter,
              data: values,
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    else if(chartType === "Lines"){
      new Chart(ctx, {
        type: "line", // Set the chart type to "line"
        data: {
          labels: labels,
          datasets: [
            {
              label: selectedFilter,
              data: values,
              borderColor: "Blue",
              borderWidth: 1,
              fill: false,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }else if(chartType ==="Polar"){
      new Chart(ctx, {
        type: "polarArea", // Set the chart type to "polarArea"
        data: {
          labels: labels,
          datasets: [
            {
              label: "Stadistics",
              data: values,
              backgroundColor: colors,
              borderWidth: 1,
            }
          ]
        }
      });
    }
  }, []);

  return (
    <div className="container-chart">
      <canvas id="myChart" className="chart-data" width="600" height="600" />
    </div>
  );
};

export default DataChart;
