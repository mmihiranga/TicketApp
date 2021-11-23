import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import API from "../components/api";
import {confirmAlert} from "react-confirm-alert";
const bcrypt = require('bcryptjs');


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

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://www.eqmagpro.com/wp-content/uploads/2018/12/BV7A9243.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInView() {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit } = useForm();

    const [textInput, setTextInput] = useState({
        email: "",
        password:""
    });

    const onSubmit = () => {
        let email = textInput.email;
        let password = textInput.password;
        API.post("/user/validate",{email:email,password: password})
            .then(res=>{
                console.log(res.data)
                if(res.data.type){
                    if(res.data.type == "transport-manager"){
                        const token ={
                            name: res.data.fullName,
                            email:res.data.email
                        }
                        sessionStorage.setItem("token",JSON.stringify(token));
                        history.push("/dashboard")
                    }else {
                        confirmAlert({
                            title: 'Login Error',
                            message: 'Invalid Credentials.',
                            buttons: [
                                {
                                    label: 'Ok'
                                }
                            ]
                        });
                    }
                }else{
                    confirmAlert({
                        title: 'Login Error',
                        message: 'Invalid Credentials.',
                        buttons: [
                            {
                                label: 'Ok'
                            }
                        ]
                    });
                }
            })
    }

    const handleTextInputChange = event => {
        const {name, value} = event.target;
        setTextInput((prev)=>{
            if(name==="email")
            {
                return(
                    {
                        email: value,
                        password:prev.password
                    }
                )
            }
            else if(name==="password")
            {
                return(
                    {
                        email: prev.email,
                        password:value,
                    }
                )
            }
        })
    };
    return (
        <div>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={8} className={classes.image} />
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleTextInputChange}
                                value={textInput.email}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleTextInputChange}
                                value={textInput.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>

    );
}