import { useEffect, useState } from "react";
import { getAffiliates } from "../services/UserService";
import Particles from "./Particles/Particles";

export const AfiliadosList = ({ closeAffiliates }) => {
    const [affiliates, setAffiliates] = useState([]);

    useEffect(() => {
        const fetchAffiliates = async () => {
            const result = await getAffiliates();
            if (result.status === 200) {
                console.log(result.data); // Verifica la estructura de los datos
                setAffiliates(result.data);
            } else {
                console.log("Error al obtener los afiliados: " + JSON.stringify(result.data));
            }
        };

        fetchAffiliates();
    }, []); // Asegúrate de que el array de dependencias está vacío

    return (
        <>
            <div className="squares-background">
                <Particles
                    particleColors={['#39045c', '#ffffff']}
                    particleCount={500}
                    particleSpread={10}
                    speed={0.3}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>
            <div className="container mt-5 text-white p-4">
                <h2 className="text-center mt-3 mb-4">Lista de Afiliados</h2>
                {affiliates.length > 0 ? (
                    <ul className="list-group">
                        {affiliates.map((affiliate, index) => (
                            <li key={index} className="list-group-item bg-dark text-white border-secondary mb-3 rounded shadow-sm">
                                {affiliate.enabled && 
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-1">{affiliate.username}</h5>
                                        <p className="mb-1">Nombre: {affiliate.name}</p>
                                        <p className="mb-1">Apellido: {affiliate.lastname}</p>
                                    </div>
                                    <span className="badge bg-success">Habilitado</span>
                                </div>
                                }
                            </li>
                        ))}
                    </ul>
                ) : (
                    <h1 className="text-center mt-5">NO SE HA PODIDO TRAER EL CONTENIDO</h1>
                )}
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={closeAffiliates}>Salir</button>
                </div>
            </div>
        </>
    );
};

