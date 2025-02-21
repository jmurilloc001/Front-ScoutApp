import axios from "axios";

const baseURL = 'http://localhost:8080/users';

export const doLogin = async({username,password}) => {
    console.log("Ha entrado en el doLogin")
    try {
        const response = await axios.post('http://localhost:8080/login', {
            username: username,
            password: password
        });
        return response;
    } catch (error) {
        console.log('Este es el error  ' + error)
    }
    return undefined;
}