# [p5.ble.js](https://itpnyu.github.io/p5ble-website/)
[![MIT License](https://img.shields.io/npm/l/express.svg?style=flat-square&registry_uri=https%3A%2F%2Fregistry.npmjs.com)](https://opensource.org/licenses/MIT) [![Version](https://img.shields.io/npm/v/p5ble.svg?style=flat-square)](https://www.npmjs.com/package/p5ble)

**_This project is currently in development._**

A Javascript library that enables communication between your BLE devices and your p5 sketch. With p5.ble.js, you can request and connect to nearby Bluetooth devices, read/write Bluetooth characteristics, start/stop notifications.

The library is supported by code examples, tutorials that cover many popular Bluetooth LE devices.

p5.ble.js is inspired by [p5.serialport](https://github.com/vanevery/p5.serialport), [p5.js](https://p5js.org/), [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API), and [Processing Serial Library](https://processing.org/reference/libraries/serial/index.html).

This project is a collaboration between [Jingwen Zhu](https://github.com/zhujingwen), [Tom Igoe](https://github.com/tigoe) and [Yining Shi](https://github.com/yining1023).

## Usage

Download the [minified](https://unpkg.com/p5ble@latest/dist/p5.ble.min.js), or use the online version and add it to the head section of your HTML document:

```javascript
<script src="p5.ble.min.js" type="text/javascript"></script>
```
or 
```javascript
<script src="https://unpkg.com/p5ble@0.0.6/dist/p5.ble.js" type="text/javascript"></script>
```

## Browser compatibility
p5.ble.js is based on Web Bluetooth API, checkout Web Bluetooth API's [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#Browser_compatibility) and [implementation status](https://github.com/WebBluetoothCG/web-bluetooth/blob/master/implementation-status.md).

## Learning
- ITP Physical Computing [Lab: Bluetooth LE and p5.ble](https://itp.nyu.edu/physcomp/labs/lab-bluetooth-le-and-p5-ble)
- p5.ble Workshop [Slides](https://docs.google.com/presentation/d/1qkzMBh1A0eyD_W9J3G1VoI08VGDkVDUKFC5-pi1aUbc/edit?usp=sharing), [examples](./workshop)

## Resources

- [Getting Started](https://ITPNYU.github.io/p5ble-website/docs/getstarted)
- [API Reference](https://ITPNYU.github.io/p5ble-website/docs/api)
- [Examples](https://ITPNYU.github.io/p5ble-website/docs/quick-start)
- [Tutorials](https://ITPNYU.github.io/p5ble-website/blog/)

## Examples
You can find a collection of examples in the [examples](./examples) folder in this repository.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://1023.io"><img src="https://avatars3.githubusercontent.com/u/8662372?v=4" width="100px;" alt=""/><br /><sub><b>Yining Shi</b></sub></a><br /><a href="https://github.com/ITPNYU/p5.ble.js/commits?author=yining1023" title="Code">💻</a> <a href="#example-yining1023" title="Examples">💡</a></td>
    <td align="center"><a href="http://www.jingwen-zhu.com"><img src="https://avatars1.githubusercontent.com/u/5662216?v=4" width="100px;" alt=""/><br /><sub><b>Jingwen Zhu</b></sub></a><br /><a href="#example-ZhuJingwen" title="Examples">💡</a> <a href="https://github.com/ITPNYU/p5.ble.js/commits?author=ZhuJingwen" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/tigoe"><img src="https://avatars3.githubusercontent.com/u/380575?v=4" width="100px;" alt=""/><br /><sub><b>Tom Igoe</b></sub></a><br /><a href="#example-tigoe" title="Examples">💡</a> <a href="https://github.com/ITPNYU/p5.ble.js/commits?author=tigoe" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!