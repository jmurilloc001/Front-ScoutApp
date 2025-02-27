import { useEffect, useState } from "react";
import { getUserByUsername, putAffiliate } from "../services/UserService";
import Swal from "sweetalert2";
import Particles from "./Particles/Particles";
import { CambiarPassword } from "./UserUtil/CambiarPassword";
import { CambiarUsername } from "./UserUtil/CambiarUsername";
import { AfiliadoDetalles } from "./AfiliadoDetalles";
import { getAffiliateByName, save, update } from "../services/AffiliateService";

const emptyAffiliate = {
    id: 0, name: '', lastname:'', birthday:'', inscripcionDate:'', seccion:'FAMILIA'
}

export const UserDetails = ({ handlerCloseUserDetails, hasRequiredRoles }) => {
    const [userInMoment, setUserInMoment] = useState({});
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeUsername, setShowChangeUsername] = useState(false);
    const [showCreateAffiliate, setShowCreateAffiliate] = useState(false);
    const [affiliate, setAffiliate] = useState({...emptyAffiliate})
    
    useEffect(() => {
        const fetchUserDetails = async () => {
            
            try {
                const user = JSON.parse(sessionStorage.getItem('user'));
                const result = await getUserByUsername(user.username);
                
                if (result.status === 200) {
                    setUserInMoment({ ...result.data });
                    if (result.data.name != null) { //Si tiene nombre, es decir, tiene affiliado
                        
                        const resultAffiliate = await getAffiliateByName(result.data.name);
                        
                        if (resultAffiliate.status === 200) {
                            setAffiliate(resultAffiliate.data);
                            
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `Error al buscar el afiliado relacionado: ${result.status}`
                            });
                        }
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Error al buscar al usuario: ${result.status}`,
                    });
                    handlerCloseUserDetails();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al buscar al usuario: ${error.message}`,
                });
                handlerCloseUserDetails();
            }
        };

        fetchUserDetails();
    }, [handlerCloseUserDetails]);

    const handleChangePassword = () => {
        if (showChangePassword) {
            setShowChangePassword(false);
        }else{
            setShowChangePassword(true);
        }
        
    };

    const handleChangeUsername = () => {
        if (showChangeUsername) {
            setShowChangeUsername(false);
        }else {
            setShowChangeUsername(true);
        }
    };

    const closeDetails = () => {
        setShowCreateAffiliate(false);
    };

    const handleCreateAffiliate = () => {
        if (showCreateAffiliate) {
            setShowCreateAffiliate(false);
        }else{
            setShowCreateAffiliate(true);
        }
    };

    const handlerAddAffiliateInView = async(newAffiliate) => { 
        if (userInMoment.name === null) {
            const resultSaveAffiliate = await save({...newAffiliate})
        if (resultSaveAffiliate.status === 201) {
            setAffiliate({...newAffiliate})
                Swal.fire({
                    icon: 'success',
                    title: 'Añadido',
                    text: `Se ha añadido correctamente al afiliado: ${resultSaveAffiliate.data.name}`
                });
                const result = await putAffiliate(userInMoment.id, resultSaveAffiliate.data.id)
                if (result.status === 201) {
                    setUserInMoment({
                        ...userInMoment,
                        name: newAffiliate.name,
                        lastname: newAffiliate.lastname
                    })
                    Swal.fire({
                        icon: 'success',
                        title: 'Relacionado',
                        text: `Se ha relaciona correctamente al afiliado con el usuario`
                    });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Error al relacionar al afiliado con el usuario. Status: ${result.status}`
                    });
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al guardar al afiliado. Status: ${resultSaveAffiliate.status}`
                });
                return;
            }
        }else{
            //tengo que modificar al afiliado porque ya existe
            const responseModAfiliado = await update({...newAffiliate,
                id: affiliate.id
            })
            if (responseModAfiliado.status === 201) {
                setUserInMoment({
                    ...userInMoment,
                    name: newAffiliate.name,
                    lastname: newAffiliate.lastname
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Relacionado',
                    text: `Se ha modificado correctamente los datos`
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al actualizar los datos. Status: ${responseModAfiliado.status}`
                });
            }
        }
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
            <div className="container mt-5 text-white p-4">
                <h2 className="text-center mt-3 mb-4">Detalles del Usuario</h2>
                <table className="table table-dark table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">Username</th>
                            <td>{userInMoment.username}</td>
                        </tr>
                        <tr>
                            <th scope="row">Nombre</th>
                            <td>{userInMoment.name || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Apellido</th>
                            <td>{userInMoment.lastname || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Roles</th>
                            <td>
                                {userInMoment.roles ? userInMoment.roles.map((role, index) => (
                                    <span key={index} className="badge bg-primary me-1">{role.name}</span>
                                )) : 'N/A'}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Enabled</th>
                            <td>{userInMoment.enabled ? 'Sí' : 'No'}</td>
                        </tr>
                    </tbody>
                </table>

                {
                    showChangePassword && <CambiarPassword ></CambiarPassword>
                }
                {
                    showChangeUsername && <CambiarUsername ></CambiarUsername>
                }
                {
                    showCreateAffiliate && <AfiliadoDetalles handlerAddAffiliate={handlerAddAffiliateInView} closeDetails={closeDetails} affiliate={affiliate} hasRequiredRoles={hasRequiredRoles} ></AfiliadoDetalles>
                }

                <div className="text-center mt-4">
                    <button className="btn btn-sm btn-primary me-2" onClick={handleChangePassword}>
                        {
                            showChangePassword ? <>Cerrar cambiar contraseña</> : <>Cambiar contraseña</>
                        }
                    </button>
                    <button className="btn btn-sm btn-primary me-2" onClick={handleChangeUsername}>
                        {
                            showChangeUsername ? <>Cerrar cambiar username</> : <>Cambiar username</>
                        }
                    </button>
                    {
                        !showCreateAffiliate &&
                        <div className="text-center mt-4">
                            <button className="btn btn-success mt-3" onClick={handleCreateAffiliate}>Asignar otros datos</button>
                        </div>
                    }
                    
                    <div className="text-center mt-3">
                        <button className="btn btn-danger mt-4" onClick={handlerCloseUserDetails}>Cerrar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

