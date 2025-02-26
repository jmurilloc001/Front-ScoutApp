import { useState } from "react";
import Swal from "sweetalert2";
import { getIdByUsername, getUserByUsername, updatePassword } from "../../services/UserService";

export const CambiarPassword = () => {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (form.newPassword !== form.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las nuevas contraseñas no coinciden.',
            });
            return;
        }
        
        if (form.newPassword < 4) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La longitud tiene que ser mayor a 4 '
            });
            return;
        }

        const currentUser = JSON.parse(sessionStorage.getItem('user'));
        console.log(currentUser);
        
        const id = await getIdByUsername(currentUser.username);
        const response = await updatePassword(form.newPassword,id);

        if (response.status === 201){
            Swal.fire({
                icon: 'success',
                title: 'Contraseña cambiada',
                text: 'La contraseña se ha cambiado correctamente. VUELVE A INICIAR SESION',
            });
        }else{
             Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se ha podido modificar la contraseña. Status: ' + response.status,
            });
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Cambiar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">Contraseña Actual</label>
                    <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Nueva Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Cambiar Contraseña</button>
                </div>
            </form>
        </div>
    );
};
