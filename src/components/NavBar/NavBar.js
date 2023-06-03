import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import face from "../../assets/facebook.svg"
import insta from "../../assets/instagram.svg"
import whatsapp from "../../assets/whatsapp.svg"


import "./NavBar.css";

const NavBar = () => {
  
  const { user, call_login_google, handleLogout } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const modalRef = useRef(null);



  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

 
  

  
  return (
  
  <div className="chat-page">

      <div className="sidebar">
   

        <ul className="navegacion2">
          {user ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: "25px" }}><img src={user && user.photoURL} alt="User" className="userPhotoChat" onClick={toggleModal} />
              <h2>{user && user.displayName.toUpperCase()}</h2></div>


          ) : (
            <div className="button logIn" onClick={call_login_google}>
              Iniciar Sesión
            </div>
          )}
          {modal && (
            <div className="modal" ref={modalRef}>
              <div className="overlay" onClick={toggleModal}></div>
              <div className="modal-content" style={{ backgroundColor: "black" }}>
                <p>Usuario: {user && user.displayName}</p>
                <button className="button" onClick={handleLogout}>Cerrar Sesión</button>
              </div>
            </div>
          )}
          <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/"><h2 className="buttonChatNav">Inicio</h2></NavLink>
          <h2 className="buttonChatNav">FAQS</h2>
          <h2 className="buttonChatNav">Tutorial</h2>
          <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/quien"><h2 className="buttonChatNav">Nosotros</h2></NavLink>
          <div className="user-container">
          </div>
        </ul>
        <div className="social-links">
          {/* Aquí puedes agregar tus enlaces a redes sociales */}
          <a href="https://www.facebook.com" className="link">
            <img src={face} alt="Facebook" className="social-logo" width="" height="40px" />
          </a>
          <a href="https://www.twitter.com" className="link">
            <img src={whatsapp} alt="Twitter" className="social-logo" width="" height="40px" />
          </a>
          <a href="https://www.instagram.com" className="link">
            <img src={insta} alt="Instagram" className="social-logo" width="" height="40px" />
          </a>
        </div>
        <div className="containerAnuncio"> <div className="anuncios">
          <p>Anuncios</p>
        </div></div>


      </div>
    
  </div>

  );
};

export default NavBar;
