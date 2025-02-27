import { useEffect, useState } from "react";
import { getAffiliates, remove, save, update } from "../services/AffiliateService";
import Particles from "./Particles/Particles";
import { AfiliadoDetalles } from "./AfiliadoDetalles";
import Swal from "sweetalert2";

const emptyAffiliate = {
    id: 0, name: '', lastname:'', birthday:'', inscripcionDate:'', seccion:'FAMILIA'
}

export const AfiliadosList = ({ closeAffiliates, hasRequiredRoles }) => {
    const [affiliates, setAffiliates] = useState([]);
    const [affiliateDetails, setAffiliateDetails] = useState(null);

    const handlerAddAffiliate = async (affiliate) => {
        if (affiliate.id > 0) {
            try {
                const response = await update(affiliate);
                if (response.status === 201) {
                    setAffiliates((prevAffiliates) =>
                        prevAffiliates.map((a) => (a.id === affiliate.id ? response.data : a))
                    );
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualización exitosa',
                        text: 'Afiliado actualizado correctamente.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Error al actualizar el afiliado: ${response.status}`
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al actualizar el afiliado: ${error.message}`
                });
            }
        } else { //Crear el afiliado
            try {
                const response = await save(affiliate);
                if (response.status === 201) {
                    setAffiliates((prevAffiliates) => [...prevAffiliates, response.data]);
                    Swal.fire({
                        icon: 'success',
                        title: 'Guardado exitoso',
                        text: 'Afiliado añadido correctamente.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Error al guardar el afiliado: ${response.status}`
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al guardar el nuevo afiliado: ${error.message}`
                });
            }
        }
    };

    const handleDeleteAffiliate = async (id) => {
        try {
            const response = await remove(id);
            if (response.status === 200) {
                setAffiliates((prevAffiliates) => prevAffiliates.filter((a) => a.id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminación exitosa',
                    text: 'Afiliado eliminado correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al eliminar el afiliado: ${response.status}`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al eliminar el afiliado: ${error.message}`,
            });
        }
    };

    const confirmDeleteAffiliate = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteAffiliate(id);
            }
        });
    };

    useEffect(() => {
        const fetchAffiliates = async () => {
            const result = await getAffiliates();
            if (result.status === 200) {
                setAffiliates(result.data);
            } else {
                console.log("Error al obtener los afiliados: " + JSON.stringify(result.data));
            }
        };

        fetchAffiliates();
    }, []); // Asegúrate de que el array de dependencias está vacío

    const handleDetailsClick = (affiliate) => {
        setAffiliateDetails({...affiliate});
    };

    const closeDetails = () => {
        setAffiliateDetails(null);
    };

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
            {affiliateDetails ? (
                <AfiliadoDetalles affiliate={affiliateDetails} closeDetails={closeDetails} handlerAddAffiliate={handlerAddAffiliate} hasRequiredRoles={hasRequiredRoles}/>
            ) : (
                <div className="container mt-5 text-white p-4">
                    <h2 className="text-center mt-3 mb-4">Lista de Afiliados</h2>
                    <div className="text-center mb-4">
                        <button className="btn btn-success" onClick={() => handleDetailsClick(emptyAffiliate)}>Nuevo</button>
                    </div>
                    {affiliates.length > 0 ? (
                        <ul className="list-group">
                            {affiliates.map((affiliate, index) => (
                                <li key={index} className="list-group-item bg-dark text-white border-secondary mb-3 rounded shadow-sm grow">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-1">{affiliate.name}</h5>
                                            <p className="mb-1">Apellidos: {affiliate.lastname}</p>
                                            <p className="mb-1">Sección: {affiliate.seccion}</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-purple me-2" onClick={() => handleDetailsClick(affiliate)}>Detalles</button>
                                            <button className="btn btn-danger" onClick={() => confirmDeleteAffiliate(affiliate.id)}>Borrar</button>
                                        </div>
                                    </div>
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
            )}
        </>
    );
};

