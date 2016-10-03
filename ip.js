var iwlist = require('wireless-tools/iwlist');

iwlist.scan('wlan0', function(err, networks) {
  console.log(networks);
});
