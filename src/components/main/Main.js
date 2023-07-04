import "./Main.css"
import play from "../../assets/boton-de-play.png"
import google from "../../assets/googlePlay.png"
import { NavLink } from "react-router-dom"
import React from 'react';
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import logoMain from "../../assets/logoMain.png";


const Main = () => {
    const { user } = useContext(UserContext);
    
    return (<>

        <div className="mainContainer">
            <div className="welcome">

                <img src={logoMain} className="logoMain" />


                <div className="containerButton">
                    { <div className="buttonMain"><img src={play} width="20px" /> Ver Tutorial</div> }
                    {user == null ? <NavLink to="/register"><button className="button"> ir al chat</button></NavLink> :
                        <NavLink to="/chat"><button className="button" > ir al chat</button></NavLink>}
                    {/* <div style={{ display: "flex", flexDirection: "column" }}> <div className="buttonMain"><img src={google} width="121px" />
                    </div>
                    </div> */}
                </div>
            </div>
        </div>
    </>
    )
}

export default Main