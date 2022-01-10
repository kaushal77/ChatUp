import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import MessageBox from './MessageBox';


const ENDPOINT = 'http://localhost:5000';
const socket = io(ENDPOINT,{ transports: ["websocket"], secure: true, reconnection: true, rejectUnauthorized: false });

function Chat() {
    const [message,setMessage] = useState('');
    const [room,setRoom] = useState('dum1');
    const [name,setName] = useState('');
    const [receivedData,setReceivedData] = useState([]);
    const [wHeight,setWHeight] = useState(null);

    useEffect(()=>{ 
        console.log(socket);
        const username = sessionStorage.getItem('name');
        if(sessionStorage.getItem('name') != undefined)
        {   
            
            setName(username);
            console.log("hiiiii",username);
        }
        socket.emit('join',{name:username,room:room},(err)=>{
            console.log(err);
        })
        socket.on('messageToClient',({message,name})=>{
            console.log(message,name);
            setReceivedData((prev)=>[...prev,{message,name}])
        })
        
    },[])

    const handleMessage=()=>{
        socket.emit('messageToServer',{data:message,room,name});
        setReceivedData((prev)=>[...prev,{message,name}]);
        document.getElementById("outlined-basic").value = '';
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
    useEffect(()=>{
        setWHeight(window.innerHeight);
    },[window.innerHeight])
    return (
        <div className='container'>
            
            {/* {receivedData.map((res,index)=>(<div key={index} 
            style={{display:'flex',justifyContent:res.name == 'Admin'? 'center':res.name == name ? 'flex-end' :'flex-start',margin:'20px',padding:'5px',flexWrap:'wrap',border:'1px solid black'}}>
                {res.name}:{res.message}</div>))} */}
                <span className='row' >
                    <span className='col-md-10' style={{height:'400px'}}>
            {receivedData.map((res,index)=>(<span key={index}  style={{display:'flex',justifyContent:res.name == 'Admin'? 'center':res.name == name ? 'flex-end' :'flex-start',margin:'20px',padding:'5px'}} ><MessageBox  data={{...res,index}}/>  </span>))}
            </span>
            <div className='col-md-2' style={{display:'flex',height:{wHeight},alignItems:'flex-end',justifyContent:'space-evenly'}}>
                
                {/* <TextField id="outlined-basic" color="primary" onKeyDown={handleSendOnEnter} onChange={handleText} label="enter your message" variant="outlined" /> */}
                <input id="outlined-basic"  onKeyDown={handleSendOnEnter} onChange={handleText} placeholder="enter your message" style={{width:'70%',padding:'2% 2%',borderRadius:'20px'}} />
                <button onClick={
                    handleMessage
                }>send</button>
            </div>
            </span>
        </div>
    )
}

export default Chat
