import TextPressure from './TextPressure/TextPressure';
import Particles from './Particles/Particles';

export const InicioBody = ({ verifyIsLogin, hasRequiredRoles, showAffiliates, showListMaterials, showQuienesSomos, showPosts, showNews, showContact }) => {
    return (
        <>
        <div className="squares-background">
        <Particles
          particleColors={['#39045c', '#ffffff']}
          particleCount={500}
          particleSpread={10}
          speed={0.3}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        </div>
        <div className='inicioView container d-flex flex-column justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
            <div className='titulo'>
                <div className='row'>
                    <div className='col-12' style={{ position: 'relative', height: '10%', width: '100%', paddingTop: '10%' }}>
                        <TextPressure
                            text='SCOUTS MARWAN'
                            fontFamily = 'a'
                            flex={true}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={false}
                            scale={false}
                            italic={true}
                            textColor="#8A2BE2"
                            strokeColor="#8A2BE2"
                            minFontSize={130}
                            className="display-4"
                        />
                    </div>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-12'>
                    <div className='card bg-dark text-white mb-4' style={{ borderRadius: '30px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={showQuienesSomos}> {/* Contenedor más grande */}
                        <div className='card-body text-center'>
                            <i className='fas fa-users' style={{ fontSize: '5rem', marginBottom: '10px' }}></i> {/* Icono de usuarios */}
                            <h5 className='card-title'>¿Quiénes somos?</h5>
                            <p className='card-text'>Conoce más sobre nuestra misión.</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-4'>
                    <div className='card bg-dark text-white m-2' style={{ borderRadius: '30px', height: '200px', backgroundColor: '#1c1c1c', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={showContact}> {/* Contenedor más grande */}
                        <div className='card-body text-center'>
                            <i className='fas fa-envelope' style={{ fontSize: '5rem', marginBottom: '10px' }}></i> {/* Icono de sobre */}
                            <h5 className='card-title'>Contacto</h5>
                            <p className='card-text'>¡Ponte en contacto con nosotros para más información!</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-4'>
                    <div className='card bg-dark text-white m-2' style={{ borderRadius: '30px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={showNews}> {/* Contenedor más grande */}
                        <div className='card-body text-center'>
                            <i className='fas fa-bell' style={{ fontSize: '5rem', marginBottom: '20px' }}></i> {/* Icono de campana */}
                            <h5 className='card-title'>Novedades</h5>
                            <p className='card-text'>¡Descubre las últimas actualizaciones y noticias!</p>
                        </div>
                    </div>
                </div>
                {
                    verifyIsLogin() && 
                    <div className='col-12'>
                        <div className='card bg-dark text-white m-2' style={{ borderRadius: '30px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={showPosts}> {/* Contenedor más grande */}
                            <div className='card-body text-center'>
                                <i className='fas fa-pencil-alt' style={{ fontSize: '5rem', marginBottom: '10px' }}></i> {/* Icono de lápiz */}
                                <h5 className='card-title'>Posts Recientes</h5>
                                    <p className='card-text'>Acceder a los posts de los afiliados</p>
                            </div>
                        </div>
                    </div>    
                }
                   
                {
                    verifyIsLogin() && hasRequiredRoles(['ROLE_ADMIN','ROLE_SCOUTER','ROLE_COORDI']) && (
                        <>
                        <div className='col-md-6 mb-4'>
                            <div className='card bg-dark text-white m-2' style={{ borderRadius: '30px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={showAffiliates}> {/* Contenedor más grande */}
                                <div className='card-body text-center'>
                                    <i className='fas fa-handshake' style={{ fontSize: '5rem', marginBottom: '10px' }}></i> {/* Icono de apretón de manos */}
                                    <h5 className='card-title'>Afiliados</h5>
                                    <p className='card-text'>Ver información sobre las personas pertenecientes al grupo.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 mb-4'>
                            <div className='card bg-dark text-white m-2' style={{ borderRadius: '30px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={showListMaterials}> {/* Contenedor más grande */}
                                <div className='card-body text-center'>
                                    <i className='fas fa-box-open' style={{ fontSize: '5rem', marginBottom: '10px' }}></i> {/* Icono de caja abierta */}
                                    <h5 className='card-title'>Material</h5>
                                    <p className='card-text'>Acceder al material del grupo</p>
                                </div>
                            </div>
                        </div>
                        </>
                    )
                }
                {
                    verifyIsLogin() && hasRequiredRoles(['ROLE_ADMIN','ROLE_COORDI']) && (
                        <>
                        <div className='col-12'>
                            <div className='card bg-dark text-white m-2' style={{ borderRadius: '30px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={showListMaterials}> {/* Contenedor más grande */}
                                <div className='card-body text-center'>
                                    <i className='fas fa-campground' style={{ fontSize: '5rem', marginBottom: '10px' }}></i> {/* Icono de tienda de campaña */}
                                    <h5 className='card-title'>Material por acampada</h5>
                                    <p className='card-text'>Acceder al material usado por acampada</p>
                                </div>
                            </div>
                        </div>
                        </>
                    )
                }
            </div>
        </div>
        </>
    );
}