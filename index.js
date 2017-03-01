'use strict';

const host = "127.0.0.1";
const port = 9999;

const DeviceDiscoveryService = require('./mock_device_discovery');
const DeviceService = require('./mock_device_service');

DeviceService.listen(port, host);
DeviceDiscoveryService.bind(port);
