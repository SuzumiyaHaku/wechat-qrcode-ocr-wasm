# wechat-qrcode-ocr-wasm

[![npm](https://img.shields.io/npm/v/wechat-qrcode-ocr-wasm.svg?style=flat-square)](https://www.npmjs.com/package/wechat-qrcode-ocr-wasm) [![npm](https://img.shields.io/npm/l/wechat-qrcode-ocr-wasm.svg?style=flat-square)](https://github.com/SuzumiyaHaku/wechat-qrcode-ocr-wasm/blob/main/LICENSE)

[English](https://github.com/SuzumiyaHaku/wechat-qrcode-ocr-wasm) | 简体中文

## 快速概览
- 仅在浏览器工作，因为它基于WebAssembly + Canvas
- [https://example.io/index.html 在线demo](https://suzumiyahaku.github.io/wechat-qrcode-ocr-wasm/example/index.html)


## 安装
```yarn
yarn add wechat-qrcode-ocr-wasm
```
```npm
npm install wechat-qrcode-ocr-wasm
```
```pnpm
pnpm install wechat-qrcode-ocr-wasm
```

## 基础使用

##### Vue or React:
拷贝 `/node_modules/wechat-qrcode-ocr-wasm/static/wasm/*` 到你的静态文件夹下：

```txt
  ├── package.json
  ├── pnpm-lock.yaml
  ├── public
  │   ├── favicon.ico
  │   └── static
+ │       └── wasm
+ │           ├── onlyWechatWasmFile.data
+ │           └── wechatQRcodeFile.data
  ├── src
```
```js
import { getImgQRCodeInfo } from "wechat-qrcode-ocr-wasm";

import img from "../assets/img/0.webp";

function getCode(url: string) { // Promise<response>
  return getImgQRCodeInfo({
    wasmBinaryFile: "/static/wasm/onlyWechatWasmFile.data", // http://localhost:8080/static/wasm/onlyWechatWasmFile.data
    wechatQRcodeFile: "/static/wasm/wechatQRcodeFile.data", // http://localhost:8080/static/wasm/wechatQRcodeFile.data
    url, // image url 或 base64
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
    getCode(url).then((res) => {
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
### 1、getImgQRCodeInfo(options)配置

options:
|属性|类型|默认值|描述|
|------------|------------|------------|---|
|url|string|""|图片 url 或 图片base64|
|wasmBinaryFile?|string|"/static/wasm/onlyWechatWasmFile.data"||
|wechatQRcodeFile?|string|"/static/wasm/wechatQRcodeFile.data"||
|loadStatus?|(response: { loaded: number; total: number }) => void;|null|请求上面*.data文件加载进度的回调|
|withCredentials?| [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials) |false|上面*.data文件请求的xhr配置|
|headers?|XMLHttpRequest Headers| {}|上面*.data文件请求头配置|
|imgOnError?|[OnErrorEventHandlerNonNull](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement#errors)|null|图片加载错误回调|
|initError?|ErrorCallback|null|初始化失败的回调|

#### `initError`
报错`[wechat-qrcode-ocr-wasm Initialize failed]` 检查如下原因:
- "wasmBinaryFile、wechatQRcodeFile" 的地址不对
- [webAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [CORS 跨域](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)


## License
[MIT](https://github.com/soldair/node-qrcode/blob/master/license)
