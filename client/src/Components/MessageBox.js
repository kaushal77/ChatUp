import React,{useState,useEffect} from 'react'
import { Paper } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    smallText:{
        fontSize:'0.8em',
        padding:'2px 0px',
    },
    userMessageBox:{
        maxWidth:'40%',
        borderRadius:'10px',
        padding:'5px 5px',
        minWidth:'15%',
        backgroundColor:'bisque',
        '@media (min-width: 771px) and (max-width : 950px)' : {
            maxWidth:'60%',
            minWidth:'20%',
        },
        '@media (max-width : 770px)' : {
            maxWidth: '75%',
            minWidth:'30%',
        },
    },
    adminMessageBox:{
        maxWidth:'75%',
        borderRadius:'10px',
        padding:'5px 5px',
        minWidth:'7%',
        backgroundColor:'azure'
    }
  }));

function MessageBox(props) {
    const classes = useStyles();
    const {name,message,time,index} = props.data;

    return (
        <>
       
        {name == 'Admin' ? 
        
        <Paper elevation={2} className={classes.adminMessageBox} >
        <div style={{wordBreak:'break-word',fontSize:'1em',padding:'0px 5px'}}>{message}</div>
        {/* <div className={classes.smallText} style={{display:'flex',justifyContent:'center'}}>{time}</div>   */}
        </Paper>
        
        :
        <Paper key={index} elevation={2} className={classes.userMessageBox} style={{}}>
            <div className={classes.smallText} style={{color:'chocolate'}}>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
            <div style={{wordBreak:'break-word',fontSize:'1em',padding:'0px 5px'}}>{message}</div>
            <div className={classes.smallText} style={{display:'flex',justifyContent:'flex-end',color:'gray'}}>{time}</div>
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
