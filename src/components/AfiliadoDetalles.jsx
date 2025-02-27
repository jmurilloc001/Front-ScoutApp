import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const secciones = ['MANADA', 'SCOUTER', 'ROVER', 'SECCIONSCOUT','UNIDAD','UA','INTENDENCIA','FAMILIA'];
const rolesRequeridos = ['ROLE_ADMIN','ROLE_COORDI'];

export const AfiliadoDetalles = ({ handlerAddAffiliate, affiliate, closeDetails, hasRequiredRoles }) => {
    const [form, setForm] = useState(affiliate);

    const { id, name, lastname, birthday, inscripcionDate, seccion } = form;

    const puedeModificarSeccion = hasRequiredRoles(rolesRequeridos);

    useEffect(() => {
        setForm(affiliate);
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 grow" style={{ minHeight: '100vh' }}>
            <div className="card card-purple text-white mb-4 mt-5" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-header text-center" style={{ padding: '10px' }}>
                    <h3 style={{ margin: '0' }}>Detalles del Afiliado</h3>
                </div>
                <div className="card-body" style={{ padding: '10px' }}>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();

                            if (!name || !lastname || !seccion) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Faltan datos'
                                });                       
                                return;
                            }

                            handlerAddAffiliate(form);
                        }}
                    >
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">Nombre *</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                value={name} 
                                onChange={(event) => setForm({
                                    ...form,
                                    name: event.target.value
                                })} 
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="lastname" className="form-label">Apellido *</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="lastname" 
                                value={lastname} 
                                onChange={(event) => setForm({
                                    ...form,
                                    lastname: event.target.value
                                })} 
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="birthday" className="form-label">Fecha de Nacimiento</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="birthday" 
                                value={birthday ? birthday.split('T')[0] : ''} 
                                onChange={(event) => setForm({
                                    ...form,
                                    birthday: event.target.value
                                })} 
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="inscripcionDate" className="form-label">Fecha de Inscripción</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="inscripcionDate" 
                                value={inscripcionDate ? inscripcionDate.split('T')[0] : ''} 
                                onChange={(event) => setForm({
                                    ...form,
                                    inscripcionDate: event.target.value
                                })} 
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="seccion" className="form-label">Sección *</label>
                            <select 
                                className="form-control" 
                                id="seccion" 
                                value={form.seccion} 
                                onChange={(event) => setForm({
                                    ...form,
                                    seccion: event.target.value
                                })}
                                disabled={!puedeModificarSeccion}
                            >
                                {secciones.map((seccion, index) => (
                                    <option key={index} value={seccion}>
                                        {seccion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-sm btn-purple mt-3 w-100">Guardar</button>
                    </form>
                </div>
                <div className="card-footer text-center" style={{ padding: '10px' }}>
                    <button className="btn btn-purple" onClick={closeDetails}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};
