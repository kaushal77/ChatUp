const express = require('express');
const app = express();
const router = require('./router');
app.use(router);

const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const PORT = 5000;
var activeusers = [];

io.on('connect',(socket)=>{
    socket.on('join',({name,room,time},callback)=>{
        console.log('join room',activeusers);
        socket.join(room);      
        socket.emit('messageToClient',{message:`welcome to the room, ${name}`,name:'Admin',time});
        socket.broadcast.to(room).emit('messageToClient',{message:`${name} joined the room ${room}`,name:'Admin',time});
        activeusers = [...activeusers,name];
        console.log(activeusers,'activeusers');
        io.to(room).emit('activeUserData',activeusers);
        
    })
    socket.on('messageToServer',({message,room,name,time})=>{
        console.log(message,room);
        socket.broadcast.to(room).emit('messageToClient',{message,name,time});
    });

    socket.on('disconnected',({name,room,time})=>{
        if(name !== undefined){

            const index =  activeusers.indexOf(name);
            console.log('before splice',index,name);
            activeusers.splice(index,1);
            console.log('after splice');
            io.to(room).emit('activeUserData',activeusers);
            socket.broadcast.to(room).emit('messageToClient',{message:`${name} left the room ${room}`,name:'Admin',time});
        }
       
    });

    // socket.on('userData',(data,callback)=>{
    //     console.log(data);
    //     activeusers = [...activeusers,data];
    //     console.log(activeusers);
    // })
    //for current user->socket.emit()
    //for all user except current user -> socket.broadcast()
    //for all user - io.emit()



})

server.listen(PORT,()=>{
    console.log(`server started on port : ${PORT}`);
})