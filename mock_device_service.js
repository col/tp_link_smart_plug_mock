'use strict';

var net = require('net');
const TPLinkProtocol = require('./tp_link_protocol');

function handleCommand(command, args) {
  switch(command) {
    case("get_sysinfo"):
      console.log("get_sysinfo");
      return {"alias": "Mock Device"};
    case("set_relay_state"):
      console.log("set_relay_state: " + args["state"]);
      return null;
    case("set_led_off"):
      console.log("set_led_off: " + args["off"]);
      return null;
  }
}

var server = net.createServer((socket) => {

  socket.on('data', (data) => {
    let request = JSON.parse(TPLinkProtocol.decrypt(data));
    var target = Object.keys(request)[0];
    var command = Object.keys(request[target])[0];
    var args = request[target][command];

    var response = request;
    response[target][command] = handleCommand(command, args);
    socket.write(TPLinkProtocol.encrypt(JSON.stringify(response)));
    socket.pipe(socket);
  });

});

server.on('listening', () => {
  console.log(`Mock device listening on ${server.address().address}:${server.address().port}`);
});

module.exports = server;
