import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import "./dataChartAvg.css";

const DataChartAvg = ({ data, chartType }) => {
  console.log(data);


  const filterValuesToChart = (selectedFilter) => {
    if (selectedFilter !== null) {
      // Remove the "class" property from each object in the data array
      const filtered = data.map(data => data[selectedFilter] );
      console.log("filtered", filtered);
      //const modifiedData = filtered.map(({ class: _, ...rest }) => rest);
      return filtered;
    }
  };

  const labels = data.map(data => data.class);
  let selectOptions = Object.keys(data[0]);
  console.log("selectOptions 1", selectOptions);
  // Remove the item "class" from the array
  selectOptions = selectOptions.filter(item => item !== "class");
  const [selectedFilter, setSelectedFilter] = useState(selectOptions[0])
  let values = filterValuesToChart(selectedFilter);
  console.log("labels:", labels, "values:", values, "selectoptions", selectOptions);


  // useEffect(() =>
  // {

  // },[selectedFilter])
  useEffect(() => {
    const ctx = document.getElementById("myChartAvg");

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
    values = filterValuesToChart(selectedFilter);
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
    else if (chartType === "Lines") {
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
    } else if (chartType === "Polar") {
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
  }, [,selectedFilter]);

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
      </div>
      <br />
      <div>
        <canvas id="myChartAvg" className="chart-data" width="550" height="500" />
      </div>

    </div>
  );
};

export default DataChartAvg;
