import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllUsers, getUserById, removeUser } from "../../services/UserService";
import Particles from "../Particles/Particles";
import { AsignarAfiliado } from "./AsignarAfiliado";
import { AsignarRoles } from "./AsignarRoles";

export const AdministrarUsers = ({ closeManageUsers }) => {
    const [users, setUsers] = useState([]);
    const [showPutAffiliate, setShowPutAffiliate] = useState(false);
    const [showAddRole, setShowAddRole] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [selectedUserUsername, setSelectedUserUsername] = useState("");


    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    
    const filteredUsers = users.filter(user => user.username !== 'admin' && user.username !== currentUser.username);

    const handlerPutAffiliate = (user_id) => {
        if (showPutAffiliate) {
            setShowPutAffiliate(false);
        }else{
            setSelectedUserId(user_id);
            setShowPutAffiliate(true);
        }
    };

    const handlerAddRole = (username, user_id) => {
        setSelectedUserUsername(username);
        setSelectedUserId(user_id);
        if(showAddRole){
            setShowAddRole(false);
        }else{
            setShowAddRole(true);
        }
    };
    

    const handleDeleteUser = async (id) => {
        try {
            const response = await removeUser(id);
            if (response.status === 200) {
                setUsers((prevUser) => prevUser.filter((a) => a.id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminación exitosa',
                    text: 'Usuario eliminado correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al eliminar el user: ${response.status}`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al eliminar el user: ${error.message}`,
            });
        }
    };

    const confirmDeleteUser = (id) => {
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
                handleDeleteUser(id);
            }
        });
    };

    const fetchAffiliates = async () => {
        const result = await getAllUsers();
        if (result.status === 200) {
            setUsers(result.data);
        } else {
            console.log("Error al obtener los usuarios: " + JSON.stringify(result.data));
        }
    };

    useEffect(() => {
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
                {
                    showPutAffiliate && <AsignarAfiliado getIdUserInMoment={selectedUserId} fetchAffiliates={fetchAffiliates}></AsignarAfiliado>
                }
                {
                    showAddRole && <AsignarRoles username={selectedUserUsername} user_id={selectedUserId}></AsignarRoles>
                }
                    <h2 className="text-center mt-3 mb-4">Lista de Usuarios</h2>
                    <div className="text-center mb-4">
                    </div>
                    {users.length > 0 ? (
                        <ul className="list-group">
                            {filteredUsers.map((user, index) => (
                                <li key={index} className="list-group-item bg-dark text-white border-secondary mb-3 rounded shadow-sm grow">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-1">{user.username}</h5>
                                            <p className="mb-1">id: {user.id}</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            {
                                                !user.name ? 
                                                <button className="btn btn-sm btn-primary me-2" onClick={ () => handlerPutAffiliate(user.id)}>
                                                {
                                                    showPutAffiliate ? <>Cerrar asignar afiliado</> : <>Asignar afiliado</>
                                                }
                                                </button>
                                                :
                                                <span className="badge bg-success me-4">Asignado</span>
                                            }
                                            
                                            <button className="btn btn-purple me-2" onClick={() => handlerAddRole(user.username, user.id)}>
                                                {
                                                    showAddRole ? <>Cerrar roles</> :<>Asignar Roles</>
                                                }
                                            </button>
                                            <button className="btn btn-danger" onClick={() => confirmDeleteUser(user.username, user.id)}>Borrar</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h1 className="text-center mt-5">NO SE HA PODIDO TRAER EL CONTENIDO O NO HAY USUARIOS</h1>
                    )}
                    <div className="text-center mt-4">
                        <button className="btn btn-primary" onClick={closeManageUsers}>Salir</button>
                    </div>
                </div>
        </>
    );
};
