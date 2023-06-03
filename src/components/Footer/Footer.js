import React from 'react';
import './Footer.css'; // Importar el archivo CSS
import logo from "../../assets/logoMain.png"
import face from "../../assets/facebook.svg"
import insta from "../../assets/instagram.svg"
import whatsapp from "../../assets/whatsapp.svg"
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">

                <div className="row">
                    <div className="footer-col1">
                        <img className="logo" src={logo} alt="PetronApp-Logo" />
                    </div>

                    <div className="footer-col">
                        <h4>Nosotros</h4>
                        <ul>
                            <li>
                                <a href="#">Quienes Somos</a>
                            </li>
                            <li>
                                <a href="#">Politica de Privacidad</a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Necesitas Ayuda?</h4>
                        <ul>
                            <li>
                                <a href="#">FAQ</a>
                            </li>
                            <li>
                                <a href="#">Tutorial</a>
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

                                <img src={whatsapp} alt="youtube" className="fab fa-youtube" />
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