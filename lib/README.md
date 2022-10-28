# wechat-qrcode-wasm-ocr
> QR code/2d barcode generator.
[![Travis](https://img.shields.io/travis/soldair/node-qrcode.svg?style=flat-square)](http://travis-ci.org/soldair/node-qrcode)
[![npm](https://img.shields.io/npm/v/qrcode.svg?style=flat-square)](https://www.npmjs.com/package/qrcode)
[![npm](https://img.shields.io/npm/dt/qrcode.svg?style=flat-square)](https://www.npmjs.com/package/qrcode)
[![npm](https://img.shields.io/npm/l/qrcode.svg?style=flat-square)](https://github.com/soldair/node-qrcode/blob/master/license)

- [Installation](#installation)
- [Credits](#credits)
- [License](#license)

## Quick Overview
- It only works on client, because it need WebAssembly + Canvas;
- [demo](https://ww)


## Installation
```yarn
yarn add -D wechat-qrcode-wasm-ocr
```
```npm
npm install -D wechat-qrcode-wasm-ocr
```
```pnpm
pnpm install -D wechat-qrcode-wasm-ocr
```

## Basic usage

##### Vue or React:
```js
import { getImgQRCodeInfo } from "wechat-qrcode-wasm-ocr";

import img from "../assets/img/0.webp";

function getCode(url: string) { // Promise<response>
  return getImgQRCodeInfo({

    wasmBinaryFile: "/static/wasm/onlyWechatWasmFile.data", // http://localhost:8080/static/wasm/onlyWechatWasmFile.data
    wechatQRcodeFile: "/static/wasm/wechatQRcodeFile.data", // http://localhost:8080/static/wasm/wechatQRcodeFile.data
    url, // image url or base64
    loadStatus: ({ loaded, total }) => {
      console.log(`Downloading data...[${loaded}/${total}]`);
    },
  });
}

getCode(img).then((res) => {
  console.log(res); // { data: ["xxxxx"], points: [[483.32, 884.18, 1444.00, 884.18, 1444.00, 1790.69, 483.32, 1790.69]] }
});


const input = document.getElementById("input");
if (input) {
  input.onchange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(
      new Blob([e.target.files[0]], { type: file.type })
    );
    getCode(img).then((res) => {
      console.log(res); // { data: ["xxxxx"], points: [[483.32, 884.18, 1444.00, 884.18, 1444.00, 1790.69, 483.32, 1790.69]] }
    });
  };
}
```
---
#####html
```html
<!-- import JavaScript -->
<script src="https://unpkg.com/wechat-qrcode-wasm-ocr/main.js"></script>
<script>
function getCode(url: string) { // Promise<response>
  return getImgQRCodeInfo({
    wasmBinaryFile: "https://unpkg.com/wechat-qrcode-wasm-ocr/static/wasm/onlyWechatWasmFile.data",
    wechatQRcodeFile: "https://unpkg.com/wechat-qrcode-wasm-ocr/static/wasm/wechatQRcodeFile.data",
    url,
    loadStatus: ({ loaded, total }) => {
      console.log(`Downloading data...[${loaded}/${total}]`);
    },
  });
}
let imgURL = `xxxxx`; // img url or img base64
getCode(imgURL).then((res) => {
  console.log(res); // { data: ["xxxxx"], points: [[483.32, 884.18, 1444.00, 884.18, 1444.00, 1790.69, 483.32, 1790.69]] }
});
</script>
```

## `getImgQRCodeInfo(options)` API

options:
|Property|type|Default|
|-------------------|------------|------------|
|url|string|""|
|wasmBinaryFile?|string|"/static/wasm/onlyWechatWasmFile.data"|
|wechatQRcodeFile?|string|"/static/wasm/wechatQRcodeFile.data"|
|loadStatus?|(response: { loaded: number; total: number }) => void;|null|
|withCredentials?| [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials) |false|
|headers?|XMLHttpRequest Headers| {}|
|imgOnError?|[OnErrorEventHandlerNonNull](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement#errors)|null|
|initError?|ErrorCallback|null|

### `initError`
Consider the following:
- webAssembly
- "wasmBinaryFile、wechatQRcodeFile" The file address is incorrect!


## Credits
This lib is based on "OpenCV for C++" which Kazuhiko Arase thankfully MIT licensed.

## License
[MIT](https://github.com/soldair/node-qrcode/blob/master/license)
