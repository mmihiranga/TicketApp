import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {useHistory} from "react-router-dom";
import API from "../../components/api";
import RouteTable from "../../components/dashboard/RouteTabel";
import {Button, Input, Tab, Tabs} from "@material-ui/core";
import AddRouteView from "./AddRoute";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from '@material-ui/icons/Refresh';
import EditRouteView from "./EditRoute";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";
import jsPDF from "jspdf";
import "jspdf-autotable";

let routeId = "";

export default function ManageRouteView() {
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [value, setValue] = React.useState(0);
    const [view, setView] = useState(null);

    const setEditRouteView = (row)=>{
        setView(<EditRouteView row={row}/>);
    }

    useEffect(() => {
        API.get(`/route/`)
            .then(res => {
                setRows(res.data)
                setView(<RouteTable rows={res.data} setEditView ={setEditRouteView}/>)
            })
            .catch(err => {
            });
    }, []);

    const getData=(newValue)=>{
        API.get(`/route/`)
            .then(res => {
                if(newValue==0){
                    setView(<RouteTable rows={res.data} setEditView ={setEditRouteView}/>);
                }else if(newValue==1){
                    setView(<AddRouteView/>);
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
        routeId = event.target.value;
    }

    const refreshTable = () => {
        API.get(`/route/`)
            .then(res => {
                setRows(res.data)
                setView(<RouteTable rows={res.data} setEditView ={setEditRouteView}/>);
            })
            .catch(err => {
            });
    }

    const findByCode =()=>{
        if(routeId){
            API.post(`/route/find`,{routeName:routeId})
                .then(res => {
                    let arr = [];
                    arr.push(res.data);
                    setRows(arr)
                    console.log(res.data)
                    setView(<RouteTable rows={arr} setEditView ={setEditRouteView}/>);
                })
                .catch(err => {
                });
        }
    }

    const generatePDF = orders => {
        const doc = new jsPDF();
        console.log("Work..")
        const tableColumn = ["Route Number","From", "To", "Fare Per Terminal", "No Of Terminals"];
        const tableRows = [];

        orders.forEach(item => {
            const itemData = [
                item.routeName,
                item.from,
                item.to,
                item.farePerTerminal,
                item.noOfTerminals,
            ];
            tableRows.push(itemData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
        doc.text("Route Details", 14, 15);
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
                    <Col className="add-new-listening" xs={8}>
                        {
                            value==0 &&
                            <div>
                                <Input type="text" name="text" id="exampleText" onChange={handleSearch} placeholder="Route Id" />
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