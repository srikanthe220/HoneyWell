var getmac = require('getmac');
getmac.getMac(function(err,macAddress){
    if (err)  throw err
    console.log(macAddress)
    Emac = macAddress;
});