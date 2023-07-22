/** @format */

import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import mainReducer from "./mainReducer";

export default combineReducers({
  login: loginReducer,
  main: mainReducer,
});
