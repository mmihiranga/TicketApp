import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from "react-hook-form";
import API from "../../components/api";
import {confirmAlert} from "react-confirm-alert";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DateFnsUtils from '@date-io/date-fns';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import {useHistory} from "react-router-dom";
import {MuiPickersUtilsProvider,KeyboardTimePicker} from "@material-ui/pickers";
import {Autocomplete} from "@material-ui/lab";
import TimeTable from "../../components/dashboard/TimeTabel";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
    input: {
        display: 'none'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(5, 0, 1),
    },
    upload:{
        paddingLeft: 16
    }
}));

let busNames =[];
let routes =[];

export default function AddBusView(props) {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const[routeId, setRouteId] = useState("");

    useEffect(() => {
        routes=[];
        API.get(`/route/`)
            .then(res => {
                res.data.map((item)=>{
                    routes.push({value:item._id, label:item.routeName})
                })
            })
            .catch(err => {
            });
    }, []);

    const[input, setInput] = useState({
        busName: "",
        busNumber: "",
        noOfSeats: "",
        routeId: "",
    });

    const onSubmit = () => {
        if(routeId){
            input.routeId = routeId;
            console.log(input);
            API.post("/bus/create", input)
                .then((res) => {
                    console.log(res.data)
                    confirmAlert({
                        title: 'Added Successfully',
                        message: 'Bus Data has added successfully',
                        buttons: [
                            {
                                label: 'Ok',
                                onClick: () => {
                                }
                            }
                        ]
                    });
                });
        }
    };

    const handleInputChange=(event)=> {
        const {name, value} = event.target;
        console.log(name+" "+value)
        console.log(input)
        setInput((prev) => {
            if (name === "busName") {
                return (
                    {
                        busName: value,
                        busNumber: prev.busNumber,
                        noOfSeats: prev.noOfSeats,
                    }
                )
            }else if (name === "busNumber") {
                return (
                    {
                        busName: prev.busName,
                        busNumber: value,
                        noOfSeats: prev.noOfSeats,
                    }
                )
            }else if (name === "noOfSeats") {
                return (
                    {
                        busName: prev.busName,
                        busNumber: prev.busNumber,
                        noOfSeats: value,
                    }
                )
            }
        })
    }

    const handleChangeRoute = (event, value) => {
        if(value){
            setRouteId(value.value);
        }
    };

    return (
        <Container component="main" maxWidth="sm" style={{ backgroundColor: '#ffff',padding:24}}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <DirectionsBusIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add New Bus
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                id="busNumber"
                                label="Bus Number"
                                name="busNumber"
                                onChange={handleInputChange}
                                value={input.busNumber}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={routes}
                                onChange={handleChangeRoute}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField name="routeId"  {...params} label="Route Number" variant="filled" required />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                required
                                type="number"
                                InputProps={{ inputProps: { min: 20 } }}
                                fullWidth
                                id="noOfSeats"
                                label="No of Seats"
                                name="noOfSeats"
                                onChange={handleInputChange}
                                value={input.noOfSeats}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                fullWidth
                                id="busName"
                                label="Bus Name"
                                name="busName"
                                onChange={handleInputChange}
                                value={input.busName}
                            />
                        </Grid>

                    </Grid>
                    <br/>
                    <hr/>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                            >
                                Add Item
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}