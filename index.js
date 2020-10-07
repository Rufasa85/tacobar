//build server structure
const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//build data structures
// array of reservations (tables)
let tableData = [
    {
        name:"Joe",
        phoneNumber:"123",
        email:"joe@joe.joe",
        id:"1"
    }
];
//array of waitlist
let waitlistData = [
    {
        name:"renee",
        phoneNumber:"456",
        email:"ren@e.e",
        id:"2"
    }
];

 //GET route for homepage
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"))
})
 //GET route for homepage
app.get("/reserve",function(req,res){
    res.sendFile(path.join(__dirname,"reserve.html"))
})
// GET route for table data
app.get("/api/tables",function(req,res){
    res.json(tableData)
})
// GET route for waitlist data
app.get("/api/waitlist",function(req,res){
    res.json(waitlistData)
})
//GET route to clear table data
app.get("/api/clear",function(req,res){
    tableData=[];
    waitlistData=[];
    res.send("DELETED!")
})

//POST route to add a reservation to either tables or waitlist
app.post("/api/tables",function(req,res){
    let hasTable = false;
    if(tableData.length<5){
        tableData.push(req.body)
        hasTable=true
    }else {
        waitlistData.push(req.body)
    }
    res.json(hasTable)
})

app.listen(PORT,function(){
    console.log("listenin on port " +PORT)
})

