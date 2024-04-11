import express from "express";

import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.js";
import chatRouts from "./routes/chat.js";

dotenv.config({ path: "./.env" });
const mongoUri = process.env.MONGO_URI;

const app = express();
connectDB(mongoUri);


app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/chat", chatRouts);

app.get("/", (req, res) => {
  const name = req.query.name || "World";

  res.send(`Hello ${name}!`);
});
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("server is running in post 3000");
});
