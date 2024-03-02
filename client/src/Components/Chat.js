import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import MessageBox from './MessageBox';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import './Chat.css';
import { IconButton, InputAdornment } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const ENDPOINT = 'http://localhost:5000';
// const ENDPOINT = 'https://chatup-dev.herokuapp.com/';
const socket = io(ENDPOINT,{ transports: ["websocket"], secure: true, reconnection: true, rejectUnauthorized: false });

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'unset',
            borderSize: 'thin',
          },
          '&:hover fieldset': {
            borderColor: 'unset',
            borderSize: 'thin',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'unset',
            borderSize: 'thin',
          },
        },
      },
    notchedOutline:{
        borderColor:'unset !important',
        borderWidth:'thin !important'
      }
  }));

function Chat({setActiveUser,logoutUser}) {

    const [message,setMessage] = useState('');
    const [room,setRoom] = useState(sessionStorage.getItem('room'));
    const [name,setName] = useState(sessionStorage.getItem('name'));
    const [receivedData,setReceivedData] = useState([]);
    const [wHeight,setWHeight] = useState(null);
    const [imageFile,setFile] = useState({});
    const classes = useStyles();

    useEffect(()=>{ 
        //console.log(socket);
        const username = sessionStorage.getItem('name');
        // const userroom = sessionStorage.getItem('room');
        const password = sessionStorage.getItem('password');
        
        if(sessionStorage.getItem('name') !== undefined)
        {   
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
        let time = `${new Date().getHours()%12}:${new Date().getMinutes() < 10 ? '0'+ new Date().getMinutes() : new Date().getMinutes()} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`
        //console.log();
        socket.emit('messageToServer',{message,room,name,time});
        setReceivedData((prev)=>[...prev,{message,room,name,time}]);
        setMessage('')
    }

    const handleText=(e)=>{
        setMessage(e.target.value);
        
    }

    const handleSendOnEnter =(e)=>{
        if(e.key === "Enter")
        {
            handleMessage();
            
        }
    }
    

      const handleFile = ()=>{

      }

      // const handleFileSelect = (e)=>{
      //   console.log("image=",e.target.files[0]);
      //   setFile(e.target.files[0]);
      // }

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
            socket.emit('disconnected');
            window.location.href = "/"
            sessionStorage.clear();
        }  
        
      },[logoutUser])

      useEffect(()=>{
        var objDiv = document.getElementById("message-area");
        objDiv.scrollTop = objDiv.scrollHeight;
        // window.scrollTo(0,document.body.scrollHeight);
      },[receivedData])

    return (
        <div className='' style={{height:'94%',overflowY:'hidden',zIndex:2}}>
            
            {/* {receivedData.map((res,index)=>(<div key={index} 
            style={{display:'flex',justifyContent:res.name == 'Admin'? 'center':res.name == name ? 'flex-end' :'flex-start',margin:'20px',padding:'5px',flexWrap:'wrap',border:'1px solid black'}}>
                {res.name}:{res.message}</div>))} */}
               
                    <div id="message-area" className='' style={{height:'80%',overflowY:'scroll'}}>
            {receivedData.map((res,index)=>(<span key={index}  style={{display:'flex',justifyContent:res.name === 'Admin'? 'center':res.name === name ? 'flex-end' :'flex-start',margin:'20px',padding:'5px'}} ><MessageBox  data={{...res,index}}/>  </span>))}
            
            </div>
              <div className='' style={{display:'flex',alignItems:'center',justifyContent:'center',margin:'20px 0px'}}>
                
                  
                {/* <TextField id="outlined-basic" color="primary" onKeyDown={handleSendOnEnter} onChange={handleText} label="enter your message" variant="outlined" /> */}
                <TextField className={classes.root} InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                },
                // startAdornment: (
                //   <InputAdornment position="start">
                // <IconButton onClick={handleEmoji}><InsertEmoticonIcon fontSize='large' style={{color:'black'}} /></IconButton>
                //   </InputAdornment>
                // ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleFile}><AttachFileIcon fontSize="large" style={{color:'black'}} /></IconButton>
                  </InputAdornment>
                )
                

              }} id="outlined-basic" autoComplete="off" onKeyDown={handleSendOnEnter}
                onChange={handleText} value={message} variant="outlined" placeholder="Message" autoFocus style={{width:'80%',wordWrap:'break-word',borderRadius:'8px',background:'ghostwhite'}} />
                <IconButton onClick={handleMessage} ><SendIcon fontSize="large" style={{margin:'0px 5px',color:'black'}}/></IconButton>
                 
                {/* <input type='file' onChange={handleFileSelect}></input> */}
                
            </div>
            
        </div>
    )
}

export default Chat
