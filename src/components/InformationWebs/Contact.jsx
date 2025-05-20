import { BackButton } from "../CommonsComponents";
import '../../css/Contact.css'

export const Contact = ({onBack}) => {
    return (
        <>
        <div className="contacto-container">
            <div className="container py-5">
                <h1 className="text-center mb-4">📬 Contáctanos</h1>
                <p className="text-center mb-5">
                    Si tienes alguna pregunta o deseas unirte a nuestro grupo scout, no dudes en escribirnos.
                </p>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombre" placeholder="Tu nombre" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                <input type="email" className="form-control" id="email" placeholder="Tu correo electrónico" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                                <textarea className="form-control" id="mensaje" rows="4" placeholder="Escribe tu mensaje"></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <BackButton onBack={onBack}></BackButton>
        </>
    );
}