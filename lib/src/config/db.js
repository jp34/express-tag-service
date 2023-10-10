"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = exports.connect = void 0;
const env_1 = __importDefault(require("./env"));
const mongoose_1 = __importDefault(require("mongoose"));
const entity_1 = require("../domain/entity");
const tags_json_1 = __importDefault(require("../domain/json/tags.json"));
const logger_1 = __importDefault(require("./logger"));
const connect = () => {
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(env_1.default.DB_STRING).then(() => {
        logger_1.default.info('Successfully connected to database', {
            uri: env_1.default.DB_STRING,
            timestamp: Date.now()
        });
    }).catch((err) => {
        logger_1.default.warn(err.message);
        // logger.warn('Failed to connect to database', {
        //     uri: Env.DB_STRING,
        //     timestamp: Date.now()
        // });
        throw new Error('Failed to connect to database');
    });
};
exports.connect = connect;
const seed = () => {
    try {
        entity_1.TagModel.collection.insertMany(tags_json_1.default.map((tag) => {
            return Object.assign(Object.assign({}, tag), { dateCreated: new Date(Date.now()), dateModified: new Date(Date.now()) });
        }));
        logger_1.default.info('Successfully seeded database', {
            uri: env_1.default.DB_STRING,
            timestamp: Date.now()
        });
    }
    catch (err) {
        logger_1.default.warn('Failed to seed database', {
            uri: env_1.default.DB_STRING,
            timestamp: Date.now()
        });
        throw new Error('Failed to seed database');
    }
};
exports.seed = seed;
