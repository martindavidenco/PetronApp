import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { KEY_FIRE } from "../firebase";

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

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        setUser(user);
                    } else {
                        setUser(null);
                    }
                });
            })
            .catch((error) => {
                console.log("Error al establecer la persistencia de la sesión:", error);
            });
    }, []);

    const provider = new GoogleAuthProvider();

    const call_login_google = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user);
            })
            .catch((error) => {
                console.log("Error al iniciar sesión con Google:", error);
            });
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.log("Error al cerrar sesión:", error);
            });
    };

    return (
        <UserContext.Provider value={{ user, call_login_google, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};

