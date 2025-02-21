import { useEffect, useState } from 'react'
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


  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  const reload = () => {
    window.location.reload();
  }

  const handlerDoLogin = async (user) => {
    const result = await doLogin({...user});
    //console.log(result.data)
    setUser(result.data)
  }


  return (
    <>
      <Cabecera onLoginClick={handleLoginClick} reloadPage={reload}></Cabecera>
      { showLogin && <LoginForm onClose={handleCloseLogin} reloadPage={reload} handlerDoLogin={handlerDoLogin}></LoginForm>}
      { !showLogin && <InicioBody></InicioBody>}
    </>
  )
}
