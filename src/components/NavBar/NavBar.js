import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import face from "../../assets/facebook.png"
import insta from "../../assets/instagram.png"
import tiktok from "../../assets/tik-tok.png"


import "./NavBar.css";

const NavBar = ({ onToggleMenu }) => {

  const { user, call_login_google, handleLogout } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/register'); // Utilizando navigate en lugar de history.push
};


  const [isOpen, setIsOpen] = useState(false)

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

  const sidebarClassName = isOpen ? "sidebar" : "sidebar small";



  return (

    <div className="chat-page">

<div className={sidebarClassName}>
        <div
          style={{ margin: "15px" }}
          className={`nav_toggle ${isOpen && "open"}`}
          onClick={() => {
            setIsOpen(!isOpen);
            onToggleMenu(); // Llamar a la función toggleMenu desde la prop onToggleMenu
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        

        <div className={`nav_items ${isOpen && "open"}`}>

        <div className="nav_logo">
          {user ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px" }}><img src={user && user.photoURL} alt="User" className="userPhotoChat" onClick={toggleModal} />
              <h2>{user && user.displayName.toUpperCase()}</h2></div>


          ) : (
            <div className="button logIn" onClick={handleOnClick}>Iniciar Sesión</div>
          )}
          {modal && (
            <div className="modal1" ref={modalRef}>
              <div className="overlay1" onClick={toggleModal}></div>
              <div className="modal-content1" style={{ backgroundColor: "black" }}>
                <p>Usuario: {user && user.displayName}</p>
                <button className="button" onClick={handleLogout}>Cerrar Sesión</button>
              </div>
            </div>
          )}
        </div>
         
            <NavLink className="navegacion2" style={{ textDecoration: 'none', color: 'inherit' }} to="/"><h2 className="buttonChatNav">Inicio</h2></NavLink>
            <NavLink className="navegacion2" style={{ textDecoration: 'none', color: 'inherit' }} to="/preguntas"><h2 className="buttonChatNav">FAQS</h2></NavLink>
            <NavLink className="navegacion2" style={{ textDecoration: 'none', color: 'inherit' }} to="/chatHistory"><h2 className="buttonChatNav">Tus chats</h2></NavLink>
            <NavLink className="navegacion2" style={{ textDecoration: 'none', color: 'inherit' }} to="/quien"><h2 className="buttonChatNav">Nosotros</h2></NavLink>
        


          <div className="social-links1">

            <a href="https://www.facebook.com" className="link">
              <img src={face} alt="Facebook" className="social-logo" width="" height="40px" />
            </a>
            <a href="https://www.twitter.com" className="link">
              <img src={insta} alt="Twitter" className="social-logo" width="" height="40px" />
            </a>
            <a href="https://www.instagram.com" className="link">
              <img src={tiktok} alt="Instagram" className="social-logo" width="" height="40px" />
            </a>
          </div>
          
          <div className="containerAnuncio">
            <div className="anuncios">
              <p>Anuncios</p>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default NavBar;
