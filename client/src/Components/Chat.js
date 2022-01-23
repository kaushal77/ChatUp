import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import MessageBox from './MessageBox';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import { IconButton } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Picker from 'emoji-picker-react';

// const ENDPOINT = 'http://localhost:5000';
const ENDPOINT = 'https://chatup-dev.herokuapp.com/';
const socket = io(ENDPOINT,{ transports: ["websocket"], secure: true, reconnection: true, rejectUnauthorized: false });

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'lightgrey',
          },
          '&:hover fieldset': {
            borderColor: 'black',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black',
          },
        },
      },
  }));

function Chat({setActiveUser,logoutUser}) {

    const [message,setMessage] = useState('');
    const [room,setRoom] = useState(sessionStorage.getItem('room'));
    const [name,setName] = useState(sessionStorage.getItem('name'));
    const [receivedData,setReceivedData] = useState([]);
    const [wHeight,setWHeight] = useState(null);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [displayEmoji, setDisplayEmoji] = useState(false);
    const classes = useStyles();

    useEffect(()=>{ 
        //console.log(socket);
        const username = sessionStorage.getItem('name');
        const userroom = sessionStorage.getItem('room');
        const password = sessionStorage.getItem('password');
        if(sessionStorage.getItem('name') != undefined)
        {   
            // setName(username);
            // setRoom(userroom);
            setActiveUser([username]);
            //console.log("hiiiii",username,userroom);
        }
        
        let time = `${new Date().getHours()%12}:${new Date().getMinutes()} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`;
        socket.emit('join',{name:username,room,time,password},(data)=>{
            //console.log(data,data.status,'line 40');
            if(!data.status)
            {   
                alert(data.error);
                window.location.href = '/';
            }
        })
        socket.on('messageToClient',({message,name,room,time})=>{
            //console.log(message,name);
            
            setReceivedData((prev)=>[...prev,{message,name,room,time}])
        })
        
    },[])

    const handleMessage=()=>{
        let time = `${new Date().getHours()%12}:${new Date().getMinutes()} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`
        //console.log();
        socket.emit('messageToServer',{message,room,name,time});
        setReceivedData((prev)=>[...prev,{message,room,name,time}]);
        setMessage('')
    }

    const handleText=(e)=>{
        setMessage(e.target.value);
        
    }

    const handleSendOnEnter =(e)=>{
        if(e.key == "Enter")
        {
            handleMessage();
            
        }
    }
    const handleEmoji =()=>{
        setDisplayEmoji(!displayEmoji);
    }

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setMessage((prev)=>prev + emojiObject.emoji);
      };

    useEffect(()=>{
        setWHeight(window.innerHeight);
    },[window.innerHeight])

    useEffect(()=>{
        socket.on('activeUserData',(data)=>{
          //console.log(data,'userrrrrr');
          if(data)
          {
            setActiveUser([...data]);
          }
          
        })
      },[])

      useEffect(()=>{
          //console.log(logoutUser,'loggguserrrr');
        if(logoutUser)
        {
            let time = `${new Date().getHours()%12}:${new Date().getMinutes()} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`;
            console.log(logoutUser,'i am inside');
            socket.emit('disconnected',{name,room,time});
            window.location.href = "/"
            sessionStorage.clear();
        }  
        
      },[logoutUser])

    return (
        <div className='' style={{height:'94%',overflowY:'hidden',zIndex:2}}>
            
            {/* {receivedData.map((res,index)=>(<div key={index} 
            style={{display:'flex',justifyContent:res.name == 'Admin'? 'center':res.name == name ? 'flex-end' :'flex-start',margin:'20px',padding:'5px',flexWrap:'wrap',border:'1px solid black'}}>
                {res.name}:{res.message}</div>))} */}
               
                    <div className='' style={{height:'80%',overflowY:'scroll'}}>
            {receivedData.map((res,index)=>(<span key={index}  style={{display:'flex',justifyContent:res.name == 'Admin'? 'center':res.name == name ? 'flex-end' :'flex-start',margin:'20px',padding:'5px'}} ><MessageBox  data={{...res,index}}/>  </span>))}
            </div>
            {displayEmoji ? 
                // (
                //     <span>You chose: {chosenEmoji.emoji}</span>
                // ) : (
                //     <span>No emoji Chosen</span>
                // )}
                (<Picker onEmojiClick={onEmojiClick} disableSearchBar="true" style={{zIndex:1000}} pickerStyle={{height:'250px',width:'250px',bottom:'350px'}} />):(<span></span>)}
            <div className='' style={{display:'flex',height:'14%',alignItems:'center',justifyContent:'center',margin:'20px 0px'}}>
                
                  
                {/* <TextField id="outlined-basic" color="primary" onKeyDown={handleSendOnEnter} onChange={handleText} label="enter your message" variant="outlined" /> */}
                {/* <IconButton onClick={handleEmoji}><InsertEmoticonIcon fontSize='large' style={{color:'black'}} /></IconButton> */}
                <TextField className={classes.MuiInputBaseInput} id="outlined-basic" autoComplete="off" onKeyDown={handleSendOnEnter} onChange={handleText} value={message} wordWrap variant="outlined" placeholder="Enter your message" style={{width:'70%',wordWrap:'break-word',borderRadius:'8px',margin:"0px 10px",background:'ghostwhite'}} />
                <IconButton onClick={handleMessage} ><SendIcon fontSize="large" style={{margin:'0px 5px',color:'black'}}/></IconButton>
                <IconButton><AttachFileIcon fontSize="large" style={{color:'black'}} /></IconButton>
                
            </div>
            
        </div>
    )
}

export default Chat
