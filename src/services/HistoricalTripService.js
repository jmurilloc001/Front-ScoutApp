import axios from "axios";

const baseURL = 'http://localhost:8080/historical-trips';

export const getAllHistoricalTripsPage = async (page = 0, size = 2) => {
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
                tripId: trip.tripId,
                title: trip.title,
                startDate: trip.startDate,
                endDate: trip.endDate,
                closedAt: trip.closedAt,
                recordBody: {...trip.recordBody}
            }));

            console.log(response);
            
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

export const conseguirToken = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user?.token;
  if (!token) {
      throw new Error('Token no encontrado');
  }
  return token;
};