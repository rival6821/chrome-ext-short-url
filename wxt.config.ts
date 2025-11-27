import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    default_locale: "ko",
    name: "__MSG_extName__",
    description: "__MSG_extDescription__",
    version: "1.3",
    permissions: ["tabs", "clipboardWrite"],
    host_permissions: ["https://l.muz.kr/*"],
    icons: {
      16: "/image/icon-16.png",
      32: "/image/icon-32.png",
      128: "/image/icon-128.png"
    }
  }
});
