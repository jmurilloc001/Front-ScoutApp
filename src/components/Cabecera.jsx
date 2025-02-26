const avatar = 'src/assets/img/avatarBatman-removebg-preview.png';

export const Cabecera = ({ onLoginClick, reloadPage, verifyIsLogin, onRegisterClick, handlerLogout, handlerUserDetails, handlerManageUsers, hasRequiredRole }) => {
   const roleAdmin = ['ROLE_ADMIN'];
    return (
      <>
      <div className="cabecera">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="/#">
              <img src="src/assets/FlorDeLis.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" onClick={reloadPage} />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="/#" onClick={reloadPage}>Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#">Contacto</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#">Novedades</a>
                </li>
                {verifyIsLogin() && hasRequiredRole(roleAdmin) && 
                  <li className="nav-item">
                    <a className="nav-link" href="/#" onClick={handlerManageUsers}>Administrar Usuarios</a>
                  </li>
                }
              </ul>
              <ul className="navbar-nav ms-auto">
                {!verifyIsLogin() && (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/#" onClick={onLoginClick}>Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/#" onClick={onRegisterClick}>Register</a>
                    </li>
                  </>
                )}
                {verifyIsLogin() && (
                  <>
                  <li className="nav-item">
                  <img src={avatar} alt="Avatar" className="avatar-icon" onClick={handlerUserDetails} />
                  </li>
                  
                  <li className="nav-item">
                    <a className="nav-link" href="/#" onClick={handlerLogout}> Logout</a>
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