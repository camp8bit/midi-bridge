var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbmodemfd111", {
  baudrate: 9600
});

serialPort.open(function (error) {
  serialPort.write("yo homies\r\n", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
});

var midi = require('midi');

// Set up a new input.
var input = new midi.input();

// Count the available input ports.
input.getPortCount();

// Get the name of a specified input port.
input.getPortName(0);

// Configure a callback.
input.on('message', function(deltaTime, message) {
  serialPort.write(message[1].toString());
  //console.log('m:' + message[1] + ' d:' + deltaTime);
});

// Open the first available input port.
input.openPort(0);

// Sysex, timing, and active sensing messages are ignored
// by default. To enable these message types, pass false for
// the appropriate type in the function below.
// Order: (Sysex, Timing, Active Sensing)
// For example if you want to receive only MIDI Clock beats
// you should use 
// input.ignoreTypes(true, false, true)
input.ignoreTypes(false, false, false);

// Set up a new output.
var output = new midi.output();

// Count the available output ports.
output.getPortCount();

// Get the name of a specified output port.
output.getPortName(0);

// Open the first available output port.
output.openPort(0);

// Send a MIDI message.
output.sendMessage([176,22,1]);

// Turn on all the lights yo!
for(i=0;i<127;i++){output.sendMessage([144,i,60]);}


setInterval(function(){
  // console.log(".");
}, 1000);