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
import AddBook from "./AddBook";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            isAuth:false,
            user:{id:"unauth",
        description:"",
    location:"",
name:"",
sreenName:""}
        }
// this.signIn=this.signIn.bind(this);
this.handler=this.handler.bind(this);
this.bookHandler=this.bookHandler.bind(this);



    }

//     signIn(){
// fetch("/auth/twitter").then(response=>response.text()).then(response=>{
//     console.log(response);
// })
//     }




componentDidMount(){
    fetch("/data").then(response=>response.json()).then(response=>{
        console.log("Response from /data");
        console.log(response);
        console.log("Cookie");
        console.log(document.cookie);
        console.log(response.user);
        
if(response.user){
    console.log("Setting State for Auth");
    this.setState({
        isAuth:response.isAuth,
        users:response.users,
        user:response.user
    })
}else{
    console.log("Setting State for UnAuth");
    this.setState({
        users:response.users,
        isAuth:response.isAuth,
    })
}
        
     

    })
}


handler(val){
    console.log("Handler Called");
    console.log(val);
    this.setState({
user:val
    })
}

bookHandler(val){
    console.log("Book Handler Called");
let usersCopy=this.state.users.slice();

usersCopy.filter((value)=>{
    if(value.id===this.state.user.id){
        value.books.push(val);
        return true;
    }else{
        return false;
    }
});

this.setState({
    users:usersCopy
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
                                <Books books={this.state.users}/>
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
                                <Profile isAuth={this.state.isAuth} user={this.state.user} handler={this.handler}/>
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/addbook">
                            <AddBook  handler={this.bookHandler}/>
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