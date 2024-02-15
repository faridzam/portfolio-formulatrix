import federation from "@originjs/vite-plugin-federation";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    federation({
      name: "bannerApp",
      filename: "remoteEntry.js",
      exposes: {
        "./MainBanner": "/src/main.js",
      },
      shared: [
        'three',
        'three/examples/jsm/geometries/TextGeometry',
        'three/examples/jsm/loaders/FontLoader',
        'three/examples/jsm/loaders/MTLLoader',
        'three/examples/jsm/loaders/OBJLoader',
        'three/examples/jsm/postprocessing/BloomPass',
        'three/examples/jsm/postprocessing/EffectComposer',
        'three/examples/jsm/postprocessing/RenderPass',
      ]
    }),
  ],
  build: {
    modulePreload: true,
    target: "esnext",
    minify: true,
    cssCodeSplit: false,
  },
});