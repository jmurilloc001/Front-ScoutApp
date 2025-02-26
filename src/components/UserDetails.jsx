import { useEffect, useState } from "react";
import { getUserByUsername } from "../services/UserService";
import Swal from "sweetalert2";
import Particles from "./Particles/Particles";
import { CambiarPassword } from "./UserUtil/CambiarPassword";
import { CambiarUsername } from "./UserUtil/CambiarUsername";

export const UserDetails = ({ handlerCloseUserDetails }) => {
    const [userInMoment, setUserInMoment] = useState({});
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeUsername, setShowChangeUsername] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem('user'));
                const result = await getUserByUsername(user.username);
                if (result.status === 200) {
                    setUserInMoment({ ...result.data });
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

    const handleAssignAffiliate = () => {
        // Lógica para asignar un afiliado
        Swal.fire({
            title: 'Asignar Afiliado',
            text: 'Funcionalidad para asignar un afiliado.',
            icon: 'info'
        });
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
                    <button className="btn btn-sm btn-primary me-2" onClick={handleAssignAffiliate}>Asignar afiliado</button>
                    <div className="text-center mt-4">
                        <button className="btn btn-danger mt-4" onClick={handlerCloseUserDetails}>Cerrar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

