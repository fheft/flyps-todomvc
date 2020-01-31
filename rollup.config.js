import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: pkg.browser,
        format: "umd",
        name: "todo",
        sourcemap: true,
      }
    ],
    plugins: [
        resolve({
          dedupe: ["flyps"]
        }),
        commonjs(),
        babel({ exclude: "node_modules/**" })
    ],
  },
];
