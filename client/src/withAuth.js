import { Redirect } from "react-router-dom";

const withAuth=(Component)=>{
    const AuthRoute=(props)=>{
// const isAuth=!!localStorage.getItem("token");
const isAuth=props.isAuth;
console.log("In withAuth");
console.log(props);

if(isAuth){
    return <Component user={props}/>
}else{
    return <Redirect to="/login" />
}
    }

    return AuthRoute;
}

export {withAuth};