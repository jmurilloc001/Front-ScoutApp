import React from 'react';

export const DetallePost = ({ post }) => {
    return (
        <div className='slide-in-right'>
            <div className="card" style={{ backgroundColor: 'transparent', borderColor: '#6f42c1' }}>
                <div className="card-header" style={{ backgroundColor: '#6f42c1', color: 'white' }}>
                    {post.title}
                </div>
                <div className="card-body" style={{color:'white', backgroundColor:'black'}}>
                    <p className="card-text"><strong>Descripción:</strong> {post.description}</p>
                    <p className="card-text"><strong>Creado por:</strong> {post.affiliate.name}</p>
                    {post.email && <p className="card-text"><strong>Email:</strong> {post.email}</p>}
                    {post.phone && <p className="card-text"><strong>Teléfono:</strong> {post.tlf}</p>}
                </div>
            </div>
        </div>
    );
}