var express = require("express");
var bodyParser = require('body-parser');

var request = require('request');
var request = request.defaults({jar:true});

var getToken = require("./token.js");
var getInfo = require("./getinfo.js");
var getAttendance = require("./getAttendance.js");
var getMarks = require("./getmarks.js");
var uuid = require("uuid");
var app = express();

app.use(bodyParser.urlencoded({extended:true}))


app.get("/status",function(req,res){
  res.json({"status":"UP"});
});


app.post("/token",function(req,res){
var username = req.body.username;
var password = req.body.password;

//add a check here
getToken(username,password,res);
});


app.post("/info",function(req,res){
var token = req.body.token;
getInfo(token,res);
});



app.post("/attendance",function(req,res){
//fix this
// console.log(req.body);
var token = req.body.token;
// console.log(token)
getAttendance(token,res);

});

app.post("/marks",function(req,res){
var token = req.body.token;
getMarks(token,res);
});

app.all("/404",function(req,res){
  res.sendStatus(404);
});


app.all("*",function(req,res){
res.redirect("/404");
});


app.listen(3001);
