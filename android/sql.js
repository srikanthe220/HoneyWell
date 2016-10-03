var cors = require("cors");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var express = require('express');
var IsEmployee = require('./IsEmployee');
var IsValidRoute = require('./IsValidRoute');
var checkMac = require('./checkMac');


module.exports = function(app,connection){
  


	app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/',function(req,res){
         res.sendFile(__dirname + "/delete.html");
    });

    app.use(function(req, res, next) {
	    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	    next();
    });

    app.use(cors());

    app.post("/present_loc", function(req, res) {
    	//console.log(req.body.mac);
    	IsEmployee(req.body.mac,connection,function(err,data){
            if (err) {
              // error handling code goes here
              console.log("ERROR : ",err);  
              res.end("Oops!! something wrong happened");          
            } else {            
              // code to execute on data retrieval
                //console.log("result from db is IsEmployee: ",data); 
                if(!(data))
                   res.end("not an Employee");                    
                else{
                	IsValidRoute(req.body.ip,connection,function(err,data){
		              if (err) {
		              // error handling code goes here
		              console.log("ERROR : ",err);            
		            } else {            
		              // code to execute on data retrieval
		                //console.log("result from db is IsValidRoute: ",data); 
		                if(!(data))
		                   res.end("not an valid Router");            
		                else{
                            checkMac(req.body.mac,connection,function(err,data){
			                    if (err) {
			                      // error handling code goes here
			                      console.log("ERROR : ",err);            
			                    } else {            
			                      // code to execute on data retrieval
			                        //console.log("result from db is checkMac: ",data); 
			                        if(!(data)){
			                            var article = {
			                                   EMac_Addr: req.body.mac,
			                                   RMac_Addr: req.body.ip
			                                };
			                          insertData(article,connection,res); 
			                        }else{
			                             updateData(req.body.mac,req.body.ip,connection,res);
			                         } 
			                                              
			                      }
			                });
		                }
		              }      
                    });
                }
             }
        });
     
    });


    app.post("/mac-ip", function(req, res) {
    
		     var strQuery = "SELECT e.First_name,e.Last_name,r.Floor,r.Pillar,r.post FROM Employee e,Dynamic_Routing d,RouterIp r WHERE (e.First_name LIKE ? AND e.EMac_Addr=d.EMac_Addr AND d.RMac_Addr=r.RMac_Addr)";
		     //console.log(strQuery);
		     connection.query( strQuery,'%'+req.body.Ename+'%', function(err, result){
			  	if(err)	{
			  		throw err;
			  	}else{
			  		console.log(result);
			  		res.end(JSON.stringify(result));
			  	}
		     });
    });

    app.post("/login",function(req,res){
          var user_mail=req.body.email;
          var password=req.body.password;
          Login(user_mail,password,connection,function(err,data){
            if (err) {
              // error handling code goes here
              console.log("ERROR : ",err);
              res.end("Oops!! something wrong happened");            
            } else {            
              // code to execute on data retrieval
                console.log("result from db is IsEmployee: ",data); 
                if(!(data))
                   res.end("not an Admin");
                else
                	res.end("login successfull");

              }
          }); 
                
	});

	app.post("/insert",function(req,res){
		var details = {
			Emp_id: req.body.Emp_id,
			Fname: req.body.first_name,
            Lname: req.body.last_name,
            M_Addr: req.body.Mac_Addr,
            Email: req.body.Email
		};
		console.log(details);
         IsEmployee(req.body.mac,connection,function(err,data){
            if (err) {
              // error handling code goes here
              console.log("ERROR : ",err);            
            } else {            
              // code to execute on data retrieval
                console.log("result from db is IsEmployee: ",data); 
                if(data)
                   res.end("Employee name already exists");                    
                else{
                    connection.query('INSERT INTO Employee SET ?',data , function (err, result) {
                                     if (err) {
                                     	console.log("something went wrong with insert");
                                        res.end("Oops! something went wrong");
                                     }
                                       console.log(result);
                                       res.end("successfull");
                                    });
                }
              }
          });
	});

    app.post("/delete",function(req,res){
        IsEmployee(req.body.mac,connection,function(err,data){
            if (err) {
              // error handling code goes here
              console.log("ERROR : ",err);            
            } else {            
              // code to execute on data retrieval
                console.log("result from db is IsEmployee: ",data); 
                if(!(data))
                   res.end("Employee doesn't  exists");                    
                else{//write the code to delete an employee
                    connection.query("DELETE FROM Employee WHERE EMac_Addr ='"+req.body.mac+"'" , function (err, result) {
                                     if (err) {
                                     	console.log("something went wrong with insert");
                                        res.end("Oops! something went wrong");
                                     }
                                       console.log(result);
                                       res.end("successfull");
                                    });
                }
              }
          });
		});    	
    

    app.delete("/search/:term", function(req, res) {
        var Ename = definition.term.toLowerCase();

        var strQuery = "SELECT e.First_name,e.Last_name,r.Floor,r.Pillar,r.post FROM Employee e,Dynamic_Routing d,RouterIp r WHERE (e.First_name LIKE ? AND e.EMac_Addr=d.EMac_Addr AND d.RMac_Addr=r.RMac_Addr)";
         //console.log(strQuery);
         connection.query( strQuery,'%'+Ename+'%', function(err, result){
          if(err) {
            throw err;
          }else{
            console.log(result);
            res.end(result);
          }
         });
    });


    app.post("/reset-password",function(req,res){
    	  var name = req.body.mail_id
    	  var old_password=req.body.old_password;
          var new_password=req.body.new_password;
          var strQuery = connection.query('UPDATE Admin SET password= ? WHERE user_mail = ?', [new_password,name], function (err, result) {
			          if (err) {
			          console.log("Oops something went wrong");
			          return;
			        }
			        //console.log(result);
			        res.end("password changed");
			      });
    });
}




function insertData(data,connection,res){
     var strQuery = connection.query('INSERT INTO Dynamic_Routing SET ?',data , function (err, result) {
                                     if (err) {
                                     	//console.log(err);
                                     	//console.log("something went wrong with insert");
                                        res.end("Oops! something went wrong");
                                     }
                                       //console.log(result);
                                       res.end("successfull");
                                    });
}



function updateData(Emac,Rmac,connection,res){
	var strQuery = connection.query('UPDATE Dynamic_Routing SET RMac_Addr= ? WHERE EMac_Addr = ?', [Emac,Rmac], function (err, result) {
          if (err) {
          //console.log("Oops something went wrong");
          return;
        }
        //console.log(result);
        res.end("successfull");
      });
}

function Login(user_mail,password,connection,callback){ 
   var strQuery = "SELECT * FROM Admin WHERE user_mail=\'"+user_mail+"\' AND password=\'"+password+"\'";
    console.log(strQuery);
    connection.query(strQuery,function(err,result){
                if(err){
                    //console.log(err);
                    callback(err,null);
                }else{
                    console.log("IsEmployee"+result);
                     callback(null,result.length);
                 }
    });
}