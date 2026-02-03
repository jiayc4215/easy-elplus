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
  // copy public
  const publicDir = resolve(projRoot, "public")
  const publicOutput = resolve(epOutput, "public") // copy into dist/easy-elplus/public
  // Check if public dir exists before copying to avoid errors if missing
  try {
    // implementation of cp that works recursively
    // Note: fs/promises cp is available in Node 16.7+
    const { cp } = await import("fs/promises")
    if (cp) {
      await cp(publicDir, publicOutput, { recursive: true })
    } else {
      // Fallback or error if cp not found?
      // Given pnpm 10, node is likely > 18.
    }
  } catch (e) {
    console.warn("Could not copy public directory or it does not exist", e)
  }
}
