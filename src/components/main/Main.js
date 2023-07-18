import "./Main.css"
import play from "../../assets/boton-de-play.png"
import google from "../../assets/googlePlay.png"
import { NavLink, useNavigate } from "react-router-dom";
import React from 'react';
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import logoMain from "../../assets/main.svg";


const Main = () => {
    const { user, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate('/register'); // Utilizando navigate en lugar de history.push
    };

    return (<>

        <div className="mainContainer">
            <div className="welcome">

                <div className="titleContainer" >
                    <h2 className="descubri">¡Descubrí el sabor de la cocina con Doña Petronapp! </h2>
                    <p className="subtitle " style={{ marginTop: "" }}>
                        Con nuestra app podés sacarte todas las dudas culinarias, aprender técnicas nuevas y tener acceso a recetas increibles.
                        No importa si estás arrancando o sos crack,
                        Doña Petronapp es tu compañera fiel.
                        ¡Sumate y despertá tu creatividad culinaria!</p>
                    <div className="containerButton">
                        {/* <div className="buttonMain"><img src={play} width="20px" /> Ver Tutorial</div>*/}
                        {user == null ? <NavLink to="/register"><button className="button"> ir al chat</button></NavLink> :
                            <NavLink to="/chat"><button className="button" > ir al chat</button></NavLink>}
                        {/* {user ? (
                            <button className="button " onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        ) : (
                            <div className="button" onClick={handleOnClick}>Iniciar Sesión</div>
                        )} */}
                        {/* <div style={{ display: "flex", flexDirection: "column" }}> <div className="buttonMain"><img src={google} width="121px" />
                    </div>
                </div> */}
                    </div>

                </div>


            </div>
            <div  className="logoMain" />
        </div>
    </>
    )
}

export default Main