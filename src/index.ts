// @ts-ignore
import cv from "./core/opencv.js";
// @ts-ignore
import { initModule } from "./core/loadingWeChatQRcodeModel.js";
export interface Mat {
  $$: { ptrType: any; ptr: number; count: { value: number } };
  cols: number;
  data: Uint8Array;
  data8S: Int8Array;
  data16S: Int16Array;
  data16U: Uint16Array;
  data32F: Float32Array;
  data32S: Int32Array;
  data64F: Float64Array;
  matSize: number[];
  rows: number;
  step: number[];
  delete(...args: any): any;
}

export interface Options extends HttpConfig, Source {
  url: string;
  imgOnError?: OnErrorEventHandlerNonNull;
  initError?: ErrorCallback;
  loadStatus?: (response: { loaded: number; total: number }) => void;
}

export interface Source {
  wasmBinaryFile?: string;
  wechatQRcodeFile?: string;
}

export const source = {
  wasmBinaryFile: "./static/wasm/onlyWechatWasmFile.data",
  wechatQRcodeFile: "./static/wasm/wechatQRcodeFile.data",
};

export interface HttpConfig {
  withCredentials?: boolean;
  headers?: {
    [key: string]: string | number;
  };
}

export type MatVector<T, U> = {
  push_back(...args: any): any;
  resize(...args: any): any;
  size(): number;
  get(args: T): U;
  set(args: any): any;
  isAliasOf(...args: any): any;
  clone(...args: any): any;
  delete(...args: any): any;
  isDeleted(...args: any): any;
  deleteLater(...args: any): any;
};

export type detectAndDecodeType = {
  detectAndDecode: (
    img: Mat,
    points?: MatVector<number, Mat>
  ) => MatVector<number, string | undefined>;
};
export interface OpenCVWeChatQRCode {
  imread: (args: HTMLImageElement) => Mat;
  wechat_qrcode_WeChatQRCode: new (...args: any) => detectAndDecodeType;
  setStatus: Required<Options["loadStatus"]>;
  MatVector: new () => MatVector<number, Mat>;
  [p: string | number | symbol]: any;
}
export type WeChatQrcodeModule = OpenCVWeChatQRCode;

export const httpConfig: HttpConfig = {
  withCredentials: false,
  headers: {},
};

export function wechatQRcodeWASM(
  options: Options
): Promise<OpenCVWeChatQRCode> {
  source.wasmBinaryFile = options.wasmBinaryFile || source.wasmBinaryFile;
  source.wechatQRcodeFile = options.wechatQRcodeFile || source.wechatQRcodeFile;

  httpConfig.headers =
    options.headers && Object.keys(options.headers).length
      ? options.headers
      : httpConfig.headers;
  const m = initModule();
  if (options && typeof options.loadStatus === "function") {
    (m as OpenCVWeChatQRCode).setStatus = options.loadStatus;
  }
  return cv(m).then((v: () => OpenCVWeChatQRCode) => v());
}

const callback: ((v: OpenCVWeChatQRCode) => void)[] = [];

let openCV: OpenCVWeChatQRCode = (<any>globalThis)._OPEN_CV;
let detector: detectAndDecodeType;
export async function getImgQRCodeInfo(
  options?: Options
): Promise<{ size: number; data: (string | undefined)[]; points: number[][] }> {
  try {
    if (!openCV) {
      openCV = (<any>globalThis)._OPEN_CV =
        await new Promise<OpenCVWeChatQRCode>((resolve, reject) => {
          if (!(<any>globalThis)._INIT_CV) {
            (<any>globalThis)._INIT_CV = true;
            wechatQRcodeWASM(options)
              .then((res) => {
                resolve(res);
                callback.forEach((fn) => fn(res));
                callback.length = 0;
              })
              .catch(reject);
          } else {
            callback.push(resolve);
          }
        });
    }
  } catch (e) {
    if (options && typeof options.initError === "function") {
      options?.initError?.(e);
    } else {
      throw "[wechat-qrcode-ocr-wasm Initialize failed]: " + e;
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = options.url;
    img.onload = () => {
      try {
        const imgdata = openCV.imread(img);
        if (!detector) {
          detector = new openCV.wechat_qrcode_WeChatQRCode(
            "detect.prototxt",
            "detect.caffemodel",
            "sr.prototxt",
            "sr.caffemodel"
          );
        }
        const pointOutputArr = new openCV.MatVector();
        const results = detector.detectAndDecode(imgdata, pointOutputArr);
        const size = pointOutputArr.size();
        const data = [];
        const points = [];
        for (let i = 0; i < size; i++) {
          data.push(results.get(i));
          const temp = pointOutputArr.get(i);
          temp && points.push(Array.from<number>(temp.data32F));
        }
        imgdata?.delete?.();
        pointOutputArr?.delete?.();
        resolve({
          size,
          data,
          points,
        });
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = options?.imgOnError
      ? options.imgOnError
      : (e) => {
          throw e;
        };
  });
}
