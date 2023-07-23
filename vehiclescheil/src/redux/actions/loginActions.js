// Estado de los reducer de login
import { loginUserService } from "../services/mainServices";
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../types";

// Consumir WS de login
export const loginUser = (user, pass, props) => {
  
  const loginUser = () => ({
    type: LOGIN_USER,
  });

  // SI EL USUARIO EXISTE
  const loginSuccess = data => ({
    type: LOGIN_SUCCESS,
    payload: data,
  });

  // SI HUBO ERROR
  const loginError = estado => ({
    type: LOGIN_ERROR,
    payload: estado,
  });

  return async dispatch => {
    let sw = true;

    if (sw) {
      dispatch(loginUser());
      try {
        // extraer la data del usuario
        const userCredentials = {
          username: user,
          password: pass,
        };
        const response = await loginUserService(userCredentials);
        if (response.data?.status === "400" )
          {dispatch(loginError("Este usuario no existe"));
        return false}
        if ( response.data?.status === "404")
        {
          dispatch(loginError("Credenciales Inválidas"));
          return false;
        }
        
        if (response.data.token !== null) {
          window.localStorage.setItem("token", response.data.token);
            await dispatch({ type: LOGIN_SUCCESS,
              payload: response.data,});
            return true;
        }
      } catch (error) { }
    }
  };
};
