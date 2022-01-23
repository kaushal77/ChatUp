import React, { useState, useEffect } from "react";
// import styles from '../styles/Home.module.css'
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import title_logo from '../logo_4.JPG';


const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "25%",
    transform: "translate(-50%,-50%)",
    "& > *": {
      margin: theme.spacing(5),
      width: theme.spacing(35),
      height: theme.spacing(35),
    },
  },

  loginCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems:'center'
  },
}));

export default function Home() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  const handleUsername = (e) => {
    //console.log(e);
    var x = e.target.value;
    setName(x);
  };

  const handleRoom = (e) => {
    //console.log(e);
    var x = e.target.value;
    setRoom(x);
  };

  const handlePassword = (e) => {
    //console.log(e);
    var x = e.target.value;
    setPassword(x);
  };

  const handleLogin = () => {
    if(name !== "" && room !== "" && password !== "")
    {
      // const data = {Name:name,Room:room,Password:password};
      // socket.emit('userData',data,(err)=>{console.log(err)});
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("room", room);
      sessionStorage.setItem("password", password);
      window.location.href = "/chat";
    }
    else {
      alert('All fields must be filled');
    }
    
  };

  const handleSendOnEnter = (e) => {
    if (e.key === "Enter") {
      if(name !== "" && room !== "" && password !== "")
      {
        const data = {Name:name,Room:room,Password:password};
      // socket.emit('userData',data,(err)=>{console.log(err)});
        handleLogin();
      }
      else {
        alert('All fields must be filled');
      }
    }
  };

  useEffect(()=>{
    // sessionStorage.clear();
  },[]);

  return (
    
    <div  style={{backgroundImage:`url(${title_logo})`,height:'100vh',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}} >
      {/* <Alert variant="filled" severity="error" >
        This is an error alert — check it out!
      </Alert> */}
      <Paper elevation={3} className={classes.root} >
        <center>
        <div className={classes.loginCard} >
          {/* <div><img src={title_logo} alt="logo"></img></div> */}
          <strong>Welcome</strong>
          <div >
            <TextField
              required
              id="outlined-basic"
              color="primary"
              onKeyDown={handleSendOnEnter}
              onChange={handleUsername}
              placeholder="Enter your name"
              variant="outlined"
              style={{padding:'5px 0px'}}
              autoFocus
            />
            <TextField
              id="outlined-basic"
              required
              onKeyDown={handleSendOnEnter}
              color="primary"
              onChange={handleRoom}
              placeholder="Enter room name"
              variant="outlined"
              style={{padding:'5px 0px'}}
            /><br/>
            <TextField
              id="outlined-basic"
              color="primary"
              required
              onKeyDown={handleSendOnEnter}
              onChange={handlePassword}
              placeholder="Enter the password"
              variant="outlined"
              style={{padding:'5px 0px'}}
            /><br/><br/>
          </div>
          <div style={{display:"Flex", justifyContent:"center", margin:"10%"}}>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
        </center>
      </Paper>
    </div>
   
  );
}
