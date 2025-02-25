import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL = 'http://localhost:8080/users';

export const doLogin = async ({ username, password }) => {
  try {
    const response = await axios.post('http://localhost:8080/login', {
      username: username,
      password: password
    });

    if (response.status === 200) {
      const rolesResponse = await getRoles(username);
      const roles = rolesResponse.data.map(roleDto => roleDto.name);
      return {
        status: response.status,
        data: {
          ...response.data,
          roles: roles
        } // Añadir roles a la respuesta
      };
    }

    return { status: response.status, data: response.data };
  } catch (error) {
    console.log('Este es el error: ' + error);
    return {
      status: error.response ? error.response.status : 500,
      data: error.response ? error.response.data : { message: 'Error desconocido' }
    };
  }
};

export const doRegister = async ({ username, password }) => {
    try {
      const response = await axios.post('http://localhost:8080/users/register', {
        username: username,
        password: password
      });
  
      if (response.status === 200) {
        const rolesResponse = await getRoles(username);
        const roles = rolesResponse.data.map(roleDto => roleDto.name); // Extraer los nombres de los roles
        return {
          status: response.status,
          data: {
            ...response.data,
            roles: roles //Solo los nombres de los roles
          } // Añadir roles a la respuesta
        };
      }
  
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log('Este es el error: ' + error);
      return {
        status: error.response ? error.response.status : 500,
        data: error.response ? error.response.data : { message: 'Error desconocido' }
      };
    }
  };

export const getRoles = async (username) => {
  try {
    const response = await axios.get(baseURL + "/" + username + "/roles");
    return response;
  } catch (error) {
    console.log(error);
    return {
      status: error.response ? error.response.status : 500,
      data: error.response ? error.response.data : { message: 'Error desconocido' }
    };
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  if (Date.now() >= exp * 1000) {
    return true;
  }
  return false;
};
