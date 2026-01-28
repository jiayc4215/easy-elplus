import { parallel, series } from "gulp"
import { buildFullEntry } from "./full-bundle.js"
import { buildModules } from "./modules.js"
import { copyFiles } from "./copyFiles.js"

export default series(parallel(buildFullEntry, buildModules), copyFiles)
