import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import Navigation from "../../Components/Navigation";
// import Pagination from "../../Components/Pagination";
import "./home.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getDataAction } from "../../redux/actions/mainActions";
import MiniLoading from "../../Components/MiniLoading";

function Home() {
  const dispatch = useDispatch();

  const [vehiclesData, setVehiclesData ] = useState([]);
  // CONSTANTS
  const [tasks, setTasks] = useState([]);
  const [cotizacionUpdated, setCotizacionUpdated] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  

  // DOCUMENT TYPE FILTER
  const [typeValue, setTypeValue] = useState(null);
  const [typeName, setTypeName] = useState(null);
  const [showTypes, setShowTypes] = useState(false);

  // STATUS FILTER
  const [statusList, setStatusList] = useState([]);
  const [status, setStatus] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const [registers, setRegisters] = useState(null);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(3);
  const pageSize = 16;
  let pageNums = [];
  const totalPages = Math.ceil(registers / pageSize);

  //REDUX STATE
  const [user, setUser] = useState(useSelector(state => state.login.user));
  const salesAgentId = useSelector(
    state => state.login?.user.CustomerInfo?.CustomerId
  );
  // const warehouseId = useSelector(state => state.company?.WarehouseId);
  // const companyId = useSelector(state => state.company.companyId);

  for (let i = 1; i <= totalPages; i++) {
    pageNums.push(i);
  }

  const generals = {
    flex: "45%",
  };

  const fetchVehiclesData = async () => {
    const response = await dispatch(getDataAction());
    
    if(response && response.data?.data){
        setVehiclesData(response.data.data);
    }else{
      console.error("Error:",response.toString());
      throw new Error(response.toString());
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVehiclesData();
  }, []);

  const DataDisplayTable = ({ data }) => {
    if (!data){
      data = vehiclesData;
    }
    return (
      <table>
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
              <td>{item.class}{console.log("item",item)}</td>
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
    );
  };

 const searchQuote = e => {
    if (e.keyCode === 13) {
      setSearch(e.target.value.trimEnd().trimStart());
      setCurrentPage(1);
      setLastIndex(3);
      setFirstIndex(0);
    }
  };

  const searchTextRef = useRef(null);

  const searchQuoteText = value => {
    if (value !== "") {
      setSearch(value.trimEnd().trimStart());
      setCurrentPage(1);
      setLastIndex(3);
      setFirstIndex(0);
    }
  };

  const handleTypes = () => {
    setShowTypes(!showTypes);
  };

  const handleType = (e, type) => {
    restore();
    setTypeName(type.Name);
    setTypeValue(type.Code);
    setStatusList(type.Status);
    setStatus(type.Status[0]);
  };

  const handleSelectedStatus = (e, status) => {
    restore();
    setStatus(status);
  };

  const handleStatus = () => {
    setShowStatus(!showStatus);
  };

  const handleEmpty = e => {
    if (e.target.value.length === 0) {
      setSearch("");
    }
  };

  const restore = () => {
    setCurrentPage(1);
    setLastIndex(3);
    setFirstIndex(0);
    setShowStatus(false);
    setShowTypes(false);
  };

  // const handleDropdown=(e, )=>{
  //   setCotizacionStatus(e.target.value)
  //   setCotizacionFilter(e.target.id.charAt(0).toUpperCase()+e.target.id.slice(1,e.target.id.length))
  // }

  return (
    <>
      {/* <Navigation /> */}
      <div className="continer container-fluid">
      {isLoading ? (
          <MiniLoading />
        ) :(
            vehiclesData && vehiclesData.length>0 && DataDisplayTable(vehiclesData)
        )
        }
      </div>
      {/* <section className="tareas-main">
        <div className="tareas-header">
          <h2>Mis Tareas</h2>
        </div>
        <div className="tareas-content">
          <Row className="tareas-search ">
            <Col sm={7} className="tareas-search-bar">
              <div className="position-relative">
                <input
                  ref={searchTextRef}
                  type="text"
                  placeholder="Buscar"
                  onChange={handleEmpty}
                  onKeyDown={searchQuote}
                />
                <img src={searchIcon} className="tareas-search-icon" alt="search" onClick={() => searchQuoteText(searchTextRef.current.value)}/> 
              </div>
            </Col>
            <Col className="tareas-search-filter">
              <div className="tareas-filter-content" onClick={handleTypes}>
                <h2>{typeName}</h2>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
              <ul
                className={
                  showTypes
                    ? "tareas-filter-options"
                    : "tareas-filter-options-hidden"
                }
              >
                {vehiclesData &&
                  vehiclesData?.map(type => {
                    return (
                      <li
                        className="filter-option"
                        onClick={e => handleType(e, type)}
                        key={type.Code}
                      >
                        <input
                          type="radio"
                          className="radio"
                          id={type.Code}
                          value={type.Code}
                          name="tipo"
                        />
                        <label htmlFor={type.Code}>{type.Name}</label>
                      </li>
                    );
                  })}
              </ul>
            </Col>
            <Col className="tareas-search-filter">
              <div className="tareas-filter-content" onClick={handleStatus}>
                <h2>{status?.Name}</h2>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
              <ul
                className={
                  showStatus
                    ? "tareas-filter-options"
                    : "tareas-filter-options-hidden"
                }
              >
                {statusList.map(status => {
                  return (
                    <li
                      className="filter-option"
                      onClick={e => handleSelectedStatus(e, status)}
                      key={status.StatusId}
                    >
                      <input
                        type="radio"
                        className="radio"
                        id={status.StatusId}
                        name="tipo"
                        value={status.StatusId}
                      />
                      <label htmlFor={status.StatusId}>{status.Name}</label>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
        </div>
        {isLoading ? (
          <MiniLoading />
        ) : (
          <>
            <div className="tareas-listado">
              <div className="tareas-listado-left">
                
              </div>
              <div className="tareas-listado-right">
                
              </div>
            </div>
            {errorMessage ? (
              <div className="error-message-mis-tareas">
                <p>{errorMessage}</p>
              </div>
            ) : (
              <div className="mis-tareas-pagination">
                 <Pagination
                  type={"paginationTarea"}
                  firstIndex={firstIndex}
                  lastIndex={lastIndex}
                  currentPage={currentPage}
                  pageNums={pageNums}
                  setCurrentPage={setCurrentPage}
                  setFirstIndex={setFirstIndex}
                  setLastIndex={setLastIndex}
                /> 
              </div>
            )}
          </>
        )}
      </section> */}
    </>
  );
}

export default Home;
