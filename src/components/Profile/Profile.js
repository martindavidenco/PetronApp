import "./Profile.css";
import ChatHistory from "../ChatHistory/ChatHistory";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserProvider";
import { getFirestore, doc, updateDoc, setDoc, getDoc, onSnapshot } from "firebase/firestore";





const Profile = () => {
    const { user, handleLogout, call_login_google } = useContext(UserContext);
    const options = ["Vegetariano/a", "Vegano/a", "Fitness", "Celíaco/a", "Diabetes", "Sin preferencias"];
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [preferences, setPreferences] = useState([]);

    const savePreferences = async () => {
        if (user) {
            const db = getFirestore();
            const userChatsRef = doc(db, "chats", user.uid, "userChats", "preferences");

            try {
                if (selectedOptions.length > 0) {
                    await setDoc(userChatsRef, {
                        preferences: selectedOptions
                    });
                    console.log("Preferencias guardadas exitosamente.");
                } else {
                    await updateDoc(userChatsRef, {
                        preferences: []
                    });
                    console.log("Preferencias eliminadas exitosamente.");
                }
            } catch (error) {
                console.error("Error al guardar las preferencias:", error);
            }
        }
    };
    const deletePreference = async (preference) => {
        if (user) {
            const db = getFirestore();
            const userChatsRef = doc(db, "chats", user.uid, "userChats", "preferences");

            try {
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const preferences = userChatsSnapshot.data().preferences || [];
                    const updatedPreferences = preferences.filter((p) => p !== preference);

                    await updateDoc(userChatsRef, {
                        preferences: updatedPreferences
                    });

                    console.log("Preferencia eliminada exitosamente.");
                }
            } catch (error) {
                console.error("Error al eliminar la preferencia:", error);
            }
        }
    };


    useEffect(() => {
        const fetchPreferences = async () => {
            if (user) {
                const db = getFirestore();
                const userChatsRef = doc(db, "chats", user.uid, "userChats", "preferences");

                const unsubscribe = onSnapshot(userChatsRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.data();
                        setPreferences(data.preferences || []);
                    } else {
                        setPreferences([]);
                    }
                });

                return () => unsubscribe();
            }
        };

        fetchPreferences();
    }, [user]);
    const handleOptionSelect = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div className="mainProfile">
            <div className="profileContainer">
                <div className="userProfile">
                    <div className="preferenciasContainer" >
                        <div>
                            <img src={user && user.photoURL} alt="User" className="userPhoto" />
                            <h2>{user && user.displayName.toUpperCase()}</h2>

                        </div>
                        <div>Tus preferencias:</div>
                        {preferences.length > 0 ? (
                            <ul>
                                {preferences.map((preference) => (
                                    <li key={preference}>
                                        {preference}
                                        <button onClick={() => deletePreference(preference)}>X</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay preferencias guardadas.</p>
                        )}
                    </div>
                    <div>
                        Selecciona tus preferencias alimenticias para personalizar a Doña PetronApp:
                        <div className="optionsContainer">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    className={`option ${selectedOptions.includes(option) ? "selected" : ""}`}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button className="buttonSave" onClick={savePreferences}>
                    Guardar Preferencias
                </button>
                {user ? (
                    <button className="button" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                ) : (
                    <div className="button logIn" onClick={call_login_google}>
                        Iniciar Sesión
                    </div>
                )}
            </div>

            <ChatHistory></ChatHistory>
        </div>
    );
};

export default Profile;
