import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {Button} from "reactstrap";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import CardMedia from '@material-ui/core/CardMedia';
import {useHistory} from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "grey",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const PaymentTable = (props) => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Transaction ID</StyledTableCell>
                        <StyledTableCell>Payment Date</StyledTableCell>
                        <StyledTableCell align="left">Amount</StyledTableCell>
                        <StyledTableCell align="left">Passenger Name</StyledTableCell>
                        <StyledTableCell align="left">Card No</StyledTableCell>
                        <StyledTableCell align="left">NIC</StyledTableCell>
                        <StyledTableCell align="left">Mobile No</StyledTableCell>
                        <StyledTableCell align="left">Email</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.length > 0 && props.rows.map((row) => {
                        return (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell style={{width: "12%"}} align="left">{row._id}</StyledTableCell>
                                <StyledTableCell style={{width: "15%"}} align="left">{new Date(row.date).toLocaleString()}</StyledTableCell>
                                <StyledTableCell style={{width: "10%"}} align="left">{row.amount}</StyledTableCell>
                                <StyledTableCell style={{width: "20%"}} align="left">{row.userId.fullName}</StyledTableCell>
                                <StyledTableCell style={{width: "11%"}} align="left">{row.userId.cardDetails.cardNo}</StyledTableCell>
                                <StyledTableCell style={{width: "11%"}} align="left">{row.userId.nic}</StyledTableCell>
                                <StyledTableCell style={{width: "11%"}} align="left">{row.userId.mobileNumber}</StyledTableCell>
                                <StyledTableCell style={{width: "11%"}} align="left">{row.userId.email}</StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default PaymentTable;