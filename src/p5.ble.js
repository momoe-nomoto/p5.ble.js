// Copyright (c) 2018 p5ble
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import callCallback from './utils/callcallback';
import parseData from './utils/parseData';

class p5ble {
  constructor() {
    this.device = null;
    this.server = null;
    this.service = null;
    this.characteristics = [];
    this.handleNotifications = null;
  }

  connect(serviceUuidOrOptions, callback) {
    let options = {};
    let serviceUuid;

    if (typeof serviceUuidOrOptions === 'string') {
      serviceUuid = serviceUuidOrOptions.toLowerCase();
      options = {
        filters: [{
          services: [serviceUuid],
        }],
      };
    } else if (typeof serviceUuidOrOptions === 'object' && serviceUuidOrOptions.filters) {
      // Options = {
      //   filters: [{ namePrefix: "name" }, { services: ["2A5A20B9-0000-4B9C-9C69-4975713E0FF2"] }]
      // }
      const servicesArray = serviceUuidOrOptions.filters.find(f => f.services);
      if (servicesArray && servicesArray.services && servicesArray.services[0]) {
        serviceUuid = servicesArray.services[0].toLowerCase();
        options.filters = serviceUuidOrOptions.filters.map((f) => {
          if (f.services) {
            const newF = {};
            newF.services = f.services.map(s => s.toLowerCase());
            return newF;
          }
          return f;
        });
      } else {
        console.error('Please pass an option object in this format: options = { filters: [{ services: [serviceUuid] }]} ');
      }
    } else {
      console.error('Please pass in a serviceUuid string or option object, e.g. options = { filters: [{ services: [serviceUuid] }]} ');
    }

    console.log('Requesting Bluetooth Device...');

    return callCallback(navigator.bluetooth.requestDevice(options)
      .then((device) => {
        this.device = device;
        console.log(`Got device ${device.name}`);
        return device.gatt.connect();
      })
      .then((server) => {
        this.server = server;
        console.log('Getting Service...');
        return server.getPrimaryService(serviceUuid);
      })
      .then((service) => {
        this.service = service;
        console.log('Getting Characteristics...');
        return service.getCharacteristics();
      })
      .then((characteristics) => {
        this.characteristics = characteristics;
        console.log('Got Characteristic');
        return characteristics;
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      }), callback);
  }

  async read(characteristic, dataTypeOrcallback, cb) {
    let callback;
    let dataType;
    if (typeof dataTypeOrcallback === 'function') {
      callback = dataTypeOrcallback;
    } else if (typeof dataTypeOrcallback === 'string') {
      dataType = dataTypeOrcallback;
    }
    if (typeof cb === 'function') {
      callback = cb;
    }

    if (!characteristic || !characteristic.uuid) console.error('The characteristic does not exist.');
    const validChar = this.characteristics.find(char => char.uuid === characteristic.uuid);
    if (!validChar) return console.error('The characteristic does not exist.');

    return callCallback(characteristic.readValue()
      .then(value => parseData(value, dataType)), callback);
  }

  write(characteristic, inputValue) {
    if (!characteristic || !characteristic.uuid) console.error('The characteristic does not exist.');
    const validChar = this.characteristics.find(char => char.uuid === characteristic.uuid);
    if (!validChar) return console.error('The characteristic does not exist.');

    const bufferToSend = new Uint8Array(toUTF8Array(inputValue));
    console.log(`Writing ${inputValue} to Characteristic...`);
    return characteristic.writeValue(bufferToSend);
  }

  async startNotifications(characteristic, handleNotifications, dataType) {
    if (!characteristic || !characteristic.uuid) console.error('The characteristic does not exist.');
    const validChar = this.characteristics.find(char => char.uuid === characteristic.uuid);
    if (!validChar) return console.error('The characteristic does not exist.');

    await characteristic.startNotifications();

    console.log('> Notifications started');

    this.handleNotifications = (event) => {
      const { value } = event.target;
      const parsedData = parseData(value, dataType);
      handleNotifications(parsedData);
    };

    return characteristic.addEventListener('characteristicvaluechanged', this.handleNotifications);
  }

  async stopNotifications(characteristic) {
    if (!characteristic || !characteristic.uuid) console.error('The characteristic does not exist.');
    const validChar = this.characteristics.find(char => char.uuid === characteristic.uuid);
    if (!validChar) return console.error('The characteristic does not exist.');

    try {
      await characteristic.stopNotifications();

      if (this.handleNotifications) {
        console.log('> Notifications stopped');
        return characteristic.removeEventListener('characteristicvaluechanged', this.handleNotifications);
      }
      return console.log('> Notifications stopped');
    } catch (error) {
      return console.error(`Error: ${error}`);
    }
  }

  disconnect() {
    if (!this.device) return;
    console.log('Disconnecting from Bluetooth Device...');
    if (this.device.gatt.connected) {
      this.device.gatt.disconnect();
    } else {
      console.log('> Bluetooth Device is already disconnected');
    }
  }

  onDisconnected(handleDisconnected) {
    if (!this.device) return console.error('There is no device connected.');
    return this.device.addEventListener('gattserverdisconnected', handleDisconnected);
  }

  isConnected() {
    if (!this.device) return false;
    if (this.device.gatt.connected) {
      return true;
    }
    return false;
  }
}

function toUTF8Array(str) {
  var utf8 = [];
  for (var i=0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
                    0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
                    0x80 | ((charcode>>6) & 0x3f),
                    0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                    | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18),
                    0x80 | ((charcode>>12) & 0x3f),
                    0x80 | ((charcode>>6) & 0x3f),
                    0x80 | (charcode & 0x3f));
      }
  }
  return utf8;
}


module.exports = p5ble;
