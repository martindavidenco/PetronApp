import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import './Chat.css';

const API_KEY = "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";


const Chat = () => {
    const { user } = useContext(UserContext);
 
    user ?console.log(user.displayName) :console.log("user.displayName")
   
    const [userMessages, setUserMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    const systemMessage = {
        role: "system",
        content:  `Eres la reencarnacion de doña petrona. Tu objetivo es ayudar a cocinar, sugerir recetas, ingredientes y mejorar el conocimiento de todos, tu primer mensaje debe ser breve y de bienvenida hacia el usuario ${user && user.displayName} . Tu jerga y habla debe ser argentina. Te comportas como una abuelita con habla un poco informal (tu objetivo es comunicarte bien con la gente en sus hogares de argentina), amorosa y con sentido del humor. Acordate de escribir bien `
    };


    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            const userMessage = {
                id: Date.now(),
                message: newMessage,
                isUserMessage: true,
            };
            setUserMessages((prevMessages) => [...prevMessages, userMessage]);
            setNewMessage('');

            // Llama a processMessageToChatGPT aquí
            await processMessageToChatGPT([...userMessages, userMessage]);
        }
    };


    async function processMessageToChatGPT(chatMessages) {
        setIsTyping(true);
        const apiMessages = chatMessages.map((messageObject) => {
            const role = messageObject.isUserMessage ? "user" : "assistant";
            return { role: role, content: messageObject.message };
        });

        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [systemMessage, ...apiMessages],
        };
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(apiRequestBody),
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0) {
                const petronappMessage = {
                    id: Date.now() + 1,
                    message: data.choices[0].message.content,
                    isUserMessage: false,
                };
                setUserMessages((prevMessages) => [...prevMessages, petronappMessage]);
            }
        } catch (error) {
            console.error("Error processing message:", error);
        }

        setIsTyping(false);
        
    }

    return (
        <div className="mainChat">
            <div className="oldChats">
             Últimos chats de {user && user.displayName}
                <div>¿Cómo hacer asado?</div>
                <div>¿Qué condimentos van mejor con el puré?</div>
                <div>¿Me das recetas orientales que pueda hacer con arroz?</div>
            </div>
            <div className="chatContainer">
                <div className="chat">
                    <div>
                        {userMessages.map((message) => (
                            <div
                                key={message.id}
                                className={message.isUserMessage ? "userMessage" : "assistantMessage"}
                            >
                                {message.message}
                            </div>
                        ))}
                        {isTyping && <div className="typingIndicator">PetronApp is typing</div>}
                    </div>
                </div>
                <div className="inputContainer">
                    <input
                        className="input"
                        type="text"
                        placeholder="Type message here"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button className="button" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;



