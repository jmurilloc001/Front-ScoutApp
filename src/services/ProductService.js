import axios from "axios"

const baseURL = 'http://localhost:8080/products';

export const getAllProducts = async() => {
    try {
        const token = conseguirToken();
        const response = await axios.get(baseURL, {
            headers: {
                'Authorization': `Bearer ${token}` // Añade el token en los encabezados
            }
        });
        if (response.status === 200) {
            const products = response.data.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock || 0,
                lastpurchase: product.lastpurchase || 'N/A'
            }));
            return {
                status: response.status,
                data: products
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

export const getAllProductsPage = async (page = 0, size = 8) => {
    try {
        const token = conseguirToken();
        const response = await axios.get(`${baseURL}/page?page=${page}&size=${size}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Añade el token en los encabezados
            }
        });
        if (response.status === 200) {
            const products = response.data.content.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock || 0,
                lastpurchase: product.lastpurchase || 'N/A'
            }));
            return {
                status: response.status,
                data: products,
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
                currentPage: response.data.number
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

export const saveProduct = async({ name, price, stock, lastpurchase}) => {
    try {
        const token = conseguirToken();
        const response = await axios.post(baseURL, {
            name,
            price,
            stock,
            lastpurchase
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.log('Error guardando el nuevo producto:', error);
        return { status: error.response?.status || 500, message: error.message };
    }
};

export const updateProduct = async ({ id, name, price, stock, lastpurchase}) => {
    try {
        const token = conseguirToken();

        const response = await axios.put(`${baseURL}/${id}`, {
            name,
            price,
            stock,
            lastpurchase
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

export const removeProduct = async(id) => {
    try {
        const token = conseguirToken();
        const response = await axios.delete(baseURL+'/'+id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status };
    }catch (error){
        console.log('Error borrando el producto ' + id + ": ", error);
        return { status: error.response?.status || 500, message: error.message };
    }
};


export const conseguirToken = () => {
    const user = JSON.parse(sessionStorage.getItem('user')); // Obtén el objeto user del sessionStorage
    const token = user?.token; // Extrae el token del objeto user
    if (!token) {
        throw new Error('Token no encontrado');
    }
    return token;
  };