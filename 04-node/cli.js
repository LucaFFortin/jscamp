import { stat, readdir } from "node:fs/promises"
import { join, extname } from "node:path";

const PROCESS_ARGS = process.argv
let args = PROCESS_ARGS.slice(2)

let dir = args[0] ?? '.'

let dirFiles = await readdir(dir)
// flags
let isOrdered = args.includes("--order")
let onlyFiles = args.includes("--only-files")
let onlyFolders = args.includes("--only-folders")
let fileExtension
let hasFileExtensionFlag = args.some(arg => {
    let hasExt = arg.includes("--only-.")
    if (hasExt) fileExtension = arg.slice(7)
    return hasExt
})

// ANSI COLORS

const red = '\x1b[31m';
const green = '\x1b[32m';
const reset = '\x1b[0m';
const yellow = '\x1b[33m'
const blue = '\x1b[34m'
const purple = '\x1b[35m'
const cyan = '\x1b[36m'
const white = '\x1b[37m'

const colorText = (text, color) => {
    return color + text + reset
}

function formatSize(bytes) {
    if (bytes === "-") return `${"0".padEnd(6)} ${"B ".padStart(3)}`
    const k = 1024
    const sizes = ['B ', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${String(parseFloat((bytes / Math.pow(k, i)).toFixed(2))).padEnd(7)} ${sizes[i]}`
}

let filePromises = dirFiles.map(async (file) => {
    const filePath = join(dir, file)
    const fileStats = await stat(filePath)
    const fileExt = extname(filePath) === "" ? "-" : extname(filePath)
    const isDirectory = fileStats.isDirectory()
    if (onlyFiles && isDirectory) return []
    if (onlyFolders && !isDirectory) return []
    const fileIcon = isDirectory ? "📂" : "📄"
    const fileSize = fileStats.size === 0 ? "-" : fileStats.size
    const lineString = `|${fileIcon}| ${colorText(file, blue).padEnd(29)}| ${fileExt.padEnd(9)}| ${formatSize(fileSize)}|`

    if (!hasFileExtensionFlag) return [lineString, isDirectory]
    
    else if (hasFileExtensionFlag && fileExt === fileExtension) {
        return [lineString, isDirectory]
    }
    
    else return []
})

console.log(`|  | ${"Name".padEnd(20)}| ${"Extension".padEnd(7)}| ${"Size".padEnd(9)} |`)

const filesLines = await Promise.all(filePromises)
const folders = []
const files = []
filesLines.forEach(([line, isDirectory]) => {
    if (line && isOrdered) {
        if (isDirectory) folders.push(line)
        else files.push(line)
    }
    else if (line) console.log(line)
})

folders.forEach(line => console.log(line))
files.forEach(line => console.log(line))
