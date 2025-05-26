import { useState } from "react";
import { BackButton } from "../CommonsComponents";
import '../../css/Contact.css';
import Swal from "sweetalert2";
import { sendEmail } from "../../services/EmailService";

export const Contact = ({ onBack }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handlerSend = async({nombre, email, mensaje}) => {
        try {
                const result = await sendEmail({ nombre, email, mensaje });
                if (result.status === 200) {
                    Swal.fire({
                    icon: 'success',
                    title: 'Notificado',
                    text: 'Pronto tendrá una respuesta en el correo electrónico',
                    showConfirmButton: false,
                    timer: 3000
                });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Error al mandar el correo con status: ${result.status}`
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al mandar el correo con error: ${error.message}`
                });
            }
    }
    const handleSubmit = (e) => {
        e.preventDefault(); 
        handlerSend({...formData})
        console.log("Datos enviados:", formData);
        
    };

    return (
        <>
        <div className="contacto-container">
            <div className="container py-5">
                <h1 className="text-center mb-4">📬 <b>Contáctanos</b></h1>
                <p className="text-center mb-5">
                    Si tienes alguna pregunta o deseas unirte a nuestro grupo scout, no dudes en escribirnos.
                </p>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombre" placeholder="Tu nombre" value={formData.nombre} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                <input type="email" className="form-control" id="email" placeholder="Tu correo electrónico" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                                <textarea className="form-control" id="mensaje" rows="4" placeholder="Escribe tu mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <BackButton onBack={onBack} />
        </div>
        </>
    );
}
