import React from 'react';
import './register.css';
import icono from "../../assets/google.svg"
import { initializeApp } from "firebase/app";
import { NavLink } from 'react-router-dom';
import { KEY_FIRE } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Register = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [option, setOption] = useState("inicioSesion");

    const firebaseConfig = {
        apiKey: KEY_FIRE,
        authDomain: "petronapp-5f16f.firebaseapp.com",
        projectId: "petronapp-5f16f",
        storageBucket: "petronapp-5f16f.appspot.com",
        messagingSenderId: "727769028468",
        appId: "1:727769028468:web:39860c038fcbcaedd07e21",
        measurementId: "G-EN5E4D8BGZ"
    };
    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    const handleInputBlur = (event) => {
        const input = event.target;
        if (input.value) {
            input.classList.add('used');
        } else {
            input.classList.remove('used');
        }
    };


    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('User created');
                userCredential.user.displayName = userName
                userCredential.user.photoURL = "https://i.pinimg.com/736x/b1/6c/f3/b16cf30a73e39f9b8819bd9b61ff6b09.jpg"
                const user = userCredential.user;
                // Llamamos a la función para actualizar el nombre de usuario
                console.log(user);
            })
            .catch((error) => {
                console.log(error);

            });
    };






    const handleAnimationEnd = (event) => {
        const button = event.target;
        button.classList.remove('is-active');
    };

    function call_login_google() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    const user = auth.currentUser;
    if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
    }
    return (
        <div className="registerForm">
            <hgroup style={{ display: "flex", flexDirection: "column", }}>
                <h1>Accede a tu cuenta para empezar a charlar con Doña Petronapp</h1>
                {/* <h3 style={{ display: 'flex', alignSelf: "center", justifyContent: "space-between" }}>
                    <h3 onClick={() => setOption("registro")}>Registrarse  /</h3>
                    <h3 onClick={() => setOption("inicioSesion")}> / Iniciar sesión</h3>
                </h3> */}
            </hgroup>

            <form>
                {option === "registro" && (
                    <div >

                        <h1>Registrate en Doña Petronapp!</h1>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <h4>¿Ya tenés una cuenta?  </h4>
                            <h3 onClick={() => setOption("inicioSesion")}>Iniciar sesión</h3>
                        </div>


                        <NavLink to="/chat">
                            <button type="button" className="button2 buttonBlue" onClick={call_login_google}>
                                <img src={icono} style={{height:"30px", marginRight:"20px"}}/>
                                Registro rápido con Google
                                <div className="ripples buttonRipples">
                                    <span className="ripplesCircle"></span>
                                </div>
                            </button>
                        </NavLink>
                        <div className="group">
                            <input
                                onBlur={handleInputBlur}
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Nombre</label>
                        </div>
                        <div className="group">
                            <input
                                type="email"
                                onBlur={handleInputBlur}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Email</label>
                        </div>
                        <div className="group">
                            <input
                                type="password"
                                onBlur={handleInputBlur}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Contraseña</label>
                        </div>
                    </div>
                )}

                {option === "inicioSesion" && (
                    <div>
                        <h1>Inicia sesion en Doña Petronapp!</h1>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <h4>¿No tenés una cuenta?  </h4>
                            <h3 onClick={() => setOption("registro")}>Registrarse </h3>
                        </div>
                        <NavLink to="/chat">
                            <button type="button" className="button2 buttonBlue" onClick={call_login_google}>
                                Iniciar sesión con Google
                                <div className="ripples buttonRipples">
                                    <span className="ripplesCircle"></span>
                                </div>
                            </button>
                        </NavLink>
                        <div className="group">
                            <input
                                type="email"
                                onBlur={handleInputBlur}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Email</label>
                        </div>
                        <div className="group">
                            <input
                                type="password"
                                onBlur={handleInputBlur}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Contraseña</label>
                        </div>
                    </div>
                )}

                <NavLink>
                    <button
                        type="button"
                        className="button2 buttonBlue"
                        onClick={handleCreateAccount}
                    >
                        {option === "registro" ? "Registrarse" : "Iniciar sesión"}
                        <div className="ripples buttonRipples">
                            <span className="ripplesCircle"></span>
                        </div>
                    </button>
                </NavLink>
            </form>
        </div>
    );
};

export default Register;
