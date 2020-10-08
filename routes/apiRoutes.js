const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path')



let dbData = fs.readFileSync(path.join(__dirname,"../data/db.json"),"utf8");
dbData = JSON.parse(dbData);

// array of reservations (tables)
let tableData = dbData.tables;
//array of waitlist
let waitlistData = dbData.waitlist;
// GET route for table data

let lastId = dbData.lastId;


router.get("/tables",function(req,res){
    res.json(tableData)
})
// GET route for waitlist data
router.get("/waitlist",function(req,res){
    res.json(waitlistData)
})
router.put("/tables/:id",function(req,res){
    console.log(req.params)
    for (let i = 0; i < tableData.length; i++) {
        if(tableData[i].id===parseInt(req.params.id)){
            tableData.splice(i,1);
            if(waitlistData.length>0) {
                tableData.push(waitlistData[0]);
                waitlistData.shift();
            }
            const newDbState = {
                tables:tableData,
                waitlist:waitlistData,
                lastId:lastId 
            }
        
            fs.writeFileSync(path.join(__dirname,"../data/db.json"),JSON.stringify(newDbState,null,2));
            return res.send("done eatin!")
        }
    }
    return res.send("no such customer")
})
//GET route to clear table data
router.get("/clear",function(req,res){
    tableData=[];
    waitlistData=[];
    const emptyDbSchema = {
        tables:[],
        waitlist:[],
        lastId:lastId
    }
    fs.writeFileSync(path.join(__dirname,"../data/db.json"),JSON.stringify(emptyDbSchema,null,2));
    res.send("DELETED!")
})

//POST route to add a reservation to either tables or waitlist
router.post("/tables",function(req,res){
    let hasTable = false;
    const newTableObj= {
        name:req.body.name,
        phoneNumber: req.body.phoneNumber,
        email:req.body.email,
        id : lastId+1
    }
    lastId++;
    if(tableData.length<5){
        tableData.push(newTableObj)
        hasTable=true
    }else {
        waitlistData.push(newTableObj)
    }
    const newDbState = {
        tables:tableData,
        waitlist:waitlistData,
        lastId:lastId 
    }

    fs.writeFileSync(path.join(__dirname,"../data/db.json"),JSON.stringify(newDbState,null,2));
    res.json(hasTable)
})

module.exports = router;