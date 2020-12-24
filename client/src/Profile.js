import React from "react";
import {withRouter}   from "react-router"; 
import {withAuth} from "./withAuth";

class Profile extends React.Component{
  constructor(props){
      super(props);
      this.state={

      }
  }

  componentDidMount(){
      console.log("Profile Mounted");
      console.log(this.props);
        
  }

  submitHandler=(event)=>{
      event.preventDefault();
      console.log(event.target);
      fetch("/profile",{method:"PUT",headers:{"Content-Type": "application/json"},body:JSON.stringify({"test":"123"})}).then(response=>response.json()).then(response=>{

          console.log(response);
      })

  }
render(){

return(<div>
    Profile Page
    {console.log(this.props.match.params.name)}
    <h1>Under Construction</h1>
    <form id="profile" onSubmit={this.submitHandler}>
        <div>
        <label for="name">Full Name</label>
        <input id="name" value={this.props.user.screenName}/>
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