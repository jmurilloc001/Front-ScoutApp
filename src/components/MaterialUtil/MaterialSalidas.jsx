import { useEffect, useState } from "react";
import { BackButton, BackgroundParticles } from "../CommonsComponents";
import { deleteTrip, getAllTripsPage } from "../../services/TripService";
import Swal from "sweetalert2";
import { MaterialesAnadir } from "./MaterialesAnadir";
import { TripForm } from "./TripForm";

export const MaterialSalidas = ({ onBack }) => {
  const [salidas, setSalidas] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showMaterialsToAdd, setShowMaterialsToAdd ] = useState(false);
  const [tripId, setTripId] = useState(0);
  const [reload, setReload] = useState(0);
  const [showCreateTrip, setShowCreateTrip] = useState(false);
  const pageSize = 2;

  useEffect(() => {
    const fetchSalidas = async () => {
      const response = await getAllTripsPage(page, pageSize);
      if (response.status === 200) {
        setSalidas(response.data)
        setTotalPages(response.totalPages);
      } 
      else {
        console.error("Error al obtener las salidas:", response.data.message);
        if (response.status === 404) {
          setSalidas([]);
        }
        
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Message: ' + response.data.message
        });
      }
    };

    fetchSalidas();
  }, [page, reload]);

  const doDelete = async (id) => {
  try {
    const response = await deleteTrip(id);
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Borrado exitosamente",
        text: "Se ha borrado la salida correctamente.",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error borrando la salida."
      });
    }
    setReload(prevCount => prevCount + 1);
  } catch (error) {
    console.error("Error al eliminar:", error);
    Swal.fire({
      icon: "error",
      title: "Error inesperado",
      text: "Hubo un problema al conectar con el servidor."
    });
  }
};

const handleDelete = async (id) => {
  Swal.fire({
    title: "¿Quieres eliminar esta salida?",
    text: "No podrás revertir esta acción y los MATERIALES se volverán a sumar.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      doDelete(id);
    }
  });
};


  const handleCloseTrip = (id) => {
    
  };

  const handleShowMaterialsToAdd = (id = 0) => {
    if (showMaterialsToAdd) {
      setShowMaterialsToAdd(false);
      setReload(prevCount => prevCount + 1)
    }else{
      setTripId(id);
      console.log(tripId);
      setShowMaterialsToAdd(true);
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
    }
  }

  const handlerShowTripForm = () => {
    if (showCreateTrip) {
      setShowCreateTrip(false);
    }else{
      setShowCreateTrip(true);
    }
  }

  return (
    <>
      <BackgroundParticles />
      {showCreateTrip && <TripForm onBack={handlerShowTripForm} reload={setReload}></TripForm> }
      <div style={{zIndex:'100'}}>
        {showMaterialsToAdd && <MaterialesAnadir onBack={handleShowMaterialsToAdd} id={tripId}></MaterialesAnadir>}
      </div>  
      <div className="container mt-5">
        <h1 className="text-center mb-4">Listado de Salidas</h1>
        <div className="row">
          {salidas.map((salida) => 
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
          )}
        </div>
        {page < totalPages - 1 && (
          <button
            className="btn btn-primary mt-3"
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Página siguiente
          </button>
        )}
        {page > 0 && (
          <button
            className="btn btn-secondary mt-3 me-2"
            onClick={() => setPage((prevPage) => prevPage - 1)}
          >
            Página anterior
          </button>
        )}

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
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.2)'
                        }}
                        onClick={handlerShowTripForm}
                    >
                        {!showCreateTrip ? '+' : '×'}
                    </button>
      </div>
      <BackButton onBack={onBack} />
    </>
  );
};

