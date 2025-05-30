import axios from "axios";

const baseURL = 'http://localhost:8080/news';

export const getAllNewsPaginable = async (size,page,sort) => {
    try {
        const response = await axios.get(baseURL+"/paginated", {
            params: {
                page: page,
                size: size,
                sort: sort,
            },
        });
        if (response.status === 200) {
            return {
                status: response.status,
                data: response.data
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
};

export const saveNew = async({title, description, date, urlImage}) => {
    try {
        const token = conseguirToken();
                
        const response = await axios.post(baseURL, {
            title,
            description,
            date,
            urlImage
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.log('Error guardando la nueva noticia:', error);
        return { status: error.response?.status || 500, message: error.response };
    }
};

export const removeNew= async(id) => {
    try {
        const token = conseguirToken();
        const response = await axios.delete(baseURL+'/'+id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status };
    }catch (error){
        console.log('Error borrando la noticia ' + id + ": ", error);
        return { status: error.response?.status || 500, message: error.message };
    }
};

export const updatenew = async(id,{title, description, date, urlImage}) => {
    try {
        const token = conseguirToken();
        const response = await axios.put(baseURL+'/'+id, {
            title,
            description,
            date,
            urlImage
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status };
    }catch (error){
        console.log('Error editando la noticia ' + id + ": ", error);
        return { status: error.response?.status || 500, message: error.message };
    }
}

export const conseguirToken = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = user?.token;
    if (!token) {
        throw new Error('Token no encontrado');
    }
    return token;
};