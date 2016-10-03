var express = require("express");
var http = require("http");
var cors = require("cors");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var io = require("socket.io")(server);

var app = express();
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
var server = http.createServer(app).listen(3000);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
  res.sendfile("index.html");
});


app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.use(cors());

app.post("/mac-ip", function(req, res) {
    
     var strQuery1 = "SELECT e.First_name,e.Last_name,r.Floor,r.Pillar,r.post FROM Employee e,Dynamic_Routing d,RouterIp r WHERE (e.First_name = '"+req.body.nm+"' AND e.Mac_Addr=d.Mac_Addr AND d.Router_Id=r.Router_Id)";
     console.log(strQuery1);
     connection.query( strQuery1, function(err, result1){
  	if(err)	{
  		throw err;
  	}else{
  		console.log(result1);
  		res.end(JSON.stringify(result1));
  	}
  });
  var a = req.body.nm;
// console.log(a);
});
app.post("/present_loc", function(req, res) {
       	
   var strQuery2 = "SELECT Mac_Addr FROM Dynamic_Routing WHERE Mac_Addr='"+req.body.mac+"'";
   console.log(strQuery2);
    connection.query( strQuery2, function(err, result2){
  	if(err)	{
  		throw err;
  	}else{
  		console.log(result2);
  		if(!(result2.length)){
  			var article = {
               Mac_Addr: req.body.mac,
               Router_Id: req.body.ip
            };
  			var strQuery3 = connection.query('INSERT INTO Dynamic_Routing SET ?',article , function (err, result3) {
			  if (err) {
			    console.error(err);
			    return;
			  }
			  console.log(result3);
			  res.end("successfull");
			});
  		}
  		else{
  			var strQuery4 = connection.query('UPDATE Dynamic_Routing SET Router_Id = ? WHERE Mac_Addr = ?', [req.body.ip,req.body.mac], function (err, result) {
				  if (err) {
			    console.error(err);
			    return;
			  }
			  console.log(result);
			  res.end("successfull");
			});
  		}
  	}
  });
 console.log(req.body.mac);
 console.log(req.body.ip);
 res.end('done');
});

/*app.post("/broadcast",function(req, res) {
		io.on("connection", function(socket) {

	    socket.on("chat", function(message) {
	    	socket.broadcast.emit("message", message);
	    });

		socket.emit("message", "Welcome to Cyber Chat");

        	});
});*/

console.log("Starting Socket App - http://localhost:3000");