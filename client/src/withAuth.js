import { Redirect } from "react-router-dom";

const withAuth=(Component)=>{
    const AuthRoute=(props)=>{
// const isAuth=!!localStorage.getItem("token");
const isAuth=props.isAuth;


if(isAuth){
    return <Component/>
}else{
    return <Redirect to="/login" />
}
    }

    return AuthRoute;
}

export {withAuth};