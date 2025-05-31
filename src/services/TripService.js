import axios from "axios";
import { getStockByName } from "./ProductService";

const baseURL = 'http://localhost:8080/trips';

export const getAllTripsPage = async (page = 0, size = 2) => {
    try {
        const token = conseguirToken();
        const response = await axios.get(`${baseURL}/paginated?page=${page}&size=${size}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const trips = response.data.content.map(trip => ({
                id: trip.id,
                title: trip.title,
                startDate: trip.startDate,
                endDate: trip.endDate,
                materials: trip.materials.map(material => ({
                    ...material,
                    stock: 0
                }))
            }));

            await Promise.all(trips.map(async trip => {
                await Promise.all(trip.materials.map(async material => {
                    material.stock = (await getStockByName(material.productName)).data;
                }));
            }));

            return {
                status: response.status,
                data: trips,
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
            data: error.response ? error.response.data : { message: error.response.data.message }
        };
    }
};

export const deleteTrip = async(id) => {
    try {
        const token = conseguirToken();
        const response = await axios.delete(baseURL+'/'+id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status };
    }catch (error){
        console.log('Error borrando el trip ' + id + ": ", error);
        return { status: error.response?.status || 500, message: error.message };
    }
};

export const addMaterialToTrip = async (idTrip, idMaterial, quantity) => {
    try {
        const token = conseguirToken();
        const response = await axios.put(
            `${baseURL}/${idTrip}/addProduct`, 
            null,
            {
                params: { productId: idMaterial, quantity: quantity },
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );

        console.log(response.data);

        return { status: response.status };
    } catch (error) {
        console.log(`Error añadiendo material al trip ${idTrip}:`, error);
        return { status: error.response?.status || 500, message: error.response.data.message };
    }
};

export const createTrip = async({title, startDate, endDate}) => {
    try {
        const token = conseguirToken();

        const response = await axios.post(baseURL, {
            title,
            startDate,
            endDate
    },
        {
            headers: { 'Authorization': `Bearer ${token}` }
    });
    
    return {status: response.status, data: response.data}
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return { status: error.response?.status || 500, message: error.response?.data.message };
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
