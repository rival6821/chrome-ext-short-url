import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: "Create Short URL",
    description: "Create Short URL",
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
