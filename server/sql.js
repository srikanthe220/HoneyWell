var bodyParser = require("body-parser");
var mysql = require("mysql");
var express = require('express');
//package to check whether he or she is employee of HoneyWell or not
var IsEmployee = require('./IsEmployee'); 
//package to check does router belongs HoneyWell or not
var IsValidRoute = require('./IsValidRoute');
// package to check the avalability of Employee in HoneyWell Campus
var checkMac = require('./checkMac');


module.exports = function(app,connection){
  
	app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(function(req, res, next) {
      //loging the requests made to server by clients
	    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	    next();
    });

    //method to update or insert the present location of the Employee Connected to HoneyWell router
    app.post("/present_loc", function(req, res) {
      //checking the whether the connected Employee belongs to HoneyWell or not
    	IsEmployee(req.body.mac,connection,function(err,data){
            if (err) {
              console.log("ERROR : ",err);  
              //if error occurs in Database Querying, the response will be as shown below 
              res.end("Oops!! something wrong happened");          
            } else {            
                //if he or she is not an employee data will be 0
                if(!(data))
                   res.end("not an Employee");                    
                else{
                    //if he or she is an employee we will continue to check whether the router is valid 
                  	IsValidRoute(req.body.ip,connection,function(err,data){
        		              if (err) {
          		              console.log("ERROR : ",err); 
                            res.end("Oops!! something wrong happened");           
          		            } else {             
        		                if(!(data))
        		                   res.end("not an valid Router");            
        		                else{ //checking Employee availability in HoneyWell Campus
                                    checkMac(req.body.mac,connection,function(err,data){
            			                    if (err) {
            			                      console.log("ERROR : ",err);
                                        res.end("Oops!! something wrong happened");            
            			                    } else {    
                                          //if employee is available in campus and not present in database then we will insert
                                          //mac address of both employee and connected router        
            			                        if(!(data)){
            			                            var article = {
            			                                   EMac_Addr: req.body.mac,
            			                                   RMac_Addr: req.body.ip
            			                                };
                                                  //inserting employee
            			                          insertData(article,connection,res); 
            			                        }else{
                                               //if he changes the place we will update the record
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

    //method to reutrn the present localtion of the employee requested by the client
    app.post("/mac-ip", function(req, res) {
         //based on entered name the quering will happen
		     var strQuery = "SELECT e.First_name,e.Last_name,e.Email,r.Floor,r.Pillar,r.post FROM Employee e,Dynamic_Routing d,RouterIp r WHERE (e.First_name LIKE ? AND e.EMac_Addr=d.EMac_Addr AND d.RMac_Addr=r.RMac_Addr)";
		     connection.query( strQuery,'%'+req.body.Ename+'%', function(err, result){
  			  	if(err)	{
              res.end("Oops!! something wrong happened");
  			  		throw err;
  			  	}else{
  			  		console.log(result);
  			  		res.end(JSON.stringify(result));
  			  	}
		     });
    });


 /* FUTURE WORK */
    //method to login of the admin
    app.post("/login",function(req,res){
          var user_mail=req.body.email;
          var password=req.body.password;
          Login(user_mail,password,connection,function(err,data){
            if (err) {
              console.log("ERROR : ",err);
              res.end("Oops!! something wrong happened");            
            } else {            
                console.log("result from db is IsEmployee: ",data); 
                if(!(data))
                   res.end("not an Admin");
                else
                	res.end("login successfull");

              }
          }); 
                
	});
  //method to insert an newly joined employee details by admin
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
              console.log("ERROR : ",err);            
            } else {            
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
    // method to delete the HoneyWell Emploee
    app.post("/delete",function(req,res){
        IsEmployee(req.body.mac,connection,function(err,data){
            if (err) {
              console.log("ERROR : ",err);            
            } else {            
                console.log("result from db is IsEmployee: ",data); 
                if(!(data))
                   res.end("Employee doesn't  exists");                    
                else{
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
    
    //built for Android application
    app.delete("/search/:term", function(req, res) {
        var Ename = definition.term.toLowerCase();

        var strQuery = "SELECT e.First_name,e.Last_name,r.Floor,r.Pillar,r.post FROM Employee e,Dynamic_Routing d,RouterIp r WHERE (e.First_name LIKE ? AND e.EMac_Addr=d.EMac_Addr AND d.RMac_Addr=r.RMac_Addr)";
         connection.query( strQuery,'%'+Ename+'%', function(err, result){
          if(err) {
            throw err;
          }else{
            console.log(result);
            res.end(result);
          }
         });
    });

     //method to reset the password by admin
    app.post("/reset-password",function(req,res){
    	  var name = req.body.mail_id
    	  var old_password=req.body.old_password;
          var new_password=req.body.new_password;
          var strQuery = connection.query('UPDATE Admin SET password= ? WHERE user_mail = ?', [new_password,name], function (err, result) {
			          if (err) {
			          console.log("Oops something went wrong");
			          return;
			        }
			        res.end("password changed");
			      });
    });
}


//function to insert data into Database

function insertData(data,connection,res){
     var strQuery = connection.query('INSERT INTO Dynamic_Routing SET ?',data , function (err, result) {
                                     if (err) {
                                        res.end("Oops! something went wrong");
                                     }
                                       res.end("successfull");
                                    });
}


//function to update data
function updateData(Emac,Rmac,connection,res){
	var strQuery = connection.query('UPDATE Dynamic_Routing SET RMac_Addr= ? WHERE EMac_Addr = ?', [Emac,Rmac], function (err, result) {
          if (err) {
          return;
        }
        res.end("successfull");
      });
}

//function to validate login

function Login(user_mail,password,connection,callback){ 
   var strQuery = "SELECT * FROM Admin WHERE user_mail=\'"+user_mail+"\' AND password=\'"+password+"\'";
    console.log(strQuery);
    connection.query(strQuery,function(err,result){
                if(err){
                    callback(err,null);
                }else{
                    console.log("IsEmployee"+result);
                     callback(null,result.length);
                 }
    });
}