import React, { useState, useEffect } from 'react';
import { getAllNewsPaginable } from '../../services/NewService';
import Particles from '../Particles/Particles';
import './../../css/Novedades.css'; // Importa el archivo CSS

const Novedades = () => {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [sort, setSort] = useState("");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const result = await getAllNewsPaginable(size, page, sort);
                if (result.status === 200) {
                    setNews(result.data.content);
                } else {
                    console.error("Error consiguiendo las noticias. Status: " + result.status);
                }
            } catch (error) {
                console.error("Error al obtener las noticias:", error);
            }
        };

        fetchNews();
    }, [size, page, sort]);

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
                <h1 className="text-center mb-4">🧭 Novedades Marwan</h1>
                <div className="row">
                    {news.map(novedad => (
                        <div key={novedad.id} className="col-md-4">
                            <div className="card h-100">
                                <img src={novedad.image} className="card-img-top" alt={novedad.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{novedad.title}</h5>
                                    <p className="card-text">{novedad.description}</p>
                                    <p className="text-muted"><small><b>{novedad.date}</b></small></p>
                                    <button className="btn btn-success">Leer más</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Novedades;