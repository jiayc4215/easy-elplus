import { fileURLToPath } from "url"
import { dirname, resolve } from "path"
import { rollup } from "rollup"
import glob from "fast-glob"
import vue from "@vitejs/plugin-vue"

import { nodeResolve } from "@rollup/plugin-node-resolve"

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(__filenameNew)

const projRoot = resolve(__dirnameNew, "..", "..")
const pkgRoot = resolve(projRoot, "packages")

const buildOutput = resolve(projRoot, "dist")
const epOutput = resolve(buildOutput, "easy-elplus")
const epRoot = resolve(pkgRoot, "easy-elplus")

// 排除 node_modules 目录
const excludeFiles = files => {
  const excludes = ["node_modules"]
  return files.filter(path => !excludes.some(exclude => path.includes(exclude)))
}

// 模块化打包任务函数
export const buildModules = async () => {
  const input = excludeFiles(
    await glob("**/*.{js,ts,vue}", {
      cwd: epRoot,
      absolute: true, // 返回绝对路径
      onlyFiles: true // 只返回文件的路径
    })
  )
  const bundle = await rollup({
    input, // 配置入口文件
    plugins: [
      // 配置插件
      vue(),
      nodeResolve()
    ],
    // 排除不进行打包的 npm 包，例如 Vue，以便减少包的体积
    external: ["vue", "element-plus"]
  })
  // 配置输出文件格式
  bundle.write({
    format: "esm", // 配置输出格式
    dir: resolve(epOutput, "es"), // 配置输出目录
    exports: "named", // 使用具名导出，避免混合导出警告
    preserveModules: true, // 该选项将使用原始模块名作为文件名，为所有模块创建单独的 chunk
    preserveModulesRoot: epRoot,
    entryFileNames: `[name].mjs` // [name]：入口文件的文件名（不包含扩展名），也就是生产 .mjs 结尾的文件
  })
  bundle.write({
    format: "cjs", // 配置输出格式
    dir: resolve(epOutput, "lib"), // 配置输出目录
    exports: "named", // 使用具名导出，避免混合导出警告
    preserveModules: true, // 该选项将使用原始模块名作为文件名，为所有模块创建单独的 chunk
    preserveModulesRoot: epRoot,
    entryFileNames: `[name].js` // [name]：入口文件的文件名（不包含扩展名），也就是生产 .js 结尾的文件
  })
}
// buildModules()
