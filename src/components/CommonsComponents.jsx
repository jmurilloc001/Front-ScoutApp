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
