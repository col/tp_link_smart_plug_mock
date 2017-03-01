const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const TPLinkProtocol = require('./tp_link_protocol');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  var decryptedMsg = TPLinkProtocol.decrypt(msg, false);
  console.log(`message = ${decryptedMsg}`);
  var encryptedBuffer = TPLinkProtocol.encrypt("{ \"system\": { \"get_sysinfo\": { \"alias\": \"Mock\"}}}", false);
  server.send(encryptedBuffer, 0, encryptedBuffer.length, rinfo.port, rinfo.address);
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(9999);
