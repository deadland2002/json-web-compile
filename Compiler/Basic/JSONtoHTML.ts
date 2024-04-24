import {JSDOM} from "jsdom";
import {GetBoiler} from "./Boiler";
import {InputType} from "../../interface/inputType";
import prettier from "prettier";
import {TagCreate} from "./Tag";

const ConvertJson = async (jsonData:InputType) =>{
    const dom = new JSDOM('<!DOCTYPE html>');
    const document = dom.window.document;

    const html = await CreateElementBody(jsonData.page.body)

    const complete = GetBoiler(html,jsonData.title);

    return prettier.format(complete, { parser: "html" });
}


const CreateElementBody = async (jsonData:InputType["page"]["body"]) =>{
    const dom = new JSDOM('<!DOCTYPE html>');
    const document = dom.window.document;

    const body = document.createElement('body');
    for (let item of jsonData){
        const tag = TagCreate(item)
        body.appendChild(tag);
    }

    return body;
}


export {ConvertJson}
