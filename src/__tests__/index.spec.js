import { JSDOM, VirtualConsole } from "jsdom";
test("Invalid test", (done) => {
  const virtualConsole = new VirtualConsole();
  const dom = new JSDOM(``, {
    runScripts: "dangerously",
    resources: "usable",
    contentType: "text/html",
    storageQuota: 20000000,
    virtualConsole,
  });
  const script = dom.window.document.createElement("script");
  script.src = "file://" + __dirname.replace("src/__tests__", "lib/index.js");
  script.async = false;
  script.addEventListener("load", () => {
    expect(typeof dom.window.getImgQRCodeInfo).toBe("function");
    expect(typeof dom.window.wechatQRcodeWASM).toBe("function");
    done();
  });
  dom.window.document.body.appendChild(script);
  virtualConsole.on("error", (e) => {
    console.log("error:--", e);
  });
});
