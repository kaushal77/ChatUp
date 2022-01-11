import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import MessageBox from './MessageBox';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import { IconButton } from '@material-ui/core';
import Picker from 'emoji-picker-react';

const ENDPOINT = 'http://localhost:5000';
const socket = io(ENDPOINT,{ transports: ["websocket"], secure: true, reconnection: true, rejectUnauthorized: false });

function Chat({setActiveUser}) {
    const [message,setMessage] = useState('');
    const [room,setRoom] = useState('dum1');
    const [name,setName] = useState('');
    const [receivedData,setReceivedData] = useState([]);
    const [wHeight,setWHeight] = useState(null);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [displayEmoji, setDisplayEmoji] = useState(false);

    useEffect(()=>{ 
        console.log(socket);
        const username = sessionStorage.getItem('name');
        if(sessionStorage.getItem('name') != undefined)
        {   
            
            setName(username);
            console.log("hiiiii",username);
        }
        let time = `${new Date().getHours()%12}:${new Date().getMinutes()} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`;
        socket.emit('join',{name:username,room,time},(err)=>{
            console.log(err);
        })
        socket.on('messageToClient',({message,name,time})=>{
            console.log(message,name);
            
            setReceivedData((prev)=>[...prev,{message,name,time}])
        })
        
    },[])

    const handleMessage=()=>{
        let time = `${new Date().getHours()%12}:${new Date().getMinutes()} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`
        socket.emit('messageToServer',{message,room,name,time});
        setReceivedData((prev)=>[...prev,{message,name,time}]);
        //document.getElementById("outlined-basic").value = '';
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
          console.log(data,'userrrrrr');
          setActiveUser([...data]);
        })
      },[])

    return (
        <div className='' style={{height:'94%',overflowY:'hidden',zIndex:'2'}}>
            
            {/* {receivedData.map((res,index)=>(<div key={index} 
            style={{display:'flex',justifyContent:res.name == 'Admin'? 'center':res.name == name ? 'flex-end' :'flex-start',margin:'20px',padding:'5px',flexWrap:'wrap',border:'1px solid black'}}>
                {res.name}:{res.message}</div>))} */}
               
                    <div className='' style={{maxHeight:'80%',overflowY:'scroll'}}>
            {receivedData.map((res,index)=>(<span key={index}  style={{display:'flex',justifyContent:res.name == 'Admin'? 'center':res.name == name ? 'flex-end' :'flex-start',margin:'20px',padding:'5px'}} ><MessageBox  data={{...res,index}}/>  </span>))}
            </div>
            {displayEmoji ? 
                // (
                //     <span>You chose: {chosenEmoji.emoji}</span>
                // ) : (
                //     <span>No emoji Chosen</span>
                // )}
                (<Picker onEmojiClick={onEmojiClick} disableSearchBar="true" style={{zIndex:'100'}} pickerStyle={{height:'250px',width:'250px'}} />):(<span></span>)}
            <div className='' style={{display:'flex',maxHeight:'14%',alignItems:'center',justifyContent:'center',margin:'20px 0px'}}>
                
                  
                {/* <TextField id="outlined-basic" color="primary" onKeyDown={handleSendOnEnter} onChange={handleText} label="enter your message" variant="outlined" /> */}
                <IconButton onClick={handleEmoji}><InsertEmoticonIcon fontSize='large' style={{color:'black'}} /></IconButton>
                <input id="outlined-basic" autoComplete="off" onKeyDown={handleSendOnEnter} onChange={handleText} value={message} placeholder="Enter your message" style={{width:'70%',wordWrap:'break-word',padding:'1% 2%',borderRadius:'20px',margin:"0px 10px"}} />
                <IconButton onClick={handleMessage} ><SendIcon fontSize="large" style={{margin:'0px 5px',color:'black'}}/></IconButton>
                <IconButton><AttachFileIcon fontSize="large" style={{color:'black'}} /></IconButton>
                
            </div>
            
        </div>
    )
}

export default Chat
