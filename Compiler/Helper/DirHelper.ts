import fs from "fs";
import pathMethod from "node:path";
import path from "node:path";

const GetFilesOfDir = async (currPath:string) : Promise<string[]|boolean> =>{
    let allPaths = await new Promise<string[]>((resolve, reject) => {
        const formatPath = currPath
        fs.readdir(formatPath,(err, files) => {
            if (err) {
                reject()
            }
            else resolve(files);
        });
    }).catch(res=>res)

    if(!allPaths)
        return false;

    allPaths = allPaths.map((single:string)=>pathMethod.join(currPath,single));

    for(let file of allPaths){
        const res = await GetFilesOfDir(file)
        if(res){
            allPaths.push(...res as string[]);
            allPaths = allPaths.filter((single:string)=>single!==file);
        }

    }
    return [...allPaths]
}




const CreateFile = async (file:string,filePath:string,inputPath:string) =>{
    const OUTPUT_PATH = "output"
    const formattedPath = filePath
        .replace(inputPath, "")
        .replace("page.json", "index.html")
        .replace(/\\/g, "/"); // Replace backslashes with forward slashes for cross-platform compatibility


    const finalPath = path.join(OUTPUT_PATH, formattedPath);
    const finalDir = path.dirname(finalPath);

    if (!fs.existsSync(finalDir)) {
        fs.mkdirSync(finalDir, { recursive: true });
    }

    await new Promise<boolean>((resolve, reject) => {
        fs.writeFile(finalPath,file,()=>{
            console.log("wrote file",filePath,finalPath);
            resolve(true);
        })
    });
}







export {GetFilesOfDir,CreateFile}



