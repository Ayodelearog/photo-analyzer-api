"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzePhotosRoute = exports.getVisionClient = exports.createServer = void 0;
var server_1 = require("./server");
Object.defineProperty(exports, "createServer", { enumerable: true, get: function () { return server_1.createServer; } });
var visionClient_1 = require("./visionClient");
Object.defineProperty(exports, "getVisionClient", { enumerable: true, get: function () { return visionClient_1.getVisionClient; } });
var analyzePhotos_1 = require("./routes/analyzePhotos");
Object.defineProperty(exports, "analyzePhotosRoute", { enumerable: true, get: function () { return __importDefault(analyzePhotos_1).default; } });
