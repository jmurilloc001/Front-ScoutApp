import React, { useState, useEffect } from 'react';
import { getAllNewsPaginable, removeNew, saveNew } from '../../services/NewService';
import Particles from '../Particles/Particles';
import './../../css/Novedades.css';
import NewForm from './NewForm';
import Swal from 'sweetalert2';
import { BackButton } from '../CommonsComponents';

const Novedades = ({ hasRole, handleGoBack }) => {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [sort, setSort] = useState("");
    const [reload, setReload] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showCreateNew, setShowCreateNew] = useState(false);

    const rolesRequeridos = ['ROLE_SCOUTER'];
    const [canCreate, setCanCreate] = useState(false);

    const handleCreateNews = async (newItem) => {
        try {
            const result = await saveNew({ ...newItem });
            if (result.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Añadida novedad',
                    text: 'Añadida correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                });
                setReload(prevState => prevState+1)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al agregar la noticia con status: ${result.status}`
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al agregar la noticia con error: ${error.message}`
            });
        }
    };

    const handleDeleteNews = async (id) => {
        try {
            const result = await removeNew(id); // Llama al servicio para borrar la noticia
            if (result.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminada',
                    text: 'La noticia ha sido eliminada correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                });
                if (news.length === 1) {
                    setNews([])
                }
                 setReload(prevState => prevState+1)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al eliminar la noticia con status: ${result.status}`
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al eliminar la noticia con error: ${error.message}`
            });
        }
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const result = await getAllNewsPaginable(size, page, sort);
                if (result.status === 200) {
                    setNews(result.data.content);
                    setTotalPages(result.data.totalPages);
                } else {
                    console.error("Error consiguiendo las noticias. Status: " + result.status);
                }
            } catch (error) {
                console.error("Error al obtener las noticias:", error);
            }
        };

        setCanCreate(hasRole(rolesRequeridos));
        fetchNews();
    }, [size, page, sort, reload]);

    const handlerShowNewForm = () => {
        setShowCreateNew(prevState => !prevState);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                backgroundColor: '#39045c'
            }}>
                <Particles
                    particleColors={['#ffffff']}
                    particleCount={500}
                    particleSpread={10}
                    speed={0.3}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            <div className="container mt-5 novedades-container">
                {canCreate && (
                    <button
                        type="button"
                        className="btn btn-success rounded-circle"
                        style={{
                            backgroundColor: 'green',
                            position: 'fixed',
                            bottom: '5vh',
                            right: '5vw',
                            width: '6vw',
                            height: '6vw',
                            fontSize: '3vw',
                            lineHeight: '6vw',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.2)'
                        }}
                        onClick={handlerShowNewForm}
                    >
                        {!showCreateNew ? '+' : '×'}
                    </button>
                )}
                {
                    showCreateNew && <NewForm show={handlerShowNewForm} onCreate={handleCreateNews}></NewForm>
                }
                {
                    !showCreateNew && <>
                        <h1 className="text-center mb-4">🧭 Novedades Marwan</h1>
                        <div className="row">
                            {news.map(novedad => (
                                <div key={novedad.id} className="col-md-4">
                                    <div className="card h-100">
                                        <img
                                        src={novedad.urlImage|| "https://via.placeholder.com/200"} 
                                        className="card-img-top" 
                                        alt={novedad.title}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{novedad.title}</h5>
                                            <p className="card-text">{novedad.description}</p>
                                            <p className="text-date"><small><b>{novedad.date}</b></small></p>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteNews(novedad.id)}
                                            >
                                                Borrar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <button
                                className="btn btn-secondary me-2"
                                onClick={handlePreviousPage}
                                disabled={page === 0}
                            >
                                Volver
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleNextPage}
                                disabled={page >= totalPages - 1}
                            >
                                Siguiente
                            </button>
                        </div>
                        <BackButton onBack={handleGoBack}></BackButton>

                    </>
                }
            </div>
        </>
    );
};

export default Novedades;