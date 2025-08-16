package com.substring.chat.controllers;

import com.substring.chat.entities.Message;
import com.substring.chat.entities.Room;
import com.substring.chat.playload.MessageRequest;
import com.substring.chat.repositories.RoomRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import java.beans.ConstructorProperties;
import java.time.LocalDateTime;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {



    private RoomRepository roomRepository;

//    public ChatController(RoomRepository roomRepository){
//
//        this.roomRepository = roomRepository;
//    }

    // Updated Code for real-time chat for different roomId
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(RoomRepository roomRepository, SimpMessagingTemplate messagingTemplate){
        this.roomRepository = roomRepository;
        this.messagingTemplate = messagingTemplate;
    }


    // for sending & receiving messages
//    @MessageMapping("sendMessage/{roomId}") // /app/sendMessage/roomId
//    @SendTo("topic/room/{roomId}") // client will subscribe here
//    public Message sendMessage(
//            @DestinationVariable String roomId,
//            // message e ja ja nite chai like sender, receiver, roomId
//            @RequestBody MessageRequest request
//    ) {
//
//        Room room = roomRepository.findByRoomId(request.getRoomId());
//
//        Message message = new Message();
//        message.setContent(request.getContent());
//        message.setSender(request.getSender());
//        message.setTimeStamp(LocalDateTime.now());
//
//        if(room != null){
//            room.getMessages().add(message);
//            roomRepository.save(room);
//        }
//        else{
//            throw new RuntimeException("room not found!");
//        }
//
//        return message;


    // Updated Code for real-time chat for different roomId
    @MessageMapping("/sendMessage/{roomId}") // client sends here
    public void sendMessage(@DestinationVariable String roomId, MessageRequest request) {
        Room room = roomRepository.findByRoomId(request.getRoomId());

        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setTimeStamp(LocalDateTime.now());

        if(room != null){
            room.getMessages().add(message);
            roomRepository.save(room);
        } else {
            throw new RuntimeException("room not found!");
        }

        // broadcast dynamically to this room
        messagingTemplate.convertAndSend("/topic/room/" + roomId, message);
    }
}
