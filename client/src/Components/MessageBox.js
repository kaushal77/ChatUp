import React,{useState,useEffect} from 'react'
import { Paper } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    smallText:{
        fontSize:'0.8em',
        padding:'2px 0px',
    }
  }));

function MessageBox(props) {
    const classes = useStyles();
    const {name,message,time,index} = props.data;

    return (
        <>
        {console.log(props.data)}
        {name == 'Admin' ? 
        <Paper elevation={2} style={{maxWidth:'75%',borderRadius:'10px',padding:'5px 5px',minWidth:'7%',backgroundColor:'azure'}}>
        <div style={{wordBreak:'break-word',fontSize:'1em',padding:'0px 5px'}}>{message}</div>
        {/* <div className={classes.smallText} style={{display:'flex',justifyContent:'flex-end'}}>{new Date().getHours()%12}:{new Date().getMinutes()} {new Date().getHours() >= 12 ? 'PM' : 'AM'}</div> */}
        </Paper>
        :
        <Paper key={index} elevation={2} style={{maxWidth:'25%',borderRadius:'10px',padding:'5px 5px',minWidth:'7%',backgroundColor:'bisque'}}>
            <div className={classes.smallText}>{name}</div>
            <div style={{wordBreak:'break-word',fontSize:'1em',padding:'0px 5px'}}>{message}</div>
            <div className={classes.smallText} style={{display:'flex',justifyContent:'flex-end'}}>{time}</div>
        </Paper>    
        }   
        {/* <Paper elevation={2} style={{maxWidth:'25%',borderRadius:'10px',padding:'5px 5px',minWidth:'7%'}}>
            <div className={classes.smallText}>{name}</div>
            <div style={{wordBreak:'break-all',fontSize:'1em',padding:'0px 5px'}}>{message}</div>
            <div className={classes.smallText} style={{display:'flex',justifyContent:'flex-end'}}>{new Date().getHours()%12}:{new Date().getMinutes()} {new Date().getHours() >= 12 ? 'PM' : 'AM'}</div>
        </Paper>   */}
        </>
    )
}

export default MessageBox

//paper->3 div->maxWidth
//position of 3 divs
//use flexwrap=wrap
