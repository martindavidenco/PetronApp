import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import face from "../../assets/facebook.png"
import insta from "../../assets/instagram.png"
import tiktok from "../../assets/tik-tok.png";
import { Link } from 'react-router-dom';
import Chat from '../Chat/Chat';
import { saveChat } from '../Chat/Chat';
import { getFirestore, collection, getDocs , doc } from 'firebase/firestore';


import 'firebase/firestore';


import "./NavBar.css";

const NavBar = ({ onToggleMenu, firestore, titleChat, userMessages, welcomeMessage, showTitleInput  }) => {
  const [chats, setChats] = useState([]);


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


  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (user) {
          const db = getFirestore();
          const userId = user?.uid; // Verificar si user existe antes de acceder a su propiedad uid

          const chatRef = collection(db, 'chats', userId, 'userChats');
          const snapshot = await getDocs(chatRef);
          const fetchedChats = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setChats(fetchedChats);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [user]);



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
          <button className='button' onClick={showTitleInput}>Guardar Chat</button>

          {/* <NavLink className="navegacion2" style={{ textDecoration: 'none', color: 'inherit' }} to="/"><h2 className="buttonChatNav">Inicio</h2></NavLink>
          <NavLink className="navegacion2" style={{ textDecoration: 'none', color: 'inherit' }} to="/preguntas"><h2 className="buttonChatNav">FAQS</h2></NavLink>
          <NavLink className="navegacion2" style={{ textDecoration: 'none', color: 'inherit' }} to="/chatHistory"><h2 className="buttonChatNav">Perfil</h2></NavLink>
          <NavLink className="navegacion2" style={{ textDecoration: 'none', color: 'inherit' }} to="/quien"><h2 className="buttonChatNav">Nosotros</h2></NavLink> */}

          <div className='historyCointainer1' >


            {/* <h2>Historial de chats:</h2> */}
            <h5 style={{ color: "#f2f2f2" }}>Chats guardados:</h5>
            <div className='chatsContainer1'>
              {chats.map((chat) => (
                <div key={chat.id} className='historyCard1'>
                  <Link
                    style={{ textDecoration: 'none', color: '#f2f2f2' }} to={`/chatHistory/${chat.id}`}>
                    <h3> {chat.titleChat}</h3>
                    {/* <h3>Chat del: {chat.Date}</h3> */}
                    {/* {chat.userMessages && chat.userMessages.length >= 2 && (
                <h4>Mensaje inicial: {chat.userMessages[1]}</h4>
            )} */}


                  </Link>
                  {/* <button className='buttonDelete' onClick={() => deleteChat(chat.id)}>Borrar Chat</button> */}

                </div>
              ))}

            </div>

          </div>

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
