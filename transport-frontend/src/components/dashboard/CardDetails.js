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

export default function CardDetails() {
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = useState();
  const [rows2, setRows2] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    API.get(`/user/`)
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
      field: "cardDetails",
      headerName: "Card Number",
      width: 200,
      valueGetter: (params) => {
        let result = [];
        if (params.row.cardDetails) {
          if (params.row.cardDetails.cardNo) {
            result.push(params.row.cardDetails.cardNo);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Expiry Date",
      width: 200,
      editable: true,
      valueGetter: (params) => {
        let result = [];
        if (params.row.cardDetails) {
          if (params.row.cardDetails.expiryDate) {
            result.push(params.row.cardDetails.expiryDate);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: "expiryDate",
      headerName: "Balance",
      width: 140,
      valueGetter: (params) => {
        console.log(params.row.cardDetails.cardNo);

        let result = [];
        if (params.row.cardDetails) {
          if (params.row.cardDetails.amount) {
            result.push(params.row.cardDetails.amount);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: "asd",
      headerName: "Card Type",
      width: 150,
      valueGetter: (params) => {
        let result = [];
        if (params.row.cardDetails) {
          if (params.row.cardDetails.cardType) {
            result.push(params.row.cardDetails.cardType);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: "status",
      headerName: " Status",
      width: 120,
      valueGetter: (params) => {
        console.log(params.row.cardDetails.status);

        let result = [];
        if (params.row.cardDetails) {
          if (params.row.cardDetails.status) {
            result.push(params.row.cardDetails.status);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
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
          <Tab label=" Card Details" {...a11yProps(0)} />
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
