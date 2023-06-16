import React from 'react';
import './register.css';
import logo from "../../assets/logo.png"
import { initializeApp } from "firebase/app";
import { NavLink } from 'react-router-dom';
import { KEY_FIRE } from '../../firebase';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Register = () => {
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

    const auth = getAuth();
    const handleInputBlur = (event) => {
        const input = event.target;
        if (input.value) {
            input.classList.add('used');
        } else {
            input.classList.remove('used');
        }
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
                console.log(user)
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
            <hgroup>
                <h1>Accede a tu cuenta para empezar a charlar con Doña Petronapp</h1>
                <h3>Registrarse / Iniciar sesion</h3>
            </hgroup>
            <form>
                {/* <div className="group">
                    <input type="text" onBlur={handleInputBlur} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Name</label>
                </div>
                <div className="group">
                    <input type="email" onBlur={handleInputBlur} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Email</label>
                </div> */}
                <NavLink to="/chat"> <button type="button" className="button2 buttonBlue" onClick={call_login_google}>
                    Iniciar sesion con Google
                    <div className="ripples buttonRipples">
                        <span className="ripplesCircle"></span>
                    </div>
                </button></NavLink>
               
            </form>
            <footer>
                <a href="http://www.polymer-project.org/" target="_blank">
                    <img src={logo} style={{ width: "270px", height: "120px" }} />
                </a>
                <p>¿Queres saber <NavLink to="/quien" target="_blank">quienes somos?</NavLink></p>
            </footer>
        </div>
    );
};

export default Register;
