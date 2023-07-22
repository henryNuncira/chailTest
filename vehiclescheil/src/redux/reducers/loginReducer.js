// Estado de los reducer de login
import moment from "moment";
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
  LOGIN_TOKEN_USER,
  COMPANY_ERROR_STORE,
  LOGIN_COMPANY,
  LOGIN_SUCCESS_COMPANY,
  LOGIN_ERROR_COMPANY,
  LOGIN_LOADING,
  IS_SUPERV,
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
    // login Company
    case LOGIN_COMPANY:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LOGIN_SUCCESS_COMPANY:
      return {
        ...state,
        checkCompany: action.payload,
        error: null,
        loading: false,
      };

    case LOGIN_ERROR_COMPANY:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // loading independiente
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };

    case COMPANY_ERROR_STORE:
      return {
        ...state,
        errorStore: action.payload,
        loading: false,
      };

    case IS_SUPERV:
      return {
        ...state,
        isSuperv: action.payload,
      };

    default:
      return state;
  }
};
