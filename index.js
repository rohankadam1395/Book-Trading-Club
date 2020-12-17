const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
let passport=require("passport");
let session=require("express-session");

let TwitterStartegy=require("passport-twitter").Strategy;


const app=express();
app.use(session({secret:"cats"}));
app.use(bodyParser.json());
app.use(express.static(path.join("client","build")));
app.use(passport.initialize())

if(process.env.NODE_ENV==='production'){
    app.get("/",(req,res)=>{
        console.log("Hello in build mode");
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

   
    

}


passport.use(new TwitterStartegy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret:process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "https://warm-atoll-88598.herokuapp.com/auth/twitter/callback"
},(token,tokenSecret,profile,done)=>{
    console.log(token);
    console.log(tokenSecret);

    console.log(profile);

    done(null,profile);

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




let port=process.env.PORT || 5000;

app.listen(port,()=>{
console.log(`Server Listening on port ${port}`);
});

