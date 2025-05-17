import axios from "axios";

const baseURL = 'http://localhost:8080/news';

export const getAllNewsPaginable = async (size,page,sort) => {
    try {
        const token = conseguirToken();
        const response = await axios.get(baseURL+"/paginated", {
            params: {
                page: page,
                size: size,
                sort: sort,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
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

export const conseguirToken = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = user?.token;
    if (!token) {
        throw new Error('Token no encontrado');
    }
    return token;
};