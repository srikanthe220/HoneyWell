var mysql =  require('mysql');

var connection =  mysql.createConnection({
  	host : "localhost",
  	user : "root",
  	password: "honeywell"
  });


connection.connect();

connection.query("use honeywell");
var strQuery1 = "SELECT e.First_name,e.Last_name,r.Floor,r.Pillar,r.post FROM Employee e,Dyanamic_Routing d,Router_Id r WHERE (e.First_name LIKE '%e%' AND e.Mac_Addr=d.Mac_Addr AND d.Router_Id=r.Router_Id)";
connection.query( strQuery1, function(err, result1){
  	if(err)	{
  		throw err;
  	}else{
  		console.log(result1);
  	}
  });
  
var strQuery2 = "SELECT Mac_Addr FROM Dynamic_Routing WHERE Mac_Addr='SOME Mac_Addr'";
connection.query( strQuery2, function(err, result2){
  	if(err)	{
  		throw err;
  	}else{
  		console.log(result2);
  	}
  });
  

var article = {
  Mac_Addr: //initialize here,
  Router_Id: //initialize here
};
var strQuery3 = connection.query('insert into Dynamic_Routing set ?', article, function (err, result3) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result3);
});


var oldmac= //initialize
var strQuery4 = connection.query('DELETE FROM Dynamic_Routing WHERE Mac_Addr= 'oldmac'', function (err, result) {
  if (err) throw err;

  console.log('deleted ' + result.affectedRows + ' rows');
}

