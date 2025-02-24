import { useEffect, useState } from 'react';
import './App.css';
import { Cabecera } from './components/Cabecera';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { doLogin, doRegister, isTokenExpired } from './services/UserService';
import { InicioBody } from './components/InicioBody';

export const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState({
    username: '',
    token: '',
    message: ''
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };
  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  const reload = () => {
    window.location.reload();
  };

  const handlerDoLogin = async (user) => {
    const result = await doLogin({ ...user });
    console.log(result);
    if (result.status === 200) {
      setUser({ ...result.data });
      setIsLogin(true);
      sessionStorage.setItem('user', JSON.stringify(result.data)); // Guardar los datos del usuario en sessionStorage
      handleCloseLogin();
      handleCloseRegister();
    } else {
      alert("Fallo de autenticación");
      console.log("Fallo " + result.status);
    }
  };
  const handlerDoRegister = async (user) => {
    const result = await doRegister({ ...user });
    if (result.status === 201) {
      handlerDoLogin({... user});
      handleCloseRegister();
    } else {
      alert("Fallo en el registro" + JSON.stringify(result.data));
      console.log("Status " + result.status);
    }
  };

  const handleLogout = () => {
    setUser({
      username: '',
      token: '',
      message: ''
    });
    setIsLogin(false);
    sessionStorage.removeItem('user'); // Eliminar datos del usuario de sessionStorage
  };

  const verifyIsLogin = () => {
    return isLogin;
  };

  const verifyToken = () => {
    const usuarioGuardado = JSON.parse(sessionStorage.getItem('user'));
    if (usuarioGuardado && !isTokenExpired(usuarioGuardado.token)) {
      setUser(usuarioGuardado);
      setIsLogin(true);
    } else {
      handleLogout();
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <Cabecera onLoginClick={handleLoginClick} reloadPage={reload} verifyIsLogin={verifyIsLogin} onLogoutClick={handleLogout} onRegisterClick={handleRegisterClick} handlerLogout={handleLogout}></Cabecera>
      {showLogin && <LoginForm handlerDoLogin={handlerDoLogin}></LoginForm>}
      {showRegister && !showLogin && <RegisterForm  handlerDoRegister={handlerDoRegister}></RegisterForm>}
      {!showLogin && !showRegister && <InicioBody verifyIsLogin={verifyIsLogin}></InicioBody>}
    </>
  );
};