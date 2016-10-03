var $ = require('./jquery.min.js');
const {Tray} = require('electron').remote;
const exec = require('child_process').exec;
 
 $(document).ready(function(){
var prevEmac = 0;
var macid ;
var Emac;
function backgroundprocess(){
    var getmac = require('getmac');
    //var remote = require('electron').remote
    //var main = remote.require('./main.js');
    //var myip = require('quick-local-ip');
    //var MacAddress = require('get-mac-address');
    var network = require('network');
    var arp = require('node-arp');
     
     //ipAddr = myip.getLocalIP4();
      
    getmac.getMac(function(err,macAddress){
    if (err)  throw err
    console.log(macAddress)
    Emac = macAddress;
})
    network.get_active_interface(function(err, obj){
         
        if(err){
            if(process.platform == "linux"){
            console.log("Network error....")
                var noInternetNotification = new Notification('No internet connection... ', {
            body: "Please connect to the internet",
             
            });
            }
         
            if(process.platform == "win32"){
            var appIcon = new Tray('Attention.ico');
             appIcon.displayBalloon({
                title:'No internet connection... ',
                content:'Please connect to the internet'
            });     
            }    
     
     
    };
        if(!err){
        gtip = obj.gateway_ip;
        //alert ("gatewayip is :"+gtip);
         
        arp.getMAC(gtip, function(err, mac) {
            if (!err) {
                macid=mac;
               // alert("mac address is :"+macid);
               console.log("mac address of router :"+macid);
               console.log("prevIp is :"+prevEmac);
               console.log("ipAddr is :"+Emac);
                        if (prevEmac != Emac){
                            console.log("ajax");
                            $.post("http://localhost:3000/present_loc",{mac:Emac,ip:macid},function(data){
                                console.log(data);
                                 
                                if(data=="not an Employee"){
                                     
                                     
                                    if(process.platform=="linux"){
                                        var killNotification = new window.Notification('You are not an employee of Honeywell', {
                                        body: "Application will be terminated",
             
                                        });
                                    }
                                     
                                    if(process.platform == "win32"){
                                        var appIcon = new Tray('Attention.ico');
                                        appIcon.displayBalloon({
                                        title:'You are not an employee of Honeywell',
                                        content:'Application will be terminated'
                                        });     
                                    }    
                             
                                    if(process.platform == "win32"){
                                        exec('taskkill /FI "IMAGENAME eq electron.exe" /F', (error, stdout, stderr) => {
                                            if (error) {
                                                console.error('exec error: ${error}');
                                                 
                                            }
                                            else{
                                                console.log("killed");
                                            }                 
                                                  
                                        });  
                                    } 
                                     
                                    if(process.platform == "linux"){
                                        exec('killall electron', (error, stdout, stderr) => {
                                            if (error) {
                                                console.error('exec error: ${error}');
                                                 
                                            }
                                            else{
                                                console.log("killed");
                                            }                 
                                                  
                                        });  
                                    }
 
 
                                     
                                                                         
                                }
                                 
                                 
                            });
                                
                        }
                     
                     
                 prevEmac=Emac;
                
                
            }
            else{
                console.log("Problem in getting the mac address of router .."+ err);
            }
             
             
        });
        
        
    }   
    });
     
     
     
     
    /*
        */
       
 
    }
setInterval( backgroundprocess, 10000);
  
});  