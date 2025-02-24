import axios from "axios";

const baseURL = 'http://localhost:8080/users';

export const doLogin = async({username,password}) => {
    try {
        const response = await axios.post('http://localhost:8080/login', {
            username: username,
            password: password
        });

        if (response.status === 200) {
            console.log(username)
            const rolesResponse = await getRoles(username);
            return {
                status: response.status,
                data: {
                    ...response.data,
                    roles: rolesResponse.data
                } // Añadir roles a la respuesta
            };
        }
        
        return { status: response.status, data: response.data };
    } catch (error) {
        console.log('Este es el error  ' + error)
    }
    return undefined;
}
export const getRoles = async(username) => {
    try {
        const url = baseURL + "/" + username + "/roles"
        console.log(url)
        const response = await axios.get(baseURL + '/' + username + '/roles');
        return response;
    } catch (error) {
        console.log(error);
    }
}