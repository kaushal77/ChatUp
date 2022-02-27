import React, { useState, useEffect } from "react";
// import styles from '../styles/Home.module.css'
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import title_logo from '../logo_8.jpg';
import title_mob_logo from '../logo_5.JPG';


const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "25%",
    backgroundColor:'floralwhite',
    transform: "translate(-50%,-50%)",
    "& > *": {
      margin: theme.spacing(5),
      width: theme.spacing(35),
      height: theme.spacing(35),
    },
    '@media (max-width: 1000px)' : {
      left:"50%"
    }
  },
  bgsizing:{
    backgroundImage:`url(${title_logo})`,
    height:'100vh',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center center',
    '@media (max-width : 1000px)' : {
      backgroundImage:`url(${title_mob_logo})`,
      backgroundPosition: 'center top',
    },
    '@media (max-width : 380px)' : {
      backgroundSize: 'contain'
    },
  },
  loginCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems:'center'
  },
  MuiButtonContainedPrimary:{
    backgroundColor:'goldenrod',
    '&:hover, &:focus' :{
      backgroundColor:'goldenrod',
    }
  },
  notchedOutline:{
    borderColor:'unset !important',
    borderWidth:'thin !important'
  }
}));

export default function Home() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  // const [screenWidth, setScreenWidth] = useState(window.screen.width);

  const classes = useStyles();

  const handleUsername = (e) => {
    //console.log(e);
    var x = e.target.value;
    //console.log(x.toUpperCase());
    setName(x.toLowerCase());
  };

  const handleRoom = (e) => {
    //console.log(e);
    var x = e.target.value;
    setRoom(x.toLowerCase());
  };

  const handlePassword = (e) => {
    //console.log(e);
    var x = e.target.value;
    setPassword(x.toLowerCase());
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
    // console.log('screenwidth:',window.screen.availWidth,window.screen.width)
    // setScreenWidth(window.screen.width);
  },[]);

  return (
    
    <div className={classes.bgsizing}>
      {/* <Alert variant="filled" severity="error" >
        This is an error alert — check it out!
      </Alert> */}
      <Paper elevation={3} className={classes.root} >
        <center>
        <div className={classes.loginCard}  >
          {/* <div><img src={title_logo} alt="logo"></img></div> */}
          <strong style={{fontSize:'24px'}}>Welcome</strong><br/>
          <div >
            <TextField
              required
              id="outlined-basic"
              color="primary"
              autoComplete="off"
              onKeyDown={handleSendOnEnter}
              onChange={handleUsername}
              placeholder="Enter name"
              variant="outlined"
              style={{padding:'5px 0px'}}
              autoFocus
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                }
              }}
              
            />
            <TextField
              id="outlined-basic"
              required
              onKeyDown={handleSendOnEnter}
              color="primary"
              autoComplete="off"
              onChange={handleRoom}
              placeholder="Enter room name"
              variant="outlined"
              style={{padding:'5px 0px'}}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                }
              }}
            /><br/>
            <TextField
              id="outlined-basic"
              color="primary"
              required
              autoComplete="off"
              onKeyDown={handleSendOnEnter}
              onChange={handlePassword}
              placeholder="Enter password"
              variant="outlined"
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                }
              }}
              style={{padding:'5px 0px'}}
            /><br/><br/>
          </div>
          <div>
            <Button className={classes.MuiButtonContainedPrimary} variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
        </center>
      </Paper>
    </div>
   
  );
}
