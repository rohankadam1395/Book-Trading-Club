const express=require("express");
const path=require("path");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
let passport=require("passport");
let session=require("express-session");

let TwitterStartegy=require("passport-twitter").Strategy;
let Schema=mongoose.Schema;
 let UserSchema=new Schema({},{strict:false});
  let User=mongoose.model('User',UserSchema);

const app=express();
app.use(session({secret:"cats"}));
app.use(bodyParser.json());
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

    app.get("/test",(req,res)=>{
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> In test");
        console.log(req.sessionID);
        console.log(req.isAuthenticated());
        res.send("Okayyyyy");
    })
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

   
    

}


  mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
      if(err){
          console.log(err);
      }

console.log("Successfully Connected to Database");




passport.use(new TwitterStartegy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret:process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "https://warm-atoll-88598.herokuapp.com/auth/twitter/callback"
},(token,tokenSecret,profile,done)=>{
    console.log(token);
    console.log(tokenSecret);

    console.log(profile);
User.findOneAndUpdate({id:profile.id},{id:profile.id},{new:true,upsert:true},(err,docs)=>{

    done(err,docs);

})

}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
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
      })

  })



let port=process.env.PORT || 5000;

app.listen(port,()=>{
console.log(`Server Listening on port ${port}`);
});

