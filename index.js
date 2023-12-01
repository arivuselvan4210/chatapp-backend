const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIO = require("socket.io");
const dotenv = require("dotenv");

// Load environment variables from a .env file
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import your custom router modules
const authRouter = require("./router/router");
const massageRouter = require("./router/massageRouer");

// Define routes for authentication and messages
app.use("/api/auth", authRouter);
app.use("/api/mas", massageRouter);

// Start the Express server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Create a Socket.io server and attach it to the Express server
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true,
  },
});

// Map to store online users and their socket connections
const onlineUsers = new Map();

// Handle WebSocket (Socket.io) connections
io.on("connection", (socket) => {
  // Handle "add-user" event to associate a user with their socket
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  // Handle "send-mas" event to send messages to specific users
  socket.on("send-mas", (data) => {
    console.log(data);
    const recipientSocketId = onlineUsers.get(data.from);

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("msg-recive", data.massage);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    // Remove the user from the onlineUsers map
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
