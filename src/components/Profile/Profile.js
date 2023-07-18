import "./Profile.css";
import ChatHistory from "../ChatHistory/ChatHistory";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";





const Profile = () => {
    const { user, handleLogout, call_login_google } = useContext(UserContext);

    const navigate = useNavigate()
    const handleOnClick = () => {
        navigate('/register'); // Utilizando navigate en lugar de history.push
    };




    return (
        <div className="mainProfile">
            <div className="profileContainer">
                <div className="userProfile">
                    <div className="preferenciasContainer" >
                        <div className="photoContainer" >
                            <img src={user && user.photoURL} className="profilePhoto" />
                            <h2>{user && user.displayName.toUpperCase()}</h2>

                        </div>
                        <ChatHistory></ChatHistory>
                        <h5>Usuario:</h5>
                        {user ? (
                            <button className="button buttonProfile" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        ) : (
                            <div className="button logIn" onClick={handleOnClick}>Iniciar Sesión</div>
                        )}
                    </div>

                </div>

            </div>


        </div>
    );
};

export default Profile;
