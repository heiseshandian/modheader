chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    console.log("Original Response Headers:", details.responseHeaders); // 添加这行来打印原始响应头

    let modifiedHeaders = details.responseHeaders.map((header) => {
      if (header.name.toLowerCase() === "set-cookie") {
        // 分割多个 cookie
        let cookies = header.value.split(/,(?=[^;]+=[^;])/);
        // 移除 Secure 和 SameSite 属性
        let modifiedCookies = cookies.map((cookie) => {
          return cookie
            .replace(/;\s*Secure/gi, "")
            .replace(/;\s*SameSite=None/gi, "");
        });
        // 合并修改后的 cookies
        header.value = modifiedCookies.join(",");
      }
      return header;
    });

    console.log("Modified Response Headers:", modifiedHeaders); // 添加这行来打印修改后的响应头

    return { responseHeaders: modifiedHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders", "extraHeaders"]
);
