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

export default function AddTimeTableView(props) {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const[departureTime, setDepartureTime] = useState(new Date());
    const[arrivalTime, setArrivalTime] = useState(new Date());
    const[busId, setBusId] = useState("");
    const[routeId, setRouteId] = useState("");
    const[destination, setDestination] = useState("");

    useEffect(() => {
        busNames=[];
        routes=[];
        API.get(`/bus/`)
            .then(res => {
                res.data.map((item)=>{
                    busNames.push({value:item._id, label:item.busNumber})
                })
            })
            .catch(err => {
            });
        API.get(`/route/`)
            .then(res => {
                res.data.map((item)=>{
                    routes.push({value:item._id, label:item.routeName})
                })
            })
            .catch(err => {
            });
    }, []);

    function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice (1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
    }

    const onSubmit = () => {
        const data={
            departureTime: tConvert(departureTime.toLocaleTimeString()),
            arrivalTime: tConvert(arrivalTime.toLocaleTimeString()),
            destination: destination,
            busId:busId,
            routeId: routeId
        }

        console.log(data)
        API.post("/timeTable/create", data)
            .then((res) => {
                console.log(res.data)
                confirmAlert({
                    title: 'Added Successfully',
                    message: 'Time Table Data has added successfully',
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => {
                            }
                        }
                    ]
                });
            });
    };

    const handleDepartureTime = (time) => {
        setDepartureTime(time);
    };

    const handleArrivalTime = (time) => {
        setArrivalTime(time);
    };

    const handleChangeBus = (event, value) => {
        if(value){
            setBusId(value.value);
        }
    };

    const handleChangeRoute = (event, value) => {
        if(value){
            console.log(value.value)
            setRouteId(value.value);
        }
    };

    const handleDestination = (event,) => {
        if(event){
            setDestination(event.target.value);
        }
    };

    return (
        <Container component="main" maxWidth="sm" style={{ backgroundColor: '#ffff',padding:24}}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccessTimeIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add Time Table
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Departure Time"
                                value={departureTime}
                                required
                                onChange={handleDepartureTime}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Arrival Time"
                                    value={arrivalTime}
                                    onChange={handleArrivalTime}
                                    required
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={busNames}
                                getOptionLabel={option => option.label}
                                defaultValue={[busNames]}
                                onChange={handleChangeBus}
                                renderInput={(params) => <TextField name="busId" {...params} label="Bus Number" variant="filled" required/>}
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
                                fullWidth
                                id="destination"
                                label="Destination"
                                name="destination"
                                onChange={handleDestination}
                                value={destination}
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