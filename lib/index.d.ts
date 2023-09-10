export interface Mat {
    $$: {
        ptrType: any;
        ptr: number;
        count: {
            value: number;
        };
    };
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
    loadStatus?: (response: {
        loaded: number;
        total: number;
    }) => void;
}
export interface Source {
    wasmBinaryFile?: string;
    wechatQRcodeFile?: string;
}
export declare const source: {
    wasmBinaryFile: string;
    wechatQRcodeFile: string;
};
export interface HttpConfig {
    withCredentials?: boolean;
    headers?: {
        [key: string]: string | number;
    };
}
export declare type MatVector<T, U> = {
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
export declare type detectAndDecodeType = {
    detectAndDecode: (img: Mat, points?: MatVector<number, Mat>) => MatVector<number, string | undefined>;
};
export interface OpenCVWeChatQRCode {
    imread: (args: HTMLImageElement) => Mat;
    wechat_qrcode_WeChatQRCode: new (...args: any) => detectAndDecodeType;
    setStatus: Required<Options["loadStatus"]>;
    MatVector: new () => MatVector<number, Mat>;
    [p: string | number | symbol]: any;
}
export declare type WeChatQrcodeModule = OpenCVWeChatQRCode;
export declare const httpConfig: HttpConfig;
export declare function wechatQRcodeWASM(options: Options): Promise<OpenCVWeChatQRCode>;
export declare function getImgQRCodeInfo(options?: Options): Promise<{
    size: number;
    data: (string | undefined)[];
    points: number[][];
}>;
