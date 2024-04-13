import express from "express";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";

import adminRoutes from "./routes/admin.js";
import chatRouts from "./routes/chat.js";
import userRoutes from "./routes/user.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";

dotenv.config({ path: "./.env" });
const mongoUri = process.env.MONGO_URI;

export const userSocketIDs = new Map();

connectDB(mongoUri);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const app = express();
const server = createServer(app);
const io = new Server(server, {});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:4173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRouts);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  const name = req.query.name || "World";

  res.send(`Hello ${name}!`);
});

io.on("connection", (socket) => {
  const user = {
    _id: "aa",
    name: "names",
  };

  userSocketIDs.set(user._id.toString(), socket.id);
  console.log("a user connected", socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    console.log("Received NEW_MESSAGE event:", { chatId, members, message });

    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };
    const membersSocket = getSockets(members);

    io.to(membersSocket).emit(NEW_MESSAGE, {
      chat: chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    console.log("new message", messageForRealTime);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});
app.use(errorMiddleware);

server.listen(3000, () => {
  console.log("server is running in post 3000");
});
