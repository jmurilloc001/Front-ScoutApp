import Particles from "./Particles/Particles"

export const BackButton = ({onBack}) => {
    return (
        <button
            className="btn btn-secondary"
            style={{
                backgroundColor: '#4b007a', /* Color del degradado */
                position: 'fixed',
                bottom: '5vh',
                left: '5vw',
                width: '6vw',
                height: '6vw',
                fontSize: '3vw',
                lineHeight: '6vw',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
                color: 'white',
                borderRadius: '10px',
                transition: 'background-color 0.3s ease-in-out'
            }}

            onClick={onBack}
            >
            🔙​
        </button>
    )
}

export const BackgroundParticles = () => {
    return (
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
    )
}
