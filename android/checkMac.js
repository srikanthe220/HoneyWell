

      

var checkMac = function(data,connection,callback){
            var strQuery = "SELECT EMac_Addr FROM Dynamic_Routing WHERE EMac_Addr=\'"+data+"\'";
            connection.query( strQuery, function(err, result){
                if(err) {
                    //res.end("Oops! something went wrong");
                    callback(err,null);
                }else{
                    console.log("checkMac"+result);
                    callback(null,result.length);
                }
              });

        }
module.exports = checkMac;


 
