const express = require('express');
const app = express();
const router = require('./router');
const path = require("path");

const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const { disconnect } = require('process');
const io = socketio(server);
const PORT = process.env.PORT || 5000;
var activeusers = [];
var users = [];
var roomDetails = {};

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    //console.log(users,'use');
    const existingUser = users.findIndex((user) => user.room === room && user.name === name);
    //console.log(existingUser,'lllllll');
    if(existingUser >= 0) {
        //console.log(existingUser,'mmmmmmmmm');
        return {error: "username is taken"};
    }
    const user = {id,name,room};
 
    users.push(user);
    return {user};
}

const removeUser = (id) => {
    //console.log(id,'id');
    const index = users.findIndex((user) => user.id == id);
    //console.log(users,'line 35');
    //console.log(index,'aaaaaaaa');
    if(index >= 0) {
        //console.log(index,'bbbbbbbbbb');
        //console.log(users.splice(index,1),'splicccc');
        users.splice(index,1);
    }
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

io.on('connect',(socket)=>{
    socket.on('join',({name,room,time,password},callback)=>{
        //console.log('join room',activeusers);
        //console.log(getUsersInRoom(room),'line48');
        if(getUsersInRoom(room).length == 0)
        {
            roomDetails[room] = password;
        }
        //console.log(roomDetails);
        const isAuth = (roomDetails[room] == password);
        if(!isAuth)
        {
            callback({status:false,error:'wrong password'});
            return ;
        }
        // else callback({status:true});

        socket.join(room);
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error){
            callback({status:false,error});
            return ;
        }

        socket.emit('messageToClient',{message:`welcome to the room, ${name}`,name:'Admin',room,time});
        socket.broadcast.to(room).emit('messageToClient',{message:`${name} joined the room `,name:'Admin',room,time});
        //console.log(activeusers,'activeusers');
        activeusers = getUsersInRoom(room);
        //console.log(activeusers,'usersss');
        io.to(room).emit('activeUserData',activeusers);
        
    })

    socket.on('messageToServer',({message,room,name,time})=>{
        //console.log(message,room);
        // let data = {message,room,name,time};
        
        socket.broadcast.to(room).emit('messageToClient',{message,name,room,time});
        
        
    });

    socket.on('fileUpload',({result,room,name,time})=>{
        // console.log(result,room,name,time);
        socket.broadcast.to(room).emit('messageToClient',{result,name,room,time})

    })

    socket.on('disconnected',()=>{
        let room='';
        let name = '';
        users.filter((user)=>{
            if(user.id == socket.id)
            {
                name =  user.name;
            }
        });
        users.filter((user)=>{
            if(user.id == socket.id)
            {
                room = user.room;
            }
        });
        let time = `${new Date().getHours()%12}:${new Date().getMinutes()} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`;
        // console.log(name,room,time,'loggoutttt');
        if(users.length == 1)
        {
            delete roomDetails[room];
        }
        removeUser(socket.id);
        //console.log(activeusers,'ggggggggggggggg');
        //console.log(users,'ffffffffffff');
        if(users.length > 0){
            //console.log('jjjjjjjj');
            activeusers = [...users];
            io.to(room).emit('activeUserData',activeusers);
            socket.broadcast.to(room).emit('messageToClient',{message:`${name} left the room `,name:'Admin',room,time});
        }
       
    });

    socket.on('disconnect',()=>{
        // console.log('testinggggg');
        let room='';
        let name = '';
        users.filter((user)=>{
            if(user.id == socket.id)
            {
                name =  user.name;
            }
        });
        users.filter((user)=>{
            if(user.id == socket.id)
            {
                room = user.room;
            }
        });
        let time = `${new Date().getHours()%12}:${new Date().getMinutes()} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`;
        // console.log(name,room,time,'logg');
        if(users.length == 1)
        {
            delete roomDetails[room];
        }
        removeUser(socket.id);
        // console.log(activeusers,'ggggggggggggggg');
        // console.log(users,'ffffffffffff');
        if(users.length > 0){
            // console.log('jjjjjjjj');
            activeusers = [...users];
            io.to(room).emit('activeUserData',activeusers);
            socket.broadcast.to(room).emit('messageToClient',{message:`${name} left the room `,name:'Admin',room,time});
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

if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      //first require path then...
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

app.use(router);

server.listen(PORT,()=>{
    console.log(`server started on port : ${PORT}`);
})