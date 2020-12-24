import React from "react";
import {withRouter} from "react-router";

class Books extends React.Component{
  constructor(props){
      super(props);
      this.state={
         
      }
      this.addBook=this.addBook.bind(this);
  }
  addBook(){
this.props.history.push("/addbook");
  }

render(){
return(<div>
    Books Page
    <ul>
        {this.props.books.map((data,index)=>{
            // return <li key={index}>{data.books[0]}</li>
            console.log(data);
            if(data.books.length>0){
              return <li>{data.books[0].title}</li>
                        }else{
                          return data;
                        }
            
        })}
    </ul>

    {<button onClick={this.addBook}>Add Books</button>}
</div>)
}
}

export default withRouter(Books);