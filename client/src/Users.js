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
            return <li key={index}>{data}</li>
        })}
    </ul>
</div>)
}
}

export default Users;