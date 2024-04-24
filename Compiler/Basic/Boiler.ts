import { JSDOM } from 'jsdom';
import prettier from 'prettier';

const GetBoiler = (child:HTMLElement,titleStr:string) =>{
    const dom = new JSDOM('<!DOCTYPE html>');
    const document = dom.window.document;

    const html = document.createElement("html");
    const head = document.createElement("head");
    const title = document.createElement("title");

    title.innerHTML = titleStr;
    head.appendChild(title);
    html.appendChild(head);
    html.appendChild(child);


    return html.outerHTML;
}


const formatHTML = (html:string) => {
    return prettier.format(html, { parser: "html" });
};


export {GetBoiler,formatHTML}
