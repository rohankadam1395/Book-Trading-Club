import React from "react";
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";
class Navbar extends React.Component{
constructor(props){
    super(props);
    this.loginUser=this.loginUser.bind(this);
    this.logoutUser=this.logoutUser.bind(this);

}
loginUser(){
console.log("Logging in");
localStorage.setItem("token","some-token");
console.log(this.props.history);
this.props.history.push("/profile/rohan");
}
logoutUser(){
    console.log("Logging out");
    localStorage.removeItem("token","some-token");

    this.props.history.push("/");

}

render(){
const isAuth=!!localStorage.getItem("token");
    return<div id="navbar">
    <NavLink to="/">Books</NavLink>
<NavLink to="/requests">Requests</NavLink>
<NavLink to="/trades">Trades</NavLink>
<NavLink to="/users">Users</NavLink>
<NavLink to="/profile/rohan">Profile</NavLink>
{isAuth ? <button onClick={this.logoutUser}>Logout</button> : <button onClick={this.loginUser}>Login</button>}
    </div>
}
}

export default withRouter(Navbar);