import express from "express";
import { Server } from "socket.io";
import {createServer} from "http";


const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credentials:true,
    }
});


app.get("/",(req,res)=>{
    res.send("hello world");
})

io.on("connection",(socket)=>{
    console.log("User Connected");
    console.log("ID",socket.id);
})



server.listen(3000,()=>{
    console.log("server is running in port 3000");
})