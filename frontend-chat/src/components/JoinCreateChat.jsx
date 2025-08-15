import React, { useState } from "react";
import chatIcon from "../assets/icon.png"
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi} from "../services/RoomService";
import useChatContext from "../Context/ChatContext";
import { useNavigate } from "react-router";

const JoinCreateChat = ()=> {
    const[detail, setDetail] = useState({
        roomId : "",
        userName: "",
    });

    const {roomId, userName, setCurrentUser, setRoomId, setConnected} = useChatContext(); 
    const navigate =useNavigate()

    function handleFormInputChange(event){
       setDetail({
            ...detail,
            [event.target.name] : event.target.value,
       })
    }

    function validateForm(){
        if(detail.roomId === "" || detail.userName === ""){
            toast.error("Invalid Inputn !!")
            return false;
        }
        return true;
    }

    async function joinChat(){
        
        if(validateForm()){
            // then join in the room
            try{
                const room = await joinChatApi(detail.roomId);
                toast.success("joined...")
            
                setCurrentUser(detail.userName);
                setRoomId(room.roomId)
                setConnected(true)

                navigate("/chat")
            }catch(error){
                if(error.status == 400){
                    toast.error(error.response.data);
                }
                else{
                    toast.error("Error in joining...")
                }
                console.log(error);
            }
        }
    }

    async function createRoom() {
        if (validateForm()) {
        //create room
            console.log(detail);
        // call api to create room on backend
            try {
                const response = await createRoomApi(detail.roomId);
                console.log(response);
                toast.success("Room Created Successfully !!");
                
                //now join the created room  
                setCurrentUser(detail.userName);
                setRoomId(response.roomId)
                setConnected(true)
                navigate("/chat")
                // forwaed to chatpage ...
                joinChat();
            } catch (error) {
                console.log(error);
                // console.log("Error in creating room!");
                if(error.status == 400) {
                    toast.error("Room  already exists !!");
                } 
                else {
                    toast("Error in creating room");
                }
            }
        }
    }
  

    return(
        <div className="min-h-screen flex items-center justify-center ">
            

            <div className="p-10 dark:border-gray-700 border w-full max-w-md flex flex-col gap-5 dark:bg-gray-900 rounded shadow">
                <div className="flex justify-center">
                    <img src = {chatIcon} className="h-16 w-16"></img>
                </div>

                <h1 className="text-2xl font-semibold text-center">Join Room / Create Room..</h1>
                
                {/* name div */}
                <div className="">
                    <label htmlFor ="name" className="block font-medium mb-2">
                        Your Name </label>
                    <input 
                        onChange={handleFormInputChange}
                        value={detail.userName} 
                        type="text" 
                        name="userName"
                        id="name"
                        placeholder="Enter your name..."
                        className="w-full dark:bg-gray-600 px-4 py-2 border dark:bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </input>
                </div>

                {/* Room Id div */}
                <div className="">
                    <label htmlFor ="" className="block font-medium mb-2"> Room ID / New Room ID </label>
                    <input 
                        name="roomId"
                        onChange={handleFormInputChange}
                        value={detail.roomId}
                        type="text" 
                        id="name" 
                        placeholder="Enter room id"
                        className="w-full dark:bg-gray-600 px-4 py-2 border dark:bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </input>
                </div>


                {/* Button  */}
                <div className="flex justify-center gap-8 mt-4">
                    <button 
                        onClick={joinChat}
                        className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full"> 
                        Join Room 
                    </button>
                    
                    <button 
                        onClick={createRoom}
                        className="px-3 py-2 dark:bg-green-500 hover:dark:bg-green-800 rounded-full"> 
                        Create Room
                    </button>
                </div>

            </div>
            
        </div>
        
    );
};

export default JoinCreateChat
