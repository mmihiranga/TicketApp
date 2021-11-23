import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from "react-hook-form";
import API from "../../components/api";
import {confirmAlert} from "react-confirm-alert";
import DirectionsIcon from '@material-ui/icons/Directions';
import {useHistory} from "react-router-dom";

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

export default function EditRouteView(props) {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit } = useForm();

    const[input, setInput] = useState({
        id: props.row._id,
        routeName:props.row.routeName,
        from:props.row.from,
        to:props.row.to,
        farePerTerminal:props.row.farePerTerminal,
        noOfTerminals:props.row.noOfTerminals
    });

    const onSubmit = () => {
        API.post("/route/update", input)
            .then((res) => {
                console.log(res.data)
                confirmAlert({
                    title: 'updated Successfully',
                    message: 'Route Data has updated successfully',
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

    const deleteRoute= () => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to delete '+ input.routeName +' route.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        API.post(`/route/delete/`,{id:input.id})
                            .then(()=>{
                            });
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    const handleInputChange=(event)=> {
        const {name, value} = event.target;
        setInput((prev) => {
            if (name === "routeName") {
                return (
                    {
                        id:prev.id,
                        routeName:value,
                        from:prev.from,
                        to:prev.to,
                        farePerTerminal:prev.farePerTerminal,
                        noOfTerminals:prev.noOfTerminals
                    }
                )
            }else if (name === "from") {
                return (
                    {
                        id:prev.id,
                        routeName:prev.routeName,
                        from:value,
                        to:prev.to,
                        farePerTerminal:prev.farePerTerminal,
                        noOfTerminals:prev.noOfTerminals
                    }
                )
            }else if (name === "to") {
                return (
                    {
                        id:prev.id,
                        routeName:prev.routeName,
                        from:prev.from,
                        to:value,
                        farePerTerminal:prev.farePerTerminal,
                        noOfTerminals:prev.noOfTerminals
                    }
                )
            }else if (name === "farePerTerminal") {
                return (
                    {
                        id:prev.id,
                        routeName:prev.routeName,
                        from:prev.from,
                        to:prev.to,
                        farePerTerminal:value,
                        noOfTerminals:prev.noOfTerminals
                    }
                )
            }else if (name === "noOfTerminals") {
                return (
                    {
                        id:prev.id,
                        routeName:prev.routeName,
                        from:prev.from,
                        to:prev.to,
                        farePerTerminal:prev.farePerTerminal,
                        noOfTerminals:value
                    }
                )
            }
        });
    }
    return (
        <Container component="main" maxWidth="sm" style={{ backgroundColor: '#ffff',padding:24}}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <DirectionsIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Route
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                id="routeName"
                                label="Route Number"
                                name="routeName"
                                onChange={handleInputChange}
                                value={input.routeName}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                required
                                type="number"
                                InputProps={{ inputProps: { min: 1 } }}
                                fullWidth
                                id="farePerTerminal"
                                label="Fare Per Terminal"
                                name="farePerTerminal"
                                onChange={handleInputChange}
                                value={input.farePerTerminal}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                id="from"
                                label="From"
                                name="from"
                                onChange={handleInputChange}
                                value={input.from}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                id="to"
                                label="To"
                                name="to"
                                onChange={handleInputChange}
                                value={input.to}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                required
                                type="number"
                                InputProps={{ inputProps: { min: 1 } }}
                                fullWidth
                                id="noOfTerminals"
                                label="No of Terminals"
                                name="noOfTerminals"
                                onChange={handleInputChange}
                                value={input.noOfTerminals}
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
                                Edit Route
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                onClick={deleteRoute}
                                fullWidth
                                variant="contained"
                                color="default"
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}