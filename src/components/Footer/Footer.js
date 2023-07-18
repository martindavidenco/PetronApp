import React from 'react';
import './Footer.css'; // Importar el archivo CSS
import logo from "../../assets/logoMain.png"
import face from "../../assets/facebook.png"
import insta from "../../assets/instagram.png"
import tiktok from "../../assets/tik-tok.png"
import { NavLink, useLocation,useNavigate } from 'react-router-dom';
const Footer = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const handleOnClick = () => {
      navigate('/'); // Utilizando navigate en lugar de history.push
    };
    return (
        <footer className="footer">
            <div className="container">

                <div className="row">
                    <div className="footer-col1">
                       <div className="title" >
                            <img src={logo} onClick={handleOnClick} className="logoNav" alt="Logo" />
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 style={{marginRight:"40%"}}>Nosotros</h4>
                        <ul className='ulFooter'>
                            <li>
                                {location.pathname == "/quien" ? <h2 className="navegacionFooter" >Quienes somos</h2> : <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/quien"><h2 className="navegacionFooter" >Quienes somos</h2></NavLink>}
                               
                            </li>
                            <li>
                            {location.pathname == "/quien" ? <h2 className="navegacionFooter" >Politica de Privacidad</h2> : <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/quien"><h2 className="navegacionFooter" >Politica de Privacidad</h2></NavLink>}
                            </li>
                        </ul>
                    </div>
                   
                    <div className="footer-col">
                        <h4 style={{marginRight:"20%"}}>Ayuda</h4>
                        <ul className='ulFooter'>
                            <li>
                                <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/preguntas"><h2 className="navegacionFooter" >FAQS</h2></NavLink>
                            </li>
                            <li>
                                <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/tutorial"><h2 className="navegacionFooter" >Tutorial</h2></NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Seguinos</h4>
                        <div className="social-links">
                            <a href="#">
                                <img src={face} alt="Facebook" className="fab fa-facebook-f" />
                            </a>
                            <a href="#">

                                <img src={tiktok} alt="youtube" className="fab fa-youtube" />
                            </a>
                            <a href="#">

                                <img src={insta} alt="instagram" className="fab fa-instagram" />
                            </a>

                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;