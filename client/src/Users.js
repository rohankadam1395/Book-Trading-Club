import React from "react";
class Users extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users:["user1","user1","user1","user1","user1","user1","user1"]
        }
    }
render(){
return(<div>
    Users Page
    <ul>
        {this.state.users.map((data,index)=>{
            return <li key={index}>{data}</li>
        })}
    </ul>
</div>)
}
}

export default Users;