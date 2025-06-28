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
    socket.on('mensagem',(msg)=>{
        console.log('Mensagem recebida: ',msg);//Receber mensagem
        io.emit('mensagem',msg);//Enviar mensagem para todos os clientes
    });
});
httpServer.listen(3000,()=>{
    console.log('Servidor rodando na porta 3000');
});
