import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import searchIcon from "../../Assets/Images/search.svg";
import no from "../../Assets/Images/no.svg";
import { getDataAction, logoutUserAction } from "../../redux/actions/mainActions";
import MiniLoading from "../../Components/MiniLoading";
import "./home.css";
import { Modal } from "react-bootstrap";
import { Box } from "@mui/material";
import StadisticsTable from "../../Components/StadisticsTable";
import DataChart from "../../Components/DataChart";
import { useNavigate } from "react-router";
import DataChartAvg from "../../Components/DataChartAvg";
import { chartTypes } from "../../Utils/constants";

function Home() {
  const dispatch = useDispatch();

  const [vehiclesInitialData, setVehiclesInitialData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [stadisticsData, setStadisticsData] = useState([]);
  const [avgData, setAvgData] = useState([]);
  const [filterStadisticsData, setFilterStadisticsData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);


  const [isLoading, setIsLoading] = useState(true);
  const [showModalStadistics, setShowModalStadistics] = useState(false);
  const [showModalChart, setShowModalChart] = useState(false);
  const [showModalAvg, setShowModalAvg] = useState(false);

  //REDUX STATE
  const navigate = useNavigate();
  const fetchVehiclesData = async () => {
    const response = await dispatch(getDataAction());

    if (response && response.data?.data) {
      setVehiclesData(response.data?.data);
      setVehiclesInitialData(response.data?.data);
      setStadisticsData(response.data?.desviacion_estandar_df);
      setAvgData(response.data?.promedio_df);
      const labels = response.data?.desviacion_estandar_df.map((item) => { return item.class });
      setFilterStadisticsData(labels);
      setSelectedFilter(labels[0]);
      setSelectedChart("Bar");

    } else {
      console.error("Error:", response.toString());
      navigate("/login");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVehiclesData();
  }, []);

  const handleChangeFilter = e => {
    const filter = e.target.value;
    setSelectedFilter(filter);
  }

  const handleChangeChartType = e => {
    const filter = e.target.value;
    setSelectedChart(filter);
  }
  const handleLogout = async () => {
    await dispatch(logoutUserAction());
    window.localStorage.removeItem("token");
    navigate("/login")
  }

  const DataDisplayTable = ({ data }) => {
    if (!data) {
      data = vehiclesData;
    }
    return (
      <div>
        <div className="action-table-topbar">
          <div className="action-table-left"></div>
          <div className="action-table-right">
            <div>
              <div className="vehicles-search">
                <input
                  ref={searchTextRef}
                  onChange={searchData}
                  type="text"
                  placeholder="Search vehicles by name..."
                />
                <img src={searchIcon} className="inv-search-icon" alt="search" onClick={() => searchDataText(searchTextRef.current.value)} />
              </div>
            </div>
            <div className="action-table-buttons">
              <button
                onClick={() => { setShowModalStadistics(true); }}
                className={"activeFilter btn btn-info"}
              >
                Show Stadistics
              </button>
              <select type="input" className="optionsChart" placeholder="Filter By"
                onChange={handleChangeFilter}>
                {filterStadisticsData.length > 0 ?
                  filterStadisticsData.map((item, index) => (
                    (<option key={index} value={item}
                    >{item.charAt(0).toUpperCase() + item.slice(1)}</option>)
                  ))
                  : <option value="null">No Options</option>}
              </select>
              {chartTypes(handleChangeChartType)}
              <button
                onClick={() => { setShowModalChart(true); }}
                className={"activeFilter btn btn-secondary"}
              >
                Show Chart Desv
              </button>
              <button
                onClick={() => { setShowModalAvg(true); }}
                className={"activeFilter btn btn-primary"}
              >
                Show Chart Average
              </button>
            </div>
          </div>
        </div>
        <table className="action-table" role="table">
          <thead className="table-head">
            <tr>
              <th>Class</th>
              <th>Compactness</th>
              <th>Circularity</th>
              <th>Distance Circularity</th>
              <th>Radius Ratio</th>
              <th>Pr. Axis Aspect Ratio</th>
              <th>Max. Length Aspect Ratio</th>
              <th>Scatter Ratio</th>
              <th>Elongatedness</th>
              <th>Pr. Axis Rectangularity</th>
              <th>Max. Length Rectangularity</th>
              <th>Scaled Variance</th>
              <th>Scaled Variance.1</th>
              <th>Scaled Radius of Gyration</th>
              <th>Scaled Radius of Gyration.1</th>
              <th>Skewness About</th>
              <th>Skewness About.1</th>
              <th>Skewness About.2</th>
              <th>Hollows Ratio</th>
            </tr>
          </thead>
          <tbody className="tbody-data">
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{item.class}</td>
                <td>{item.compactness}</td>
                <td>{item.circularity}</td>
                <td>{item.distance_circularity}</td>
                <td>{item.radius_ratio}</td>
                <td>{item['pr.axis_aspect_ratio']}</td>
                <td>{item['max.length_aspect_ratio']}</td>
                <td>{item.scatter_ratio}</td>
                <td>{item.elongatedness}</td>
                <td>{item['pr.axis_rectangularity']}</td>
                <td>{item['max.length_rectangularity']}</td>
                <td>{item.scaled_variance}</td>
                <td>{item['scaled_variance.1']}</td>
                <td>{item.scaled_radius_of_gyration}</td>
                <td>{item['scaled_radius_of_gyration.1']}</td>
                <td>{item.skewness_about}</td>
                <td>{item['skewness_about.1']}</td>
                <td>{item['skewness_about.2']}</td>
                <td>{item.hollows_ratio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const searchData = e => {
    const searchValue = e.target.value.trimEnd().trimStart();
    console.log(searchValue);
    if (searchValue !== "") {
      const result = vehiclesData.filter(v => { return (v.class.includes(searchValue)) });
      setVehiclesData(result);
    } else {
      setVehiclesData(vehiclesInitialData)
    }
  };

  const searchTextRef = useRef(null);

  const searchDataText = value => {
    if (value !== "") {
      const searchValue = value.trimEnd().trimStart();
      const result = vehiclesData.filter(v => { return (v.class.includes(searchValue)) });
      setVehiclesData(result);
    } else {
      setVehiclesData(vehiclesInitialData)
    }
  };

  const handleModal = () => {
    setShowModalStadistics(false);
  };

  const handleModalChart = () => {
    setShowModalChart(false);
  }

  const handleModalAvg = () => {
    setShowModalAvg(false);
  }
  const filterDataToChart = () => {
    if (selectedFilter !== null) {
      // Remove the "class" property from each object in the data array
      const filtered = stadisticsData.filter(data => data.class === selectedFilter);
      const modifiedData = filtered.map(({ class: _, ...rest }) => rest);
      return modifiedData;
    }
  };

  return (
    <>
      <header className="App-header">
        <div>
          <button
            onClick={handleLogout}
            className={"btn btn-success"}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="continer container-fluid">
        {isLoading ? (
          <MiniLoading />
        ) : (
          vehiclesData && vehiclesData.length > 0 && DataDisplayTable(vehiclesData)
        )
        }
      </div>
      {/*MODAL Stadistics*/}
      <Modal
        show={showModalStadistics}
        onClose={handleModal}
        backdrop="static"
        centered
      >
        <Box className='modal-table'>
          <div className='modal-table-header'>
            <h2>Stadistics</h2>
            <img src={no} alt='close' onClick={handleModal} />
          </div>
          <div className='modal-table-options'>
            <StadisticsTable
              handleModal={handleModal}
              stadisticsData={stadisticsData}
              avgData={avgData}
              isLoading={isLoading}
            />
          </div>
        </Box>
      </Modal>
      {/*MODAL Chart*/}
      <Modal
        show={showModalChart}
        onClose={handleModalChart}
        backdrop="static"
        centered
      >
        <Box className='modal-chart-c'>
          <div className='modal-table-header'>
            <h2>{selectedChart} Chart Statistics for {selectedFilter?.charAt(0)?.toUpperCase() + selectedFilter?.slice(1)}</h2>
            <img className="icon-close" src={no} alt='close' onClick={handleModalChart} />
          </div>
          <div className='modal-chart'>
            <DataChart
              data={filterDataToChart()}
              chartType={selectedChart}
              selectedFilter={selectedFilter?.charAt(0)?.toUpperCase() + selectedFilter?.slice(1)}
            />
          </div>
        </Box>
      </Modal>

      {/*MODAL Chart AVG*/}
      <Modal
        show={showModalAvg}
        onClose={handleModalAvg}
        backdrop="static"
        centered
      >
        <Box className='modal-chart-c'>
          <div className='modal-table-header'>
            <h2>{selectedChart} Chart Statistics AVG</h2>
            <img className="icon-close" src={no} alt='close' onClick={handleModalAvg} />
          </div>
          <div className='modal-chart'>
            <DataChartAvg
              data={avgData}
              chartType={selectedChart}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Home;
