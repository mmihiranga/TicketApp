import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {useHistory} from "react-router-dom";
import API from "../../components/api";
import BusTable from "../../components/dashboard/BusTable";
import ClipLoader from "react-spinners/ClipLoader";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import {Button, Input, Tab, Tabs} from "@material-ui/core";
import AddBusView from "./AddBus";
import EditBusView from "./EditBus";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import PrintIcon from "@material-ui/icons/Print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import RouteTable from "../../components/dashboard/RouteTabel";
import AddRouteView from "./AddRoute";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

let busNumber = "";

export default function ManageBusView() {
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [value, setValue] = React.useState(0);
    const [view, setView] = useState(null);

    const setEditBusView = (row)=>{
        setView(<EditBusView row={row}/>);
    }

    useEffect(() => {
        API.get(`/bus/`)
            .then(res => {
                setRows(res.data)
                console.log(res.data)
                setView(<BusTable rows={res.data} setEditView ={setEditBusView}/>);
            })
            .catch(err => {
            });
    }, []);

    const getData=(newValue)=>{
        API.get(`/bus/`)
            .then(res => {
                setRows(res.data)
                if(newValue==0){
                    setView(<BusTable rows={res.data} setEditView ={setEditBusView}/>);
                }else if(newValue==1){
                    setView(<AddBusView/>);
                }
            })
            .catch(err => {
            });
    }

    const handleChange = async (event, newValue) => {
        setValue(newValue);
        await getData(newValue);
    };

    const handleSearch=(event)=>{
        busNumber = event.target.value;
    }

    const refreshTable = () => {
        API.get(`/bus/`)
            .then(res => {
                setRows(res.data)
                setView(<BusTable rows={res.data} setEditView ={setEditBusView}/>);
            })
            .catch(err => {
            });
    }

    const findByCode =()=>{
        if(busNumber){
            API.post(`/bus/find`,{busNumber:busNumber})
                .then(res => {
                    let arr = [];
                    arr.push(res.data);
                    setRows(arr)
                    console.log(arr)
                    setView(<BusTable rows={arr} setEditView ={setEditBusView}/>);
                })
                .catch(err => {
                });
        }
    }

    const generatePDF = orders => {
        const doc = new jsPDF();

        const tableColumn = ["Bus Number","Bus Name", "No Of Seats", "Route", "From","To"];
        const tableRows = [];

        orders.forEach(item => {
            const itemData = [
                item.busNumber,
                item.busName,
                item.noOfSeats,
                item.routeId.routeName,
                item.routeId.from,
                item.routeId.to,
            ];
            tableRows.push(itemData);
        });


        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
        doc.text("Busses Details", 14, 15);
        doc.save(`report_${dateStr}.pdf`);
    };

    return (
        <div>
            <div className="item-view-header">
                <Row>
                    <Col className="dashboard-header" xs={4}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary"
                            aria-label="icon label tabs example"
                        >
                            <Tab label="View Details" aria-controls="a11y-tabpanel-0" id="a11y-tab-0" />
                            <Tab label="Add New" aria-controls="a11y-tabpanel-1" id="a11y-tab-1" />
                        </Tabs>
                    </Col>
                    <Col className="add-new-listening">
                        {
                            value==0 &&
                            <div>
                                <Input type="text" name="text" id="exampleText" onChange={handleSearch} placeholder="Bus Number" />
                                <IconButton aria-label="delete" onClick={findByCode}>
                                    <SearchIcon/>
                                </IconButton>
                                <IconButton aria-label="delete" onClick={refreshTable}>
                                    <RefreshIcon/>
                                </IconButton>
                                <Button
                                    variant="contained"
                                    color="default"
                                    startIcon={<PrintIcon />}
                                    onClick={()=>{generatePDF(rows)}}
                                >
                                    PRINT
                                </Button>
                            </div>

                        }
                    </Col>
                </Row>
            </div>
            {view}
        </div>
    );
}