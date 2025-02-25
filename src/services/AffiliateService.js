import axios from "axios";

const baseURL = 'http://localhost:8080/affiliates';

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

        if (response.status === 200) {
            const affiliates = response.data.map(affiliate => ({
                id: affiliate.id,
                name: affiliate.name || 'N/A',
                lastname: affiliate.lastname || 'N/A',
                birthday: affiliate.birthday || 'N/A',
                inscripcionDate: affiliate.inscripcionDate || 'N/A',
                seccion: affiliate.seccion || 'N/A'
            }));
            return {
                status: response.status,
                data: affiliates
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

export const update = async ({ id, name, lastname, birthday, inscripcionDate, seccion }) => {
    try {
        const token = conseguirToken();

        const response = await axios.put(`${baseURL}/${id}`, {
            name,
            lastname,
            birthday,
            inscripcionDate,
            seccion
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Añade el token en los encabezados
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Error updating data:', error);
        return { status: error.response?.status || 500, message: error.message };
    }
};

export const save = async({id, name, lastname, birthday, inscripcionDate, seccion}) => {
    try {
        const token = conseguirToken();
        const response = await axios.post(baseURL, {
            name,
            lastname,
            birthday,
            inscripcionDate,
            seccion
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.log('Error guardando al nuevo usuario:', error);
        return { status: error.response?.status || 500, message: error.message };
    }
}

export const remove = async(id) => {
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
}

export const conseguirToken = () => {
    const user = JSON.parse(sessionStorage.getItem('user')); // Obtén el objeto user del sessionStorage
    const token = user?.token; // Extrae el token del objeto user
    if (!token) {
        throw new Error('Token no encontrado');
    }
    return token;
}

