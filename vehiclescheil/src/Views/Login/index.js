import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
// import MiniLoading from "../../Components/MiniLoading";
// import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "./login.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
// Actions de Redux
// import { restorePasswordAction } from "redux/actions/clientsActions";
// import { Modal } from "react-bootstrap";
import { loginUser } from "../../redux/actions/loginActions";
import MiniLoading from "../../Components/MiniLoading";
import { useNavigate } from "react-router";

function Login(props) {
  // SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);

  // PASSWORD RESTORE MODAL STATE
  const [showModal, setShowModal] = useState(false);

  // RESTORE STATE (TEMP)
  const [restore, setRestore] = useState(false);

  // LOGIN STATE (Loading/Not Loading)
  const [isLoading, setIsLoading] = useState(false);

  // ERROR MESSAGE STATE (Retrive user data from API)
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");


  // REDUX
  const dispatch = useDispatch();
  const cargando = useSelector(state => state.login.loading);
  const error = useSelector(state => state.login.error);
  const errorModalStore = useSelector(state => state.login.errorStore);
  const navigate = useNavigate();


  // OPEN MODAL
  const modalState = () => {
    setShowModal(!showModal);
  };

  // USER LOGIN REDUX
  const login = async(user, pass) => {
    const logged= await dispatch(loginUser(user, pass, props));
    console.log("logged",logged);
    if(logged===true){
      navigate("/home");
    }
  };

  const submitLogin = e => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      {isLoading ? (
        <MiniLoading />
      ) : (
        <div className="login-container">
          <div className="login-container-content">
            <div
              className="logo"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "Gray",
              }}
            >
              <img
                className="img-fluid"
                src={require("../../Assets/Images/favicon.png")}
                alt=""
              />
            </div>
            <section className="content">
              <p className="bottom-text center">
                Vehicles Cheil
                <br /><br />
                Login in the APP
              </p>
              <div className="main-info">
                <form className="login-form" onSubmit={submitLogin}>
                  <div className="input-field form-group">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder={"User Name"}
                      onChange={e => setUsername(e.target.value)}
                      value={username}
                      required
                    />
                  </div>
                  <div className="input-field form-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder={"Password"}
                      className="form-control"
                      onChange={e => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-submit btn btn-success">
                    {cargando ? (
                      <FontAwesomeIcon icon={faSpinner} className="spinner" />
                    ) : (<>
                      {"Continue"}
                      </>
                    )}
                  </button>
                  {error && <p className="error-message">{error}</p>}
                </form>
              </div>
              <div className="version-info-login">
                <p className="center version">Version 1.0</p>
                <p className="center hnl">Cheil</p>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
