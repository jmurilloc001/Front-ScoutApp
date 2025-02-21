import TextPressure from './TextPressure/TextPressure';

export const InicioBody = () => {
    return (
        <>
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
                            minFontSize={150}
                            className="display-4"
                        />
                    </div>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-12'>
                <div className='card bg-dark text-white mb-2' style={{ borderRadius: '15px', height: '200px' }}> {/* Contenedor más grande */}
                        <div className='card-body'>
                            <h5 className='card-title'>Sección 1</h5>
                            <p className='card-text'>Contenido de la sección 1.</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-4'>
                    <div className='card bg-dark text-white' style={{ borderRadius: '15px', height: '200px', backgroundColor: '#1c1c1c' }}> {/* Contenedor más grande */}
                        <div className='card-body'>
                            <h5 className='card-title'>Sección 2</h5>
                            <p className='card-text'>Contenido de la sección 2.</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-4'>
                    <div className='card bg-dark text-white' style={{ borderRadius: '15px', height: '200px' }}> {/* Contenedor más grande */}
                        <div className='card-body'>
                            <h5 className='card-title'>Sección 3</h5>
                            <p className='card-text'>Contenido de la sección 3.</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-4'>
                    <div className='card bg-dark text-white' style={{ borderRadius: '15px', height: '200px' }}> {/* Contenedor más grande */}
                        <div className='card-body'>
                            <h5 className='card-title'>Sección 4</h5>
                            <p className='card-text'>Contenido de la sección 4.</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-4'>
                    <div className='card bg-dark text-white' style={{ borderRadius: '15px', height: '200px' }}> {/* Contenedor más grande */}
                        <div className='card-body'>
                            <h5 className='card-title'>Sección 4</h5>
                            <p className='card-text'>Contenido de la sección 4.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}