import React from "react";
class Users extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
render(){
return(<div>
    Users Page
    <ul>
        {this.props.users.map((data,index)=>{
            return <li key={index}>
                <p>Name:{data.name}</p>
                <p>Location:{data.location}</p>
                <p>Screen Name:{data.screenName}</p>
                <p>Description:{data.description}</p>
                </li>
        })}
    </ul>
</div>)
}
}

export default Users;