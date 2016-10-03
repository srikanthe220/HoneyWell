var IsValidRoute= function(data,connection,callback){
            var strQuery = "SELECT RMac_Addr FROM RouterIp WHERE RMac_Addr=\'"+data+"\'";
            connection.query(strQuery,function(err,result){
                        if(err){
                            
                            callback(err,null);
                        }else{
                            console.log("IsValidRoute"+result);
                            callback(null,result.length);
                         }
            });
        }

module.exports = IsValidRoute;