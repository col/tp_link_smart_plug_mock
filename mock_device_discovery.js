'use strict';

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const TPLinkProtocol = require('./tp_link_protocol');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`Discovery request received from ${rinfo.address}:${rinfo.port}`);
  var response = {"system": {"get_sysinfo": {"alias": "Mock Device"}}};
  var encryptedBuffer = TPLinkProtocol.encrypt(JSON.stringify(response), false);
  server.send(encryptedBuffer, 0, encryptedBuffer.length, rinfo.port, rinfo.address);
});

server.on('listening', () => {
  var address = server.address();
  console.log(`Discovery service listening on ${address.address}:${address.port}`);
});

module.exports = server;
