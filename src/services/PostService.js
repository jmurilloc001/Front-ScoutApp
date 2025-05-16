import axios from "axios";

const baseURL = 'http://localhost:8080/posts';

export const getAllPosts = async () => {
    try {
        const token = conseguirToken();
        const response = await axios.get(baseURL, {
            headers: {
                'Authorization': `Bearer ${token}` // Añade el token en los encabezados
            }
        });
        if (response.status === 200) {
            const posts = response.data.map(post => ({
                id: post.id,
                description: post.description,
                type: post.type,
                affiliate: {
                    id: post.affiliateDto.id,
                    name: post.affiliateDto.name,
                    lastname: post.affiliateDto.lastname,
                    seccion: post.affiliateDto.seccion,
                },
                title: post.title,
                email: post.email,
                tlf: post.tlf
            }));
            return {
                status: response.status,
                data: posts
            };
        }
        return response;
    } catch (error) {
        console.log(error);
        return {
            status: error.response ? error.response.status : 500,
            data: error.response ? error.response.data : { message: 'Error desconocido' }
        };
    }
};
export const savePost= async({ title, description, affiliate, type, tlf, email}) => {
    try {
        const token = conseguirToken();
                
        const response = await axios.post(baseURL, {
            title,
            description,
            affiliate,
            type,
            email,
            tlf
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.log('Error guardando el nuevo post:', error);
        return { status: error.response?.status || 500, message: error.message };
    }
};

export const removePost= async(id) => {
    try {
        const token = conseguirToken();
        const response = await axios.delete(baseURL+'/'+id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status };
    }catch (error){
        console.log('Error borrando el post ' + id + ": ", error);
        return { status: error.response?.status || 500, message: error.message };
    }
};

export const conseguirToken = () => {
    const user = JSON.parse(sessionStorage.getItem('user')); // Obtén el objeto user del sessionStorage
    const token = user?.token; // Extrae el token del objeto user
    if (!token) {
        throw new Error('Token no encontrado');
    }
    return token;
};