import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DirectionsIcon from '@material-ui/icons/Directions';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PaymentIcon from '@material-ui/icons/Payment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useHistory, useLocation} from "react-router-dom";
import ManagePassengerView from "./ManagePassengerView";
import ManageTimeTableView from "./ManageTimeTableView";
import ManageBusView from "./ManageBusView";
import ManageRouteView from "./ManageRouteView";
import DashboardView from "./DashboardView";
import ManagePaymentView from "./ManagePaymentView";
import CardDetails from '../../components/dashboard/CardDetails';
import TravelLogs from '../../components/dashboard/TravelLogs';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ExploreIcon from '@mui/icons-material/Explore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Inspections from './Inspections'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
            Stream Ticketing System
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard() {
    const token =JSON.parse(sessionStorage.getItem("token"));
    const classes = useStyles();
    const history = useHistory();
    const [header,setHeader] = useState({
        title:"Dashboard",
        icon:null
    });
    const [open, setOpen] = React.useState(true);
    const [view, setView] = useState(null);

    useEffect(() => {
        if(!token){
            history.push("/");
        }
        setView(<DashboardView/>);
        setHeader({title:'Dashboard',icon:<DashboardIcon/>});
    }, []);

    const mainListItems = (
        <div>
            <ListItem button onClick={()=>{
                setView(<DashboardView/>);
                setHeader({title:'Dashboard',icon:<DashboardIcon/>});
            }}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={()=>{
                setView(<ManagePassengerView/>);
                setHeader({title:'Passenger',icon:<PeopleAltIcon/>});
            }}>
                <ListItemIcon>
                    <PeopleAltIcon/>
                </ListItemIcon>
                <ListItemText primary="Passengers" />
            </ListItem>
            <ListItem button onClick={()=>{
                setView(<ManagePaymentView/>);
                setHeader({title:'Financial',icon:<MonetizationOnIcon/>});
            }}>
                <ListItemIcon>
                    <MonetizationOnIcon/>
                </ListItemIcon>
                <ListItemText primary="Financial" />
            </ListItem>
            <ListItem button onClick={()=>{
                setView(<ManageTimeTableView/>);
                setHeader({title:'Time Tables',icon:<AccessTimeIcon/>});
            }} >
                <ListItemIcon>
                    <AccessTimeIcon/>
                </ListItemIcon>
                <ListItemText primary="Time Tables"/>
            </ListItem>
            <ListItem button onClick={()=>{
                setView(<ManageRouteView/>);
                setHeader({title:'Routes',icon:<DirectionsIcon/>});
            }}>
                <ListItemIcon>
                    <DirectionsIcon/>
                </ListItemIcon>
                <ListItemText primary="Routes" />
            </ListItem>
            <ListItem button onClick={()=>{
                setView(<ManageBusView/>)
                setHeader({title:'Busses',icon:<DirectionsBusIcon/>});
            }}>
                <ListItemIcon>
                    <DirectionsBusIcon/>
                </ListItemIcon>
                <ListItemText primary="Buses" />
            </ListItem>
            
            <ListItem button onClick={()=>{
                setView(<TravelLogs/>)
                setHeader({title:'Travel Logs',icon:<ExploreIcon/>});
            }}>
                <ListItemIcon>
                    <ExploreIcon/>
                </ListItemIcon>
                <ListItemText primary="Travel Logs" />
            </ListItem>
            <ListItem button onClick={()=>{
                setView(<CardDetails/>)
                setHeader({title:'CardDetails',icon:<CreditCardIcon/>});
            }}>
                <ListItemIcon>
                    <CreditCardIcon/>
                </ListItemIcon>
                <ListItemText primary="CardDetails" />
            </ListItem>
            <ListItem button onClick={()=>{
                setView(<Inspections/>)
                setHeader({title:'Inspections',icon:<RemoveRedEyeIcon/>});
            }}>
                <ListItemIcon>
                    <RemoveRedEyeIcon/>
                </ListItemIcon>
                <ListItemText primary="Inspections" />
            </ListItem>
        </div>
    );

    function goToLogout() {
        sessionStorage.removeItem("token");
        history.push("/");
    }

    const secondaryListItems = (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <ExitToAppIcon/>
                </ListItemIcon>
                <ListItemText onClick={goToLogout} primary="Logout" />
            </ListItem>
        </div>
    );

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" color="secondary" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {header.icon}{' '}
                        {header.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {view}
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}