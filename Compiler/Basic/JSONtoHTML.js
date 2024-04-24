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
exports.ConvertJson = void 0;
const jsdom_1 = require("jsdom");
const Boiler_1 = require("./Boiler");
const prettier_1 = __importDefault(require("prettier"));
const Tag_1 = require("./Tag");
const ConvertJson = (jsonData) => __awaiter(void 0, void 0, void 0, function* () {
    const dom = new jsdom_1.JSDOM('<!DOCTYPE html>');
    const document = dom.window.document;
    const html = yield CreateElementBody(jsonData.page.body);
    const complete = (0, Boiler_1.GetBoiler)(html, jsonData.title);
    return prettier_1.default.format(complete, { parser: "html" });
});
exports.ConvertJson = ConvertJson;
const CreateElementBody = (jsonData) => __awaiter(void 0, void 0, void 0, function* () {
    const dom = new jsdom_1.JSDOM('<!DOCTYPE html>');
    const document = dom.window.document;
    const body = document.createElement('body');
    for (let item of jsonData) {
        const tag = (0, Tag_1.TagCreate)(item);
        body.appendChild(tag);
    }
    return body;
});
