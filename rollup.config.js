import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      compact: true,
      file: "dist/index.js",
      format: "umd",
      name: "sanitize-url",
    },
    {
      compact: true,
      file: "dist/index.min.js",
      format: "umd",
      name: "sanitize-url",
      plugins: [terser()],
    },
  ],
  plugins: [typescript()],
};
