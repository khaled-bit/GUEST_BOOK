//Requiring all the modules you need
var http = require('http')
var path = require('path')
var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var app = express();

//telling express that views are in the views folder
app.set("views",path.resolve(__dirname,"views"));
//telling express that views will use the EJS engine
app.set("view engine","ejs");
//app.use(express.static(path.resolve(__dirname, "/public")))
var entries = []
/*app.locals is property of app express that is
used to store variable over views/templete
*/
app.locals.entries = entries
//middlewares
app.use(logger("dev"))
app.use(bodyParser.urlencoded({extended:false}));

//routings
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/new-entry",(req,res)=>{
    res.render("new-entry")
})

//adding new entry
app.post("/new-entry",(req,res)=>{
    if (!req.body.title || !req.body.body) {
        res.status(400).send("Entries must have a title and a body.");
        return;
        }
        entries.push({
        title:req.body.title,
        content:req.body.body,
        published: new Date()
        
    });
    res.redirect("/");
})
 

app.get('/delete',(req,res)=>{
    //res.render("/")
    const index = entries.findIndex((item) => item.title ===req.body.title && item.content ===req.body.content);
    entries.splice(index,1)
    app.locals.entries=entries
    console.log(entries)
    res.redirect("/")
    
})

//this act as a catch for all requets as middlewares executes in order
app.use((req,res)=>{
    res.status(404).render("404");
});
//creating the server
http.createServer(app).listen(3000,(req,res)=>{
    console.log("Guestbook app started on port 3000.");
})

//you can also write short hand one
/*
app.listen(3000)
*/