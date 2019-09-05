const noble = require("noble");
const BeaconScanner = require("node-beacon-scanner");

var scanner = new BeaconScanner();

scanner.onadvertisement = (advertisement) => {
    //var beacon = advertisement["iBeacon"];
    //beacon.rssi = advertisement["rssi"];
    console.log(JSON.stringify(advertisement, null, "    "))
};

scanner.startScan().then(() => {
    console.log("Scanning for BLE devices...")  ;
}).catch((error) => {
    console.error(error);
});

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning([], true);
  } else {
    console.log("Error in BLE scanning")
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {

  //console.log('peripheral with ID ' + peripheral.id + ' found');
  var advertisement = peripheral.advertisement;
  //console.log(JSON.stringify(advertisement, null, "    "));
  var manufacturerData = advertisement.manufacturerData;
  var rssi = peripheral.rssi;

  let manufacturerDataString = manufacturerData.toString('hex').toUpperCase();
      //console.log('  Manufacturer Data = ' + manufacturerDataString);

  if (manufacturerDataString.startsWith('9904')) {
    console.log(manufacturerDataString);
    console.log(rssi);
    //console.log(peripheral.id);
  }
});
