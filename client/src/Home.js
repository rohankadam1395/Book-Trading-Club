import React from "react";
import "./Home.css";
import {BrowserRouter, NavLink,Route, Switch} from "react-router-dom";
import Books from "./Books";
import Requests from "./Requests";
import Trades from "./Trades";
import Users from "./Users";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
     
    }

  

    render(){
        return(
        <BrowserRouter>
        <div id="home">
<NavLink to="/">Books</NavLink>
<NavLink to="/requests">Requests</NavLink>
<NavLink to="/trades">Trades</NavLink>
<NavLink to="/users">Users</NavLink>
<Switch>
<Route exact path="/">
<Books/>
</Route>
<Route path="/requests">
<Requests/>
</Route>
<Route path="/trades">
<Trades/>
</Route>
<Route path="/users">
<Users/>
</Route>
</Switch>

    </div>
    </BrowserRouter>
);
    }
}

export  default Home;