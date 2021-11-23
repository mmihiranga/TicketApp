import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import api from "../../components/api";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import API from "../../components/api";
import { confirmAlert } from "react-confirm-alert";
import DirectionsIcon from "@material-ui/icons/Directions";
import { useHistory } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  input: {
    display: "none",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(5, 0, 1),
  },
  upload: {
    paddingLeft: 16,
  },
}));
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Inspections() {
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = React.useState();

  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const [passengerCount, setPassengerCount] = useState();
  const [route, setRoute] = useState();
  const [busNo, setBusNo] = useState();
  const [remarks, setRemarks] = useState();
  const [toggle, setToggle] = useState(false);

  const onSubmit = () => {
    let paidCount = 5;

    const inspections = {
      passengerCount: passengerCount,
      paidPCount: 5,
      unpaidPCount: passengerCount - 5,
      busNo: busNo,
      route: route,
      remarks: remarks,
    };
    console.log(inspections);

    api
      .post("/inspections/create/", inspections)
      .then(function (response) {
        console.log(response.data);
        setPassengerCount(null);
        setRoute(null);
        setBusNo(null);
        setRemarks(null);
        setToggle(!toggle);
        confirmAlert({
          title: "Added Successfully",
          message: "Inspection has added successfully",
          buttons: [
            {
              label: "Ok",
              onClick: () => {},
            },
          ],
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    api
      .get(`/inspections`)
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "busNo", headerName: "Bus No", width: 150 },
    {
      field: "paidPCount",
      headerName: "Paid Count",
      width: 150,
      type: "number",
    },
    {
      field: "unpaidPCount",
      headerName: "Unpaid Count",
      width: 150,
      type: "number",
    },
    {
      field: "passengerCount",
      headerName: "Passenger Count",
      type: "number",
      width: 190,
    },
    {
      field: "route",
      headerName: "Route",
      width: 160,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 170,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="View Inspections" {...a11yProps(0)} />
          <Tab label="Add New" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div style={{ height: 500, width: "100%" }}>
          {rows && (
            <DataGrid
              components={{
                Toolbar: CustomToolbar,
              }}
              getRowId={(row) => row._id}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
            />
          )}
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Container
          component="main"
          maxWidth="sm"
          style={{ backgroundColor: "#ffff", padding: 24 }}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <RemoveRedEyeIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add New Inspection
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                container
                spacing={2}
              >
                <Grid item xs={10}>
                  <TextField
                    variant="filled"
                    required
                    fullWidth
                    id="passengerCount"
                    label="Passenger Count"
                    name="passengerCount"
                    onChange={(e) => {
                      setPassengerCount(e.target.value);
                    }}
                    value={passengerCount}
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    variant="filled"
                    required
                    fullWidth
                    id="busNo"
                    label="Bus No"
                    name="busNo"
                    onChange={(e) => {
                      setBusNo(e.target.value);
                    }}
                    value={busNo}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    variant="filled"
                    required
                    fullWidth
                    id="route"
                    label="Route"
                    name="route"
                    onChange={(e) => {
                      setRoute(e.target.value);
                    }}
                    value={route}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    variant="filled"
                    fullWidth
                    id="remarks"
                    label="Remarks"
                    name="remarks"
                    onChange={(e) => {
                      setRemarks(e.target.value);
                    }}
                    value={remarks}
                  />
                </Grid>
              </Grid>
              <br />
              <hr />
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                container
                spacing={2}
              >
                <Grid item xs={4}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                  >
                    Add Route
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </TabPanel>
    </Box>
  );
}
