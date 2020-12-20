import React from "react";
import "./Home.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Books from "./Books";
import Requests from "./Requests";
import Trades from "./Trades";
import Users from "./Users";
import Profile from "./Profile";
import Navbar from "./Navbar";
import Login from "./Login";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            users:[],
            isAuth:false,
            user:{}
        }
// this.signIn=this.signIn.bind(this);
this.test=this.test.bind(this);

    }

//     signIn(){
// fetch("/auth/twitter").then(response=>response.text()).then(response=>{
//     console.log(response);
// })
//     }

test(){
  fetch("/test").then(response=>response.text()).then(response=>{
    console.log(response);
})  
}


componentDidMount(){
    fetch("/data").then(response=>response.json()).then(response=>{
        console.log(response);
        console.log("Cookie");
        console.log(document.cookie);
        this.setState({
            books:response.books,
            isAuth:response.isAuth,
            users:response.users,
            user:response.user
        })

    })
}
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div id="home">
                        <Navbar isAuth={this.state.isAuth} id={this.state.user.id}/>

                        <Switch>
                            <Route exact path="/">
                                <Books books={this.state.books}/>
                            </Route>
                            <Route path="/requests">
                                <Requests />
                            </Route>
                            <Route path="/trades">
                                <Trades />
                            </Route>
                            <Route path="/users">
                                <Users users={this.state.users}/>
                            </Route>
                            <Route path="/profile/:name">
                                <Profile isAuth={this.state.isAuth} user={this.state.user}/>
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                        </Switch>

                    </div>

                </BrowserRouter>
                {/* <button onClick={this.signIn}>Sign in with Twitter</button> */}


            </div>
        );
    }
}

export default Home;