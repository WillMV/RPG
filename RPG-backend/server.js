import express from "express";
import http from "http";
import * as socket from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new socket.Server(httpServer,{cors: {
    origin: "http://localhost:5173", // ou use um array se quiser permitir múltiplas origens
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection',(socket)=>{
    console.log('Um Cliente se conectou',socket.id); //Log online
    socket.on('disconnect',()=>{
        console.log('Cliente desconctado',socket.id);//Log offline
    });
    socket.on('coords',(coords)=>{
        socket.emit('coords',(x,y));
    });
        
});
httpServer.listen(3000,()=>{
    console.log('Servidor rodando na porta 3000');
});
