import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import API from "../api";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

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

export default function TravelLogs() {
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = useState();
  const [rows2, setRows2] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    API.get(`/trip/`)
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [rows]);

  const columns = [
    {
      field: "_id",
      headerName: "User ID",
      width: 220,
    },
    {
      field: "startTerminal",
      headerName: "Start Terminal",
      width: 180,
    },
    {
      field: "endTerminal",
      headerName: "End Terminal",
      width: 180,
    },

    {
      field: "busNo",
      headerName: "Bus Number",
      width: 180,
    },

    {
      field: "route",
      headerName: "Bus Route",
      width: 180,
    },

    {
      field: "timeIn",
      headerName: "Step IN",
      width: 180,
    },
    {
      field: "timeOut",
      headerName: "Step Out",
      width: 180,
    },
    {
      field: "date",
      headerName: "Date",
      width: 180,
    },
    {
      field: "noOfTerminal",
      headerName: "Terminal Count",
      width: 180,
    },
    {
      field: "totalFair",
      headerName: "Total Fare",
      width: 180,
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
          <Tab label=" Travel Logs" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div style={{ height: 600, width: "100%" }}>
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
    </Box>
  );
}
