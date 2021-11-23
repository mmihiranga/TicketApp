import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createBrowserHistory} from "history";
import SignInView from "../views/SignIn";
import Dashboard from "../views/Dashboard/Dashboard";
import SignUp from "../views/SignUp";

const hist = createBrowserHistory();

const routes = () => (
    <Router history={hist}>
        <Route exact path="/" component={SignInView}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/dashboard" component={Dashboard}/>
    </Router>
)
export default routes;