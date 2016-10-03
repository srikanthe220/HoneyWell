var mysql = require("mysql");



 var IsEmployee =  function (data,connection,callback){ 
           var strQuery = "SELECT EMac_Addr FROM Employee WHERE EMac_Addr=\'"+data+"\'";
            connection.query(strQuery,function(err,result){
                        if(err){
                            //console.log(err);
                            callback(err,null);
                        }else{
                            //console.log("IsEmployee"+result.length);
                             callback(null,result.length);
                         }
            });
      }

module.exports = IsEmployee;