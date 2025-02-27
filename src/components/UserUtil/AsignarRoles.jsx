import React from 'react';

const roles = ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_COORDI', 'ROLE_SCOUTER'];

export const AsignarRoles = ({ hasRequiredRoles }) => {
    return (
        <div className="container mt-3">
            <ul className="list-group">
                {roles.map((rol) => (
                    <li key={rol} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white">
                        {rol}
                        {hasRequiredRoles([rol]) ? (
                            <button className="btn btn-danger">Eliminar</button>
                        ) : (
                            <button className="btn btn-success">Añadir</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
