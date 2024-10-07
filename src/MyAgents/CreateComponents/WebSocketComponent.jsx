import { useEffect, useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import ReconnectingWebSocket from 'reconnecting-websocket';


const WebSocketComponent = ({agentID}) => {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const { getToken } = useAuth();

    useEffect(() => {
        handleWebSocket();
    }, []);
    const handleWebSocket=async()=>{
        const token = await getToken();
        const socket = new ReconnectingWebSocket(`ws://b51b-135-148-164-94.ngrok-free.app/chat/v1/${agentID}/82ebaa67-1771-44a8-8159-c13079a425f4`);
        socket.addEventListener('open', (event) => {
            console.log('WebSocket is open now.');
            socket.send(JSON.stringify({ type: 'greeting', payload: 'Hello Server!' }));
        });
        socket.addEventListener('message', (event) => {
            console.log('Message from server ', event.data);
            setMessages(prevMessages => [...prevMessages, event.data]);
        });
        socket.addEventListener('close', (event) => {
            console.log('WebSocket is closed now.');
        });
        socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });
        return () => {
            socket.close();
        };
    }

    // return (
    //     <div>
    //         <h1>WebSocket Chat</h1>
    //         <ul>
    //             {messages.map((message, index) => (
    //                 <li key={index}>{message}</li>
    //             ))}
    //         </ul>
    //     </div>
    // );
};

export default WebSocketComponent;
