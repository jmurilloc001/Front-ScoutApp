import React, { useEffect, useState } from 'react';
import { getRoles } from '../../services/UserService';
import Swal from 'sweetalert2';

const roles = ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_COORDI', 'ROLE_SCOUTER'];

export const AsignarRoles = ({ username }) => {
    const [rolesAsignados, setRolesAsignados] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getRoles(username);
                if (response.status === 200) {
                    console.log(response.data.map(rol => rol.name));
                    
                    setRolesAsignados(response.data.map(rol => rol.name));
                } else {
                    Swal.fire('Error', 'No se pudieron obtener los roles', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'Error al obtener los roles', 'error');
            }
        };

        fetchRoles();
    }, [username]);

    const tieneRol = (rol) => rolesAsignados.includes(rol);

    const handlerAddRole = (rol) => {
        // Lógica para añadir el rol
    };

    const handlerRemoveRole = (rol) => {
        // Lógica para eliminar el rol
    };

    return (
        <div className="container mt-3">
            <ul className="list-group">
                {roles.map((rol) => (
                    <li key={rol} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white">
                        {rol}
                        {tieneRol(rol) ? (
                            <button className="btn btn-danger" onClick={() => handlerRemoveRole(rol)}>Eliminar</button>
                        ) : (
                            <button className="btn btn-success" onClick={() => handlerAddRole(rol)}>Añadir</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

