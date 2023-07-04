import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { UserContext } from "../../context/UserProvider";

const ChatHistoryDetail = () => {
    const [chatSelected, setChatSelected] = useState(null);
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const userId = user.uid

    const getChat = async () => {
        try {
            const db = getFirestore();
            const query = doc(db, "chats", userId, "userChats", id);
            const response = await getDoc(query);
            if (response.exists()) {
                setChatSelected({ id: response.id, ...response.data() });
            } else {
                console.log("Chat not found");
                setChatSelected(null); // Establecer chatSelected en null si el chat no se encuentra
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getChat();
    }, [id]);

    if (chatSelected === null) {
        return <div>Loading...</div>; // Opcional: mostrar un indicador de carga mientras se obtienen los datos del chat
    }

    return (
        <div style={{ height: "100vh", backgroundColor: "#f2f2f2" }}>
            <h2>Chat History Detail</h2>
            {chatSelected ? (
                <>
                    <h3>Chat del: {chatSelected.title}</h3>
                    <ul>
                        {chatSelected.userMessages.map((message, index) => (
                            (index !== 0 && <li key={index}>{message}</li>)
                        ))}
                    </ul>
                </>
            ) : (
                <div>Chat not found</div>
            )}
        </div>
    );
};

export default ChatHistoryDetail;
