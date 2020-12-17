import React from "react";
import {NavLink,Link} from "react-router-dom";
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
    // localStorage.removeItem("token","some-token");
fetch("/logout").then(response=>response.text()).then(response=>{
    console.log(response);
})
    this.props.history.push("/");
    // this.props.history.push("/logout");

}

render(){
const isAuth=this.props.isAuth;

    return<div id="navbar">

    <NavLink to="/">Books</NavLink>
<NavLink to="/requests">Requests</NavLink>
<NavLink to="/trades">Trades</NavLink>
<NavLink to="/users">Users</NavLink>
<NavLink to="/profile/rohan">Profile</NavLink>
{isAuth ? <Link to="/logout">Logout</Link> : <NavLink to="/login">Login</NavLink>}
    </div>
}
}

export default withRouter(Navbar);  