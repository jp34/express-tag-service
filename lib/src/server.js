"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ./config/env must be first import
const env_1 = __importDefault(require("./config/env"));
const logger_1 = __importDefault(require("./config/logger"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./app/router"));
const middleware_1 = require("./app/middleware");
// Configure database
const db_1 = require("./config/db");
(0, db_1.connect)();
if (env_1.default.DB_SEED)
    (0, db_1.seed)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("combined"));
app.use(router_1.default);
app.use(middleware_1.handle);
app.listen(parseInt(env_1.default.PORT), env_1.default.HOST, () => {
    logger_1.default.info(`Server listening on port ${env_1.default.PORT}...`);
});
exports.default = app;
