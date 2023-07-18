import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { UserContext } from "../../context/UserProvider";
import "./ChatHistory.css"
import { Link } from 'react-router-dom';
import 'firebase/firestore';

const ChatHistory = () => {
    const [chats, setChats] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                if (user) {
                    const db = getFirestore();
                    const userId = user?.uid; // Verificar si user existe antes de acceder a su propiedad uid

                    const chatRef = collection(db, 'chats', userId, 'userChats');
                    const snapshot = await getDocs(chatRef);
                    const fetchedChats = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setChats(fetchedChats);
                }
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, [user]);






    const deleteChat = async (chatId) => {
        try {
            const db = getFirestore();
            const userId = user.uid;
            const chatDocRef = doc(db, 'chats', userId, 'userChats', chatId);
            await deleteDoc(chatDocRef);
            setChats(chats.filter((chat) => chat.id !== chatId));
            console.log('Chat deleted successfully');
        } catch (error) {
            console.error('Error deleting chat:', error);
        }
    };

    return (
        <div className='historyCointainer' >


            {/* <h2>Historial de chats:</h2> */}
            <h5 style={{color:"#00000"}}>Chats guardados:</h5>
            <div className='chatsContainer'>
                {chats.map((chat) => (
                    <div key={chat.id} className='historyCard'>
                        <Link
                            style={{ textDecoration: 'none', color: '#f2f2f2' }} to={`/chatHistory/${chat.id}`}>
                            <h3> {chat.titleChat}</h3>
                            {/* <h3>Chat del: {chat.Date}</h3> */}
                            {/* {chat.userMessages && chat.userMessages.length >= 2 && (
                            <h4>Mensaje inicial: {chat.userMessages[1]}</h4>
                        )} */}


                        </Link>
                        {/* <button className='buttonDelete' onClick={() => deleteChat(chat.id)}>Borrar Chat</button> */}

                    </div>
                ))}

            </div>

        </div>
    );
};

export default ChatHistory;
