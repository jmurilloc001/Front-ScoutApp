import { useEffect,useState } from 'react'
import './App.css'
import { Cabecera } from './components/Cabecera';
import { LoginForm } from './components/LoginForm';
import { doLogin, isTokenExpired } from './services/UserService';
import { InicioBody } from './components/InicioBody';

export const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState({
    username: '',
    token: '',
    message: ''
  })
  const [isLogin, setIsLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  }

  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  const reload = () => {
    window.location.reload();
  }

  const handlerDoLogin = async (user) => {
    const result = await doLogin({...user});
    console.log(result)
    if (result.status === 200) {
      setUser({...result.data});
      setIsLogin(true);
      sessionStorage.setItem('user',JSON.stringify(result.data)); //Guardo los datos del usuario en el session
      handleCloseLogin();
    }else{
      alert("Fallo de autenticación")
      console.log("Fallo " + result.status)
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
  }
  
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
      <Cabecera onLoginClick={handleLoginClick} reloadPage={reload} verifyIsLogin={verifyIsLogin}></Cabecera>
      { showLogin && <LoginForm handlerDoLogin={handlerDoLogin}></LoginForm>}
      { !showLogin && <InicioBody verifyIsLogin={verifyIsLogin}></InicioBody>}
    </>
  )
}
