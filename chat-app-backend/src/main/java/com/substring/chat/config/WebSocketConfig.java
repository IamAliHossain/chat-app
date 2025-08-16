package com.substring.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker

public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {


    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

//        client /topic ke subsricbe korte chay & parbe cause prefix "/topic" set kora ache
//        and server "/topic/messages " ei route e message deliver korte parbe
//        but client jodi  /test/message ke subscribe korte chay tokhon server message dite parbe na cause prefix hoite hobe /topic
//        kintu prefix hoicche /test
//        that means client ke obviously /topic prefix kei subscribe korte hobe
        config.enableSimpleBroker("/topic");


        // server-side method controll korar jonnno prefix set kora hoy
        config.setApplicationDestinationPrefixes("/app");

        // server-side : @MessagingMapping("/chat")
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        // client /chat endpoint e connection establish korbe
        registry.addEndpoint("/chat")
                .setAllowedOrigins("http://localhost:5173")
                .withSockJS();
    }

    // chat endpoint e connection establish hobe
}
