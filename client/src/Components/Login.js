import React, { useState, useEffect } from "react";
// import styles from '../styles/Home.module.css'
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "& > *": {
      margin: theme.spacing(5),
      width: theme.spacing(45),
      height: theme.spacing(35),
    },
  },

  loginCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
}));

export default function Home() {
  const [name, setName] = useState("");
  const classes = useStyles();

  const handleLogin = () => {
    sessionStorage.setItem("name", name);
    window.location.href = "/chat";
  };

  const handleUsername = (e) => {
    console.log(e);
    var x = e.target.value;
    setName(x);
  };

  const handleSendOnEnter = (e) => {
    if (e.key == "Enter") {
      handleLogin();
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
          <div style={{margin:"10%"}}>
            <TextField
              id="outlined-basic"
              color="primary"
              onKeyDown={handleSendOnEnter}
              onChange={handleUsername}
              placeholder="enter your name"
              variant="outlined"
            />
          </div>
          <div style={{display:"Flex", justifyContent:"center", margin:"10%"}}>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}
