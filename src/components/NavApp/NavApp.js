import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import logo from "../../assets/logoMain.png";
import "./NavApp.css";



const NavApp = () => {
    const { user, handleLogout } = useContext(UserContext);
    const [modal, setModal] = useState(false);
    const modalRef = useRef(null);
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate()

    const closeMenu = () => {
        setIsOpen(false);
    };
    const handleOnClick = () => {
        navigate('/register'); // Utilizando navigate en lugar de history.push
    };


    let backgroundImage = "url(../../assets/fondoMain.png)";
    if (location.pathname === "/chat") {
        backgroundImage = "url(../../assets/fondochat.png)";
    }


    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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

    if (location.pathname === "/chat" && windowWidth >= 600) {
        return null; // Ocultar el NavBar en la ruta /chat
    }

    const colorStyle = windowWidth < 768 ? { color: "#d2a444" } : { color: "#f2f2f2" };


    const isChatPage = location.pathname === "/chat";
    const isQuienPage = location.pathname === "/quien";
    let navBarClass;

    if (isChatPage) {
        navBarClass = "fondoChat";
    } else if (isQuienPage) {
        navBarClass = "navQuien";
    } else {
        navBarClass = "head";
    }

    return (
        <>

            <div className={navBarClass}>
                {/* Contenido del NavBar para otras páginas */}
                <div className={navBarClass} style={{ backgroundImage: backgroundImage }}>
                    {location.pathname == "/" ? <img src={logo} className="logoNav" alt="Logo" /> : <NavLink className="title" to="/">
                        <img src={logo} className="logoNav" alt="Logo" />
                    </NavLink>}


                    <ul className={`nav_items1 ${isOpen && "open"}`}>
                        <NavLink
                            to="/chat"
                            style={{ textDecoration: "none", color: "inherit" }}
                            onClick={closeMenu}
                        >
                            <h2 style={isQuienPage ? colorStyle : {}}>Chat</h2>
                        </NavLink>

                        <NavLink
                            style={{ textDecoration: "none", color: "inherit" }}
                            to="/quien"
                            onClick={closeMenu}
                        >
                            <h2 style={isQuienPage ? colorStyle : {}}>Nosotros</h2>
                        </NavLink>

                        <NavLink
                            style={{ textDecoration: "none", color: "inherit" }}
                            to="/chatHistory"
                            onClick={closeMenu}
                        >
                            <h2 style={isQuienPage ? colorStyle : {}}>Perfil</h2>
                        </NavLink>

                        <NavLink
                            style={{ textDecoration: "none", color: "inherit" }}
                            to="/"
                            onClick={closeMenu}
                        >
                            <h2 style={isQuienPage ? colorStyle : {}}>Inicio</h2>
                        </NavLink>

                        <div className="user-container">
                            {user ? (
                                <div>
                                    <img
                                        src={user && user.photoURL}
                                        alt="User"
                                        className="userPhoto"
                                        onClick={toggleModal}
                                    />
                                    {windowWidth < 768 && (
                                        <h2>{user && user.displayName.toUpperCase()}</h2>
                                    )}
                                </div>
                            ) : (
                                <div className="button logIn" onClick={handleOnClick}>Iniciar Sesión</div>
                            )}
                            {modal && (
                                <div className="modal" ref={modalRef}>
                                    <div className="overlay" onClick={toggleModal}></div>
                                    <div
                                        className="modal-content"
                                        style={{ backgroundColor: "black" }}
                                    >
                                        <p>Usuario: {user && user.displayName}</p>
                                        <button className="button" onClick={handleLogout}>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ul>
                    <div className={`nav_toggle1 ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                        <span className="clickable-area"></span>
                        <span className="clickable-area"></span>
                        <span className="clickable-area"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavApp;

