import { getDataService, logoutUserService } from "../services/mainServices";

export const getDataAction = () => async () => {
  try {
    const response = await getDataService();
    const { data, status } = response;
    if (status === 200 && data?.data) {
      return response;
    }else{
      return response?.data;
    }
  } catch (err) {
    throw err;
  }
};

export const logoutUserAction = () => async () => {
  try {
    const response = await logoutUserService();
    const { data, status } = response;
    if (status === 200 && data?.data) {
      return response;
    }else{
      return response?.data;
    }
  } catch (err) {
    throw err;
  }
};