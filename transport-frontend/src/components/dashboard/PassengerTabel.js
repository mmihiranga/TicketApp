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

const PassengerTable = (props) => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>NIC</StyledTableCell>
                        <StyledTableCell>Full Name</StyledTableCell>
                        <StyledTableCell align="left">DOB</StyledTableCell>
                        <StyledTableCell align="left">Email</StyledTableCell>
                        <StyledTableCell align="left">Mobile No</StyledTableCell>
                        <StyledTableCell align="left">Address</StyledTableCell>
                        <StyledTableCell align="left">City</StyledTableCell>
                        <StyledTableCell align="left">Postal Code</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.length > 0 && props.rows.filter(row => row.type === "user").map((row) => {

                        return (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell style={{width: "12%"}} align="left">{row.nic}</StyledTableCell>
                                <StyledTableCell style={{width: "15%"}} align="left">{row.fullName}</StyledTableCell>
                                <StyledTableCell style={{width: "10%"}} align="left">{row.dob}</StyledTableCell>
                                <StyledTableCell style={{width: "10%"}} align="left">{row.email}</StyledTableCell>
                                <StyledTableCell style={{width: "11%"}} align="left">{row.mobileNumber}</StyledTableCell>
                                <StyledTableCell style={{width: "20%"}} align="left">{row.address}</StyledTableCell>
                                <StyledTableCell style={{width: "11%"}} align="left">{row.city}</StyledTableCell>
                                <StyledTableCell style={{width: "11%"}} align="left">{row.postalCode}</StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default PassengerTable;