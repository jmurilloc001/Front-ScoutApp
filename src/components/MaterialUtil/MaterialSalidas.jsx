import { useEffect, useState } from "react";
import { BackButton, BackgroundParticles } from "../CommonsComponents";
import { deleteTrip, getAllTripsPage } from "../../services/TripService";
import Swal from "sweetalert2";
import { MaterialesAnadir } from "./MaterialesAnadir";

export const MaterialSalidas = ({ onBack }) => {
  const [salidas, setSalidas] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showMaterialsToAdd, setShowMaterialsToAdd ] = useState(false);
  const [tripId, setTripId] = useState(0);
  const [reload, setReload] = useState(0);
  const pageSize = 2;

  useEffect(() => {
    const fetchSalidas = async () => {
      const response = await getAllTripsPage(page, pageSize);
      if (response.status === 200) {
        setSalidas((prevSalidas) => [...prevSalidas, ...response.data]);
        setTotalPages(response.totalPages);
      } else {
        console.error("Error al obtener las salidas:", response.data.message);
      }
    };

    fetchSalidas();
  }, [page, reload]);

  const handleDelete = async(id) => {
    const confirmDelete = window.confirm("¿Quieres eliminar esta salida?");
    if (confirmDelete) {
      const response = await deleteTrip(id);
      if (response.status===200) {
        setReload(reload+1)
        Swal.fire({
                    icon: 'success',
                    title: 'Borrado exitosamente',
                    text: 'Se ha borrado la salida correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                  });
      }else{
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error borrando la salida.'
        });
      }
      
    }
  };

  // Función para "cerrar" la salida (puede ocultarse o marcarse como cerrada)
  const handleCloseTrip = (id) => {
    setSalidas(
      salidas.map((salida) =>
        salida.id === id ? { ...salida, cerrado: true } : salida
      )
    );
  };

  const handleShowMaterialsToAdd = (id = 0) => {
    if (showMaterialsToAdd) {
      setShowMaterialsToAdd(false);
      setReload(reload+1)
    }else{
      setTripId(id);
      console.log(tripId);
      setShowMaterialsToAdd(true);
        window.scrollTo({
        top: 0,
        behavior: "smooth" // Para hacer un desplazamiento suave
        });
    }
  }

  return (
    <>
      <BackgroundParticles />
      {showMaterialsToAdd && <MaterialesAnadir onBack={handleShowMaterialsToAdd} id={tripId}></MaterialesAnadir>}
      
      <div className="container mt-5">
        <h1 className="text-center mb-4">Listado de Salidas</h1>
        <div className="row">
          {salidas.map((salida) =>
            salida.cerrado ? null : (
              <div key={salida.id} className="col-md-6 mb-4">
                <div className="card shadow">
                  <div className="card-header bg-primary text-white d-flex justify-content-between">
                    <h5 className="mb-0">{salida.title}</h5>
                    <div>
                      <button
                        className="btn btn-sm btn-danger mx-1"
                        onClick={() => handleDelete(salida.id)}
                      >
                        ❌ <b>Eliminar</b>
                      </button>
                      <button
                        className="btn btn-sm btn-secondary mx-1"
                        onClick={() => handleCloseTrip(salida.id)}
                      >
                        🔒 <b>Cerrar</b>
                      </button>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleShowMaterialsToAdd(salida.id)}
                      >
                        ➕ <b>Añadir Material</b>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <h2>{salida.title}</h2>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Material</th>
                          <th>Usado</th>
                          <th>En Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salida.materials.map((material, index) => (
                          <tr key={index}>
                            <td>{material.productName}</td>
                            <td>{material.cantidad}</td>
                            <td>{material.stock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <h3>
                      <b>FECHA INICIO:</b> {salida.startDate}
                    </h3>
                    <h3>
                      <b>FECHA FIN:</b> {salida.endDate}
                    </h3>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {page < totalPages - 1 && (
          <button
            className="btn btn-primary mt-3"
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Cargar más salidas
          </button>
        )}
      </div>
      <BackButton onBack={onBack} />
    </>
  );
};

