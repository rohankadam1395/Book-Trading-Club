import React from "react";
class Login extends React.Component{

    render(){
        return <div>
            This is a Login Page

            <a href="/auth/twitter">Sign in with Twitter</a>
<button onClick={this.test}>Test</button>
        </div>
    }
}

export default Login;