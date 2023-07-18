import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { doc, getDoc, getFirestore,deleteDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserProvider";
import "./ChatHistoryDetail.css"
const ChatHistoryDetail = () => {
    const [chatSelected, setChatSelected] = useState(null);
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const userId = user.uid
    const [chats, setChats] = useState([]);

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
    const deleteChat = async (chatId) => {
        try {
          const db = getFirestore();
          const userId = user.uid;
          const chatDocRef = doc(db, 'chats', userId, 'userChats', chatId);
          await deleteDoc(chatDocRef);
          console.log('Chat deleted successfully');
          setChatSelected(null); // Establecer chatSelected en null después de borrar el chat
        } catch (error) {
          console.error('Error deleting chat:', error);
        }
      }
    useEffect(() => {
        getChat();
    }, [id]);

    if (chatSelected === null) {
        return <div>Loading...</div>; // Opcional: mostrar un indicador de carga mientras se obtienen los datos del chat
    }

    return (
        <div className="detailContainer">

            {chatSelected ? (
                <div className="containerDetail">
                    <div className="titleChatSaved">
                        <h2>{chatSelected.titleChat}</h2>
                        <h3>Chat del: {chatSelected.Date}</h3>
                        <button className='buttonDelete' onClick={() => deleteChat(chatSelected.id)}>Borrar Chat</button> 
                    </div>
                    <ul>
                        {chatSelected.userMessages.map((message, index) => (
                            (index !== 0 && <li key={index}>{message}</li>)
                        ))}
                    </ul>
                </div>
            ) : (
                <div>Chat not found</div>
            )}
        </div>
    );
};

export default ChatHistoryDetail;
