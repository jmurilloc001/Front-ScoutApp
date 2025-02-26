const avatar = 'src/assets/img/avatarBatman-removebg-preview.png';

export const Cabecera = ({ onLoginClick, reloadPage, verifyIsLogin, onRegisterClick, handlerLogout, handlerUserDetails }) => {
    return (
      <>
      <div className="cabecera">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="/home">
              <img src="src/assets/FlorDeLis.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" onClick={reloadPage} />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/home" onClick={reloadPage}>Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contacto">Contacto</a>
                </li>
                <li className="nav-item">
                  {<a className="nav-link" href="/novedades">Novedades</a>}
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                {!verifyIsLogin() && (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={onLoginClick}>Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={onRegisterClick}>Register</a>
                    </li>
                  </>
                )}
                {verifyIsLogin() && (
                  <>
                  <li className="nav-item">
                  <img src={avatar} alt="Avatar" className="avatar-icon" onClick={handlerUserDetails} />
                  </li>
                  
                  <li className="nav-item">
                    <a className="nav-link" href="/home" onClick={handlerLogout}> Logout</a>
                  </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      </>
    );
  };
  
