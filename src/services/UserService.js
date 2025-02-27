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
        } 
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

export const getAllUsers = async () => {
  try {
    const token = conseguirToken();
    const response = await axios.get(baseURL, {
       headers: {
           'Authorization': `Bearer ${token}`
       }
     });
 
     return { status: response.status, data: response.data };
   } catch (error) {
   console.log('Error en la búsqueda de los usuarios:' + error);
   return { 
     status: error.response ? error.response.status : 500, 
     data: error.response ? error.response.data : { message: 'Error desconocido' }
   }
   }
}

export const getUserByUsername = async (username) => {
  try {
   const token = conseguirToken();
   const response = await axios.get(baseURL+'/'+username, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });

    return { status: response.status, data: response.data };
  } catch (error) {
  console.log('Error en la búsqueda del usuario: ' + username + ". Error: " + error);
  return { 
    status: error.response ? error.response.status : 500, 
    data: error.response ? error.response.data : { message: 'Error desconocido' }
  }
  }
};

export const updateUsername = async (username, id) => {
  try {
    const token = conseguirToken();
    const response = await axios.patch(baseURL+'/'+id+'/username',
      {username: username}
    ,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log(response.data);
    console.log(response.status);
    
    return { status: response.status, data: response.data }
  } catch (error) {
    console.log("No se ha podido cambiar el username. Error:  "  + error);
    return { 
      status: error.response ? error.response.status : 500, 
      data: error.response ? error.response.data : { message: 'Error desconocido' }
    }
  }
};

export const updatePassword = async (password, id) => {
  try {
    const token = conseguirToken();
    const response = await axios.patch(baseURL+'/'+id+'/password',
      {password: password}
    ,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return { status: response.status, data: response.data }
  } catch (error) {
    console.log("No se ha podido cambiar el password. Error:  "  + error);
    return { 
      status: error.response ? error.response.status : 500, 
      data: error.response ? error.response.data : { message: 'Error desconocido' }
    }
  }
};

export const putAffiliate = async (user_id, affiliate_id) => {
  try {
    const token = conseguirToken();
    const response = await axios.patch(baseURL+'/'+user_id+'/affiliates/' + affiliate_id,
    {},{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return { status: response.status, data: response.data }
  } catch (error) {
    console.log("No se ha podido actualizar el afiliado. Error:  "  + error);
    return { 
      status: error.response ? error.response.status : 500, 
      data: error.response ? error.response.data : { message: 'Error desconocido' }
    }
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

export const conseguirToken = () => {
  const user = JSON.parse(sessionStorage.getItem('user')); // Obtén el objeto user del sessionStorage
  const token = user?.token; // Extrae el token del objeto user
  if (!token) {
      throw new Error('Token no encontrado');
  }
  return token;
};

export const getIdByUsername = async (username) => {
  const response = await getUserByUsername(username);
  console.log(response);
  if (response.status === 200) {
      return response.data.id;
  }else{
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se ha encontrado el usuario. Status: '+ response.status
      });
      return 0;
  }
};

export const removeUser = async (id) => {
  try {
    const token = conseguirToken();
    const response = await axios.delete(baseURL+'/'+id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return { status: response.status };
}catch (error){
    console.log('Error borrado al usuario ' + id + ": ", error);
    return { status: error.response?.status || 500, message: error.message };
}
};
