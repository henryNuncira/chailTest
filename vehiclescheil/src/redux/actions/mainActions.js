import { getDataService } from "../services/mainServices";

export const getDataAction = () => async () => {
  try {
    const response = await getDataService();
    const { data, status } = response;
    if (status === 200 && data?.data) {
      return response;
    }
  } catch (err) {
    throw err;
  }
};

// export const getSummaryTaskAction = payload => async () => {
//   try {
//     const response = await getSummaryTaskService(payload);
//     const { data, status } = response;
//     if (status === 200 && data?.Data) {
//       return response;
//     }
//   } catch (err) {
//     throw err;
//   }
// };
