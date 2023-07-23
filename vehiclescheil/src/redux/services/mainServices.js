import { axios_vehicles } from "../../Api/axios";
import { headers } from "../../Utils/StageHandler";

const mdlP = {
    loginURL: "/login?username=",
    getDataURL: "/getData",
    logoutURL: "/logout",
    // fetchTasksURL: "mdl07/dashBoard/summaryTask",
};

export const getDataService = async => {
    return axios_vehicles.get(mdlP.getDataURL);
};

export const loginUserService = async payload => {
    return axios_vehicles.post(mdlP.loginURL+payload.username+"&password="+payload.password);
};

export const logoutUserService = async payload => {
    return axios_vehicles.post(mdlP.logoutURL);
};