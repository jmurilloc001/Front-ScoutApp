import { useEffect, useState } from "react";
import { BackButton } from "../CommonsComponents";
import { getAllHistoricalTripsPage } from "../../services/HistoricalTripService";

export const HistoricalTrips = ({ onBack}) => {
        const [trips, setTrips] = useState([]);
        const [page, setPage] = useState(0);
        const [totalPages, setTotalPages] = useState(1);
    
        useEffect(() => {
            const fetchTrips = async () => {
                try {
                    const response = await getAllHistoricalTripsPage (page);
                    if (response.status === 200) {
                        setTrips(response.data);
                        setTotalPages(response.totalPages);
                    }
                } catch (error) {
                    console.error("Error obteniendo los trips:", error);
                }
            };
    
            fetchTrips();
        }, [page]);
    return (
        <>
        <div className="container mt-5">
                    <h1 className="text-center text-white">Todos los Viajes cerrados</h1>
                    <div className="row">
                        {trips.length > 0 ? (
                            trips.map((trip) => (
                                <div key={trip.id} className="col-md-6 mb-4">
                                    <div className={`card shadow border-success`}>
                                        <div className={`card-header text-white bg-success`}>
                                            <h5 className="mb-0">{trip.title}</h5>
                                        </div>
                                        <div className="card-body">
                                            <h2>{trip.title}</h2>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Material</th>
                                                        <th>Usado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(trip.recordBody).map(([material, cantidad], index) => (
                                                        <tr key={index}>
                                                            <td>{material}</td>
                                                            <td>{cantidad}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <h3>
                                                <b>FECHA INICIO:</b> {trip.startDate}
                                            </h3>
                                            <h3>
                                                <b>FECHA FIN:</b> {trip.endDate}
                                            </h3>
                                            <h3>
                                                <b>FECHA CIERRE: </b> {trip.closeAt}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-white">No hay viajes disponibles.</p>
                        )}
                    </div>
                    {page < totalPages - 1 && (
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => setPage((prevPage) => prevPage + 1)}
                        >
                            Página siguiente
                        </button>
                    )}
                    {page > 0 && (
                        <button
                            className="btn btn-secondary mt-3 me-2"
                            onClick={() => setPage((prevPage) => prevPage - 1)}
                        >
                            Página anterior
                        </button>
                    )}
                </div>
        <BackButton onBack={onBack}></BackButton>
        </>
    );
}