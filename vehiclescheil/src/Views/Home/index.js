import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../Assets/Images/search.svg";
import no from "../../Assets/Images/no.svg";
import { getDataAction } from "../../redux/actions/mainActions";
import MiniLoading from "../../Components/MiniLoading";
import "./home.css";
import { Modal } from "react-bootstrap";
import { Box } from "@mui/material";
import StadisticsTable from "../../Components/StadisticsTable";

function Home() {
  const dispatch = useDispatch();

  const [vehiclesData, setVehiclesData] = useState([]);
  // CONSTANTS
  const [stadisticsData, setStadisticsData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModalStadistics, setShowModalStadistics] = useState(false);

  //REDUX STATE
  const [user, setUser] = useState(useSelector(state => state.login.user));
 
  const fetchVehiclesData = async () => {
    const response = await dispatch(getDataAction());

    if (response && response.data?.data) {
      setVehiclesData(response.data?.data);
      setStadisticsData(response.data?.desviacion_estandar_df);
    } else {
      console.error("Error:", response.toString());
      throw new Error(response.toString());
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVehiclesData();
  }, []);

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
                  onChange={handleEmpty}
                  onKeyDown={searchQuote}
                  type="text"
                  placeholder="Buscar"
                />
                <img src={searchIcon} className="inv-search-icon" alt="search" onClick={() => searchQuoteText(searchTextRef.current.value)} />
              </div>
            </div>
            <div className="action-table-buttons">
              <button
                onClick={() => { setShowModalStadistics(true); }}
                className={"activeFilter btn btn-primary"}
              >
                Show Stadistics
              </button>
              <button
                onClick={() => { }}
                className={"activeFilter btn btn-secondary"}
              >
                Show Chart
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

  const searchQuote = e => {
    if (e.keyCode === 13) {
      setSearch(e.target.value.trimEnd().trimStart());
     
    }
  };

  const searchTextRef = useRef(null);

  const searchQuoteText = value => {
    if (value !== "") {
      setSearch(value.trimEnd().trimStart());
    
    }
  };



  const handleEmpty = e => {
    if (e.target.value.length === 0) {
      setSearch("");
    }
  };

  const handleModal=()=> {
    setShowModalStadistics(false);
  };

  return (
    <>
      {/* <Navigation /> */}
      <div className="continer container-fluid">
        {isLoading ? (
          <MiniLoading />
        ) : (
          vehiclesData && vehiclesData.length > 0 && DataDisplayTable(vehiclesData)
        )
        }
      </div>
      {/*MODAL Alert Email*/}
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
          stadisticsData = {stadisticsData}
          isLoading = {isLoading}
          />
        </div>
        </Box>
       
      </Modal>
    </>
  );
}

export default Home;
