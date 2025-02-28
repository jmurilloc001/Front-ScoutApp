import React, { useEffect, useState } from 'react';
import { addRole, getRoles, removeRole } from '../../services/UserService';
import Swal from 'sweetalert2';

const roles = ['ROLE_COORDI', 'ROLE_SCOUTER'];

export const AsignarRoles = ({ username, user_id }) => {
    const [rolesAsignados, setRolesAsignados] = useState([]);

    const fetchRoles = async () => {
        try {
            const response = await getRoles(username);
            if (response.status === 200) {
                
                setRolesAsignados(response.data.map(rol => rol.name));
            } else {
                Swal.fire('Error', 'No se pudieron obtener los roles', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Error al obtener los roles', 'error');
        }
    };
    useEffect(() => {
        fetchRoles();
    }, [username]);

    const tieneRol = (rol) => rolesAsignados.includes(rol);

    const handlerAddRole = async(rol) => {
        const response = await addRole(user_id,rol);
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Añadido exitosamente',
                text: 'Rol añadido correctamente.',
                showConfirmButton: false,
                timer: 1500
            });
            fetchRoles();
        }else{
           Swal.fire({
            icon: 'error',
            title: 'Error STATUS: ' + response.status,
            text: `Message: ${response.data.message}`,
        });            
        }
    };

    const handlerRemoveRole = async(rol) => {
        const response = await removeRole(user_id,rol);
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Eliminado exitosamente',
                text: 'Rol eliminado correctamente.',
                showConfirmButton: false,
                timer: 1500
            });
            fetchRoles();
        }else{
           Swal.fire({
            icon: 'error',
            title: 'Error STATUS: ' + response.status,
            text: `Message: ${response.data.message}`,
        });            
        }
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

