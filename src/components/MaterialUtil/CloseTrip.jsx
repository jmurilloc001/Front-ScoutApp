import { useState, useEffect } from "react";
import "./../../css/CloseTrip.css";
import { cerrarTrip, getTripById } from "../../services/TripService";
import Swal from "sweetalert2";

export const CloseTrip = ({ onBack, id }) => {
    const [trip, setTrip] = useState({
        materials: [{ productName: "" }],
        title: ""
    });

    const [quantities, setQuantities] = useState({});

    const fetchTrip = async (tripId) => {
        try {
            const response = await getTripById(tripId);
            if (response.status === 200) {
                setTrip(response.data);
            } else {
                console.error("Error al obtener la salida:", response.data.message);
                Swal.fire({
                    icon: "error",
                    title: "Error: " + response.status,
                    text: "Mensaje: " + response.data.message
                });
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    useEffect(() => {
        if (id && id !== 0) {
            fetchTrip(id);
        }
    }, [id]);

    const handleQuantityChange = (index, value) => {
        setQuantities(prevState => ({
            ...prevState,
            [index]: value
        }));
    };

    const handleCloseTrip = async() => {
        const materialsWithQuantities = {};
        
        trip.materials.forEach((material, index) => {
            materialsWithQuantities[material.productName] = parseInt(quantities[index] ?? material.cantidad ?? 0, 10);
        });

        console.log("Payload enviado al backend:", materialsWithQuantities); 

        const response = await cerrarTrip({ id, materialsWithQuantities });

        if (response.status === 201) {
            console.log("Viaje cerrado correctamente:", response.data);
            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "El viaje ha sido cerrado correctamente."
            });
            onBack();
        } else {
            console.error("Error cerrando el viaje:", response.message);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo cerrar el viaje."
            });
        }
    };

    return (
    <div className="container mt-5">
        <h1 className="text-center text-white">Materiales del Viaje</h1>
        <ul className="list-group">
            {trip.materials.map((material, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {material.productName}
                    <input
                        type="number"
                        className="form-control w-25 mx-3"
                        placeholder="Cantidad"
                        value={quantities[index] ?? material.cantidad ?? ""}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                </li>
            ))}
        </ul>
        <button className="btn btn-danger w-100 mt-3" onClick={() => handleCloseTrip()}>Cerrar</button>

        <button className="btn btn-light w-100 mt-3" onClick={onBack}>Volver</button>
    </div>

    );
};

