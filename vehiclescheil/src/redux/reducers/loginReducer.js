// Estado de los reducer de login
import moment from "moment";
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
  LOGIN_TOKEN_USER,
  LOGIN_LOADING,
  RESET_LOGIN_USER
} from "../types";

const initialState = {
  user: [],
  checkCompany: [],
  error: null,
  loading: false,
  errorStore: false,
  isSuperv: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // login user
    case LOGIN_USER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case RESET_LOGIN_USER:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
        loginAt: moment().day(),
      };

    case LOGIN_TOKEN_USER:
      return {
        ...state,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOGOUT_USER:
      return { ...initialState };
   
    // loading independiente
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return{
        ...state
      };
  }
};
