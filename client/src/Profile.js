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
  }
render(){

return(<div>
    Profile Page
    {console.log(this.props.match.params.name)}
</div>)
}
}

export default withAuth(withRouter(Profile));