"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFile = exports.GetFilesOfDir = void 0;
const fs_1 = __importDefault(require("fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_path_2 = __importDefault(require("node:path"));
const GetFilesOfDir = (currPath) => __awaiter(void 0, void 0, void 0, function* () {
    let allPaths = yield new Promise((resolve, reject) => {
        const formatPath = currPath;
        fs_1.default.readdir(formatPath, (err, files) => {
            if (err) {
                reject();
            }
            else
                resolve(files);
        });
    }).catch(res => res);
    if (!allPaths)
        return false;
    allPaths = allPaths.map((single) => node_path_1.default.join(currPath, single));
    for (let file of allPaths) {
        const res = yield GetFilesOfDir(file);
        if (res) {
            allPaths.push(...res);
            allPaths = allPaths.filter((single) => single !== file);
        }
    }
    return [...allPaths];
});
exports.GetFilesOfDir = GetFilesOfDir;
const CreateFile = (file, filePath, inputPath) => __awaiter(void 0, void 0, void 0, function* () {
    const OUTPUT_PATH = "output";
    const formattedPath = filePath
        .replace(inputPath, "")
        .replace("page.json", "index.html")
        .replace(/\\/g, "/"); // Replace backslashes with forward slashes for cross-platform compatibility
    const finalPath = node_path_2.default.join(OUTPUT_PATH, formattedPath);
    const finalDir = node_path_2.default.dirname(finalPath);
    if (!fs_1.default.existsSync(finalDir)) {
        fs_1.default.mkdirSync(finalDir, { recursive: true });
    }
    yield new Promise((resolve, reject) => {
        fs_1.default.writeFile(finalPath, file, () => {
            console.log("wrote file", filePath, finalPath);
            resolve(true);
        });
    });
});
exports.CreateFile = CreateFile;
