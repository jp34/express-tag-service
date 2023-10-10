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
exports.handle = void 0;
const error_1 = require("../domain/error");
const logger_1 = __importDefault(require("../config/logger"));
const handle = (error, request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error instanceof error_1.ConfigurationError) {
        logger_1.default.warn('ConfigurationError', {
            cause: error.message,
            ip: request.ip,
            timestamp: Date.now()
        });
    }
    else {
        logger_1.default.warn('Unknown Error', {
            cause: error.message,
            ip: request.ip,
            timestamp: Date.now()
        });
    }
    next();
});
exports.handle = handle;
