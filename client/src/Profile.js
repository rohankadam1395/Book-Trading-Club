import React from "react";
import {withRouter}   from "react-router"; 
import {withAuth} from "./withAuth";

class Profile extends React.Component{
  constructor(props){
      super(props);
      this.state={
name:this.props.user.user.screenName,
city:this.props.user.user.location.match(/.+?(?=,)/)[0],
state:this.props.user.user.location.match(/.*,\s(.+)/)[1]
      }
      this.nameChange=this.nameChange.bind(this);
      this.cityChange=this.cityChange.bind(this);
      this.stateChange=this.stateChange.bind(this);

      
  }

  componentDidMount(){
      console.log("Profile Mounted");
      console.log(this.props);
        
  }

  submitHandler=(event)=>{
      event.preventDefault();
      console.log(event.target);
      let obj={
          name:event.target.name.value,
          city:event.target.city.value,
          state:event.target.state.value

      }
      fetch("/profile",{method:"PUT",headers:{"Content-Type": "application/json "},body:JSON.stringify(obj)}).then(response=>response.json()).then(response=>{

          console.log(response);
      })

  }

  nameChange(event){

this.setState({
    name:event.target.value
})
  }

  cityChange(event){

    this.setState({
        city:event.target.value
    })
      }

      stateChange(event){

        this.setState({
            state:event.target.value
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
        <input id="name" value={this.state.name} onChange={this.nameChange}/>
        </div>
       <div>
       <label for="city">City</label>
        <input id="city" value={this.state.city} onChange={this.cityChange}/>  
       </div>
       <div>
       <label for="state">State</label>
        <input id="state" value={this.state.state} onChange={this.stateChange}/>
       </div>
       <button type="submit">Submit</button>
    </form>
</div>)
}
}

export default withAuth(withRouter(Profile));