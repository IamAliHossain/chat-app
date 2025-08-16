import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import { baseURL } from "../config/AxiosHelper";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { getMessages } from "../services/RoomService";
import { timeAgo } from "../config/helper";

const ChatPage = () => {
    const {
        roomId, 
        currentUser, 
        connected, 
        setConnected, 
        setRoomId, 
        setCurrentUser
    } = useChatContext();
    // console.log(roomId)
    // console.log(currentUser)
    // console.log(connected)
    
    const navigate = useNavigate();
    useEffect(()=>{
        if(!connected){
            navigate("/")
        }
    }, [connected, roomId, currentUser]);


    const [messages, setMessages] = useState([
    // {
    //     content : "hello ?",
    //     sender : "Hasan Morshed",
    // },
    // {
    //     content : "hi!",
    //     sender : "Ali Hossain",
    // },
    // {
    //     content : "how are you my friend?",
    //     sender : "Hasan Morshed",
    // },
    // {
    //     content : "not bad & not good also",
    //     sender : "Ali Hossain",
    // },

]);

const [input, setInput] = useState("")
const inputRef = useRef(null)
const chatBoxRef = useRef(null)
const [stompClient, setStompClient] = useState(null)

    // page initialize : 
    // now message should be loaded 

    useEffect(() =>{
        async function loadMessages(){
            try{
                const messages = await getMessages(roomId);
                console.log(messages);
                setMessages(messages)
            }catch(error){}
        }
        if(connected){ 
            loadMessages();
        }
    }, []);


    //scroll down

    useEffect(() =>{

        if(chatBoxRef.current){
            chatBoxRef.current.scroll({
                top:chatBoxRef.current.scrollHeight,
                behavior: "smooth",
            });
        }

    }, [messages]);



    // stomp client will be initialized
        // subscribe korbe group ke
        

    useEffect(()=>{
        const connectWebSocket = ()=>{
            // sockJs object
            const sock = new SockJS(`${baseURL}/chat`);
            const client = Stomp.over(sock);
            client.connect({}, ()=>{

                setStompClient(client);
                toast.success("Connected");

                client.subscribe(`/topic/room/${roomId}`, (message) =>{
                    console.log(message);

                    const newMessage = JSON.parse(message.body);

                    setMessages((prev) => [...prev, newMessage]);

                    // rest of the work after success receiving the message
                });
            });
        };

        if(connected){ 
            connectWebSocket();
        }
        // stomp client
    }, [roomId]);


    // send message handle 
    const sendMessage = async() =>{
        if(stompClient && connected && input.trim()){
             console.log(input);
        }
        
        
        const message = {
            sender:currentUser,
            content:input,
            roomId:roomId 
        }
        // 1. Local state update
        // setMessages(prev => [...prev, message]);

         // 2. Server-এ পাঠানো
        stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
        setInput("")
    };


    // handle logout

    function handleLogout(){
        stompClient.disconnect();
        setConnected(false);
        setRoomId('');
        setCurrentUser("");
        toast.success("loged out");
        navigate('/');
    }


    return(
        <div className="">
            {/*This is header container*/}
            <header className="dark:border-gray-700 fixed h-20 w-full dark:bg-gray-900 py-5 shadow flex justify-center justify-around items-center">
                {/* Room name  container*/}
                <div>
                    <h1 className="text-xl font-semibold">
                        Room : <span> {roomId} </span>
                    </h1>
                </div>

                {/* Username container*/}
                <div>
                    <h1 className="text-xl font-semibold">
                        User : <span>{currentUser}</span>
                    </h1>
                </div>
            
                {/* Leave room  */}
                <div >
                    <button onClick={handleLogout} className="dark:bg-red-800 hover:dark:bg-red-500 px-3 py-2 rounded-full"> 
                        Leave Room</button>
                </div>
            </header>


            {/* message area  */}
            <main ref={chatBoxRef} className="py-20 px-10 w-2/3 dark:bg-slate-600 mx-auto h-screen border overflow-auto">
                {
                    messages.map((message, index) =>(
                        <div key={index} className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start" }`}>

                            <div className={` my-2 ${message.sender === currentUser ? "bg-green-800 ": "bg-gray-800"} max-w-xs  p-2 rounded`}>
                                <div className="flex flex-row gap-2">
                                        <img className="h-10 w-10" src={"https://avatar.iran.liara.run/public/18"} alt=""/>

                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-bold">{message.sender} </p>
                                        <p>{message.content} </p>
                                        <p className="text-xs text-gray-300">{timeAgo(message.timeStamp)}</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    ))
                }
            </main>


            {/* input message container  */}
            <div className="fixed bottom-4 w-full h-16">
                <div className="h-full pr-10 gap-4 flex justify-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900">
                    <input 
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}

                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    sendMessage();
                                }
                            }}
                            type="text" 
                            placeholder="Type your message here..." 
                            className="dark:border-gray-800  dark:bg-gray-800 px-5 py-2 rounded-full w-full h-full focus:outline-none"
                    />


                    <div className="flex gap-2">
                        <button className="dark:bg-purple-600 h-10 w-10 flex justify-center items-center rounded-full"> 
                            <MdAttachFile size = {20} />
                        </button>

                        <button 
                            onClick={sendMessage}
                            className="dark:bg-green-500 h-10 w-10 flex justify-center items-center rounded-full"> 
                            <MdSend size = {20} />
                        </button>
                    </div>

                </div>

            </div>
            
        </div>
    );
};

export default ChatPage;