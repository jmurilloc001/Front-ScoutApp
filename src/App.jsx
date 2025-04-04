import { useEffect, useState } from 'react';
import './App.css';
import { Cabecera } from './components/Cabecera';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { doLogin, doRegister, getIdAffiliateByUsername, isTokenExpired } from './services/UserService';
import { InicioBody } from './components/InicioBody';
import { AfiliadosList } from './components/AfiliadosList';
import { UserDetails } from './components/UserDetails';
import Swal from 'sweetalert2';
import { AdministrarUsers } from './components/UserUtil/AdministrarUsers';
import { ListarMateriales } from './components/MaterialUtil/ListarMateriales';
import { QuienesSomos } from './components/InformationWebs/QuienesSomos';
import { ListarPosts } from './components/PostsUtil/ListarPosts';

export const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAffiliates, setAffiliates] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showManageUsers, setShowManageUsers] = useState(false);
  const [showListMaterials, setShowListMaterials] = useState(false);
  const [showQuienesSomos, setShowQuienesSomos] = useState(false);
  const [showPosts, setShowPosts] = useState(false);

  const [user, setUser] = useState({
    username: '',
    token: '',
    message: '',
  });

  const [isLogin, setIsLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleAffiliatesListClick = () => {
    setAffiliates(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
    
  };

  const handleCloseAffiliateList = () => {
    setAffiliates(false);
  };

  const handlerShowManageAdmin = () => {
    setAllFalseWithoutLogin();
    setShowManageUsers(true);
  };

  const handlerShowListMaterials = () => {
    setShowListMaterials(true);
  }
  const handlerCloseListMaterials = () => {
    setShowListMaterials(false);
  }

  const handlerShowPosts = () => {
    setShowPosts(true);
  }
  const handlerClosePosts = () => {
    setShowPosts(false);
  }

  const handlerShowQuienesSomos = () => {
    setShowQuienesSomos(true);
  }

  const handlerUserDetails = () => {
    setAllFalseWithoutLogin();
    setShowUserDetails(true);
  };
  const handlerCloseUserDetails = () => {
    setShowUserDetails(false);
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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.data.message + " Status: " + result.status,
    });       
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
    setAllFalse();
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

  const hasRequiredRoles = (requiredRoles) => {
    const usuarioGuardado = JSON.parse(sessionStorage.getItem('user'));
    if (usuarioGuardado && usuarioGuardado.roles) {
        return requiredRoles.some(role => usuarioGuardado.roles.includes(role));
    }
    return false;
  };

  const handlerCloseShowManageAdmin = () => {
    setShowManageUsers(false);
  };
  
  const setAllFalse = () => {
    setAllFalseWithoutLogin();
    setIsLogin(false);
  };
  const setAllFalseWithoutLogin = () => {
    setAffiliates(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowManageUsers(false);
    setShowUserDetails(false);
    setShowListMaterials(false);
    setShowQuienesSomos(false);
    setShowPosts(false);
  }
  
  useEffect(() => {
    verifyToken();
  }, []);

  
  return (
    <>
      <Cabecera onLoginClick={handleLoginClick} reloadPage={reload} verifyIsLogin={verifyIsLogin} onLogoutClick={handleLogout} onRegisterClick={handleRegisterClick} handlerLogout={handleLogout} handlerUserDetails={handlerUserDetails} handlerManageUsers={handlerShowManageAdmin} hasRequiredRole={hasRequiredRoles}></Cabecera>
      {showLogin && <LoginForm handlerDoLogin={handlerDoLogin}></LoginForm>}
      {showRegister && !showLogin && <RegisterForm  handlerDoRegister={handlerDoRegister}></RegisterForm>}
      {!showLogin && !showRegister && !showAffiliates && !showUserDetails && !showManageUsers && !showListMaterials && !showQuienesSomos && !showPosts && <InicioBody verifyIsLogin={verifyIsLogin} hasRequiredRoles={hasRequiredRoles} showAffiliates={handleAffiliatesListClick} showListMaterials={handlerShowListMaterials} showQuienesSomos={handlerShowQuienesSomos} showPosts={handlerShowPosts}></InicioBody>}
      {showAffiliates && <AfiliadosList closeAffiliates={handleCloseAffiliateList} hasRequiredRoles={hasRequiredRoles}></AfiliadosList>}
      {showUserDetails && <UserDetails handlerCloseUserDetails={handlerCloseUserDetails} hasRequiredRoles={hasRequiredRoles}></UserDetails>}
      {showManageUsers && <AdministrarUsers closeManageUsers={handlerCloseShowManageAdmin} ></AdministrarUsers>}
      {showListMaterials && <ListarMateriales closeListMaterials={handlerCloseListMaterials}></ListarMateriales>}
      {showQuienesSomos && <QuienesSomos></QuienesSomos>}
      {showPosts && <ListarPosts user={user}></ListarPosts>}
    </>
  );
};