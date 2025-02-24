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

export const getAffiliates = async () => {
  try {
      const user = JSON.parse(sessionStorage.getItem('user')); // Obtén el objeto user del sessionStorage
      const token = user?.token; // Extrae el token del objeto user
      if (!token) {
          throw new Error('Token no encontrado');
      }

      const response = await axios.get(baseURL, {
          headers: {
              'Authorization': `Bearer ${token}` // Añade el token en los encabezados
          }
      });

      console.log(response.data); // Verifica la estructura de los datos recibidos

      if (response.status === 200) {
          const afiliate = response.data.map(affiliate => ({
              username: affiliate.username,
              name: affiliate.name || 'N/A',
              lastname: affiliate.lastname || 'N/A',
              roles: Array.isArray(affiliate.roles) ? affiliate.roles : [], // Asegúrate de que roles es un array
              enabled: affiliate.enabled
          }));
          return {
              status: response.status,
              data: afiliate
          };
      }

      return response;
  } catch (error) {
      console.log(error);
      return {
          status: error.response ? error.response.status : 500,
          data: error.response ? error.response.data : { message: 'Error desconocido' }
      };
  }
}


export const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  if (Date.now() >= exp * 1000) {
    return true;
  }
  return false;
};
