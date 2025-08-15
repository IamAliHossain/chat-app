# Chat App

A **real-time chat application** built with **React, HTML, CSS** on the frontend and **Spring Boot** on the backend.  
Real-time messaging is powered by **WebSocket** and **STOMP.js**, with **MongoDB** as the database. Project also leverages **Lombok** to simplify Java code.

---

## Project Structure

- `frontend-chat/`  
  Frontend application built using React, HTML, and CSS.

- `chat-app-backend/`  
  Backend service developed with Spring Boot, using WebSocket + STOMP.js for real-time messaging and MongoDB for data storage.

---

## Features

- Real-time messaging between multiple users  
- WebSocket-based communication using STOMP protocol  
- Persistent chat history stored in MongoDB  
- Simple and responsive UI built with React, HTML, and CSS

---

## Installation

### Backend

```bash
cd chat-app-backend
# Install dependencies
./mvnw clean install

# Run the Spring Boot server
./mvnw spring-boot:run

