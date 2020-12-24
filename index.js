const express=require("express");
const path=require("path");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
let passport=require("passport");
let session=require("express-session");

let TwitterStartegy=require("passport-twitter").Strategy;
let Schema=mongoose.Schema;
 let UserSchema=new Schema({
     _id:Object,
     id:Number,
     name:String,
    screenName:String,
    location:String,
    description:String,
    books:[{title:String,
    description:String}]
 });
  let User=mongoose.model('User',UserSchema);

let books=["book1","book1","book1","book1","book1","book1","book1"];
let users=["user1","user1","user1","user1","user1","user1","user1"];

const app=express();
app.use(bodyParser.json());

app.use(session({secret:"cats"}));
app.use(express.static(path.join("client","build")));
app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV==='production'){
    app.get("/",(req,res)=>{
        console.log(req.sessionID);
        console.log(req.isAuthenticated());
        console.log("Hello in Prod mode");
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    });

  
}else{
require("dotenv").config();
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

    app.get("/test",(req,res)=>{
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> In test");
        console.log(req.sessionID);
        console.log(req.isAuthenticated());
        res.send("Okayyyyy");
    })
    

}


  mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false},(err)=>{
      if(err){
          console.log(err);
      }

console.log("Successfully Connected to Database");




passport.use(new TwitterStartegy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret:process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "https://warm-atoll-88598.herokuapp.com/auth/twitter/callback"
},(token,tokenSecret,profile,done)=>{
    // console.log(token);
    // console.log(tokenSecret);

    // console.log(profile);

User.findOneAndUpdate({"id":profile.id},{"name":profile.username,
    "screenName":profile.displayName,
    "location":profile['_json'].location,
    "description":profile['_json'].description },{upsert:true,new:true},(err,docs)=>{
if(err){
    console.log(err);
}else{

    console.log(docs);

    done(err,docs);
}


})

}));

passport.serializeUser(function(user, done) {
    console.log("Serializing");
    console.log(user);
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log("De-Serializing");
    console.log(id);
    User.findOne({"id":id}, function(err, user) {
        console.log('Found in deserailized');
        console.log(user);
        console.log(err);
      done(err, user);
    });
  });



      app.get('/auth/twitter', passport.authenticate('twitter'));
      // app.get('/auth/twitter', (req,res)=>{
      //     console.log("Heyyyyyyyyyy");
      //     res.send("helllo");
      // });
      
      app.get('/auth/twitter/callback',
      passport.authenticate('twitter', { successRedirect: '/',
                                         failureRedirect: '/login' }));
      
      app.get("/logout",(req,res)=>{
          console.log("????????/Logging Out");
          req.logout();
          res.redirect("/");
      });

      app.get("/data",(req,res,done)=>{
          console.log("in /data ");
        //   console.log(process.env.DB);
          User.find({},(err,docs)=>{
              let users=docs;
              if(err){
                  console.log(err);
              }else{
                  console.log("Got All Docs");
                  console.log(docs);
                  res.json({
                    books:books,
                    users:users,
                    isAuth:req.isAuthenticated(),
                    user:req.user
                });
                done();
              }
          })
        console.log(req.user);
       
      })

      app.post("/addbook",(req,res)=>{
          console.log(req.headers);
          console.log(req.body);
          console.log(req.user);
          console.log("in post of addbook");
          if(req.isAuthenticated()){
              User.findOne({id:req.user.id},(err,doc)=>{
                  if(err){
                      console.log(doc);
                      res.send(doc);
                  }else{
                      console.log(err);
                      res.send({ans:"Erro Received from database"});

                  }
              })
          }
      })

  })



let port=process.env.PORT || 5000;

app.listen(port,()=>{
console.log(`Server Listening on port ${port}`);
});

