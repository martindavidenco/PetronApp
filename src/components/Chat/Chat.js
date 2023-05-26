import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
    const [userMessages, setUserMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const userMessage = {
                id: Date.now(),
                message: newMessage,
                isUserMessage: true,
            };
            setUserMessages((prevMessages) => [...prevMessages, userMessage]);
            setNewMessage('');

            // Emular respuesta de PetronApp después de 1 segundo
            setTimeout(() => {
                const petronappMessage = {
                    id: Date.now() + 1,
                    message:
                        "Hola! soy PetronApp, me encantaría poder ayudarte, lamentablemente todavía estoy en desarrollo y no puedo contestarte.",
                    isUserMessage: false,
                };
                setUserMessages((prevMessages) => [...prevMessages, petronappMessage]);
            }, 1000);
        }
    };

    return (
        <div className="mainChat">
            <div className="oldChats">
                Últimos chats
                <div>¿Cómo hacer asado?</div>
                <div>¿Qué condimentos van mejor con el puré?</div>
                <div>¿Me das recetas orientales que pueda hacer con arroz?</div>
            </div>
            <div className="chatContainer">
                <div className="chat">
                    {userMessages.map((message) => (
                        <div
                            key={message.id}
                            className={message.isUserMessage ? 'userMessage' : 'petronappMessage'}
                        >
                            {message.message}
                        </div>
                    ))}
                </div>
                <div className="inputContainer">
                    <label className="button">Chatea con PetronApp</label>
                    <input
                        className="input"
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button className="sendButton" onClick={handleSendMessage}>
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;

