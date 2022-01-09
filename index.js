const express = require('express');
const app = express();
const router = require('./router');
app.use(router);

const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const PORT = 5000;


io.on('connect',(socket)=>{
    socket.on('join',({name,room},callback)=>{
        console.log('join room');
        socket.join(room);      
        socket.emit('messageToClient',{message:`welcome to the room, ${name}`,name:'Admin'});
        socket.broadcast.to(room).emit('messageToClient',{message:`${name} joined the room`,name:'Admin'});
    })
    socket.on('messageToServer',({data,room,name})=>{
        console.log(data);
        socket.broadcast.to(room).emit('messageToClient',{message:data, name:name});
    });

    //for current user->socket.emit()
    //for all user except current user -> socket.broadcast()
    //for all user - io.emit()



})

server.listen(PORT,()=>{
    console.log(`server started on port : ${PORT}`);
})