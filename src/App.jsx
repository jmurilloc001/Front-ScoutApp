import { useState } from 'react'
import './App.css'
import { Cabecera } from './components/Cabecera';
import { LoginForm } from './components/LoginForm';
import { doLogin } from './services/UserService';
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
      handleCloseLogin();
    }else{
      console.log("Fallo " + result.status)
    }
      
  }
  const verifyIsLogin = () => {
    return isLogin;
  }
  

  return (
    <>
      <Cabecera onLoginClick={handleLoginClick} reloadPage={reload}></Cabecera>
      { showLogin && <LoginForm onClose={handleCloseLogin} reloadPage={reload} handlerDoLogin={handlerDoLogin}></LoginForm>}
      { !showLogin && <InicioBody verifyIsLogin={verifyIsLogin}></InicioBody>}
    </>
  )
}
