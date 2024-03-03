import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  smallText: {
    fontSize: "0.8em",
    padding: "2px 0px",
  },
  smallText1: {
    fontSize: "0.6em",
    padding: "2px 0px",
  },
  userMessageBox: {
    maxWidth: "40%",
    borderRadius: "10px",
    padding: "5px 5px",
    minWidth: "15%",
    backgroundColor: "bisque",
    "@media (min-width: 771px) and (max-width : 950px)": {
      maxWidth: "60%",
      minWidth: "20%",
    },
    "@media (max-width : 770px)": {
      maxWidth: "75%",
      minWidth: "30%",
    },
  },
  adminMessageBox: {
    maxWidth: "75%",
    borderRadius: "10px",
    padding: "5px 5px",
    minWidth: "7%",
    backgroundColor: "azure",
  },
  messageImage: {
    width: "160px",
    height: "150px",
  },
}));

function MessageBox(props) {
  const classes = useStyles();
  const { name, message, result, time, index } = props.data;
  console.log(props, message, result);

  return (
    <>
      {name === "Admin" ? (
        <Paper elevation={2} className={classes.adminMessageBox}>
          <div
            style={{
              wordBreak: "break-word",
              fontSize: "1em",
              padding: "0px 5px",
            }}
          >
            {message === undefined ? (
              <img
                className={classes.messageImage}
                src={result}
                alt="preview"
              />
            ) : (
              message
            )}
          </div>
          <div
            className={classes.smallText1}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {time}
          </div>
        </Paper>
      ) : (
        <Paper
          key={index}
          elevation={2}
          className={classes.userMessageBox}
          style={{}}
        >
          <div className={classes.smallText} style={{ color: "chocolate" }}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </div>
          <div
            style={{
              wordBreak: "break-word",
              fontSize: "1em",
              padding: "0px 5px",
            }}
          >
            {message === undefined ? (
              <img
                className={classes.messageImage}
                src={result}
                alt="preview"
              />
            ) : (
              message
            )}
          </div>
          <div
            className={classes.smallText}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              color: "gray",
            }}
          >
            {time}
          </div>
        </Paper>
      )}
    </>
  );
}

export default MessageBox;

//paper->3 div->maxWidth
//position of 3 divs
//use flexwrap=wrap
