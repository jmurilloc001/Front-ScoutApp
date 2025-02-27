import { useEffect, useState } from "react";
import { getAffiliates } from "../../services/AffiliateService";
import Swal from "sweetalert2";
import { putAffiliate } from "../../services/UserService";

export const AsignarAfiliado = ({getIdUserInMoment, fetchAffiliates}) => {
    const [affiliates, setAffiliates] = useState([]);

    const getListAffiliates = async () => {
        const response = await getAffiliates();
        if (response.status === 200) {
            setAffiliates(response.data);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al buscar los afiliados: ${response.status}`,
            });
        }
    };

    const putAffiliateInUser = async (affiliate_id) => {
        
        const user_id = getIdUserInMoment;
        const response = await putAffiliate(user_id,affiliate_id);
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Asigando',
                text: 'Se ha asigando con exito el afiliado'
            });
            fetchAffiliates()
        }else{
            console.log(response)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al asignar el afiliado: ${response.data.message}`,
            });
        }
        
    };

    useEffect(() => {
        getListAffiliates();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Asignar afiliado</h2>
            <ul className="list-group list-group-flush bg-dark shadow-sm">
                {affiliates.map((affiliate, index) => (
                    <li key={index} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center shadow-lg">
                        {affiliate.name}
                        <button className="btn btn-primary" onClick={() => putAffiliateInUser(affiliate.id)}>Asignar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};