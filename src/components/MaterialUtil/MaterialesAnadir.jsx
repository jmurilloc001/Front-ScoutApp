import { useState, useEffect } from "react";
import { getAllProducts } from "../../services/ProductService";
import { addMaterialToTrip } from "../../services/TripService";

export const MaterialesAnadir = ({ onBack, id }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [materials, setMaterials] = useState([]);

  // Obtener la lista de materiales desde el servicio
  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await getAllProducts();
      if (response.status === 200) {
        setMaterials(response.data);
      } else {
        console.error("Error al obtener los materiales:", response.data.message);
      }
    };

    fetchMaterials();
  }, []);

  // Filtrar materiales según la búsqueda
  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar la adición de material con cantidad
  const handleAddMaterialToTrip = async (idMaterial) => {
    
    const quantity = parseInt(prompt(`Ingresa la cantidad para ${materials.find(m => m.id === idMaterial).name}:`), 10);

    console.log("quantity: " + quantity);
    

    if (!isNaN(quantity) && quantity > 0) {
        console.log('tripId' + id );
        
      const response = await addMaterialToTrip(id, idMaterial, quantity);

      if (response.status === 201) {
        alert("Material añadido correctamente.");
      } else {
        alert("Error al añadir el material.");
      }
    } else {
      alert("Por favor ingresa una cantidad válida.");
    }
  };

  return (
    <div className="container mt-5" style={{ zIndex: '10' }}>
      <h1 className="text-center mb-4">Añadir Material</h1>

      {/* Input de búsqueda */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar material..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Lista de materiales */}
      <ul className="list-group">
        {filteredMaterials.map(material => (
          <li key={material.id} className="list-group-item d-flex justify-content-between align-items-center">
            {material.name}
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleAddMaterialToTrip(material.id)}
            >
              ➕
            </button>
          </li>
        ))}
      </ul>

      {/* Botón de volver */}
      <button className="btn btn-secondary mt-3" onClick={onBack}>
        Volver
      </button>
    </div>
  );
};
