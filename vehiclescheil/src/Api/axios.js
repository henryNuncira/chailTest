import axios from "axios";
import { headers } from "../Utils/StageHandler";

const axios_vehicles = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axios_vehicles.interceptors.request.use(config => {
  // const token = store.getState().login.user?.AuthenticationInfo?.Token;
  // const apim_key = store.getState().login?.checkCompany[0]?.APIMSubscriptionKey;
  // if (token && apim_key) {
    config.headers = {
      ...headers,
      // "Api-Key":
      //   process.env.REACT_APP_ENVIRONMENT === "QA"
      //     ? process.env.REACT_APP_QA_API_KEY
      //     : process.env.REACT_APP_PROD_API_KEY,
      // "Ocp-Apim-Subscription-Key": apim_key,
      // Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
  //}
  return config;
});



export { axios_vehicles };
