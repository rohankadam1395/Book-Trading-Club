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
        {this.props.users.map((data,index)=>{
            // return <li key={index}>{data.books[0]}</li>
            console.log(data);
            if(data.books.length>0){
              for(let book of data.books){
                return <li>{book.title}</li>

              }

            }else{
              return [];
            }
                  
            
        })}
    </ul>

    {<button onClick={this.addBook}>Add Books</button>}
</div>)
}
}

export default withRouter(Books);