import React from "react";
class AddBook extends React.Component{
constructor(props){
    super(props);
    this.state={
        status:""
    }

    this.handleSubmit=this.handleSubmit.bind(this);
    // this.change=this.change.bind(this);
}
    handleSubmit(event){
event.preventDefault();
console.log(event.target.title.value);
let obj2={
    "title":event.target.title.value,
    "description":event.target.description.value
}
fetch("/addbook",{method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(obj2)}).then(response=>response.json()).then(response=>{
    console.log("making an Add book POST");    
    console.log(response);
    let status="";
    if(response.error){
status=response.error;
    }else{
        status=response.success;
this.props.handler(obj2);
    }
    this.setState({
        status:status
    })

})
    }

//     change(event){
// console.log(event.target.value);
//     }
render(){
    return <div>
        Add Book For 
        <form onSubmit={this.handleSubmit}> 
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required ></input>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description"></input>
            <button type="submit">Add Book</button>
            {this.state.status}
        </form>
    </div>
}
}

export default AddBook;