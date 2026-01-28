import { rollup } from "rollup"
import vue from "@vitejs/plugin-vue"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { fileURLToPath } from "url"
import { resolve, dirname } from "path"

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(__filenameNew)
// 确定根目录，目前执行目录是在 ./internal/build，所以需要跳出两层
const projRoot = resolve(__dirnameNew, "..", "..")
// 拼接 ./packages 目录路径
const pkgRoot = resolve(projRoot, "packages")
// 拼接 ./packages/ easy-elplus 目录路径
const epRoot = resolve(pkgRoot, "easy-elplus")

// 拼接打包根目录
const buildOutput = resolve(projRoot, "dist")
// 拼接包目录
const epOutput = resolve(buildOutput, "easy-elplus")

// 全量打包任务函数
export const buildFullEntry = async () => {
  const bundle = await rollup({
    input: resolve(epRoot, "index.js"), // 配置入口文件
    plugins: [
      // 配置插件
      vue(),
      nodeResolve()
    ],
    // 排除不进行打包的 npm 包，例如 Vue，以便减少包的体积
    external: ["vue"]
  })
  // 配置输出文件格式
  bundle.write({
    format: "umd",
    file: resolve(epOutput, "dist", "index.full.js"),
    name: "EasyElPlus",
    globals: {
      vue: "Vue"
    }
  })
}
// buildFullEntry()
