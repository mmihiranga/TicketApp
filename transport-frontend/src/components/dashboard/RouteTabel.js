import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";

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

const RouteTable = (props) => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Route</StyledTableCell>
                        <StyledTableCell>From</StyledTableCell>
                        <StyledTableCell align="left">To</StyledTableCell>
                        <StyledTableCell align="left">Fare Per Terminal</StyledTableCell>
                        <StyledTableCell align="left">No Of Terminals</StyledTableCell>
                        <StyledTableCell align="left">Map</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.length > 0 && props.rows.map((row) => {
                        return (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell style={{width: "12%"}} align="left">{row.routeName}</StyledTableCell>
                                <StyledTableCell style={{width: "10%"}} align="left">{row.from}</StyledTableCell>
                                <StyledTableCell style={{width: "10%"}} align="left">{row.to}</StyledTableCell>
                                <StyledTableCell style={{width: "10%"}} align="left">{row.farePerTerminal}</StyledTableCell>
                                <StyledTableCell style={{width: "11%"}} align="left">{row.noOfTerminals}</StyledTableCell>
                                <StyledTableCell style={{width: "10%"}} align="left">
                                    <Button variant="contained" color="danger" onClick={()=>{
                                        window.open("https://www.google.com/maps/dir/?api=1&origin="+row.from+"&destination="+row.to)
                                    }}>View Map</Button>
                                </StyledTableCell>
                                <StyledTableCell style={{width: "2%"}} align="left">
                                    <Button onClick={()=>{props.setEditView(row)}} variant="contained" color="secondary">Edit</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default RouteTable;