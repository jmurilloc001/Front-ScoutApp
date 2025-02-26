import { useState } from "react";
import Swal from "sweetalert2";
import { getIdByUsername, updateUsername } from "../../services/UserService";

export const CambiarUsername = () => {
    const [form, setForm] = useState({
        currentUsername: '',
        newUsername: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const changeUsernameDb = async (username,id) => {
        const response = await updateUsername(username,id);
        
        return response;
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const currentUser = JSON.parse(sessionStorage.getItem('user'));
    
        if (form.currentUsername === currentUser.username) {
            
            const caracteresProhibidos = ["`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
            let contieneCaracterProhibido = false;
    
            for (let caracter of caracteresProhibidos) {
                if (form.newUsername.includes(caracter)) {
                    contieneCaracterProhibido = true;
                    break;
                }
            }
    
            if (form.newUsername.length < 4 || form.newUsername.length > 12 || contieneCaracterProhibido) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El username debe tener [4-12] caracteres y no debe contener caracteres extraños.',
                });
            } else {
                try {
                    const id = await getIdByUsername (form.currentUsername); 
                    console.log("EL ID ES: " + id);
                    
                    if (id !== 0) {
                        const response = await changeUsernameDb(form.newUsername, id);
                        if (response.status === 201) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Nombre de Usuario Cambiado',
                                text: 'El nombre de usuario se ha cambiado correctamente. VUELVE A INICIAR SESIÓN',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'No se ha podido modificar el username. Status: ' + response.status,
                            });
                        }
                    }
                } catch (error) {
                    console.error("Error al cambiar el username: ", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al cambiar el username.',
                    });
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre actual no coincide con tu nombre de usuario.',
            });
        }
    };
    
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Cambiar Nombre de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="currentUsername" className="form-label">Nombre de Usuario Actual</label>
                    <input
                        type="text"
                        className="form-control"
                        id="currentUsername"
                        name="currentUsername"
                        value={form.currentUsername}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newUsername" className="form-label">Nuevo Nombre de Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="newUsername"
                        name="newUsername"
                        value={form.newUsername}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Cambiar Nombre de Usuario</button>
                </div>
            </form>
        </div>
    );
};
