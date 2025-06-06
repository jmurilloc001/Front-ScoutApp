import React, { useEffect, useState } from 'react';
import { formatDate, getCurrentDate } from "../../Utils/DateFormat";
import Particles from "../Particles/Particles";
import { getAllProductsPage, removeProduct, saveProduct, updateProduct } from '../../services/ProductService';
import Swal from 'sweetalert2';
import { BackgroundParticles } from '../CommonsComponents';

export const ListarMateriales = ({ closeListMaterials }) => {
    const [materials, setMaterials] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMaterial, setNewMaterial] = useState({ name: '', price: '0', stock: '0', lastpurchase: getCurrentDate() });
    const [editingMaterial, setEditingMaterial] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(8);

    useEffect(() => {
        const fetchMaterials = async () => {
            const response = await getAllProductsPage(page, size);
            if (response.status === 200) {
                setMaterials(response.data);
                setTotalPages(response.totalPages);
            } else {
                console.log('Error fetching materials:', response.data);
            }
        };

        fetchMaterials();
    }, [page,size]);

    const validateForm = () => {
        const { name, price, stock, lastpurchase } = newMaterial;
        if (!name || !price || !stock || !lastpurchase) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos antes de guardar.'
            });
            return false;
        }
        const date = new Date(lastpurchase);
        if (isNaN(date.getTime())) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresa una fecha válida.'
            });
            return false;
        }
        return true;
    };

    const handleSaveMaterial = async () => {
        if (validateForm()) {
            if (editingMaterial) {
                const result = await updateProduct({ ...newMaterial, id: editingMaterial.id });
                if (result.status === 201) {
                    setMaterials(materials.map(material => 
                        material.id === editingMaterial.id ? { ...result.data } : material
                    ));
                    Swal.fire({
                        icon: 'success',
                        title: 'Modificado exitosamente',
                        text: 'Se ha modificado el producto correctamente.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setEditingMaterial(null);
                } else {
                    console.log("Error al modificar el material: " + JSON.stringify(result.data));
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Status: ' + result.status,
                        text: 'Error al modificar el material en la base de datos'
                    });
                }
            } else {
                const result = await saveProduct({ ...newMaterial });
                if (result.status === 201) {
                    setMaterials([...materials, { ...result.data }]);
                    Swal.fire({
                        icon: 'success',
                        title: 'Añadido exitosamente',
                        text: 'Se ha añadido el producto correctamente.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    console.log("Error al guardar el material: " + JSON.stringify(result.data));
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Status: ' + result.status,
                        text: 'Error al guardar el material en la base de datos'
                    });
                }
            }
            setShowAddForm(false);
            setNewMaterial({ name: '', price: '0', stock: '0', lastpurchase: getCurrentDate() });
        }
    };

    const handleEditMaterial = (material) => {
        setNewMaterial(material);
        setEditingMaterial(material);
        setShowAddForm(true);
    };

    const handleDeleteMaterial = (id) => {
        const confirmDeleteMaterial = (id) => {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo'
            }).then((result) => {
                if (result.isConfirmed) {
                    borrarMaterial(id);
                }
            });
        };

        const borrarMaterial = async (id) => {
            const result = await removeProduct(id);
            if (result.status === 200) {
                setMaterials(materials.filter(material => material.id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Borrado exitosamente',
                    text: 'Se ha borrado el producto correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                console.log("Error al borrar el material: " + JSON.stringify(result.data));
                Swal.fire({
                    icon: 'error',
                    title: 'Error Status: ' + result.status,
                    text: 'Error al borrar el material en la base de datos'
                });
            }
        };

        confirmDeleteMaterial(id);
    };

    return (
        <>
            <div className="squares-background" style={{ backgroundColor: '#39045c', minHeight: '100vh' }}>
                <BackgroundParticles></BackgroundParticles>
            </div>
            
            <div className='slide-in-left' style={{ marginTop: '6%' }}>
            <div className="container mt-5">
                <h2 className="text-white">Lista de material</h2>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Última compra</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map(material => (
                            <tr key={material.id}>
                                <td>{material.name}</td>
                                <td>{material.price} /u €</td>
                                <td>{material.stock} unidades</td>
                                <td>{material.lastpurchase !== 'N/A' && formatDate(material.lastpurchase)}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleEditMaterial(material)} style={{margin:'3%'}}>Modificar</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteMaterial(material.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)} style={{ margin: '5px' }}>
                        {!showAddForm ? 'Añadir Material' : 'Cerrar Formulario'}
                    </button>
                    <button className="btn btn-secondary" onClick={closeListMaterials}>Cerrar</button>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-outline-primary" onClick={() => setPage(page - 1)} disabled={page === 0}>
                        Anterior
                    </button>
                    <span className="mx-3" style={{color:'white'}}>Página {page + 1} de {totalPages}</span>
                    <button className="btn btn-outline-primary" onClick={() => setPage(page + 1)} disabled={page + 1 === totalPages}>
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
            {showAddForm && (
                <div className='slide-in-right d-flex justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
                    <div className="mt-2" style={{ width: '50%' }}>
                        <h3 className="text-white">{editingMaterial ? 'Modificar Material' : 'Añadir Nuevo Material'}</h3>
                        <form>
                            <div className="form-group">
                                <label className="text-white">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white"
                                    value={newMaterial.name}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-white">Precio</label>
                                <input
                                    type="number"
                                    className="form-control bg-dark text-white"
                                    value={newMaterial.price}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, price: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-white">Stock</label>
                                <input
                                    type="number"
                                    className="form-control bg-dark text-white"
                                    value={newMaterial.stock}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, stock: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-white">Última compra</label>
                                <input
                                    type="datetime-local"
                                    className="form-control bg-dark text-white"
                                    value={newMaterial.lastpurchase}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, lastpurchase: e.target.value })}
                                    style={{ color: '#ffffff', backgroundColor: '#333', borderColor: '#555' }}
                                />
                            </div>
                            <button type="button" className="btn btn-secondary mt-3" onClick={handleSaveMaterial}>
                                {editingMaterial ? 'Guardar Cambios' : 'Guardar'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};