import "./Main.css"
import petrona from "../../assets/petrona.png"
import { NavLink } from "react-router-dom"
import React from 'react';

const Main = () => {

    
    return (
        <div className="mainContainer">
                <div className="welcome">
                    <h4>¡Bienvenido a PetronApp, tu asistente culinario personalizado y la puerta de entrada al mundo de la cocina de la mano de la legendaria Doña Petrona!</h4>
                    <div className="textImage">
                        <p>¡Imaginate tener a Doña Petrona, la famosa cocinera reconocida en todo el mundo, a tu lado mientras cocinás. PetronApp es la aplicación revolucionaria que te acerca a la sabiduría y experiencia de Doña Petrona, directo desde tu dispositivo.

                            ¿Y qué podés hacer con PetronApp? ¡Prácticamente de todo! Mandale los ingredientes que tenés en tu alacena y Doña Petrona te va a sorprender con recetas deliciosas que podés preparar con ellos. ¿Tenés pollo, papas y cebolla? Tranquilo, Doña Petrona te cuenta cómo convertir esos ingredientes en una cena familiar para chuparse los dedos.

                            Pero eso no es todo. Doña Petrona no solo te da las recetas, sino que también te ayuda a mejorarlas. La inteligencia artificial está repleta de conocimientos de libros de cocina, así que te da consejos y sugerencias para llevar tus platos al siguiente nivel. ¿Necesitás ajustar las cantidades de los ingredientes? ¿Querés agregarle ese toque especial? Doña Petrona está ahí para acompañarte en cada paso.</p>
                        <img src={petrona} />
                    </div>
                <div className="containerButton"><NavLink to="/chat"><button className="button"> + Nuevo chat con PetronApp</button></NavLink> <NavLink to="/ingredientes"><button className="button">Selector de ingredientes</button></NavLink></div> 
                </div>
        </div>
    )
}

export default Main