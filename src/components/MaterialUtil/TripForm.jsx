import Swal from "sweetalert2";
import { createTrip } from "../../services/TripService";
import './../../css/TripForm.css';
import { useState } from "react";

export const TripForm = ({ onBack, reload }) => {

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: ""
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await createTrip({ ...formData });

    if (response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Creado exitosamente",
        text: "Se ha creado la salida correctamente.",
        showConfirmButton: false,
        timer: 1500
      });
      reload(prevCount => prevCount + 1);
      onBack()
    } else {
        
      Swal.fire({
        icon: "error",
        title: `Error añadiendo la salida. Status: ${response.status}`,
        text: `Mensaje: ${response.message}`
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center text-white bg-purple p-3 rounded">
          Agregar Nueva SALIDA
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de Inicio:</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de Fin:</label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-purple">
              Enviar
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={onBack}>
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
