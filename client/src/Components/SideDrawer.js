import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Chat from './Chat';
import title_logo from '../logo_7.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor:'cadetblue !important',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    borderRight:'hidden',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    
  },
  // MuiAppBarColorPrimary:{
  //   backgroundColor:'cadetblue important'
  // }
}));

function SideDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutUser, setLogoutUser] = useState(false);
  const [activeUser, setActiveUser] = useState([]);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout =()=>{
    setLogoutUser(true);
  };
  
  const drawer = (
    <div>
      {/* #3f51b5 */}
      <div className={classes.toolbar} style={{backgroundColor: 'cadetblue',boxShadow:'0px 0px 3px 0px rgba(0, 0, 0, 0.87)',
      fontSize:'x-large',fontFamily:'cursive',display:'flex',justifyContent:'center',alignItems:'center'}} >
        <img src={title_logo} alt="" style={{width: '-webkit-fill-available' }} ></img>
        
        </div>
      <Divider />
      <List>
        {activeUser.map((res, index) => (
          // console.log(res,'all user')
          // res = {res.length == 0 ? sessionStorage.getItem('name') : res};
          <ListItem button key={index+1}>
            <ListItemIcon><FiberManualRecordIcon style={{color:'limegreen',fontSize:'1em'}} /></ListItemIcon>
            <ListItemText primary={res.name} style={{marginLeft:'-30px'}} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{color:'black',fontSize:'16px',fontFamily:'emoji'}}>
            Room : {sessionStorage.getItem('room')}
          </Typography>
          <IconButton onClick={handleLogout}>
            <ExitToAppIcon style={{color:'black'}} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} style={{backgroundImage:"url(/bg_chatup.jpg)",height:'100vh'}}  >
        <div className={classes.toolbar}  />
        <Chat setActiveUser={setActiveUser} logoutUser={logoutUser} />
      </main>
    </div>
  );
}

SideDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideDrawer;
