const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.json());

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join("client","build")));
    app.get("/",(req,res)=>{
        console.log("Hello in build mode");
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    });
}else{

    app.use(express.static(path.join("client","public")));
    
    app.get("/api",(req,res)=>{
        // console.log(req);
        console.log("Hello in dev mode");
        res.send("hello");
    });
    app.get("/abc",(req,res)=>{
        console.log("We are in *");
        res.sendFile(path.resolve(__dirname,"test.html"));
    });

   
    

}


    




let port=process.env.PORT || 5000;

app.listen(port,()=>{
console.log(`Server Listening on port ${port}`);
});

