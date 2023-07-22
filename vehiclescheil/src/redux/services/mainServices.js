import { axios_vehicles } from "../../Api/axios";

const mdlP = {
    getDataURL: "/home",
    // fetchTasksURL: "mdl07/dashBoard/summaryTask",
};

export const getDataService = async => {
    return axios_vehicles.get(mdlP.getDataURL);
};

// export const getSummaryTaskService = async payload => {
//     return axios_vehicles.post(mdl7.fetchTasksURL, payload);
// };