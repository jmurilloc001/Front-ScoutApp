import React, { useState } from "react";

const NewFormModal = ({ show, onCreate }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        urlImage: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.description && formData.date) {
            onCreate(formData);
            setFormData({ title: "", description: "", date: "", urlImage: "" });
            show();
        }
    };

    if (!show) return null; // No mostrar el modal si `show` es `false`

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="text-center">📝 Crear Nueva Noticia</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea 
                            className="form-control" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Imagen (URL)</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="urlImage" 
                            value={formData.urlImage} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-success">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewFormModal;