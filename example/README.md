# wechat-qrcode-ocr-wasm

[![npm](https://img.shields.io/npm/v/wechat-qrcode-ocr-wasm.svg?style=flat-square)](https://www.npmjs.com/package/wechat-qrcode-ocr-wasm)
[![npm](https://img.shields.io/npm/l/wechat-qrcode-ocr-wasm.svg?style=flat-square)](https://github.com/SuzumiyaHaku/wechat-qrcode-ocr-wasm/blob/main/LICENSE)


## Quick Overview
- It only works on client, because it need WebAssembly + Canvas;
- [https://example.io/index.html](https://suzumiyahaku.github.io/wechat-qrcode-ocr-wasm/example/index.html)


## Installation
```yarn
yarn add -D wechat-qrcode-ocr-wasm
```
```npm
npm install -D wechat-qrcode-ocr-wasm
```
```pnpm
pnpm install -D wechat-qrcode-ocr-wasm
```

## Basic usage

##### Vue or React:
```txt
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── favicon.ico
│   └── static
│       └── wasm
│           ├── onlyWechatWasmFile.data
│           └── wechatQRcodeFile.data
├── src
```
```js
import { getImgQRCodeInfo } from "wechat-qrcode-ocr-wasm";

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
##### html
```html
<!-- import JavaScript -->
<script src="https://unpkg.com/wechat-qrcode-ocr-wasm/index.js"></script>
<script>
function getCode(url: string) { // Promise<response>
  return getImgQRCodeInfo({
    wasmBinaryFile: "https://unpkg.com/wechat-qrcode-ocr-wasm/static/wasm/onlyWechatWasmFile.data",
    wechatQRcodeFile: "https://unpkg.com/wechat-qrcode-ocr-wasm/static/wasm/wechatQRcodeFile.data",
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
## API
### 1、getImgQRCodeInfo(options)

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

#### `initError`
`[wechat-qrcode-ocr-wasm Initialize failed]` consider the following reasons:
- "wasmBinaryFile、wechatQRcodeFile" The file address is incorrect!
- [webAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)


## Credits
This lib is based on "OpenCV for C++" which Kazuhiko Arase thankfully MIT licensed.

## License
[MIT](https://github.com/soldair/node-qrcode/blob/master/license)
