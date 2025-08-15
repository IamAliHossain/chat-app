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


cd frontend-chat
# Install dependencies
npm install

# Start the development server
npm start


# Usage

Start the backend server.

Start the frontend React app.

Open your browser at http://localhost:3000 (or the port your React app runs on) to start chatting.


# Technologies Used

Frontend: React, HTML, CSS

Backend: Spring Boot, Lombok

Database: MongoDB

Real-time communication: WebSocket, STOMP.js
