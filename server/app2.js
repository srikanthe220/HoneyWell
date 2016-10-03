var express = require('express');
var http = require("http");
var mysql = require("mysql");

//estalblishing connection with database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "honeywell",
  database:"honeywell"
});

connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log("connected");
  }
});
connection.query("use honeywell");
app = express();
var server = http.createServer(app).listen(3000);
require('./sql')(app,connection);

console.log('Your application is running on http://localhost:3000');