import React from "react";
class Books extends React.Component{
  constructor(props){
      super(props);
      this.state={
         
      }
  }

render(){
return(<div>
    Books Page
    <ul>
        {this.props.books.map((data,index)=>{
            return <li key={index}>{data}</li>
        })}
    </ul>
</div>)
}
}

export default Books;