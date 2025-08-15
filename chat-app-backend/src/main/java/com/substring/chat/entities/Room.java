package com.substring.chat.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Room {
    private String id; // mongodb database will generate it automatically
    private String roomId; // user will give the roomId as wish
    private List<Message> messages = new ArrayList<>();

}
