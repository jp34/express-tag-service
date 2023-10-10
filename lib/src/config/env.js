"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = __importDefault(require("./logger"));
const error_1 = require("../domain/error");
// Configures debug mode: Boolean
const DEBUG = (_a = process.env.SERVICE_DEBUG) !== null && _a !== void 0 ? _a : "undefined";
if (DEBUG === "undefined")
    throw new error_1.ConfigurationError("Missing environment variable: SERVICE_DEBUG");
logger_1.default.debug(`DEBUG: ${DEBUG}`);
// Configures server host
const HOST = (_b = process.env.SERVICE_HOST) !== null && _b !== void 0 ? _b : "undefined";
if (HOST === "undefined")
    throw new error_1.ConfigurationError("Missing environment variable: SERVICE_HOST");
logger_1.default.debug(`HOST: ${HOST}`);
// Configures server port
const PORT = (_c = process.env.SERVICE_PORT) !== null && _c !== void 0 ? _c : "undefined";
if (PORT === "undefined")
    throw new error_1.ConfigurationError("Missing environment variable: SERVICE_PORT");
logger_1.default.debug(`PORT: ${PORT}`);
// Configures db seeding: Boolean
const DB_SEED = (_d = process.env.SERVICE_DB_SEED) !== null && _d !== void 0 ? _d : "undefined";
if (DB_SEED === "undefined")
    throw new error_1.ConfigurationError("Missing environment variable: SERVICE_DB_SEED");
logger_1.default.debug(`DB_SEED: ${DB_SEED}`);
// Configures mongo db location
const DB_STRING = (_e = process.env.SERVICE_DB_STRING) !== null && _e !== void 0 ? _e : "undefined";
if (DB_STRING === "undefined")
    throw new error_1.ConfigurationError("Missing environment variable: SERVICE_DB_SEED");
logger_1.default.debug(`DB_STRING: ${DB_STRING}`);
const Env = {
    DEBUG: DEBUG,
    HOST: HOST,
    PORT: PORT,
    DB_SEED: DB_SEED,
    DB_STRING: DB_STRING,
};
exports.default = Env;
