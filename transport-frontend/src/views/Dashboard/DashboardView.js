import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DashboardCard from "../../components/dashboard/DashboardCard";
import {BarChart, Bar, XAxis, YAxis,CartesianGrid} from 'recharts';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DirectionsIcon from '@material-ui/icons/Directions';
import API from "../../components/api";
import TimeTable from "../../components/dashboard/TimeTabel";



export default function DashboardView(){
    const [totAmount,setTotAmount] =  useState(0);
    const [totPas,setTotPas] =  useState(0);
    const [totBus,setTotBus] =  useState(0);
    const [totRoute,setTotRoute] =  useState(0);
    const [data0,setData0] = useState([]);
    const [data1,setData1] = useState([]);
    useEffect( () => {
        API.get(`/payment/`)
            .then(res => {
                let amount=0;
                res.data.forEach(ele=>{
                    amount = amount+ ele.amount;
                })
                setTotAmount(amount)
            })
            .catch(err => {
            });
        API.get(`/user/`)
            .then(res => {
                let count=0;
                res.data.filter((row)=>row.type === "user").map((row)=>count++);
                setTotPas(count)
            })
            .catch(err => {
            });
        API.get(`/bus/`)
            .then(res => {
                setTotBus(res.data.length)
            })
            .catch(err => {
            });
        API.get(`/route/`)
            .then(res => {
                setTotRoute(res.data.length)
            })
            .catch(err => {
            });
        API.get('bus/getBusCountByRoute').then((res)=>{
            let temp=[];
            res.data.map((e)=>{
                temp.push({name:e._id,BusCount:e.busCount})
            })
            setData1(temp);

        })
        API.get('payment/getPaymentByDate').then((res)=>{
            let temp=[];
            res.data.map((e)=>{
                temp.push({name:new Date(e._id).toLocaleDateString(),Amount:e.totalAmount})
            })
            console.log(temp)
            setData0(temp);

        })
            .catch(err => {
            });
    }, []);

    return(
        <div>
            <Box sx={{ pb: 5 }}>
                <Typography variant="h5">Hi, Welcome back</Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard icon={<MonetizationOnIcon style={{fill: "white",fontSize: 50}}/>} title={"Rs."+totAmount} subTitle="Total Amount"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard icon={<PeopleAltIcon style={{fill: "white",fontSize: 50}}/>} title={totPas} subTitle="Total Passengers"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard icon={<DirectionsBusIcon style={{fill: "white",fontSize: 50}}/>} title={totBus} subTitle="Total Busses"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard icon={<DirectionsIcon style={{fill: "white",fontSize: 50}}/>} title={totRoute} subTitle="Total Routes"/>
                </Grid>
                <Box>
                    <Typography style={{marginLeft:10}} variant="h6">Payment Amounts Per Day</Typography>
                </Box>
                <Grid item xs={6} sm={12} md={12}>
                    <div style={{backgroundColor:"#E7E7E7", borderRadius:5}}>
                        <BarChart width={1100} height={400} data={data0} style={{marginLeft:-25, marginTop:10, paddingTop:30}}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Bar dataKey="Amount" fill="#8884d8" barSize={30} />
                        </BarChart>
                    </div>
                </Grid>
                <Box>
                    <Typography style={{marginLeft:10}} variant="h6">Number Of Busses Per Route</Typography>
                </Box>
                <Grid item xs={6} sm={12} md={12}>
                    <div style={{backgroundColor:"#E7E7E7", borderRadius:5}}>
                        <BarChart width={1100} height={400} data={data1} style={{marginLeft:-25, marginTop:10, paddingTop:30}}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Bar dataKey="BusCount" fill="#8884d8" barSize={30} />
                        </BarChart>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}