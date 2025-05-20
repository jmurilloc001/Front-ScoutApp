import { useEffect, useState } from "react";
import { getAllPosts, removePost } from "../../services/PostService";
import Particles from "../Particles/Particles";
import { getIdAffiliateByUsername } from "../../services/UserService";
import { CrearPostsFormulario } from "./CrearPostsFormulario";
import Swal from "sweetalert2";
import { DetallePost } from "./DetallePost";
import { BackButton } from "../CommonsComponents";

export const ListarPosts = ({user, onBack}) => {

    const [posts, setPosts] = useState([]);
    const [affiliateId, setAffiliateId] = useState(0);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentPost, setCurrentPost] = useState({});
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const result = await getAllPosts();
            if (result.status === 200) {
                setPosts(result.data);
            } else {
                console.error('Error al obtener los posts:', result.data.message);
            }
        };
        const getIdAffiliate = async () => {
            const result = await getIdAffiliateByUsername(user.username);
            if (result.status === 200) {
                setAffiliateId(result.data);
            }else{
                console.log("Error consiguiendo el afiliado");
            }
        }
        getIdAffiliate();
        fetchPosts();
    }, []);

    const getTypeLabel = (type) => {
        switch (type) {
            case 'RECEIVE':
                return '​⬇️​';
            case 'GIVE':
                return '⬆️​​';
            default:
                return type;
        }
    };

    const viewPostDetail = (postId) => {
        // Lógica para mostrar el detalle del post
        console.log(`Ver detalles del post con ID: ${postId}`);
    };

    const checkIdAffiliateWithPost = (idAffiliatePost) => {
        
        if (idAffiliatePost === affiliateId) {
            return true;
        }
        return false;
    };

    const checkIfHaveAffiliate = () => {
        if (affiliateId === 0) {
            return false;
        }
        else{
            return true;
        }
    }
        
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    const handlerShowPostForm = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShowDetails(false);
        if (showCreateForm) {
            setShowCreateForm(false);
        }else{
            setShowCreateForm(true);
        }
    }
    const handlerAddPostToList = (post) => {
        setPosts([...posts, post])
    };
    const handlerRemovePostFromList = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
    }

    const handlerDeletePost = (id) => {
            const confirmDeletePost = (id) => {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "No podrás revertir esto",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo'
                }).then((result) => {
                    if (result.isConfirmed) {
                        borrarPost(id);
                    }
                });
            };
    
            const borrarPost= async (id) => {
                const result = await removePost(id);
                if (result.status === 200) {
                    handlerRemovePostFromList(id);
                    Swal.fire({
                        icon: 'success',
                        title: 'Borrado exitosamente',
                        text: 'Se ha borrado el post correctamente.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    console.log("Error al borrar el post: " + JSON.stringify(result.data));
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Status: ' + result.status,
                        text: 'Error al borrar el material en la base de datos'
                    });
                }
            };
    
            confirmDeletePost(id);
        };

    const handlerShowDetails = (post) => {
        setShowCreateForm(false);
        setCurrentPost({...post})
        if (showDetails) {
                setShowDetails(false);
        }else {
            scrollToTop();
            setShowDetails(true);
        }   
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    

    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                backgroundColor: '#39045c'
            }}>
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
            <div className="d-flex justify-content-center align-items-start vh-100" style={{ paddingTop: '10px' }}>
                <div className="container text-center">
                    {checkIfHaveAffiliate && (
                        <button 
                        type="button" 
                        className="btn btn-success rounded-circle" 
                        style={{
                            position: 'fixed',
                            bottom: '5vh',
                            right: '5vw',
                            width: '6vw',
                            height: '6vw',
                            fontSize: '3vw',
                            lineHeight: '6vw',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.2)'
                        }}
                        onClick={handlerShowPostForm}
                        >
                            {!showCreateForm ? '+' : '×'}
                        </button>
                    )}
                    {showCreateForm && <CrearPostsFormulario idAffiliado={affiliateId} closeForm={handlerShowPostForm} addPost={handlerAddPostToList} />}
                    {showDetails && <DetallePost post={currentPost}></DetallePost>}
                    <div className="row mt-5">
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <div key={post.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{post.title}</h5>
                                            <p className="card-text">Creado por: <b>{post.affiliate.name}</b></p>
                                            <p>{truncateText(post.description, 100)}</p> {/* Limita la descripción a 100 caracteres */}
                                            <button onClick={() => handlerShowDetails({...post})} className="btn btn-primary mb-2">
                                                Ver Detalle
                                            </button>
                                            <p><b style={{fontSize:'50px'}}>{getTypeLabel(post.type)}</b></p>
                                            {checkIdAffiliateWithPost(post.affiliate.id) && (
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-danger" onClick={() => handlerDeletePost(post.id)}>Borrar</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white">No hay posts disponibles.</p>
                        )}
                    </div>
                    <BackButton onBack={onBack}></BackButton>
                </div>
            </div>
        </>
    );
};