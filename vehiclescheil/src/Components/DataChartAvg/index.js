import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import "./dataChartAvg.css";
import { chartTypes, colorsChart } from "../../Utils/constants";

const DataChartAvg = ({ data, chartType }) => {
  const [selectedChart, setSelectedChart] = useState(chartType);

  const filterValuesToChart = (selectedFilter) => {
    if (selectedFilter !== null) {
      const filtered = data.map(data => data[selectedFilter] );
      return filtered;
    }
  };

  const labels = data.map(data => data.class);
  let selectOptions = Object.keys(data[0]);
  // Remove the item "class" from the array
  selectOptions = selectOptions.filter(item => item !== "class");
  const [selectedFilter, setSelectedFilter] = useState(selectOptions[0])
  let values = filterValuesToChart(selectedFilter);

  const handleChangeChartType = e => {
    const filter = e.target.value;
    setSelectedChart(filter);
  }
  useEffect(() => {
    const ctx = document.getElementById("myChartAvg");

    // Check if there's an existing chart instance on the canvas
    const existingChart = Chart.getChart(ctx);

    // Destroy the existing chart if it exists
    if (existingChart) {
      existingChart.destroy();
    }
    // Create a new chart
    const colors = colorsChart;
    values = filterValuesToChart(selectedFilter);
    if (selectedChart === "Pie") {
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
    } else if (selectedChart === "Bar") {
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
    else if (selectedChart === "Lines") {
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
    } else if (selectedChart === "Polar") {
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
  }, [,selectedFilter,selectedChart]);

  return (
    <div className="container-chart">
      <div className="tittle-avg">
        <h6>Select filter</h6>
        <select type="input" value={selectedFilter} onChange={(e)=>setSelectedFilter(e.target.value)} className="select-filteroption">
          {selectOptions.map((metric) => (
            <option key={metric} value={metric}>
              {metric?.charAt(0)?.toUpperCase() + metric?.slice(1)}
            </option>
          ))}
        </select>
        <h6 style={{marginLeft:"30px"}}>Select Chart Type</h6>
        {chartTypes(handleChangeChartType,selectedChart)}
      </div>
      <br />
      <div>
        <canvas id="myChartAvg" className="chart-data" width="550" height="500" />
      </div>
    </div>
  );
};

export default DataChartAvg;
