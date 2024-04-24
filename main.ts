import fs from "fs"
import {CreateFile, GetFilesOfDir} from "./Compiler/Helper/DirHelper";
import {ConvertJson} from "./Compiler/Basic/JSONtoHTML";
import {GetServer} from "./Compiler/Helper/Server";
import {writeFile} from "node:fs";
import * as child_process from "node:child_process";

const start = async () =>{
    const path = await new Promise((resolve, reject) => {
        fs.mkdir("./output/", {recursive:true},(err:Error|null,res:string|undefined)=>{
            if(err){
                reject(false)
            }else{
                resolve(true)
            }
        })
    })

    if(!path)
        return


    const inputPath = __dirname+"\\input"
    const files = await GetFilesOfDir(inputPath);

    if(!files)
        return;

    console.log(files)

    for(let file of files as string[]){
        const data = fs.readFileSync(file, 'utf8');
        const jsonData = JSON.parse(data);
        const result = await ConvertJson(jsonData)
        await CreateFile(result,file,inputPath);
    }

    await new Promise(async (resolve, reject) => {
        writeFile("output/server.js",await GetServer(),(err)=>{
            if(err){
                console.log(err)
                return reject("server not created")
            }
            console.log("server written")
            console.log("run below command to run server")
            console.log("node ./output/server.js")
            return resolve(true)
        });
    })

}

start()
