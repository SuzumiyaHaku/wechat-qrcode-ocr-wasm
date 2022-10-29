import { OpenCVWeChatQRCode, Options } from "./index";

declare module "wechat-qrcode-wasm-ocr" {
  export function getImgQRCodeInfo(options?: Options): Promise<{
    size: number;
    data: (string | undefined)[];
    points: number[][];
  }>;
  export function wechatQRcodeWASM(
    options: Options
  ): Promise<OpenCVWeChatQRCode>;
}
