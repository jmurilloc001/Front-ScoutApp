import { useState } from "react";
import { savePost } from "../../services/PostService";
import Swal from "sweetalert2";

export const CrearPostsFormulario = ({idAffiliado, closeForm, addPost}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('RECEIVE');
    const [email, setEmail] = useState('');
    const [tlf, setTlf] = useState(0);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const affiliado = {
            id: idAffiliado
        }
        const guardarPost = async() => {
            
            const result = await savePost(
                {
                    title: title,
                    description: description,
                    affiliate: affiliado,
                    type: type,
                    email: email,
                    tlf: tlf
                }
            )
            if (result.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Creado exitosamente',
                    text: 'Se ha modificado el post correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                });
                
                console.log(result.data);
                const post = result.data;
                addPost({
                    id: post.id,
                    description: post.description,
                    type: post.type,
                    affiliate: {
                        id: post.affiliateDto.id,
                        name: post.affiliateDto.name,
                        lastname: post.affiliateDto.lastname,
                        seccion: post.affiliateDto.seccion,
                    },
                    title: post.title,
                    email: email,
                    tlf: tlf
                });
                closeForm();           
            }else {
                console.log("Error al guardar el post: " + JSON.stringify(result.data));
                Swal.fire({
                    icon: 'error',
                    title: 'Error Status: ' + result.status,
                    text: 'Error al guardar el post en la base de datos'
                });               
            }
        }

        guardarPost();
        console.log({ title, description, type, email, tlf });
    };

    return (
        <div className="slide-in-left">
            <div className="d-flex justify-content-center align-items-center">
                <div className="container" style={{ maxWidth: '600px', backgroundColor: '#6f42c1', borderRadius: '10px', padding: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' }}>
                    <h2 className="text-center mb-4 text-white">Crear Post</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title" className="text-white">Título</label>
                            <input
                                type="text"
                                className="form-control text-white bg-dark"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="text-white">Descripción</label>
                            <textarea
                                className="form-control text-white bg-dark"
                                id="description"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="type" className="text-white">Tipo</label>
                            <select
                                className="form-control text-white bg-dark"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value="RECEIVE">NECESITO</option>
                                <option value="GIVE">DOY</option>
                            </select>
                        </div>
                        <div className="form-group">
                        <label htmlFor="email" className="text-white">Email</label>
                        <input
                            type="email"
                            className="form-control text-white bg-dark"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone" className="text-white">Teléfono</label>
                            <input
                                type="tel"
                                className="form-control text-white bg-dark"
                                id="phone"
                                value={tlf}
                                onChange={(e) => setTlf(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Crear</button>
                    </form>
                </div>
            </div>
        </div>
    );
};