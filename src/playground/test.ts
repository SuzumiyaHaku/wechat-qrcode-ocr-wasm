import { getImgQRCodeInfo } from "../index";

let opt = {};
// @ts-ignore
// eslint-disable-next-line no-constant-condition

opt = {
  wasmBinaryFile:
    "https://suzumiyahaku.github.io/wechat-qrcode-ocr-wasm/example/static/wasm/onlyWechatWasmFile.data",
  wechatQRcodeFile:
    "https://suzumiyahaku.github.io/wechat-qrcode-ocr-wasm/example/static/wasm/wechatQRcodeFile.data",
};
async function getCode(url: string) {
  return getImgQRCodeInfo({
    ...opt,
    url,
    loadStatus: ({ loaded, total }) => {
      const str = `Downloading data...[${loaded}/${total}]`;
      // @ts-ignore
      document.getElementById("progress").innerHTML = str;
      console.log(str);
    },
  });
}

function template(data, points, url) {
  const getItem = (v) => v.map((item) => `<div>${item}</div><hr/>`);
  return `<a target="_blank" href="${url}">${url}<img src="${url}" width="200px"/></a>
  <p><b>context: </b>${getItem(data)}</p>
  <p><b>points: </b>${getItem(points)}
</p>`;
}
async function draw(url) {
  console.time(url);
  const { data, points } = await getCode(url);
  console.timeEnd(url);
  // 得到二维码内容，和二维码对应的坐标点
  console.log(data, points);
  const d = document.createElement("div");
  d.style.borderBottom = "red 1px solid";
  d.style.padding = "20px";
  d.innerHTML = template(data, points, url);
  // @ts-ignore
  document.getElementById("root").appendChild(d);
}
const urls = [
  "./assets/img/error0.webp",
  "./assets/img/0.webp",
  "./assets/img/1.webp",
  "./assets/img/2.webp",
  "./assets/img/4.png",
];
urls.forEach(async (url) => {
  draw(url);
});

const addMore = document.querySelector("#add-btn");
// @ts-ignore
addMore.onclick = function () {
  for (let i = 0; i < 100; i++) {
    urls.forEach(async (url) => draw(`${url}?img${i}`));
  }
};

// @ts-ignore
const upload = document.getElementById("upload");
if (upload) {
  upload.onchange = async (e) => {
    // @ts-ignore
    const file = e.target.files[0];
    const url = URL.createObjectURL(
      // @ts-ignore
      new Blob([e.target.files[0]], { type: file.type })
    );
    const { data, points } = await getCode(url);
    // @ts-ignore
    document.getElementById("show").innerHTML = template(data, points, url);
  };
}
