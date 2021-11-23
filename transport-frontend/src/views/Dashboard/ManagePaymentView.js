import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Col, Row, UncontrolledDropdown} from "reactstrap";
import {useHistory} from "react-router-dom";
import API from "../../components/api";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import PassengerTable from "../../components/dashboard/PassengerTabel";
import EditBusView from "./EditBus";
import PaymentTabel from "../../components/dashboard/PaymentTable";
import {Button, Input} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import PrintIcon from "@material-ui/icons/Print";
import jsPDF from "jspdf";
import "jspdf-autotable";

let tid="";
export default function ManagePaymentView() {
    const history = useHistory();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        API.get(`/payment/`)
            .then(res => {
                setRows(res.data)
                console.log(res.data)
            })
            .catch(err => {
            });
    }, []);

    const handleSearch=(event)=>{
        tid = event.target.value;
    }

    const refreshTable = () => {
        API.get(`/payment/`)
            .then(res => {
                setRows(res.data)
            })
            .catch(err => {
            });
    }

    const findByCode =()=>{
        if(tid){
            API.post(`/payment/getPaymentByID`,{_id:tid})
                .then(res => {
                    let arr = [];
                    arr.push(res.data);
                    console.log(arr)
                    setRows(arr);
                })
                .catch(err => {
                });
        }
    }

    const generatePDF = orders => {
        const doc = new jsPDF();
        const tableColumn = ["Transaction ID","Payment Date", "Amount", "Passenger Name","Card Number","NIC","Mobile Number"];
        const tableRows = [];

        orders.forEach(item => {
            const itemData = [
                item._id,
                new Date(item.date).toLocaleString(),
                item.amount,
                item.userId.fullName,
                item.userId.cardDetails.cardNo,
                item.userId.nic,
                item.userId.mobileNumber,
            ];
            tableRows.push(itemData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
        doc.text("Payment Details", 14, 15);
        doc.save(`report_${dateStr}.pdf`);
    };

    return (
        <div>
            <div className="item-view-header">
                <Row>
                    <Col className="dashboard-header">
                        <Typography component="h2" variant="h6" color="inherit" noWrap>
                            Payment Details ({rows.length})
                        </Typography>
                    </Col>
                    <Col className="add-new-listening">
                        <div>
                            <Input type="text" name="text" id="exampleText" onChange={handleSearch} placeholder="Transaction ID" />
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
            <PaymentTabel rows={rows}/>
        </div>
    );

}