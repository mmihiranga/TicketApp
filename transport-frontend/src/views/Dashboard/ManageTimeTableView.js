import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import { Col, Row, UncontrolledDropdown} from "reactstrap";
import {useHistory} from "react-router-dom";
import API from "../../components/api";
import PrintIcon from "@material-ui/icons/Print";
import TimeTable from "../../components/dashboard/TimeTabel";
import {Button, Input, Tab, Tabs} from "@material-ui/core";
import AddTimeTableView from "./AddTimeTable";
import EditRouteView from "./EditRoute";
import EditTimeTableView from "./EditTimeTable";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import jsPDF from "jspdf";
import "jspdf-autotable";

let from = "";
let to="";

export default function ManageTimeTableView() {
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [value, setValue] = React.useState(0);
    const [view, setView] = useState(null);

    const setEditTimeTableView = (row)=>{
        setView(<EditTimeTableView row={row}/>);
    }

    useEffect( () => {
        API.get(`/timetable/`)
            .then(res => {
                setRows(res.data)
                console.log(res.data)
                setView(<TimeTable rows={res.data} setEditView={setEditTimeTableView}/>)
            })
            .catch(err => {
            });
    }, []);

    const getData=(newValue)=>{
        API.get(`/timetable/`)
            .then(res => {
                setRows(res.data)
                if(newValue==0){
                    setView(<TimeTable rows={res.data} setEditView={setEditTimeTableView}/>);
                }else if(newValue==1){
                    setView(<AddTimeTableView/>);
                }
            })
            .catch(err => {
            });
    }

    const handleFrom=(event)=>{
        from = event.target.value;
    }

    const handleTo=(event)=>{
        to = event.target.value;
    }

    const refreshTable = () => {
        API.get(`/timeTable/`)
            .then(res => {
                setRows(res.data)
                setView(<TimeTable rows={res.data} setEditView={setEditTimeTableView}/>);
            })
            .catch(err => {
            });
    }

    const findByCode =()=>{
        if(from && to){
            API.post(`timeTable/getAllTimeTableByFromTo`,{from:from,to:to})
                .then(res => {
                    setRows(res.data)
                    setView(<TimeTable rows={res.data} setEditView={setEditTimeTableView}/>);
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    const generatePDF = orders => {
        const doc = new jsPDF();
        const tableColumn = ["Departure Time","Arrival Time", "Bus Number", "Route", "From","To"];
        const tableRows = [];

        orders.forEach(item => {
            const itemData = [
                item.departureTime,
                item.arrivalTime,
                item.busId.busNumber,
                item.routeId.routeName,
                item.routeId.from,
                item.routeId.to,
            ];
            tableRows.push(itemData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
        doc.text("Time Table Details", 14, 15);
        doc.save(`report_${dateStr}.pdf`);
    };

    const handleChange = async (event, newValue) => {
        setValue(newValue);
        await getData(newValue);
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
                                <Input type="text" name="text" id="exampleText" onChange={handleFrom} placeholder="From" />
                                {' '}
                                <Input type="text" name="text" id="exampleText" onChange={handleTo} placeholder="To" />
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