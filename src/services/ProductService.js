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
}

export const conseguirToken = () => {
    const user = JSON.parse(sessionStorage.getItem('user')); // Obtén el objeto user del sessionStorage
    const token = user?.token; // Extrae el token del objeto user
    if (!token) {
        throw new Error('Token no encontrado');
    }
    return token;
  };