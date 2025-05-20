import { BackButton } from "../CommonsComponents";
import Particles from "../Particles/Particles";
import RollingGallery from "../RollingGallery/RollingGallery";

export const QuienesSomos = ({onBack}) => {
    return (
        <>
            <div className="squares-background" style={{ backgroundColor: '#39045c', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            
            <div className="rectangular-body" style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '80%',
                height: '100%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <img src="https://scouts690marwan.org/wp-content/uploads/2020/11/img_5464.jpg" alt="Imagen Grande" style={{ width: '100%', height: '80%' }} />
            <div style={{marginTop:'3%', backgroundColor:'white', width:'100%', color:'black'}}>
                <div style={{marginLeft:'10%', marginRight:'10%'}}>
                    <h1>¿Quienes somos?</h1><br></br>
                    <hr></hr>
                    <br></br>
                    <p>
                        El <b>Grupo Scout 690 Marwan</b> lo formamos un grupo de personas interesadas en ofrecer<br></br> una alternativa de ocio y tiempo libre para los jóvenes (educandos) de Badajoz, basado <br></br> en una <b>educación por la acción en valores</b> y dentro del entorno natural 🌱
                    </p>
                    <p>
                    El <b>Escultismo</b> es el método educativo Scout y trabaja diferentes contenidos educativos<br></br> agrupados actualmente en 4 compromisos: <b>social, ambiental, de la salud y espiritual</b>.
                    </p>
                    <p>Algunos ejemplos de las actividades que desarrollan los scouts son:</p>
                    <ul>
                        <li><b>Reuniones semanales</b>, en la que se realizan juegos, dinámicas, talleres, foros, etc.<br></br> sobre los diferentes ámbitos educativos.</li>
                        <li><b>Acampadas y campamentos,</b>potenciando el contacto con la naturaleza. Estas actividades <br></br>pueden durar desde dos días hasta quince, resultando una auténtica escuela de ciudadanía, <br></br>ya que se potencia la convivencia y el respeto, así como la autonomía personal.</li>
                        <li><b>Actividades solidarias</b> en beneficio de colectivos desfavorecidos, en la forma de recogidas<br></br> de ropa, alimentos, material escolar, aportaciones económicas, etc., ya que los scouts<br></br> tienen ante todo, un compromiso con toda la sociedad a la que pertenecen.</li>
                        <li>Participación en <b>foros de encuentro y debate</b>, adaptados para las diferentes edades.</li>
                        <li>Encuentros a nivel regional y nacional, donde miles de scouts se juntan para la realización de <br></br>diferentes actividades. Este contacto potencia el sentimiento de hermandad <br></br>entre los scouts de distintas procedencias, y resulta una de las <br></br>vivencias más enriquecedoras para ellos.</li>
                        <li>Actividades para la <b>potenciación de la cultura extremeña</b>, en las que se potencia <br></br> el conocimiento de los rincones de Extremadura, de su historia y tradiciones…</li>
                        <li>Participación en <b>encuentros con otras asociaciones</b> de la región.</li>
                    </ul>
                    <RollingGallery></RollingGallery>
                        
                    <br></br>
                    <p>
                        Se integra dentro de <b style={{color:'purple'}}>Scouts de Extremadura (ASDEEX)</b>, organización con carácter <br></br> pluriconfesional y apartidista, que pertenece a la <b style={{color:'purple'}}>Federación de Asociaciones <br></br>de Scouts de España (ASDE)</b>, que es parte, a su vez, de la <b style={{color:'purple'}}>Organización Mundial del Movimiento Scout (OMMS)</b>; <br></br>En total, más de <b>500 millones de personas en el mundo <br></br>han hecho su promesa scout</b> y actualmente hay <b>40 millones de scouts en servicio</b> alrededor <br></br>del mundo, siendo el mayor movimiento de menores y adultos del mundo. (Fuente <a href="https://es.wikipedia.org/wiki/Organizaci%C3%B3n_Mundial_del_Movimiento_Scout" style={{color:'purple'}}>aquí</a>)
                    </p>
                    <p>El Movimiento Scout pone énfasis en las actividades lúdicas con objetivos educativos, <br></br>en las actividades al aire libre y en el servicio comunitario, estas últimas <br></br>con el objeto de formar el carácter y enseñar de forma práctica valores humanos. <br></br>Esto lo hacemos mediante <b>reuniones semanales</b>, como norma general, todos <br></br>los <b>viernes de 17:30 a 19:30</b> en diferentes instalaciones y lugares de Badajoz y a través <br></br>de las acampadas y campamentos, sólo nuestro grupo scout o con otro (acampada de navidad, <br></br> campamento de semana santa y verano); así como días de convivencia con otros <br></br>grupos scouts o realizando acampadas por secciones/ramas educativas.</p>
                    <p>En el escultismo, se clasifica a los educandos en función de la edad, existiendo las siguientes ramas educativas:</p>
                    <img src="https://scouts690marwan.org/wp-content/uploads/2021/11/sin-titulo-1.jpg"></img>
                    <p>Los educadores, responsables o monitores voluntarios reciben el nombre de <b>scouters.</b></p>
                    <img src="https://scouts690marwan.org/wp-content/uploads/2016/08/c814cd_7b13e8b1750d4fed988fe558fd295049-mv2.jpg"></img>
                </div>
                
            </div>
                <div className="footer" style={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '20px',
                    textAlign: 'center',
                    position: 'relative',
                    bottom: '0',
                }}>
                    <p>&copy; 2025 Jorge Murillo Carrera. Todos los derechos reservados.</p>
                    <p>Síguenos en nuestras redes sociales:</p>
                    <div>
                        <a href="https://facebook.com" style={{ margin: '0 10px' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style={{ width: '50px', height: '50px' }} />
                        </a>
                        <a href="https://www.tiktok.com/@grupo_scout_marwan" style={{ margin: '0 10px' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt="TikTok" style={{ width: '50px', height: '50px' }} />
                        </a>
                        <a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fgscoutmarwan690%2F%3Fhl%3Des&is_from_rle" style={{ margin: '0 10px' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={{ width: '50px', height: '50px' }} />
                        </a>
                    </div>
                </div>
            </div>
            <BackButton onBack={onBack}></BackButton>
        </>
    );
}
