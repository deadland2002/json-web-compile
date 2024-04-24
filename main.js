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
const fs_1 = __importDefault(require("fs"));
const DirHelper_1 = require("./Compiler/Helper/DirHelper");
const JSONtoHTML_1 = require("./Compiler/Basic/JSONtoHTML");
const Server_1 = require("./Compiler/Helper/Server");
const node_fs_1 = require("node:fs");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const path = yield new Promise((resolve, reject) => {
        fs_1.default.mkdir("./output/", { recursive: true }, (err, res) => {
            if (err) {
                reject(false);
            }
            else {
                resolve(true);
            }
        });
    });
    if (!path)
        return;
    const inputPath = __dirname + "\\input";
    const files = yield (0, DirHelper_1.GetFilesOfDir)(inputPath);
    if (!files)
        return;
    console.log(files);
    for (let file of files) {
        const data = fs_1.default.readFileSync(file, 'utf8');
        const jsonData = JSON.parse(data);
        const result = yield (0, JSONtoHTML_1.ConvertJson)(jsonData);
        yield (0, DirHelper_1.CreateFile)(result, file, inputPath);
    }
    yield new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        (0, node_fs_1.writeFile)("output/server.js", yield (0, Server_1.GetServer)(), (err) => {
            if (err) {
                console.log(err);
                return reject("server not created");
            }
            console.log("server written");
            console.log("run below command to run server");
            console.log("node ./output/server.js");
            return resolve(true);
        });
    }));
});
start();
