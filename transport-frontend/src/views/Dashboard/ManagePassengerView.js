import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import { Col, Row, UncontrolledDropdown} from "reactstrap";
import {useHistory} from "react-router-dom";
import API from "../../components/api";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import PassengerTable from "../../components/dashboard/PassengerTabel";
import EditBusView from "./EditBus";
import {Button, Input} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import PrintIcon from "@material-ui/icons/Print";
import RouteTable from "../../components/dashboard/RouteTabel";
import jsPDF from "jspdf";
import "jspdf-autotable";

let nic="";

export default function ManagePassengerView() {
    const history = useHistory();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        API.get(`/user/`)
            .then(res => {
                setRows(res.data)
                console.log(res.data)
            })
            .catch(err => {
            });
    }, []);

    const handleSearch=(event)=>{
        nic = event.target.value;
    }

    const refreshTable = () => {
        API.get(`/user/`)
            .then(res => {
                setRows(res.data)
            })
            .catch(err => {
            });
    }

    const findByCode =()=>{
        if(nic){
            API.get(`/user/${nic}`)
                .then(res => {
                    setRows(res.data);
                    console.log(res.data)
                })
                .catch(err => {
                });
        }
    }

    const generatePDF = orders => {
        const doc = new jsPDF();
        const tableColumn = ["NIC","Full Name", "DOB", "email", "Mobile No"];
        const tableRows = [];

        orders.forEach(item => {
            const itemData = [
                item.nic,
                item.fullName,
                item.dob,
                item.email,
                item.mobileNumber,
            ];
            tableRows.push(itemData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
        doc.text("Passenger Details", 14, 15);
        doc.save(`report_${dateStr}.pdf`);
    };

    const getPassengerCount=()=>{
        let count=0;
        rows.filter((row)=>row.type === "user").map((row)=>count++);
        return count;
    }
    return (
        <div>
            <div className="item-view-header">
                <Row>
                    <Col className="dashboard-header">
                        <Typography component="h2" variant="h6" color="inherit" noWrap>
                            Passenger Details ({getPassengerCount()})
                        </Typography>
                    </Col>
                    <Col className="add-new-listening">
                        <div>
                            <Input type="text" name="text" id="exampleText" onChange={handleSearch} placeholder="NIC" />
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
                    </Col>
                </Row>
            </div>
            <PassengerTable rows={rows}/>
        </div>
    );

}