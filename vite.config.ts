import { rmSync } from "fs";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import pkg from "./package.json";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

import { manualChunksPlugin } from "vite-plugin-webpackchunkname";

rmSync("dist-electron", { recursive: true, force: true });
const sourcemap = !!process.env.VSCODE_DEBUG;
import { fileURLToPath } from "url";
const isBuild = process.argv.slice(2).includes("build");

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      // "@": path.resolve(__dirname, "./src"),
      // '~/utils': path.resolve(__dirname, './src/utils/index.ts'),
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    electron([
      {
        entry: "electron/main/index.ts",
        onstart(options) {
          if (process.env.VSCODE_DEBUG) {
            console.log(
              /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
            );
          } else {
            options.startup();
          }
        },
        vite: {
          build: {
            sourcemap,
            minify: isBuild,
            outDir: "dist-electron/main",
            rollupOptions: {
              external: Object.keys(pkg.dependencies),
            },
          },
        },
      },
      {
        entry: "electron/preload/index.ts",
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
          // instead of restarting the entire Electron App.
          options.reload();
        },
        vite: {
          build: {
            sourcemap,
            minify: isBuild,
            outDir: "dist-electron/preload",
            rollupOptions: {
              external: Object.keys(pkg.dependencies),
            },
          },
        },
      },
    ]),
    // Use Node.js API in the Renderer-process
    renderer({
      nodeIntegration: true,
    }),
    quasar({
      sassVariables: "src/quasar-variables.sass",
    }),
    manualChunksPlugin(),
  ],
  server: process.env.VSCODE_DEBUG
    ? (() => {
        const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
        return {
          host: url.hostname,
          port: +url.port,
        };
      })()
    : undefined,
  clearScreen: false,
});
