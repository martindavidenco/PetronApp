import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import logo from "../../assets/logoMain.png";
import face from "../../assets/facebook.svg"
import insta from "../../assets/instagram.svg"
import whatsapp from "../../assets/whatsapp.svg"



const NavApp = () => {
    const { user, call_login_google, handleLogout } = useContext(UserContext);
    const [modal, setModal] = useState(false);
    const modalRef = useRef(null);
    const location = useLocation();

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

    if (location.pathname === "/chat") {
        return null; // Ocultar el NavBar en la ruta /chat
      }

      const isQuienPage = location.pathname === "/quien";
  const navBarClass = isQuienPage ? "navQuien" : "head";

    return (
        <>
           
                <div className={navBarClass}>
                    {/* Contenido del NavBar para otras páginas */}
                    <div className={navBarClass}>
                        <NavLink className="title" to="/">
                            <img src={logo} style={{ width: "100px", height: "auto", marginTop: "19px", marginLeft: "15px" }} alt="Logo" />
                        </NavLink>
                        <ul className="navegacion">
                            <NavLink to="/chat" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h2>Chat</h2>
                            </NavLink>
                            <h2>Faqs</h2>
                            <h2>Tutorial</h2>
                            <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/quien"><h2>Nosotros</h2></NavLink>
                            <div className="user-container">
                                {user ? (
                                    <img src={user && user.photoURL} alt="User" className="userPhoto" onClick={toggleModal} />
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
                            </div>
                        </ul>
                    </div>
                </div>
          


        </>
    )
}

export default NavApp