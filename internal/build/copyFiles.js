import { copyFile, mkdir } from "fs/promises"
import { fileURLToPath } from "url"
import { resolve, dirname, join } from "path"

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(__filenameNew)
const projRoot = resolve(__dirnameNew, "..", "..")

const pkgRoot = resolve(projRoot, "packages")
const epRoot = resolve(pkgRoot, "easy-elplus")
const epPackage = resolve(epRoot, "package.json")

/** `/dist` */
const buildOutput = resolve(projRoot, "dist")
/** `/dist/easy-elplus` */
const epOutput = resolve(buildOutput, "easy-elplus")

// 复制
export const copyFiles = async () => {
  await mkdir(epOutput, { recursive: true })
  await copyFile(epPackage, join(epOutput, "package.json"))
  await copyFile(resolve(projRoot, "README.md"), join(epOutput, "README.md"))
  await copyFile(resolve(projRoot, "LICENSE"), join(epOutput, "LICENSE"))
}
