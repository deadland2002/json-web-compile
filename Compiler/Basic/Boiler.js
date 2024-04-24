"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatHTML = exports.GetBoiler = void 0;
const jsdom_1 = require("jsdom");
const prettier_1 = __importDefault(require("prettier"));
const GetBoiler = (child, titleStr) => {
    const dom = new jsdom_1.JSDOM('<!DOCTYPE html>');
    const document = dom.window.document;
    const html = document.createElement("html");
    const head = document.createElement("head");
    const title = document.createElement("title");
    title.innerHTML = titleStr;
    head.appendChild(title);
    html.appendChild(head);
    html.appendChild(child);
    return html.outerHTML;
};
exports.GetBoiler = GetBoiler;
const formatHTML = (html) => {
    return prettier_1.default.format(html, { parser: "html" });
};
exports.formatHTML = formatHTML;
