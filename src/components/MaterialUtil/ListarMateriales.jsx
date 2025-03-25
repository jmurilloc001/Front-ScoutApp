import React, { useEffect, useState } from 'react';
import { formatDate, getCurrentDate } from "../../Utils/DateFormat";
import Particles from "../Particles/Particles";
import { getAllProducts, saveProduct } from '../../services/ProductService';
import Swal from 'sweetalert2';

export const ListarMateriales = ({ closeListMaterials }) => {
    const [materials, setMaterials] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMaterial, setNewMaterial] = useState({ name: '', price: '0', stock: '0', lastpurchase: getCurrentDate() });

    useEffect(() => {
        const fetchMaterials = async () => {
            const result = await getAllProducts();
            if (result.status === 200) {
                setMaterials(result.data);
            } else {
                console.log("Error al obtener los materiales: " + JSON.stringify(result.data));
                Swal.fire({
                    icon: 'error',
                    title: 'Error Status: ' + result.status,
                    text: 'Error al obtener los materiales de la base de datos'
                });
            }
        };

        fetchMaterials();
    }, []);

    const handleAddMaterial = () => {
        
        const guardarNuevoMaterial = async () => {
            //Guardo el nuevo material en la base de datos
            if (validateForm()) {
                const result = await saveProduct({...newMaterial});
                if (result.status === 201) {
                    setMaterials([...materials, { ...result.data }]);
                    Swal.fire({
                        icon: 'success',
                        title: 'Añadido exitosamente',
                        text: 'Se ha añadido el producto correctamente.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setShowAddForm(false);
                    setNewMaterial({ name: '', price: '0', stock: '0', lastpurchase: getCurrentDate() });      
                } else{
                    console.log("Error al guardar el material: " + JSON.stringify(result.data));
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Status: ' + result.status,
                        text: 'Error al guardar el material en la base de datos'
                    });
                }
            }
            
        }
        
        guardarNuevoMaterial();
    };

    const validateForm = () => {
        const { name, price, stock, lastpurchase } = newMaterial;
        if (!name || !price || !stock || !lastpurchase) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos antes de guardar.'
            });
            return false;
        };
        const date = new Date(lastpurchase);
        if (isNaN(date.getTime())) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresa una fecha válida.'
            });
            return false;
        };
        return true;
    };

    return (
        <>
            <div className="squares-background" style={{ backgroundColor: '#39045c', minHeight: '100vh' }}>
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
            {showAddForm && (
                <div className='slide-in-right d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                    <div className="mt-5" style={{ width: '50%' }}>
                        <h3 className="text-white">Añadir ,aterial</h3>
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
                                />
                                
                            </div>
                            <button type="button" className="btn btn-secondary mt-3" onClick={handleAddMaterial}>Guardar</button>
                        </form>
                    </div>
                </div>
            )}
            <div className='slide-in-left' style={{ marginTop: '6%' }}>
                <div className="container mt-5">
                    <h2 className="text-white">Lista de material</h2>
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Última compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materials.map(material => (
                                <tr key={material.id}>
                                    <td>{material.id}</td>
                                    <td>{material.name}</td>
                                    <td>{material.price} /u €</td>
                                    <td>{material.stock} unidades</td>
                                    <td>{material.lastpurchase !== 'N/A' && formatDate(material.lastpurchase)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-secondary" onClick={() => setShowAddForm(!showAddForm)} style={{ margin: '5px' }}>
                        {!showAddForm ? 'Añadir Material' : 'Cerrar Formulario'}
                    </button>
                    <button className="btn btn-secondary" onClick={closeListMaterials}>Cerrar</button>
                </div>
            </div>
        </>
    );
};