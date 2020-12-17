import React from "react";
import "./Home.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Books from "./Books";
import Requests from "./Requests";
import Trades from "./Trades";
import Users from "./Users";
import Profile from "./Profile";
import Navbar from "./Navbar";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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

    render() {
        return (
            <div>

                <BrowserRouter>
                    <div id="home">
                        <Navbar />

                        <Switch>
                            <Route exact path="/">
                                <Books />
                            </Route>
                            <Route path="/requests">
                                <Requests />
                            </Route>
                            <Route path="/trades">
                                <Trades />
                            </Route>
                            <Route path="/users">
                                <Users />
                            </Route>
                            <Route path="/profile/:name">
                                <Profile />
                            </Route>
                        </Switch>

                    </div>

                </BrowserRouter>
                {/* <button onClick={this.signIn}>Sign in with Twitter</button> */}
<a href="/auth/twitter">Sign in with Twitter</a>
<button onClick={this.test}>Test</button>
                <a href="https://www.freepik.com/vectors/logo">Logo vector created by freepik - www.freepik.com</a>

            </div>
        );
    }
}

export default Home;