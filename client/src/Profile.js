import React from "react";
import {withRouter}   from "react-router"; 
import {withAuth} from "./withAuth";

class Profile extends React.Component{
  constructor(props){
      super(props);
      this.state={
fullname:"",
state:"",
city:""
      }
  }

  componentDidMount(){
      console.log("Profile Mounted");
  }

  submitHandler=(event)=>{
      event.preventDefault();
      console.log(event.target);

  }
render(){

return(<div>
    Profile Page
    {console.log(this.props.match.params.name)}
    <form id="profile" onSubmit={this.submitHandler}>
        <div>
        <label for="name">Full Name</label>
        <input id="name" />
        </div>
       <div>
       <label for="city">City</label>
        <input id="city" />  
       </div>
       <div>
       <label for="state">State</label>
        <input id="state" />
       </div>
       <button type="submit">Submit</button>
    </form>
</div>)
}
}

export default withAuth(withRouter(Profile));