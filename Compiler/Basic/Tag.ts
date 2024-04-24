import {JSDOM} from "jsdom";
import {InputType} from "../../interface/inputType";

const GetTag = (title:InputType['page']["body"][0]['type']) : HTMLElement =>{
    const dom = new JSDOM('<!DOCTYPE html>');
    const document = dom.window.document;

    if(title === "heading1")
        return document.createElement("h1");

    if(title === "heading2")
        return document.createElement("h2");

    if(title === "heading3")
        return document.createElement("h3");

    if(title === "heading4")
        return document.createElement("h4");

    if(title === "para")
        return document.createElement("p");

    if(title === "link")
        return document.createElement("a");

    return document.createElement("span");
}

const TagCreate = (dataObj:InputType['page']["body"][0]) =>{
    let tag;

    if(dataObj.type === "heading1"){
        tag = GetTag("heading1");
        tag.innerHTML = dataObj.content
    }

    if(dataObj.type === "heading2") {
        tag = GetTag("heading2");
        tag.innerHTML = dataObj.content
    }

    if(dataObj.type === "heading3"){
        tag = GetTag("heading3");
        tag.innerHTML = dataObj.content
    }

    if(dataObj.type === "heading4"){
        tag = GetTag("heading4");
        tag.innerHTML = dataObj.content
    }

    if(dataObj.type === "link" && dataObj.special){
        tag = GetTag("link") as HTMLAnchorElement;
        tag.href = dataObj.special
        tag.innerHTML = dataObj.content;
    }

    if(dataObj.type === "para") {
        tag = GetTag("para");
        tag.innerHTML = dataObj.content
    }

    if(dataObj.children && tag){
        for(let child of dataObj.children){
            const tagChild = TagCreate(child);
            tag.appendChild(tagChild);
        }
    }

    return tag as HTMLElement;
}

export {TagCreate}

