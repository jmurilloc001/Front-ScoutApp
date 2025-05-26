import axios from "axios"

export const sendEmail = async ({nombre, email, mensaje}) => {

    try{
        const response = await axios.get("http://localhost:8080/send-email-backup", {
            params: {
                from: email,
                subject: nombre,
                text: mensaje
            }}
        );
        console.log("RESPONSE: " + response.data);
        
        if (response.status === 200) {
            return {
                status: response.status,
                data: response.data
            };
        }else{
            return response;
        }
    }catch (error) {
        console.log(error);
        return {
            status: error.response ? error.response.status : 500,
            data: error.response ? error.response.data : { message: 'Error desconocido' }
        };
    }
    
}