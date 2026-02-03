import fs from "fs"
import path from "path"

const rootDir = process.cwd()
const rootPkgPath = path.resolve(rootDir, "package.json")
const targetPkgPath = path.resolve(rootDir, "packages/easy-elplus/package.json")

const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf-8"))
const targetPkg = JSON.parse(fs.readFileSync(targetPkgPath, "utf-8"))

targetPkg.version = rootPkg.version

fs.writeFileSync(targetPkgPath, JSON.stringify(targetPkg, null, 2) + "\n")
console.log(`Updated packages/easy-elplus/package.json version to ${rootPkg.version}`)
